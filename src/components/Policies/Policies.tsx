import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FlexColumn, FlexRow } from "../layouts";
import { Typography } from "@mui/material";
import {useContext} from "react";
import {ConfigToolContext} from "../../providers/ConfigToolProvider";

const columns: GridColDef[] = [
  { field: "id", headerName: "id", width: 300 },
  { field: "table_name", headerName: "Table Name", width: 150 },
  { field: "operation", headerName: "Operation", width: 150 },
];

const Policies = () => {
  const { policies, isLoading, isError } = useContext(ConfigToolContext);

  if (isLoading) {
    return <div>Loading</div>;
  } else if (isError) {
    return <div>Error</div>;
  }
  return (
      <FlexColumn fullWidth>
        <FlexRow padTop={20} padBottom={20}>
          <Typography variant="h5">Policies</Typography>
        </FlexRow>
        <DataGrid columns={columns} rows={policies as any[]} sx={{backgroundColor: 'white'}}/>
      </FlexColumn>
  );
};

export default Policies;
