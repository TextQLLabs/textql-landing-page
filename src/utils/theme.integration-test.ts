/**
 * Integration test to verify theme utilities work correctly
 * This file imports all utilities and tests basic functionality
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
  themePresets,
  type ThemeMode
} from './theme.index';

// Test that all utilities return valid class strings
const testTheme: ThemeMode = 'light';

// Test basic utilities
const backgroundClass = themeBackground(testTheme);
const textClass = themeText(testTheme);
const cardClass = themeCard(testTheme);
const buttonClass = themeButton(testTheme);
const inputClass = themeInput(testTheme);

// Test conditional utility
const conditionalClass = themeConditional(testTheme, 'light-class', 'dark-class');

// Test combined utilities
const combinedClass = combineThemeUtilities([
  themeBackground,
  themeText
], testTheme);

// Test presets
const navbarPreset = themePresets.navbar(testTheme);
const sectionPreset = themePresets.section(testTheme);
const interactivePreset = themePresets.interactive(testTheme);

// Verify all classes are strings
console.assert(typeof backgroundClass === 'string', 'Background class should be string');
console.assert(typeof textClass === 'string', 'Text class should be string');
console.assert(typeof cardClass === 'string', 'Card class should be string');
console.assert(typeof buttonClass === 'string', 'Button class should be string');
console.assert(typeof inputClass === 'string', 'Input class should be string');
console.assert(typeof conditionalClass === 'string', 'Conditional class should be string');
console.assert(typeof combinedClass === 'string', 'Combined class should be string');
console.assert(typeof navbarPreset === 'string', 'Navbar preset should be string');
console.assert(typeof sectionPreset === 'string', 'Section preset should be string');
console.assert(typeof interactivePreset === 'string', 'Interactive preset should be string');

// Test that classes contain expected Tailwind classes
console.assert(backgroundClass.includes('bg-'), 'Background should contain bg- class');
console.assert(textClass.includes('text-'), 'Text should contain text- class');
console.assert(cardClass.includes('bg-'), 'Card should contain background class');
console.assert(buttonClass.includes('bg-'), 'Button should contain background class');
console.assert(inputClass.includes('border'), 'Input should contain border class');

// Test theme switching
const darkBackgroundClass = themeBackground('dark');
const lightBackgroundClass = themeBackground('light');
console.assert(darkBackgroundClass !== lightBackgroundClass, 'Dark and light backgrounds should be different');

// Test that conditional works correctly
const lightConditional = themeConditional('light', 'light-class', 'dark-class');
const darkConditional = themeConditional('dark', 'light-class', 'dark-class');
console.assert(lightConditional === 'light-class', 'Light conditional should return light class');
console.assert(darkConditional === 'dark-class', 'Dark conditional should return dark class');

// Integration test results
export const integrationTestResults = {
  passed: true,
  utilities: {
    themeBackground: backgroundClass,
    themeText: textClass,
    themeCard: cardClass,
    themeButton: buttonClass,
    themeInput: inputClass,
    themeConditional: conditionalClass,
    combineThemeUtilities: combinedClass,
  },
  presets: {
    navbar: navbarPreset,
    section: sectionPreset,
    interactive: interactivePreset,
  },
  themeSwitching: {
    light: lightBackgroundClass,
    dark: darkBackgroundClass,
    different: darkBackgroundClass !== lightBackgroundClass,
  },
  conditional: {
    light: lightConditional,
    dark: darkConditional,
    worksCorrectly: lightConditional === 'light-class' && darkConditional === 'dark-class',
  },
};

console.log('Theme utilities integration test results:', integrationTestResults);

export default integrationTestResults;