/**
 * Examples of how to use the theme utilities
 * This file demonstrates the theme utilities in action
 */

import { useComponentTheme } from '../hooks/useComponentTheme';
import { 
  themeBackground, 
  themeText, 
  themeCard, 
  themeButton, 
  themeInput,
  themeConditional,
  combineThemeUtilities,
  themePresets
} from './theme.index';

/**
 * Example 1: Basic theme usage in a component
 */
export function ExampleComponent() {
  const theme = useComponentTheme();
  
  return (
    <div className={`${themeBackground(theme)} ${themeText(theme)} p-4`}>
      <h1 className="text-2xl font-bold">Hello World</h1>
      <p className="text-sm">This component adapts to the current theme</p>
    </div>
  );
}

/**
 * Example 2: Using composite utilities
 */
export function ExampleCard() {
  const theme = useComponentTheme();
  
  return (
    <div className={`${themeCard(theme)} p-6`}>
      <h2 className="text-xl font-semibold mb-4">Card Title</h2>
      <p className="mb-4">This card has themed background, border, shadow, and text</p>
      <button className={themeButton(theme)}>
        Themed Button
      </button>
    </div>
  );
}

/**
 * Example 3: Using theme presets
 */
export function ExampleNavbar() {
  const theme = useComponentTheme();
  
  return (
    <nav className={`${themePresets.navbar(theme)} p-4`}>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Brand</h1>
        <div className="flex gap-4">
          <a href="#" className={themePresets.interactive(theme)}>Home</a>
          <a href="#" className={themePresets.interactive(theme)}>About</a>
          <a href="#" className={themePresets.interactive(theme)}>Contact</a>
        </div>
      </div>
    </nav>
  );
}

/**
 * Example 4: Using conditional theme utilities
 */
export function ExampleConditional() {
  const theme = useComponentTheme();
  
  return (
    <div className={`${themeConditional(theme, 'bg-white text-gray-900', 'bg-gray-900 text-white')} p-4`}>
      <h2>Conditional Theme Example</h2>
      <p>This uses conditional classes based on theme</p>
    </div>
  );
}

/**
 * Example 5: Using combined utilities
 */
export function ExampleCombined() {
  const theme = useComponentTheme();
  
  const combinedClasses = combineThemeUtilities([
    themeBackground,
    themeText,
    (theme) => theme === 'light' ? 'shadow-sm' : 'shadow-lg'
  ], theme);
  
  return (
    <div className={`${combinedClasses} p-4 rounded`}>
      <h2>Combined Utilities Example</h2>
      <p>This combines multiple theme utilities</p>
    </div>
  );
}

/**
 * Example 6: Form with theme utilities
 */
export function ExampleForm() {
  const theme = useComponentTheme();
  
  return (
    <form className={`${themeCard(theme)} p-6 space-y-4`}>
      <h2 className="text-xl font-semibold">Contact Form</h2>
      
      <div>
        <label className="block text-sm font-medium mb-2">Name</label>
        <input 
          type="text" 
          className={themeInput(theme)} 
          placeholder="Your name"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Email</label>
        <input 
          type="email" 
          className={themeInput(theme)} 
          placeholder="your@email.com"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Message</label>
        <textarea 
          className={themeInput(theme)} 
          rows={4}
          placeholder="Your message"
        />
      </div>
      
      <button type="submit" className={themeButton(theme)}>
        Send Message
      </button>
    </form>
  );
}

/**
 * Example usage patterns for common scenarios
 */
export const usagePatterns = {
  // Pattern 1: Simple component with theme
  simpleComponent: `
    function MyComponent() {
      const theme = useComponentTheme();
      return (
        <div className={\`\${themeBackground(theme)} \${themeText(theme)} p-4\`}>
          Content
        </div>
      );
    }
  `,
  
  // Pattern 2: Card component
  cardComponent: `
    function MyCard() {
      const theme = useComponentTheme();
      return (
        <div className={themeCard(theme)}>
          <h2>Card Title</h2>
          <p>Card content</p>
        </div>
      );
    }
  `,
  
  // Pattern 3: Interactive element
  interactiveElement: `
    function MyButton() {
      const theme = useComponentTheme();
      return (
        <button className={themeButton(theme)}>
          Click me
        </button>
      );
    }
  `,
  
  // Pattern 4: Form input
  formInput: `
    function MyInput() {
      const theme = useComponentTheme();
      return (
        <input 
          className={themeInput(theme)} 
          placeholder="Enter text"
        />
      );
    }
  `,
  
  // Pattern 5: Using presets
  navbarPreset: `
    function MyNavbar() {
      const theme = useComponentTheme();
      return (
        <nav className={themePresets.navbar(theme)}>
          Navigation content
        </nav>
      );
    }
  `,
};

/**
 * Migration guide for existing components
 */
export const migrationGuide = {
  // Before: Hard-coded theme classes
  before: `
    <div className="bg-white text-gray-900 border border-gray-200 shadow-sm">
      Content
    </div>
  `,
  
  // After: Using theme utilities
  after: `
    const theme = useComponentTheme();
    <div className={themeCard(theme)}>
      Content
    </div>
  `,
  
  // Before: Conditional classes
  beforeConditional: `
    <div className={isLightMode ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'}>
      Content
    </div>
  `,
  
  // After: Using theme conditional
  afterConditional: `
    const theme = useComponentTheme();
    <div className={themeConditional(theme, 'bg-white text-gray-900', 'bg-gray-900 text-white')}>
      Content
    </div>
  `,
};

export default {
  ExampleComponent,
  ExampleCard,
  ExampleNavbar,
  ExampleConditional,
  ExampleCombined,
  ExampleForm,
  usagePatterns,
  migrationGuide
};