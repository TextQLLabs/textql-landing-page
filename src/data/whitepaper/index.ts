export interface WhitepaperMetadata {
  title: string;
  description: string;
  pdfUrl: string;
  lastUpdated: string;
}

export const whitepaperMetadata: WhitepaperMetadata = {
  title: "TextQL: The Definitive Architecture for Novel Insights Discovery",
  description: "Our technical overview of TextQL's three-layer architecture and enterprise applications.",
  pdfUrl: "/pdf/ana-whitepaper-3-21.pdf",
  lastUpdated: "March, 2024"
};

export function getWhitepaperContent(): string {
  return import.meta.glob('./content.md', { query: '?raw', import: 'default', eager: true })['./content.md'] as string;
} 