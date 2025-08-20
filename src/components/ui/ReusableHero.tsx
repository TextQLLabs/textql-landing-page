import { Button } from "./Button";

interface HeroButton {
  text: string;
  variant: "primary" | "secondary";
  onClick?: (e?: React.MouseEvent) => void;
}

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  buttons?: HeroButton[];
  videoEmbedUrl?: string;
  className?: string;
  theme?: "light" | "dark";
  layout?: "text-left" | "text-right" | "centered";
  showVideo?: boolean;
}

const ReusableHero = ({
  title,
  subtitle,
  description,
  buttons = [],
  videoEmbedUrl,
  className = "",
  theme = "light",
  layout = "text-left",
  showVideo = true,
}: HeroProps) => {
  const isTextOnly = !showVideo || layout === "centered";

  const renderContent = () => (
    <div className={`space-y-8 ${layout === "centered" ? "text-center" : ""}`}>
      <div className="space-y-4">
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight"
          style={{ color: "var(--theme-text-primary)" }}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        {subtitle && (
          <p
            className="text-xl leading-relaxed"
            style={{ color: "var(--theme-text-secondary)" }}
          >
            {subtitle}
          </p>
        )}
        {description && (
          <p style={{ color: "var(--theme-text-secondary)" }}>{description}</p>
        )}
      </div>
      {buttons.length > 0 && (
        <div
          className={`flex gap-4 ${
            layout === "centered" ? "justify-center" : "flex-col sm:flex-row"
          }`}
        >
          {buttons.map((button, index) => (
            <Button
              key={index}
              variant={button.variant}
              theme={theme}
              onClick={button.onClick}
            >
              {button.text}
            </Button>
          ))}
        </div>
      )}
    </div>
  );

  const renderVideo = () => {
    // Check if the URL is a direct video file (mp4, webm, etc.)
    const isDirectVideoFile =
      videoEmbedUrl &&
      (videoEmbedUrl.endsWith(".mp4") || videoEmbedUrl.includes(".webm"));

    return (
      <div className="relative">
        <div
          className="aspect-video overflow-hidden shadow-2xl"
          style={{ backgroundColor: "var(--theme-bg-secondary)" }}
        >
          {videoEmbedUrl ? (
            isDirectVideoFile ? (
              <video
                className="w-full h-full object-cover"
                controls
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={videoEmbedUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <iframe
                src={videoEmbedUrl}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Product Demo"
              />
            )
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ backgroundColor: "var(--theme-bg-secondary)" }}
            >
              <div className="text-center space-y-4">
                <div
                  className="w-16 h-16 rounded-full mx-auto flex items-center justify-center"
                  style={{ backgroundColor: "var(--theme-accent)" }}
                >
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p
                  className="font-medium"
                  style={{ color: "var(--theme-text-secondary)" }}
                >
                  Demo Video
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section
      className={`py-12 md:py-16 lg:py-24 lg:pt-32 ${className} ${
        theme === "dark" ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div className="container mx-auto px-4">
        {layout === "centered" || isTextOnly ? (
          <div className="max-w-4xl mx-auto">
            {renderContent()}
            {showVideo && videoEmbedUrl && (
              <div className="mt-8 md:mt-12">{renderVideo()}</div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {layout === "text-right" ? (
              <>
                {renderVideo()}
                {renderContent()}
              </>
            ) : (
              <>
                {renderContent()}
                {renderVideo()}
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export { ReusableHero };
export type { HeroProps, HeroButton };
