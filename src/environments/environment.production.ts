import { apiEndpoints, externalEndpoints, storefrontRoutes } from './environment.config';
import { CONNECTIONS } from './connections.config';

const origin = CONNECTIONS.productionApiOrigin.replace(/\/$/, '');

export const environment = {
  production: true,
  apiBaseUrl: `${origin}/api/v1`,
  storefrontBaseUrl: CONNECTIONS.productionStorefrontOrigin.replace(/\/$/, ''),
  apiEndpoints,
  externalEndpoints,
  storefrontRoutes,
} as const;
