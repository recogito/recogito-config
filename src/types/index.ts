import { Database } from '../database.types';

export type PolicyDefinition = {
  id: string;
  table_name: string;
  operation: string;
};

export type RoleDefinition = {
  id: string;
  name: string;
  description: string;
  policies: string[];
};

export type GroupDefinition = {
  id: string | undefined;
  name: string;
  description: string;
  role_id: string;
  is_admin: boolean;
  is_default: boolean;
};

export type Branding = {
  platform_name: string | undefined;
  site_name: string;
  welcome_blurb: string | undefined;
  site_color: string;
  home_banner: string | undefined;
  background_color: string;
  contrast_color: string;
  bottom_logos_enabled: boolean;
  footer_message: string | undefined;
  top_logos_enabled: boolean;
};

export type Policy = Database['public']['Tables']['policies']['Row'];

export type AuthenticationType =
  | 'username_password'
  | 'saml'
  | 'oauth'
  | 'magic_link'
  | 'keycloak';

export type AuthenticationMethod = {
  name: string;
  type: AuthenticationType;
  domain: string | undefined;
};

export type Translation = {
  language: string;
  text: string;
};

export type Translations = Translation[];

export type DynamicText = {
  public_document_warning: Translations;
};

export type ConfigFile = {
  project_name: string;
  author: string;
  version: string;
  created_at: string;
  updated_at: string | undefined;
  supported_languages: string[];
  default_language: string;
  policies: PolicyDefinition[];
  roles: RoleDefinition[];
  org_groups: GroupDefinition[];
  project_groups: GroupDefinition[];
  layer_groups: GroupDefinition[];
  branding: Branding;
  dynamic_text: DynamicText;

  admin: {
    admin_email: string;
    admin_groups: string[];
  };

  authentication: {
    methods: AuthenticationMethod[];
  };
};
