import { apiEndpoints, externalEndpoints, storefrontRoutes } from './environment.config';
import { CONNECTIONS } from './connections.config';

export const environment = {
  production: false,
  apiBaseUrl: '/api/v1',
  storefrontBaseUrl: CONNECTIONS.developmentStorefrontOrigin.replace(/\/$/, ''),
  apiEndpoints,
  externalEndpoints,
  storefrontRoutes,
} as const;
