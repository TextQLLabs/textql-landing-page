import type { Workflow } from './types';

// Import all workflow markdown files
const workflowModules = import.meta.glob('./*/workflow.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;

/**
 * Parse implementation steps from markdown content
 */
function parseImplementationSteps(content: string) {
  const implementationMatch = content.match(/## Implementation Steps\n\n([\s\S]*?)(?=\n##|$)/);
  if (!implementationMatch) return [];

  const stepsContent = implementationMatch[1];
  const steps = stepsContent.split(/\d+\.\s+/).filter(Boolean);

  return steps.map(step => {
    // Split into lines and filter out empty ones
    const lines = step.split('\n').filter(Boolean);
    
    // First line is the title - remove any markdown stars
    const title = lines[0].replace(/^\*\*(.*?)\*\*$/, '$1').trim();
    
    // Remaining lines that start with - are tasks
    const tasks = lines
      .slice(1)
      .filter(line => line.trim().startsWith('-'))
      .map(task => task.trim().replace(/^-\s*/, ''));

    return {
      title,
      tasks: tasks.length > 0 ? tasks : undefined
    };
  });
}

/**
 * Parse frontmatter from markdown content and also return the body.
 */
function parseFrontmatter(content: string): Workflow | null {
  try {
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) return null;

    const frontmatterYaml = frontmatterMatch[1];
    const frontmatterLines = frontmatterYaml.split('\n');
    const frontmatter: Record<string, any> = {};
    let currentKey: string | null = null;
    let currentArray: string[] = [];
    let currentComponents: Array<{ name: string; description: string }> = [];
    let currentComponent: { name?: string; description?: string } = {};

    frontmatterLines.forEach(line => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return;

      // New key/value line
      if (!trimmedLine.startsWith('- ') && !trimmedLine.startsWith('  ')) {
        if (currentKey && currentArray.length > 0) {
          frontmatter[currentKey] = currentArray;
          currentArray = [];
        }
        if (currentKey === 'components' && currentComponents.length > 0) {
          frontmatter.components = currentComponents;
        }
        const [key, ...valueParts] = trimmedLine.split(':').map(part => part.trim());
        if (!key || !valueParts.length) return;
        currentKey = key;
        const value = valueParts.join(':').replace(/"/g, '');
        if (value === '') {
          currentArray = [];
        } else {
          frontmatter[key] = value;
          currentKey = null;
        }
      }
      // Array item
      else if (trimmedLine.startsWith('- ')) {
        if (currentKey) {
          currentArray.push(trimmedLine.substring(2));
        }
      }
      // Components parsing
      else if (currentKey === 'components') {
        if (trimmedLine.startsWith('  - name: ')) {
          if (currentComponent.name) {
            currentComponents.push({ 
              name: currentComponent.name, 
              description: currentComponent.description || '' 
            });
            currentComponent = {};
          }
          currentComponent.name = trimmedLine.replace('  - name: ', '').replace(/"/g, '');
        } else if (trimmedLine.startsWith('    description: ')) {
          currentComponent.description = trimmedLine.replace('    description: ', '').replace(/"/g, '');
          if (currentComponent.name && currentComponent.description) {
            currentComponents.push({ 
              name: currentComponent.name, 
              description: currentComponent.description 
            });
            currentComponent = {};
          }
        }
      }
    });

    if (currentKey && currentArray.length > 0) {
      frontmatter[currentKey] = currentArray;
    }
    if (currentKey === 'components' && currentComponents.length > 0) {
      frontmatter.components = currentComponents;
    }

    // Parse implementation steps from the entire content.
    const implementationSteps = parseImplementationSteps(content);
    if (implementationSteps.length > 0) {
      frontmatter.implementation_steps = implementationSteps;
    }

    // Extract the remaining markdown (the body) after the frontmatter.
    const body = content.slice(frontmatterMatch[0].length).trim();
    frontmatter.markdownContent = body;

    return frontmatter as Workflow;
  } catch (error) {
    console.error('Error parsing frontmatter:', error);
    return null;
  }
}

/**
 * Load all workflows from the workflow markdown files.
 */
export function loadWorkflows(): Workflow[] {
  const workflows = Object.entries(workflowModules).map(([path, content]) => {
    const workflow = parseFrontmatter(content as string);
    if (!workflow) {
      console.warn(`No frontmatter found in workflow file: ${path}`);
      return null;
    }
    return workflow;
  }).filter((workflow): workflow is Workflow => workflow !== null);

  return workflows.sort((a, b) => a.title.localeCompare(b.title));
}