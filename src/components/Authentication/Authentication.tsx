import { FlexColumn, FlexRow } from "../layouts";
import { useContext, useState } from "react";
import { ConfigToolContext } from "../../providers/ConfigToolProvider";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { AuthenticationMethod, AuthenticationType } from "../../types";
import CreateAuthenticationMethodDialog from "../CreateAuthenticationMethodDialog/CreateAuthenticationMethodDialog";

const authTypeMap = {
  username_password: "Username And Password",
  saml: "SAML",
  oauth: "OAuth",
  magic_link: "Magic Link",
};

export const Authentication = () => {
  const { configFile, addAuthMethod, removeAuthMethod } =
    useContext(ConfigToolContext);

  const [createOpen, setCreateOpen] = useState(false);
  const [method, setMethod] = useState<AuthenticationMethod | undefined>();

  const handleEditMethod = (method: AuthenticationMethod) => {
    setMethod(method);
    setCreateOpen(true);
  };

  const handleSaveMethod = (
    name: string,
    type: AuthenticationType,
    domain: string | undefined
  ) => {
    if (type) {
      const method: AuthenticationMethod = {
        name: name,
        type: type,
        domain: domain,
      };

      addAuthMethod(method);
      setCreateOpen(false);
    }
  };

  const handleRemoveMethod = (name: string, type: AuthenticationType) => {
    removeAuthMethod(name, type);
  };

  const handleCreateMethod = () => {
    setMethod(undefined);
    setCreateOpen(true);
  };

  if (configFile) {
    return (
      <FlexColumn fullWidth padTop={32}>
        <Typography variant="h4">Organization Authentication</Typography>
        <FlexRow fullWidth wrap padTop={10}>
          {configFile.authentication &&
            configFile.authentication.methods.map((method) => {
              return (
                <Card
                  sx={{ width: 300, marginRight: 10 }}
                  variant="outlined"
                  key={method.name}
                >
                  <CardContent>
                    <Typography variant="h6">{method.name}</Typography>
                    <Typography variant="body1">
                      {`Type: ${authTypeMap[method.type]}`}
                    </Typography>
                    {method.type === "saml" && (
                      <Typography variant="body1">{`Domain: ${method.domain}`}</Typography>
                    )}
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleEditMethod(method)}
                    >
                      Edit Auth Method
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() =>
                        handleRemoveMethod(method.name, method.type)
                      }
                    >
                      Remove Auth Method
                    </Button>
                  </CardActions>
                </Card>
              );
            })}
        </FlexRow>
        <FlexRow padTop={20} padBottom={20}>
          <Button variant="contained" onClick={() => handleCreateMethod()}>
            Create Auth Method
          </Button>
        </FlexRow>
        <CreateAuthenticationMethodDialog
          open={createOpen}
          method={method}
          onClose={() => setCreateOpen(false)}
          onSave={handleSaveMethod}
        />
      </FlexColumn>
    );
  } else {
    return <div />;
  }
};
