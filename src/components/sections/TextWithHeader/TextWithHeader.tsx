import { Button } from '../../ui/Button';
import { Text } from '../../ui/Typography';
import type { ButtonProps } from '../../ui/Button';

interface TextWithHeaderProps {
  header: string;
  subheader?: string;
  body?: string;
  button?: {
    text: string;
    href: string;
    variant?: ButtonProps['variant'];
    size?: ButtonProps['size'];
  };
  headerPosition?: 'left' | 'right';
  theme?: 'dark' | 'light';
}

export function TextWithHeader({
  header,
  subheader,
  body,
  button,
  headerPosition = 'left',
  theme = 'dark'
}: TextWithHeaderProps) {
  const textColor = theme === 'dark' ? 'text-[#B8D8D0]' : 'text-[#2A3B35]';

  const HeaderContent = () => (
    <div className="space-y-4">
      <Text variant="header" theme={theme} className={`text-4xl ${textColor}`}>
        {header}
      </Text>
      {subheader && (
        <Text color="muted" theme={theme} className="text-xl">
          {subheader}
        </Text>
      )}
    </div>
  );

  const ContentSection = () => (
    <div className="space-y-6">
      {body && (
        <Text color="muted" theme={theme} className="text-lg">
          {body}
        </Text>
      )}
      {button && (
        <Button
          theme={theme}
          variant={button.variant || 'primary'}
          size={button.size || 'lg'}
          onClick={() => window.open(button.href, '_blank')}
        >
          {button.text}
        </Button>
      )}
    </div>
  );

  return (
    <div className="grid md:grid-cols-2 gap-12 items-center">
      {headerPosition === 'left' ? (
        <>
          <HeaderContent />
          <ContentSection />
        </>
      ) : (
        <>
          <ContentSection />
          <HeaderContent />
        </>
      )}
    </div>
  );
}