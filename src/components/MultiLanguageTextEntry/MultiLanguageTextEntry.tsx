import { useEffect, useState } from 'react';
import { FlexCenter, FlexRow } from '../layouts';
import {
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  InputLabel,
} from '@mui/material';
import { copyObject } from '../../utilities';
import { Translations } from '../../types';

interface MultiLanguageTextEntryProps {
  languages: string[];
  defaultLanguage: string;
  translations: Translations;
  label: string;
  multiline?: boolean;
  multilineRows?: number;
  onCancel(): void;
  onChange(translations: Translations): void;
}

function MultiLanguageTextEntry(props: MultiLanguageTextEntryProps) {
  const {
    languages,
    defaultLanguage,
    label,
    multiline,
    translations,
    multilineRows,
  } = props;

  const [language, setLanguage] = useState('');

  useEffect(() => {
    setLanguage(defaultLanguage);
  }, [defaultLanguage]);

  const currentText = () => {
    if (language.length === 0) {
      return '';
    }

    const trans = translations.find((t) => t.language === language);

    return trans ? trans.text : '';
  };

  const handleTextChange = (language: string, text: string) => {
    const copy: Translations = copyObject(translations);

    const idx = copy.findIndex((t) => t.language === language);

    if (idx > -1) {
      copy[idx] = { language, text };
    } else {
      copy.push({ language, text });
    }

    props.onChange(copy);
  };

  return (
    <FlexRow fullWidth padding={5}>
      <FlexRow width='80%'>
        <TextField
          autoFocus
          margin='dense'
          id='text'
          label={label}
          type='text'
          fullWidth
          multiline={multiline}
          rows={multiline ? multilineRows || 3 : undefined}
          variant='outlined'
          value={currentText()}
          onChange={(e) => handleTextChange(language, e.target.value as string)}
        />
      </FlexRow>
      <FlexCenter height='100%' padLeft={3}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id='language-label'>Language</InputLabel>
          <Select
            labelId='language-label'
            value={language}
            label='Language'
            onChange={(event: SelectChangeEvent) =>
              setLanguage(event.target.value as string)
            }
          >
            {languages.map((l) => {
              return (
                <MenuItem value={l} key={l}>
                  {l}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </FlexCenter>
    </FlexRow>
  );
}

export default MultiLanguageTextEntry;
