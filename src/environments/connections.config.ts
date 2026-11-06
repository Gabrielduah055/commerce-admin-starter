// Public origins only. Never include credentials or /api/v1 in an origin.
// Local /api requests are forwarded by proxy.conf.json to the development backend.
export const CONNECTIONS = {
  productionApiOrigin: 'https://api.example.invalid',
  developmentStorefrontOrigin: 'http://localhost:4200',
  // Blank hides the optional public product preview link until configured.
  productionStorefrontOrigin: '',
} as const;
