import React from 'react';
import { useComponentTheme } from '../hooks/useComponentTheme';
import { useGlobalTheme } from './GlobalThemeProvider';
import { 
  themeBackground, 
  themeText, 
  themeCard, 
  themeButton, 
  themeInput,
  themeBackgroundSecondary,
  themeTextSecondary,
  combineThemeUtilities,
  themePresets
} from '../utils/theme.index';

/**
 * Test component to verify theme utilities work correctly
 * This component demonstrates all the theme utilities in action
 */
export function ThemeUtilityTest() {
  const theme = useComponentTheme();
  const { isLightMode, toggleTheme } = useGlobalTheme();

  return (
    <div className={combineThemeUtilities([themeBackground, themeText], theme)}>
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Theme Utility Test</h1>
          <button 
            onClick={toggleTheme}
            className={`${themeButton(theme)} text-sm`}
          >
            Switch to {isLightMode ? 'Dark' : 'Light'} Mode
          </button>
        </div>
        <p className="text-sm text-gray-500">Current theme: {theme}</p>
        
        {/* Basic backgrounds and text */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Background and Text Utilities</h2>
          <div className={`p-4 rounded ${themeBackground(theme)} ${themeText(theme)}`}>
            Primary background with primary text
          </div>
          <div className={`p-4 rounded ${themeBackgroundSecondary(theme)} ${themeTextSecondary(theme)}`}>
            Secondary background with secondary text
          </div>
        </div>

        {/* Card examples */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Card Utilities</h2>
          <div className={`p-4 ${themeCard(theme)}`}>
            This is a themed card with background, border, shadow, and text
          </div>
        </div>

        {/* Interactive elements */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Interactive Elements</h2>
          <div className="flex gap-4">
            <button className={themeButton(theme)}>
              Themed Button
            </button>
            <input 
              className={themeInput(theme)} 
              placeholder="Themed input"
            />
          </div>
        </div>

        {/* Preset examples */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Theme Presets</h2>
          <div className={`p-4 rounded ${themePresets.navbar(theme)}`}>
            Navbar preset styling
          </div>
          <div className={`p-4 rounded ${themePresets.section(theme)}`}>
            Section preset styling
          </div>
          <div className={`p-4 rounded cursor-pointer ${themePresets.interactive(theme)}`}>
            Interactive preset styling (hover me)
          </div>
        </div>
      </div>
    </div>
  );
}

// Export for development use
export default ThemeUtilityTest;