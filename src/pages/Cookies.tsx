import { Helmet } from 'react-helmet-async';
import { CookiesPolicy } from '../components/page-sections/legal/CookiesPolicy';

export default function Cookies() {
  return (
    <>
      <Helmet>
        <title>Cookie Policy | TextQL</title>
        <meta name="description" content="Learn about how TextQL uses cookies to improve your experience on our website." />
        <link rel="canonical" href="https://textql.com/cookies" />
      </Helmet>
      <CookiesPolicy />
    </>
  );
}