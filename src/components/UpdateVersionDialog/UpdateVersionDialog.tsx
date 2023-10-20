import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {useContext, useEffect, useState} from "react";
import {ConfigToolContext} from "../../providers/ConfigToolProvider";

export interface UpdateVersionDialogProps {
  open: boolean;
  onClose(): void;
  onSave(_projectName: string, _author: string, _version: string): void;
}

const UpdateVersionDialog = (props: UpdateVersionDialogProps) => {
  const { open, onClose, onSave } = props;

  const {configFile} = useContext(ConfigToolContext);


  const [projectName, setProjectName] = useState<string | undefined>();
  const [author, setAuthor] = useState<string | undefined>();
  const [version, setVersion] = useState<string | undefined>();

  useEffect(() => {
    if (open && configFile) {
      setProjectName(configFile.project_name);
      setAuthor(configFile.author);
      setVersion(configFile.version);
    }
  }, [open, configFile]);

  const handleSave = () => {
    if(configFile && author && version && projectName) {
      onSave(projectName, author, version);
      setProjectName(undefined);
      setAuthor(undefined);
      setVersion(undefined);

      onClose();
    }
  }

  const valid = !!projectName && !!author && !!version && !!version;

  return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Load Config File</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update Meta Data
          </DialogContentText>

                <TextField
                    margin="dense"
                    id="projectName"
                    label="Project Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="author"
                    label="Author"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="version"
                    label="Version"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                />
        </DialogContent>
        <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave} disabled={!valid}>
                  Save
                </Button>
        </DialogActions>
      </Dialog>
  );
};

export default UpdateVersionDialog;
