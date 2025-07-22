import { useState } from 'react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Text } from './ui/Typography';
import { Card } from './ui/Card';
import { Input } from './ui/Input';
import { DemoRequestForm } from './ui/DemoRequestForm';
import { useGlobalTheme } from './GlobalThemeProvider';

/**
 * Test component to verify that UI components automatically use global theme
 * when no theme prop is provided
 */
export function ThemeTestComponent() {
  const { isLightMode, toggleTheme } = useGlobalTheme();
  const [email, setEmail] = useState('');

  return (
    <div className={`min-h-screen p-8 ${isLightMode ? 'bg-gray-100' : 'bg-gray-900'}`}>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className={`text-3xl font-bold ${isLightMode ? 'text-gray-900' : 'text-white'}`}>
            UI Component Theme Test
          </h1>
          <p className={`text-lg ${isLightMode ? 'text-gray-600' : 'text-gray-300'}`}>
            Current theme: {isLightMode ? 'Light' : 'Dark'}
          </p>
          <Button onClick={toggleTheme} variant="primary">
            Toggle Theme
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className={`text-xl font-semibold mb-4 ${isLightMode ? 'text-gray-900' : 'text-white'}`}>
              Components WITHOUT theme prop
            </h2>
            <div className="space-y-4">
              <div>
                <Text variant="subheader" className="mb-2">Button Examples:</Text>
                <div className="flex flex-wrap gap-2">
                  <Button variant="primary">Primary Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="ghost">Ghost Button</Button>
                </div>
              </div>

              <div>
                <Text variant="subheader" className="mb-2">Badge Examples:</Text>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default">Default Badge</Badge>
                  <Badge variant="outline">Outline Badge</Badge>
                  <Badge variant="solid">Solid Badge</Badge>
                </div>
              </div>

              <div>
                <Text variant="subheader" className="mb-2">Text Examples:</Text>
                <div className="space-y-2">
                  <Text variant="body">Body text automatically uses global theme</Text>
                  <Text variant="subheader">Subheader text automatically uses global theme</Text>
                  <Text variant="metrics">Metrics text automatically uses global theme</Text>
                </div>
              </div>

              <div>
                <Text variant="subheader" className="mb-2">Input Example:</Text>
                <Input
                  label="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className={`text-xl font-semibold mb-4 ${isLightMode ? 'text-gray-900' : 'text-white'}`}>
              Components WITH explicit theme prop
            </h2>
            <div className="space-y-4">
              <div>
                <Text variant="subheader" className="mb-2">Button Examples (forced dark):</Text>
                <div className="flex flex-wrap gap-2">
                  <Button variant="primary" theme="dark">Primary Button</Button>
                  <Button variant="secondary" theme="dark">Secondary Button</Button>
                  <Button variant="ghost" theme="dark">Ghost Button</Button>
                </div>
              </div>

              <div>
                <Text variant="subheader" className="mb-2">Badge Examples (forced light):</Text>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default" theme="light">Default Badge</Badge>
                  <Badge variant="outline" theme="light">Outline Badge</Badge>
                  <Badge variant="solid" theme="light">Solid Badge</Badge>
                </div>
              </div>

              <div>
                <Text variant="subheader" className="mb-2">Text Examples (forced opposite):</Text>
                <div className="space-y-2">
                  <Text variant="body" theme={isLightMode ? 'dark' : 'light'}>
                    Body text with explicit opposite theme
                  </Text>
                  <Text variant="subheader" theme={isLightMode ? 'dark' : 'light'}>
                    Subheader text with explicit opposite theme
                  </Text>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className={`text-xl font-semibold mb-4 ${isLightMode ? 'text-gray-900' : 'text-white'}`}>
            Demo Request Form (No theme prop)
          </h2>
          <div className="max-w-md mx-auto">
            <DemoRequestForm />
          </div>
        </Card>

        <div className={`p-4 rounded-lg ${isLightMode ? 'bg-green-100 text-green-800' : 'bg-green-900 text-green-200'}`}>
          <h3 className="font-semibold mb-2">✅ Test Results:</h3>
          <ul className="space-y-1">
            <li>• Components without theme prop should automatically use global theme</li>
            <li>• Components with explicit theme prop should use that theme</li>
            <li>• Theme toggle should affect all components without explicit theme</li>
            <li>• Components with explicit theme should remain unchanged on toggle</li>
          </ul>
        </div>
      </div>
    </div>
  );
}