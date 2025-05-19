import { Carousel } from './ui';

const logos = [
  { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/88a86778-8d48-48a8-4404-a8dcde5c4600/public', alt: 'Redshift' },
  { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/8a216245-435b-4348-4b55-da402a698f00/public', alt: 'Snowflake' },
  { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/4dc2884d-6b94-49ab-1136-ab6fdc1d7c00/public', alt: 'Databricks' },
  { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/8a1285d4-97d4-4e98-b093-99300165cd00/public', alt: 'Power BI' },
  { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/fba5956d-3ad3-492a-8943-4fa48d463e00/public', alt: 'Tableau' },
  { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/ef3cd838-e421-4c6f-80d6-ff49d1c0ab00/public', alt: 'dbt' },
  { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/d79a1e91-1cd4-436c-db77-0d71ca6b2c00/public', alt: 'Salesforce' },
  { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/5d2c46cb-6a30-42a8-8132-0de8d3b1f600/public', alt: 'Azure' },
  { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/2e390190-cd5c-4e49-4dd4-647551ac1b00/public', alt: 'AWS' },
  { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/16d6a59b-1326-4bc5-9814-9b1ba007df00/public', alt: 'Google Cloud' },
  { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/fbf6cea7-3542-471d-6bb5-4a83ff53bc00/public', alt: 'Looker' },
  { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/71a636eb-eccd-4803-ee49-b73f5fa8d400/public', alt: 'Teams' },
  { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/d3e749b8-22b1-4e2f-a5af-f464174f7700/public', alt: 'Slack' },
  { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/ced403a9-d4a7-4605-2c2e-f074c3583500/public', alt: 'Alation' },
  { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/0915f386-644d-40ee-e1c7-ff814a3f6b00/public', alt: 'Oracle' }
];

export default function LogoCarousel() {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <p className="text-sm font-medium text-[#B8D8D0]/80 mb-4">
          {/* Ana finds insights in your existing data stack */}
        </p>
        <Carousel items={logos} />
      </div>
    </div>
  );
}
