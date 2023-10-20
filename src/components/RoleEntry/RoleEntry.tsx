import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useContext, useEffect, useState } from "react";
import { ConfigToolContext } from "../../providers/ConfigToolProvider";
import TextField from "@mui/material/TextField";
import { DataGrid } from "@mui/x-data-grid";
import { ConfigFile, RoleDefinition } from "../../types";
import { FlexColumn, FlexRow } from "../layouts";
import Button from "@mui/material/Button";
import { Checkbox } from "@mui/material";
import { copyObject } from "../../utilities";
// @ts-ignore
import equals from "deep-equal";

type PolicyRowEntry = {
  id: string;
  enabled: boolean;
};
type PolicyRow = {
  id: number;
  table: string;
  SELECT: PolicyRowEntry;
  INSERT: PolicyRowEntry;
  UPDATE: PolicyRowEntry;
  DELETE: PolicyRowEntry;
};

export type RoleEntryProps = {
  id: string;
  expanded: boolean;
  expandEntry(_entryId: string, _expanded: boolean): void;
};

const getPolicyRows = (role: RoleDefinition, configFile: ConfigFile) => {
  if (role && configFile) {
    const map = {};
    let i = 1;
    configFile.policies.forEach((policy) => {
      if (!map[policy.table_name]) {
        map[policy.table_name] = {
          id: i++,
          table: policy.table_name,
          SELECT: { id: "", enabled: false },
          INSERT: { id: "", enabled: false },
          UPDATE: { id: "", enabled: false },
          DELETE: { id: "", enabled: false },
        };
      }
      map[policy.table_name][policy.operation].id = policy.id;
      map[policy.table_name][policy.operation].enabled = role.policies.includes(
        policy.id
      );
    });

    const ret: PolicyRow[] = [];
    for (const value: PolicyRow of Object.values(map)) {
      ret.push(value);
    }

    return ret;
  }

  return [];
};

const RoleEntry = (props: RoleEntryProps) => {
  const { id, expanded, expandEntry } = props;
  const { getRole, removeRole, saveRole, configFile } =
    useContext(ConfigToolContext);

  const [role, setRole] = useState<RoleDefinition | undefined>();
  const [rows, setRows] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [saveEnabled, setSaveEnabled] = useState(false);

  const addRolePolicy = (policyId: string) => {
    if (role && configFile) {
      const copy: RoleDefinition = copyObject(role);
      copy.policies.push(policyId);
      setRole(copy);
      setRows(getPolicyRows(copy, configFile));
    }
  };

  const removeRolePolicy = (policyId: string) => {
    if (role && configFile) {
      const copy: RoleDefinition = copyObject(role);
      const idx = role.policies.findIndex((p) => p === policyId);
      if (idx > -1) {
        copy.policies.splice(idx, 1);
      }
      setRole(copy);
      setRows(getPolicyRows(copy, configFile));
    }
  };

  useEffect(() => {
    const role = getRole(id);
    if (role && configFile) {
      setRole(role as RoleDefinition);
      setRows(getPolicyRows(role, configFile));
      setName(role.name);
      setDescription(role.description);
    }
  }, [configFile, id, getRole]);

  useEffect(() => {
    const currentRole = getRole(id);
    let save = false;
    if(!equals(currentRole, role)) {
      save = true;
    }
    if(name.length > 0 && name !== currentRole?.name) {
      save = true;
    }
    if(description.length > 0 && description !== currentRole?.description) {
      save = true;
    }
    setSaveEnabled(save);
  }, [role, name, description, getRole, id]);

  const renderOperationCell = (params: any) => {
    return (
      <Checkbox
        checked={params.value.enabled}
        onChange={(e) => {
          if (e.target.checked) {
            addRolePolicy(params.value.id);
          } else {
            removeRolePolicy(params.value.id);
          }
        }}
      />
    );
  };

  const columns = [
    { field: "table", headerName: "Table", width: 300 },
    {
      field: "SELECT",
      headerName: "SELECT",
      width: 150,
      renderCell: renderOperationCell,
    },
    {
      field: "INSERT",
      headerName: "INSERT",
      width: 150,
      renderCell: renderOperationCell,
    },
    {
      field: "UPDATE",
      headerName: "UPDATE",
      width: 150,
      renderCell: renderOperationCell,
    },
    {
      field: "DELETE",
      headerName: "DELETE",
      width: 150,
      renderCell: renderOperationCell,
    },
  ];

  const handleRemoveRole = () => {
    removeRole(id);
  };

  const handleCancel = () => {
    if(configFile) {
      const r = getRole(id);
      if(r) {
        setRole(r);
        setName(r.name);
        setDescription(r.description);
        setSaveEnabled(false);
        setRows(getPolicyRows(r, configFile));
      }
    }
  };

  const handleSave = () => {
    if (role) {
      role.name = name;
      role.description = description;
      saveRole(role);
    }
  };

  if (role) {
    return (
      <Accordion
        expanded={expanded}
        onChange={(e: any, isExpanded: boolean) => expandEntry(id, isExpanded)}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <FlexRow fullWidth alignLeftCenter spaceBetween padRight={20}>
            <Typography variant="h5">
              {`Name: ${role.name.length > 0 ? role.name : "Unnamed Role"}`}
            </Typography>
            <Typography variant="h6">
              {`Description: ${role.description}`}
            </Typography>
          </FlexRow>
        </AccordionSummary>
        <AccordionDetails>
          <FlexColumn fullWidth>
            <FlexRow fullWidth spaceBetween padBottom={20}>
              <FlexRow width={200}>
                <TextField
                  value={name}
                  label="Name"
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  fullWidth
                />
              </FlexRow>
              <FlexRow width={400} padRight={10}>
                <TextField
                  value={description}
                  label="Description"
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  fullWidth
                />
              </FlexRow>
            </FlexRow>
            <FlexRow fullWidth spaceBetween padTop={20} padBottom={20}>
              <Button variant="contained" onClick={handleRemoveRole}>
                Remove Role
              </Button>
              {saveEnabled && (
                <FlexRow fifthWidth spaceBetween right>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button variant="contained" onClick={handleSave}>
                    Save
                  </Button>
                </FlexRow>
              )}
            </FlexRow>
          </FlexColumn>
          <Typography variant="h6">Policies:</Typography>
          <DataGrid columns={columns} rows={rows} />
        </AccordionDetails>
      </Accordion>
    );
  } else {
    return <div />;
  }
};

export default RoleEntry;
