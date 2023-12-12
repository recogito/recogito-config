import { useState, useContext, useEffect } from 'react';
import { FlexColumn, FlexRow } from '../layouts';
import { Button } from '@mui/material';
import { Translations } from '../../types';
import { ConfigToolContext } from '../../providers/ConfigToolProvider';
import MultiLanguageTextEntry from '../MultiLanguageTextEntry';

function DynamicText() {
  const { configFile, saveDynamicText } = useContext(ConfigToolContext);
  const [publicWarning, setPublicWarning] = useState<Translations>([]);

  useEffect(() => {
    if (configFile) {
      setPublicWarning(configFile.dynamic_text.public_document_warning);
    }
  }, [configFile]);

  const handleSave = () => {
    saveDynamicText({ public_document_warning: publicWarning });
  };

  const handleCancel = () => {
    if (configFile) {
      setPublicWarning(configFile.dynamic_text.public_document_warning);
    }
  };

  const saveEnabled =
    publicWarning &&
    publicWarning.length > 0 &&
    (configFile
      ? publicWarning !== configFile?.dynamic_text.public_document_warning
      : false);

  return (
    <FlexColumn width={1200} padTop={32}>
      <FlexRow fullWidth>
        <MultiLanguageTextEntry
          languages={configFile ? configFile.supported_languages : []}
          defaultLanguage={configFile ? configFile.default_language : ''}
          translations={publicWarning}
          label='Public Document Wanrning'
          multiline={true}
          multilineRows={5}
          onCancel={() =>
            setPublicWarning(
              configFile ? configFile.dynamic_text.public_document_warning : []
            )
          }
          onChange={(translations: Translations) =>
            setPublicWarning(translations)
          }
        />
      </FlexRow>
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
}

export default DynamicText;
