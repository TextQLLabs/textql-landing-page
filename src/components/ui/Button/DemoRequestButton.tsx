import { Button } from ".."
import { useNavigate } from "react-router-dom";
import { trackButtonClick } from "../../../utils/analytics";

export function DemoRequestButton({
  theme = 'dark',
  buttonText = 'Request Demo',
  size = 'md'
}: {
  theme: 'dark' | 'light';
  buttonText: string;
}) {
  const navigate = useNavigate();

  const handleDemoRequest = () => {
    trackButtonClick(buttonText, 'demo_request_button', { destination: 'demo' });
    navigate('/demo');
  };

  return (
    <Button
      variant="primary"
      size={size}
      onClick={handleDemoRequest}
      theme={theme}
    >
      {buttonText}
    </Button>
  )
}
