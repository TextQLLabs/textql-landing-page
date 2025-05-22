import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import TableauMcpIntegration from './TableauMcpIntegration';
import SnowflakeMcpIntegration from './SnowflakeMcpIntegration';

// This component will handle routing to specific integration pages
// In the future, you can add more integration components here
export default function IntegrationsRoutes() {
  return (
    <Routes>
      <Route path="/tableau-mcp" element={<TableauMcpIntegration />} />
      <Route path="/snowflake-mcp" element={<SnowflakeMcpIntegration />} />
      {/* Add more integration routes here as needed */}
      {/* <Route path="/adp-workforce-now" element={<AdpWorkforceNowIntegration />} /> */}
      {/* <Route path="/salesforce" element={<SalesforceIntegration />} /> */}
      {/* <Route path="/hubspot" element={<HubspotIntegration />} /> */}
    </Routes>
  );
}