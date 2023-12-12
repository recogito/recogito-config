import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { FlexColumn, FlexRow } from '../layouts';
import { Tab, Tabs, Box } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import Policies from '../Policies/Policies';
import Roles from '../Roles';
import Groups from '../Groups';
import LoadConfigDialog from '../LoadConfigDialog';
import { ConfigFile } from '../../types';
import { ConfigToolContext } from '../../providers/ConfigToolProvider';
import { copyObject } from '../../utilities';
import Admin from '../Admin';
import Branding from '../Branding';
import DynamicText from '../DynamicText';
import { Authentication } from '../Authentication';
import UpdateVersionDialog from '../UpdateVersionDialog/UpdateVersionDialog';

const Main = () => {
  const {
    setConfigFile,
    setFileName,
    onSaveConfig,
    saveVersion,
    fileName,
    policies,
    configFile,
  } = useContext(ConfigToolContext);
  const [tab, setTab] = useState('policies');
  const [loadOpen, setLoadOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [save, setSave] = useState(false);

  useEffect(() => {
    if (save) {
      onSaveConfig();
      setSave(false);
    }
  }, [save, onSaveConfig]);
  const handleLoadConfig = () => {
    setLoadOpen(true);
  };

  const handleSaveConfig = async () => {
    setUpdateOpen(true);
  };

  const handleUpdateAndSave = (
    projectName: string,
    author: string,
    version: string
  ) => {
    saveVersion(projectName, author, version);
    setUpdateOpen(false);
    setSave(true);
  };

  const handleConfigChosen = (fileName: string, configFile: ConfigFile) => {
    configFile.policies = copyObject(policies);
    setConfigFile(configFile);
    setFileName(fileName);
    setLoadOpen(false);
  };

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Annotation Engine Configuration Tool
          </Typography>
          <FlexRow padRight={20}>
            {`Config File: ${fileName || 'No File Chosen'}`}
          </FlexRow>
          {!configFile ? (
            <Button
              onClick={handleLoadConfig}
              color='inherit'
              variant='outlined'
            >
              Load Config
            </Button>
          ) : (
            <Button
              onClick={handleSaveConfig}
              color='inherit'
              variant='outlined'
            >
              Save Config
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <FlexColumn padTop={10} padLeft={32}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs onChange={(_e, value) => setTab(value)} value={tab}>
            <Tab label='Policies' value='policies' />
            <Tab label='Roles' value='roles' disabled={!configFile} />
            <Tab label='Default Groups' value='groups' disabled={!configFile} />
            <Tab label='Admin' value='admin' disabled={!configFile} />
            <Tab label='Branding' value='branding' disabled={!configFile} />
            <Tab
              label='Dynamic Text'
              value='dynamic_text'
              disabled={!configFile}
            />
            <Tab
              label='Authentication'
              value='authentication'
              disabled={!configFile}
            />
          </Tabs>
        </Box>
        {tab === 'policies' && <Policies />}
        {tab === 'roles' && <Roles />}
        {tab === 'groups' && <Groups />}
        {tab === 'admin' && <Admin />}
        {tab === 'branding' && <Branding />}
        {tab === 'authentication' && <Authentication />}
        {tab === 'dynamic_text' && <DynamicText />}
      </FlexColumn>
      <LoadConfigDialog
        open={loadOpen}
        onClose={() => setLoadOpen(false)}
        onLoad={handleConfigChosen}
        // @ts-ignore
        policies={policies}
      />
      <UpdateVersionDialog
        open={updateOpen}
        onClose={() => setUpdateOpen(false)}
        onSave={handleUpdateAndSave}
      />
    </>
  );
};

export default Main;
