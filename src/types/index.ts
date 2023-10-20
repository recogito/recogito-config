import { Database } from "../database.types";

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
};

export type Policy = Database["public"]["Tables"]["policies"]["Row"];

export type AuthenticationType =
  | "username_password"
  | "saml"
  | "oauth"
  | "magic_link";

export type AuthenticationMethod = {
  name: string;
  type: AuthenticationType;
  domain: string | undefined;
};

export type ConfigFile = {
  project_name: string;
  author: string;
  version: string;
  created_at: string;
  updated_at: string | undefined;
  policies: PolicyDefinition[];
  roles: RoleDefinition[];
  org_groups: GroupDefinition[];
  project_groups: GroupDefinition[];
  layer_groups: GroupDefinition[];
  branding: Branding;

  admin: {
    admin_email: string;
    admin_groups: string[];
  };

  authentication: {
    methods: AuthenticationMethod[];
  };
};
