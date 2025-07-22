import { DebugProvider } from './contexts/DebugContext';
import { DebugRegistryProvider } from './contexts/DebugRegistryContext';
import { DevToolsProvider } from './contexts/DevToolsContext';
import { GlobalThemeProvider } from './components/GlobalThemeProvider';
import { DevTools } from './components/DevTools';
import { AppWithGlobalTheme } from './components/AppWithGlobalTheme';

function App() {
  return (
    <DebugProvider>
      <DebugRegistryProvider>
        <GlobalThemeProvider>
          <DevToolsProvider>
            <DevTools />
            <AppWithGlobalTheme />
          </DevToolsProvider>
        </GlobalThemeProvider>
      </DebugRegistryProvider>
    </DebugProvider>
  );
}

export default App