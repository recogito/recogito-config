import { FlexColumn, FlexRow } from "../layouts";
import { Button, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { ConfigToolContext } from "../../providers/ConfigToolProvider";
import RoleEntry from "../RoleEntry";
import { copyObject } from "../../utilities";

const Roles = () => {
  const { addRole, configFile } = useContext(ConfigToolContext);
  const [expandedList, setExpandedList] = useState<string[]>([]);

  const handleAddRole = () => {
    addRole();
  };

  const handleExpandEntry = (id: string, expanded: boolean) => {
    const copy = copyObject(expandedList);
    if (expanded) {
      copy.push(id);
    } else {
      const idx = copy.findIndex((i) => i === id);
      if (idx > -1) {
        copy.splice(idx, 1);
      }
    }
    setExpandedList(copy);
  };

  if (configFile) {
    return (
      <FlexColumn fullWidth>
        <FlexRow padTop={20} padBottom={20} fullWidth>
          {configFile.roles.length === 0 && (
            <FlexRow halfWidth>
              <Typography variant="h6">No Roles Defined</Typography>
            </FlexRow>
          )}
          <FlexRow halfWidth right>
            <FlexRow padRight={20}>
              <Button variant="contained" onClick={handleAddRole}>
                Add Role
              </Button>
            </FlexRow>
          </FlexRow>
        </FlexRow>
        {configFile.roles.map((role) => {
          return (
            <FlexRow fullWidth padBottom={20} key={role.id}>
              <RoleEntry
                id={role.id}
                expanded={expandedList.includes(role.id)}
                expandEntry={handleExpandEntry}
              />
            </FlexRow>
          );
        })}
      </FlexColumn>
    );
  }

  return <div />;
};

export default Roles;
