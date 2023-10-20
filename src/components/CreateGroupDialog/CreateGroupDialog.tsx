import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { GroupDefinition, RoleDefinition } from "../../types";
import { useEffect, useState } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from "@mui/material";

export interface CreateGroupDialogProps {
  open: boolean;
  group: GroupDefinition | undefined;
  roles: RoleDefinition[];

  onClose(): void;

  onSave(_name: string, _description: string, _roleId: string, _isAdmin: boolean, _isDefault: boolean): void;
}

const CreateGroupDialog = (props: CreateGroupDialogProps) => {
  const { open, group, roles, onClose, onSave } = props;

  const [name, setName] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [roleId, setRoleId] = useState<string | undefined>();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDefault, setIsDefault] = useState(false);

  useEffect(() => {
    if (group) {
      setName(group.name);
      setDescription(group.description);
      setRoleId(group.role_id);
      setIsAdmin(group.is_admin);
      setIsDefault(group.is_default);
    } else {
      setName(undefined);
      setDescription(undefined);
      setRoleId(undefined);
      setIsAdmin(false);
      setIsDefault(false);
    }
  }, [group]);

  const handleSave = () => {
    if (name && description && roleId) {
      onSave(name, description, roleId, isAdmin, isDefault);
      setName(undefined);
      setDescription(undefined);
      setRoleId(undefined);
      setIsAdmin(false);
      setIsDefault(false);
    }
  };

  const handleCancel = () => {
    setName(undefined);
    setDescription(undefined);
    setRoleId(undefined);
    onClose();
  };

  const handleChangeAdmin = (checked: boolean) => {
    if(checked) {
      setIsAdmin(true);
      setIsDefault(false);
    } else {
      setIsAdmin(false);
    }
  }

  const handleChangeDefault = (checked: boolean) => {
    if(checked) {
      setIsDefault(true);
      setIsAdmin(false);
    } else {
      setIsDefault(false);
    }
  }

  const mode = group ? "Edit" : "Create";
  const valid = name && description && roleId;
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{`${mode} Group`}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Group Name"
          type="text"
          fullWidth
          variant="standard"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          id="description"
          label="Group Description"
          type="text"
          fullWidth
          variant="standard"
          value={description || ""}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel id="roleId">Role</InputLabel>
          <Select
            id="roleId"
            label="Role"
            fullWidth
            variant="standard"
            // @ts-ignore
            value={roleId || ""}
            onChange={(e) => setRoleId(e.target.value)}
          >
            {roles.map((role) => {
              return (
                <MenuItem value={role.id} key={role.id}>
                  {role.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={isAdmin}
                onChange={(e) => handleChangeAdmin(e.target.checked)}
              />
            }
            label="Is Admin Group"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isDefault}
                onChange={(e) => handleChangeDefault(e.target.checked)}
              />
            }
            label="Is Default User Group"
          />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSave} disabled={!valid}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateGroupDialog;
