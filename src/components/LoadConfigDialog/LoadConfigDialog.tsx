import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ConfigFile, PolicyDefinition } from '../../types';
import { useEffect, useState } from 'react';
import { copyObject } from '../../utilities';
import { MuiFileInput } from 'mui-file-input';

export interface LoadConfigDialogProps {
  open: boolean;
  policies: PolicyDefinition[];

  onClose(): void;

  onLoad(_fileName: string, _config: ConfigFile): void;
}

const LoadConfigDialog = (props: LoadConfigDialogProps) => {
  const { open, policies, onClose, onLoad } = props;

  const [file, setFile] = useState<File | undefined>();
  const [configFile, setConfigFile] = useState<ConfigFile | undefined>();
  const [loading, setLoading] = useState(true);
  const [projectName, setProjectName] = useState<string | undefined>();
  const [author, setAuthor] = useState<string | undefined>();
  const [version, setVersion] = useState<string | undefined>();
  const [fileName, setFileName] = useState<string | undefined>();

  useEffect(() => {
    if (open) {
      setConfigFile(undefined);
      setLoading(true);
      setProjectName(undefined);
      setAuthor(undefined);
      setVersion(undefined);
      setFileName(undefined);
    }
  }, [open]);
  const handleChooseFile = (newFile) => {
    const data = new FileReader();
    setFile(newFile);
    data.addEventListener('load', () => {
      if (newFile) {
        setConfigFile(JSON.parse(data.result as string) as ConfigFile);
        setFileName(newFile.name);
      }
    });

    data.readAsText(newFile as File);
  };

  const handleSetConfig = () => {
    if (configFile && fileName) {
      onLoad(fileName, configFile);
      setConfigFile(undefined);
      setLoading(true);
      setProjectName(undefined);
      setAuthor(undefined);
      setVersion(undefined);
      setFileName(undefined);

      onClose();
    }
  };

  const valid = !!projectName && !!author && !!version && !!version;

  const handleCreateNew = () => {
    setLoading(false);
    // noinspection TypeScriptValidateTypes
    setConfigFile({
      project_name: '',
      author: '',
      version: '',
      created_at: Date.now().toString(),
      updated_at: undefined,
      policies: copyObject(policies),
      roles: [],
      org_groups: [],
      project_groups: [],
      layer_groups: [],
      admin: {
        admin_email: '',
        admin_groups: [],
      },
      branding: {
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
        favicon: 'favicon.svg',
      },
      authentication: {
        methods: [],
      },
      supported_languages: ['en', 'de'],
      default_language: 'en',
      dynamic_text: {
        public_document_warning: [
          {
            language: 'en',
            text: '',
          },
          {
            language: 'de',
            text: '',
          },
        ],
      },
    });
  };

  const handleSave = () => {
    if (author && projectName && version && fileName) {
      const copy: ConfigFile = copyObject(configFile);
      copy.author = author;
      copy.project_name = projectName;
      copy.version = version;

      onLoad(fileName, copy);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Load Config File</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Choose a Config file to Load or Create New Config.
        </DialogContentText>
        {loading ? (
          <MuiFileInput
            placeholder='Load a Config File'
            value={file}
            onChange={handleChooseFile}
          />
        ) : (
          <>
            <TextField
              autoFocus
              margin='dense'
              id='fileName'
              label='Name for Config file'
              type='text'
              fullWidth
              variant='standard'
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
            <TextField
              margin='dense'
              id='projectName'
              label='Project Name'
              type='text'
              fullWidth
              variant='standard'
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <TextField
              margin='dense'
              id='author'
              label='Author'
              type='text'
              fullWidth
              variant='standard'
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <TextField
              margin='dense'
              id='version'
              label='Version'
              type='text'
              fullWidth
              variant='standard'
              value={version}
              onChange={(e) => setVersion(e.target.value)}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        {loading ? (
          <>
            <Button onClick={onClose}>Cancel</Button>
            {file ? (
              <Button onClick={handleSetConfig}>Set Config</Button>
            ) : (
              <Button onClick={handleCreateNew}>Create New Config</Button>
            )}
          </>
        ) : (
          <>
            <Button onClick={() => setLoading(true)}>Cancel</Button>
            <Button onClick={handleSave} disabled={!valid}>
              Save
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default LoadConfigDialog;
