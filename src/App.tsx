import { DebugProvider } from './contexts/DebugContext';
import { DebugRegistryProvider } from './contexts/DebugRegistryContext';
import { DevToolsProvider } from './contexts/DevToolsContext';
import { GlobalThemeProvider } from './components/GlobalThemeProvider';
import { DevTools } from './components/DevTools';
import { AppWithGlobalTheme } from './components/AppWithGlobalTheme';
import TermlyCMP from './components/TermlyCMP';

const WEBSITE_UUID = '3c5f274e-fdb3-4217-92ea-390ca9c98621';

function App() {
  return (
    <DebugProvider>
      <DebugRegistryProvider>
        <GlobalThemeProvider>
          <DevToolsProvider>
            <TermlyCMP websiteUUID={WEBSITE_UUID} />
            <DevTools />
            <AppWithGlobalTheme />
          </DevToolsProvider>
        </GlobalThemeProvider>
      </DebugRegistryProvider>
    </DebugProvider>
  );
}

export default App