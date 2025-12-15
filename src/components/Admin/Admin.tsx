import { FlexColumn, FlexRow } from '../layouts';
import { useContext, useEffect, useState } from 'react';
import { ConfigToolContext } from '../../providers/ConfigToolProvider';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Chip,
  Input,
  Button,
  Typography,
} from '@mui/material';

const Admin = () => {
  const { configFile, saveAdmin } = useContext(ConfigToolContext);

  const [email, setEmail] = useState<string | undefined>();
  const [groups, setGroups] = useState<string[]>([]);

  useEffect(() => {
    if (configFile) {
      setEmail(configFile.admin ? configFile.admin.admin_email : undefined);
      setGroups(configFile.admin ? configFile.admin.admin_groups : []);
    }
  }, [configFile]);

  const handleChange = (event) => {
    if (configFile) {
      const value = event.target.value;
      setGroups(value);
    }
  };

  const handleCancel = () => {
    if (configFile) {
      setEmail(configFile.admin ? configFile.admin.admin_email : undefined);
      setGroups(configFile.admin ? configFile.admin.admin_groups : []);
    }
  };

  const handleSave = () => {
    if (email && email.length > 0 && groups.length > 0) {
      saveAdmin(email, groups);
    }
  };

  const saveEnabled = email && email.length > 0 && groups.length > 0;
  return (
    <FlexColumn width={300}>
      <FlexRow padTop={20} padBottom={20}>
        <Typography variant='h5' color='black'>
          Administration
        </Typography>
      </FlexRow>
      <TextField
        autoFocus
        margin='dense'
        id='email'
        label='Admin Email'
        type='text'
        fullWidth
        variant='standard'
        value={email || ''}
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormControl fullWidth sx={{ marginTop: 2 }}>
        <InputLabel id='demo-multiple-chip-label'>Admin Groups</InputLabel>
        <Select
          labelId='multiple-chip-label'
          id='multiple-chip'
          multiple
          value={groups}
          onChange={handleChange}
          input={<Input id='select-multiple-chip' />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => {
                const label = configFile?.org_groups?.find(
                  (g) => g.id === value
                )?.name;

                return <Chip key={value} label={label} />;
              })}
            </Box>
          )}
        >
          {configFile?.org_groups.map((group) => (
            <MenuItem key={group.id} value={group.id}>
              {group.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FlexRow fullWidth spaceBetween padTop={32}>
        <Button variant='contained' color='secondary' onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          variant='contained'
          onClick={handleSave}
          disabled={!saveEnabled}
        >
          Save
        </Button>
      </FlexRow>
    </FlexColumn>
  );
};

export default Admin;
