import { Database } from '../database.types';
import { usePolicyQuery } from '../supabase';
import { createContext, useState } from 'react';
import {
  Branding,
  ConfigFile,
  GroupDefinition,
  RoleDefinition,
  AuthenticationMethod,
  AuthenticationType,
} from '../types';
import { copyObject } from '../utilities';

type Policy = Database['public']['Tables']['policies']['Row'];

export interface IConfigToolContext {
  policies: Policy[] | undefined;
  configFile: ConfigFile | undefined;
  fileName: string | undefined;
  isLoading: boolean;
  isError: boolean;

  setConfigFile(_configFile: ConfigFile): void;

  setFileName(_fileName: string): void;
  getRole(_id: string): RoleDefinition | undefined;
  addRole(): void;
  removeRole(_roleId: string): void;
  saveRole(_role: RoleDefinition): void;
  addGroup(
    _group: GroupDefinition,
    _groupType: 'org' | 'project' | 'layer'
  ): void;
  removeGroup(_groupId: string, _groupType: 'org' | 'project' | 'layer'): void;
  saveAdmin(_email: string, _groups: string[]): void;
  saveVersion(_projectName: string, _author: string, _version: string): void;
  saveBranding(_branding: Branding): void;
  addAuthMethod(_method: AuthenticationMethod): void;
  removeAuthMethod(_name: string, _type: AuthenticationType): void;
  onSaveConfig(): void;
}

export interface ConfigToolProviderProps {
  children: any;
}

