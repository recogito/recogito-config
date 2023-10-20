import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AuthenticationMethod, AuthenticationType } from "../../types";
import { useEffect, useState } from "react";
import { FormControl, MenuItem, Select, InputLabel } from "@mui/material";
import { FlexColumn } from "../layouts";

export interface CreateAuthenticationMethodDialogProps {
  open: boolean;
  method: AuthenticationMethod | undefined;

  onClose(): void;

  onSave(
    _name: string,
    _type: AuthenticationType,
    _domain: string | undefined
  ): void;
}

const authTypeMap = {
  username_password: "Username And Password",
  saml: "SAML",
  oauth: "OAuth",
  magic_link: "Magic Link",
};

const renderOptions = (): any[] => {
  const arr: any[] = [];

  Object.keys(authTypeMap).forEach((key) => {
    arr.push(
      <MenuItem value={key} key={key}>
        {authTypeMap[key]}
      </MenuItem>
    );
  });

  return arr;
};

const CreateAuthenticationMethodDialog = (
  props: CreateAuthenticationMethodDialogProps
) => {
  const { open, method, onClose, onSave } = props;

  const [name, setName] = useState<string | undefined>();
  const [type, setType] = useState<AuthenticationType | undefined>();
  const [domain, setDomain] = useState<string | undefined>();

  useEffect(() => {
    if (method) {
      setName(method.name);
      setType(method.type);
      setDomain(method.domain);
    } else {
      setName(undefined);
      setType(undefined);
      setDomain(undefined);
    }
  }, [method]);

  const handleSave = () => {
    if (name && type) {
      onSave(name, type, domain);
      setName(undefined);
      setType(undefined);
      setDomain(undefined);
    }
  };

  const handleCancel = () => {
    setName(undefined);
    setType(undefined);
    setDomain(undefined);
    onClose();
  };

  const mode = method ? "Edit" : "Create";
  const valid = name && type;
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{`${mode} Auth Method`}</DialogTitle>
      <DialogContent>
        <FlexColumn width={400}>
          <FormControl fullWidth style={{ marginTop: 20 }}>
            <InputLabel id="type">Type</InputLabel>
            <Select
              id="type"
              label="Auth Type"
              fullWidth
              variant="standard"
              // @ts-ignore
              value={type || ""}
              onChange={(e) => setType(e.target.value as AuthenticationType)}
            >
              {renderOptions()}
            </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Method Name"
            type="text"
            fullWidth
            variant="standard"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
          />
          {type === "saml" && (
            <TextField
              autoFocus
              margin="dense"
              id="domain"
              label="Domain"
              type="text"
              fullWidth
              variant="standard"
              value={domain || ""}
              onChange={(e) => setDomain(e.target.value)}
            />
          )}
        </FlexColumn>
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

export default CreateAuthenticationMethodDialog;
