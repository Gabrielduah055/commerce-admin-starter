// Public, compiled configuration. Rebuild after editing. No credentials belong here.
export interface AdminConfig {
  readonly businessName: string;
  readonly initials: string;
  readonly workspaceLabel: string;
  readonly loginHeading: string;
  readonly loginDescription: string;
}

export const ADMIN_CONFIG: AdminConfig = {
  businessName: 'Your Store',
  initials: 'YS',
  workspaceLabel: 'Owner workspace',
  loginHeading: 'Keep every product ready for your customers.',
  loginDescription: 'Manage products, categories, inventory, orders, customers, and reviews from one workspace.',
};