const ConfigToolContext = createContext<IConfigToolContext>({
  policies: [],
  isError: false,
  isLoading: false,
  configFile: undefined,
  fileName: undefined,

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setConfigFile(_configFile: ConfigFile) {
    return;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setFileName(_fileName: string) {
    return;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getRole(_id: string): RoleDefinition | undefined {
    return;
  },
  addRole() {
    return;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeRole(_roleId: string) {
    return;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  saveRole(_role: RoleDefinition) {
    return;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addGroup(_group: GroupDefinition) {
    return;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeGroup(_groupId: string) {
    return;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  saveAdmin(_email: string, _groups: string[]) {
    return;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  saveVersion(_projectName: string, _author: string, _version: string) {
    return;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  saveBranding(_branding: Branding) {
    return;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addAuthMethod(_method: AuthenticationMethod) {
    return;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeAuthMethod(_name: string, _type: AuthenticationType) {
    return;
  },
  onSaveConfig() {
    return;
  },
});

const ConfigToolProvider = (props: ConfigToolProviderProps) => {
  const { children } = props;
  const [configFile, setConfigFile] = useState<ConfigFile | undefined>();
  const [fileName, setFileName] = useState<string | undefined>();

  const {
    data: policies,
    isLoading,
    isError,
  }: {
    data: Policy[] | undefined;
    isLoading: boolean;
    isError: boolean;
  } = usePolicyQuery();

  const getRole = (id: string) => {
    if (configFile) {
      return configFile.roles.find((r) => r.id === id);
    }

    return undefined;
  };

  const addRole = () => {
    if (configFile) {
      const copy = copyObject(configFile);
      copy.roles.push({
        id: crypto.randomUUID(),
        name: '',
        description: '',
        policies: [],
      });
      setConfigFile(copy);
    }
  };

  const removeRole = (roleId: string) => {
    if (configFile) {
      const copy = copyObject(configFile);
      const idx = copy.roles.findIndex((r: RoleDefinition) => r.id === roleId);
      if (idx > -1) {
        copy.role.splice(idx, 1);
        setConfigFile(copy);
      }
    }
  };

  const saveRole = (role: RoleDefinition) => {
    if (configFile) {
      const copy = copyObject(configFile);
      const idx = copy.roles.findIndex((r: RoleDefinition) => r.id === role.id);
      if (idx > -1) {
        copy.roles[idx] = role;
        setConfigFile(copy);
      }
    }
  };

  const onSaveConfig = async () => {
    if (configFile && fileName) {
      //download(configFile, fileName);
      const blob = new Blob([JSON.stringify(configFile)], {
        type: 'application/json',
      });
      const pickerOptions = {
        suggestedName: fileName,
        types: [
          {
            description: 'Recogito-Bonn Config',
            accept: {
              'application/json': ['.json'],
            },
          },
        ],
      };

      // @ts-ignore
      const fileHandle = await window.showSaveFilePicker(pickerOptions);
      const writableFileStream = await fileHandle.createWritable();
      await writableFileStream.write(blob);
      await writableFileStream.close();
      const file = await fileHandle.getFile();
      setFileName(file.name);
    }
  };

  const addGroup = (
    group: GroupDefinition,
    groupType: 'org' | 'project' | 'layer'
  ) => {
    if (configFile) {
      const copy = copyObject(configFile);
      if (group.id) {
        if (groupType === 'org') {
          const idx = copy.org_groups.findIndex(
            (g: GroupDefinition) => g.id === group.id
          );
          if (idx > -1) {
            copy.org_groups[idx] = group;
          }
        } else if (groupType === 'project') {
          const idx = copy.project_groups.findIndex(
            (g: GroupDefinition) => g.id === group.id
          );
          if (idx > -1) {
            copy.project_groups[idx] = group;
          }
        } else {
          const idx = copy.layer_groups.findIndex(
            (g: GroupDefinition) => g.id === group.id
          );
          if (idx > -1) {
            copy.layer_groups[idx] = group;
          }
        }
      } else {
        group.id = crypto.randomUUID();
        if (groupType === 'org') {
          copy.org_groups.push(group);
        } else if (groupType === 'project') {
          copy.project_groups.push(group);
        } else {
          copy.layer_groups.push(group);
        }
      }

      setConfigFile(copy);
    }
  };

  const saveAdmin = (email: string, groups: string[]) => {
    if (configFile) {
      const copy = copyObject(configFile);
      if (!copy.admin) {
        copy.admin = {
          admin_email: '',
          admin_groups: [],
        };
      }
      copy.admin.admin_email = email;
      copy.admin.admin_groups = groups;
      setConfigFile(copy);
    }
  };

  const saveBranding = (branding: Branding) => {
    if (configFile) {
      const copy: ConfigFile = copyObject(configFile);
      if (!copy.branding) {
        copy.branding = {
          platform_name: '',
          site_name: '',
          welcome_blurb: undefined,
          site_color: 'orange',
          home_banner: undefined,
          footer_message: '',
          background_color: 'black',
          contrast_color: 'white',
          top_logos_enabled: false,
          bottom_logos_enabled: false,
        };
      }
      copy.branding.platform_name = branding.platform_name;
      copy.branding.site_name = branding.site_name;
      copy.branding.welcome_blurb = branding.welcome_blurb;
      copy.branding.site_color = branding.site_color;
      copy.branding.home_banner = branding.home_banner;
      copy.branding.background_color = branding.background_color;
      copy.branding.footer_message = branding.footer_message;
      copy.branding.top_logos_enabled = branding.top_logos_enabled;
      copy.branding.bottom_logos_enabled = branding.bottom_logos_enabled;
      setConfigFile(copy);
    }
  };

  const saveVersion = (
    projectName: string,
    author: string,
    version: string
  ) => {
    if (configFile) {
      const copy = copyObject(configFile);

      copy.project_name = projectName;
      copy.author = author;
      copy.version = version;
      setConfigFile(copy);
    }
  };
  const removeGroup = (
    groupId: string,
    groupType: 'org' | 'project' | 'layer'
  ) => {
    if (configFile) {
      const copy = copyObject(configFile);
      if (groupType === 'org') {
        const idx = copy.org_groups.findIndex(
          (g: GroupDefinition) => g.id === groupId
        );
        if (idx > -1) {
          copy.org_groups.splice(idx, 1);
          setConfigFile(copy);
        }
      } else if (groupType === 'project') {
        const idx = copy.project_groups.findIndex(
          (g: GroupDefinition) => g.id === groupId
        );
        if (idx > -1) {
          copy.project_groups.splice(idx, 1);
          setConfigFile(copy);
        }
      } else {
        const idx = copy.layer_groups.findIndex(
          (g: GroupDefinition) => g.id === groupId
        );
        if (idx > -1) {
          copy.layer_groups.splice(idx, 1);
          setConfigFile(copy);
        }
      }
    }
  };

  const addAuthMethod = (method: AuthenticationMethod) => {
    if (configFile) {
      const copy = copyObject(configFile);

      if (!copy.authentication) {
        copy.authentication = {
          methods: [],
        };
      }

      copy.authentication.methods.push(method);
      setConfigFile(copy);
    }
  };

  const removeAuthMethod = (name: string, type: AuthenticationType) => {
    if (configFile) {
      const copy = copyObject(configFile);

      if (!copy.authentication) {
        return;
      }

      const idx = copy.authentication.methods.findIndex(
        (m: AuthenticationMethod) => m.name === name && m.type === type
      );
      if (idx > -1) {
        copy.authentication.methods.splice(idx, 1);
      }

      setConfigFile(copy);
    }
  };

  const handleSetConfig = (configFile: ConfigFile) => {
    if (!configFile.policies) {
      configFile.policies = copyObject(policies);
    }
    if (!configFile.roles) {
      configFile.roles = [];
    }
    if (!configFile.org_groups) {
      configFile.org_groups = [];
    }
    if (!configFile.project_groups) {
      configFile.project_groups = [];
    }
    if (!configFile.layer_groups) {
      configFile.layer_groups = [];
    }
    if (!configFile.admin) {
      configFile.admin = {
        admin_email: '',
        admin_groups: [],
      };
    }

    setConfigFile(configFile);
  };

  // noinspection TypeScriptValidateTypes
  return (
    <ConfigToolContext.Provider
      value={{
        policies,
        isError: isError as boolean,
        isLoading: isLoading as boolean,
        configFile: configFile as ConfigFile,
        fileName: fileName as string,

        setFileName: (fileName: string) => setFileName(fileName),
        setConfigFile: handleSetConfig,
        getRole,
        addRole,
        removeRole,
        saveRole,
        onSaveConfig,
        addGroup,
        removeGroup,
        saveAdmin,
        saveVersion,
        saveBranding,
        addAuthMethod,
        removeAuthMethod,
      }}
    >
      {children}
    </ConfigToolContext.Provider>
  );
};

export { ConfigToolContext, ConfigToolProvider };
