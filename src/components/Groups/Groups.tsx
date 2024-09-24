import { FlexColumn, FlexRow } from '../layouts';
import { useContext, useState } from 'react';
import { ConfigToolContext } from '../../providers/ConfigToolProvider';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Divider,
  Typography,
} from '@mui/material';
import CreateGroupDialog from '../CreateGroupDialog';
import { GroupDefinition } from '../../types';

const Groups = () => {
  const { configFile, addGroup, removeGroup } = useContext(ConfigToolContext);

  const [createOpen, setCreateOpen] = useState(false);
  const [group, setGroup] = useState<GroupDefinition | undefined>();
  const [groupType, setGroupType] = useState<
    'org' | 'project' | 'layer' | undefined
  >();

  const handleEditGroup = (
    group: GroupDefinition,
    type: 'org' | 'project' | 'layer'
  ) => {
    setGroup(group);
    setGroupType(type);
    setCreateOpen(true);
  };

  const handleSaveGroup = (
    name: string,
    description: string,
    roleId: string,
    isAdmin: boolean,
    isDefault: boolean,
    isReadOnly: boolean
  ) => {
    if (groupType) {
      const grp: GroupDefinition = {
        id: group ? group.id : undefined,
        name: name,
        description: description,
        role_id: roleId,
        is_admin: isAdmin,
        is_default: isDefault,
        is_read_only: isReadOnly,
      };

      addGroup(grp, groupType);
      setCreateOpen(false);
    }
  };

  const handleRemoveGroup = (
    group: GroupDefinition,
    groupType: 'org' | 'project' | 'layer'
  ) => {
    removeGroup(group.id as string, groupType);
  };

  const handleCreateGroup = (groupType: 'org' | 'project' | 'layer') => {
    setGroup(undefined);
    setGroupType(groupType);
    setCreateOpen(true);
  };

  if (configFile) {
    return (
      <FlexColumn fullWidth padTop={32}>
        <Typography variant='h4'>Organization Groups</Typography>
        <FlexRow fullWidth wrap padTop={10}>
          {configFile.org_groups.map((group) => {
            const role = configFile?.roles
              ? configFile?.roles?.find((r) => r.id === group.role_id)
              : undefined;
            let roleName = '';
            if (role) {
              roleName = role.name;
            }
            return (
              <Card
                sx={{ width: 300, marginRight: 10 }}
                variant='outlined'
                key={group.id}
              >
                <CardContent>
                  <Typography variant='h6'>{group.name}</Typography>
                  <Typography variant='body1'>{group.description}</Typography>
                  <Typography variant='h6'>{`Role: ${roleName}`}</Typography>
                  <FlexRow alignLeftCenter>
                    <Checkbox checked={group.is_admin || false} disabled />
                    <Typography variant='body2'>Is Admin Group</Typography>
                  </FlexRow>
                  <FlexRow alignLeftCenter>
                    <Checkbox checked={group.is_default || false} disabled />
                    <Typography variant='body2'>
                      Is Default User Group
                    </Typography>
                  </FlexRow>
                  <FlexRow alignLeftCenter>
                    <Checkbox checked={group.is_read_only || false} disabled />
                    <Typography variant='body2'>
                      Is Read Only User Group
                    </Typography>
                  </FlexRow>
                </CardContent>
                <CardActions>
                  <Button
                    size='small'
                    onClick={() => handleEditGroup(group, 'org')}
                  >
                    Edit Group
                  </Button>
                  <Button
                    size='small'
                    onClick={() => handleRemoveGroup(group, 'org')}
                  >
                    Remove Group
                  </Button>
                </CardActions>
              </Card>
            );
          })}
        </FlexRow>
        <FlexRow padTop={20} padBottom={20}>
          <Button variant='contained' onClick={() => handleCreateGroup('org')}>
            Create Organization Group
          </Button>
        </FlexRow>
        <div style={{ width: '100%', marginBottom: 10 }}>
          <Divider variant='fullWidth' />
        </div>
        <Typography variant='h4'>Project Groups</Typography>
        <FlexRow fullWidth wrap padTop={10}>
          {configFile.project_groups.map((group) => {
            const role = configFile?.roles
              ? configFile?.roles?.find((r) => r.id === group.role_id)
              : undefined;
            let roleName = '';
            if (role) {
              roleName = role.name;
            }
            return (
              <Card
                sx={{ width: 300, marginRight: 10 }}
                variant='outlined'
                key={group.id}
              >
                <CardContent>
                  <Typography variant='h6'>{group.name}</Typography>
                  <Typography variant='body1'>{group.description}</Typography>
                  <Typography variant='h6'>{`Role: ${roleName}`}</Typography>
                  <FlexRow alignLeftCenter>
                    <Checkbox checked={group.is_admin || false} disabled />
                    <Typography variant='body2'>Is Admin Group</Typography>
                  </FlexRow>
                  <FlexRow alignLeftCenter>
                    <Checkbox checked={group.is_default || false} disabled />
                    <Typography variant='body2'>
                      Is Default User Group
                    </Typography>
                  </FlexRow>
                  <FlexRow alignLeftCenter>
                    <Checkbox checked={group.is_read_only || false} disabled />
                    <Typography variant='body2'>
                      Is Read Only User Group
                    </Typography>
                  </FlexRow>
                </CardContent>
                <CardActions>
                  <Button
                    size='small'
                    onClick={() => handleEditGroup(group, 'project')}
                  >
                    Edit Group
                  </Button>
                  <Button
                    size='small'
                    onClick={() => handleRemoveGroup(group, 'project')}
                  >
                    Remove Group
                  </Button>
                </CardActions>
              </Card>
            );
          })}
        </FlexRow>
        <FlexRow padTop={20} padBottom={20}>
          <Button
            variant='contained'
            onClick={() => handleCreateGroup('project')}
          >
            Create Project Group
          </Button>
        </FlexRow>
        <div style={{ width: '100%', marginBottom: 10 }}>
          <Divider variant='fullWidth' />
        </div>
        <Typography variant='h4'>Layer Groups</Typography>
        <FlexRow fullWidth wrap padTop={10}>
          {configFile.layer_groups.map((group) => {
            const role = configFile?.roles
              ? configFile?.roles?.find((r) => r.id === group.role_id)
              : undefined;
            let roleName = '';
            if (role) {
              roleName = role.name;
            }
            return (
              <Card
                sx={{ width: 300, marginRight: 10 }}
                variant='outlined'
                key={group.id}
              >
                <CardContent>
                  <Typography variant='h6'>{group.name}</Typography>
                  <Typography variant='body1'>{group.description}</Typography>
                  <Typography variant='h6'>{`Role: ${roleName}`}</Typography>
                  <FlexRow alignLeftCenter>
                    <Checkbox checked={group.is_admin || false} disabled />
                    <Typography variant='body2'>Is Admin Group</Typography>
                  </FlexRow>
                  <FlexRow alignLeftCenter>
                    <Checkbox checked={group.is_default || false} disabled />
                    <Typography variant='body2'>
                      Is Default User Group
                    </Typography>
                  </FlexRow>
                  <FlexRow alignLeftCenter>
                    <Checkbox checked={group.is_read_only || false} disabled />
                    <Typography variant='body2'>
                      Is Read Only User Group
                    </Typography>
                  </FlexRow>
                </CardContent>
                <CardActions>
                  <Button
                    size='small'
                    onClick={() => handleEditGroup(group, 'layer')}
                  >
                    Edit Group
                  </Button>
                  <Button
                    size='small'
                    onClick={() => handleRemoveGroup(group, 'layer')}
                  >
                    Remove Group
                  </Button>
                </CardActions>
              </Card>
            );
          })}
        </FlexRow>
        <FlexRow padTop={20} padBottom={20}>
          <Button
            variant='contained'
            onClick={() => handleCreateGroup('layer')}
          >
            Create Layer Group
          </Button>
        </FlexRow>
        <CreateGroupDialog
          open={createOpen}
          group={group}
          roles={configFile.roles}
          onClose={() => setCreateOpen(false)}
          onSave={handleSaveGroup}
        />
      </FlexColumn>
    );
  } else {
    return <div />;
  }
};

export default Groups;
