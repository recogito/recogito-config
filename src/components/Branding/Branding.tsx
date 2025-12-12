import { FlexColumn, FlexRow } from '../layouts';
import { useContext, useEffect, useState } from 'react';
import { ConfigToolContext } from '../../providers/ConfigToolProvider';
import {
  TextField,
  Button,
  Typography,
  Divider,
  FormGroup,
  FormControlLabel,
  Switch,
} from '@mui/material';

function Branding() {
  const { configFile, saveBranding } = useContext(ConfigToolContext);

  /*
    welcome_message: string;
  welcome_blurb: string | undefined;
  site_color: string;
  brand: string;
  home_banner: string;
  */
  const [siteName, setSiteName] = useState<string>('');
  const [blurb, setBlurb] = useState<string | undefined>();
  const [siteColor, setSiteColor] = useState<string>('orange');
  const [backgroundColor, setBackgroundColor] = useState<string>('black');
  const [contrastColor, setContrastColor] = useState('white');
  const [homeBanner, setHomeBanner] = useState<string | undefined>();
  const [platformName, setPlatformName] = useState<string | undefined>();
  const [footerMessage, setFooterMessage] = useState<string | undefined>();
  const [topLogos, setTopLogos] = useState<boolean>(false);
  const [bottomLogos, setBottomLogos] = useState<boolean>(false);
  const [favicon, setFavicon] = useState<string>('favicon.svg');

  useEffect(() => {
    if (configFile) {
      setSiteName(configFile.branding ? configFile.branding.site_name : '');
      setBlurb(
        configFile.branding ? configFile.branding.welcome_blurb : undefined
      );
      setPlatformName(
        configFile.branding ? configFile.branding.platform_name : undefined
      );
      setSiteColor(
        (configFile.branding && configFile.branding.site_color) || 'orange'
      );
      setBackgroundColor(
        (configFile.branding && configFile.branding.background_color) || 'black'
      );
      setContrastColor(
        (configFile.branding && configFile.branding.contrast_color) || 'white'
      );
      setHomeBanner(
        (configFile.branding && configFile.branding.home_banner) || undefined
      );
      setFooterMessage(
        configFile.branding ? configFile.branding.footer_message : undefined
      );
      setTopLogos(
        configFile.branding ? configFile.branding.top_logos_enabled : false
      );
      setBottomLogos(
        configFile.branding ? configFile.branding.bottom_logos_enabled : false
      );
      setFavicon(
        configFile.branding ? configFile.branding.favicon : 'favicon.svg'
      );
    }
  }, [configFile]);

  const handleCancel = () => {
    if (configFile) {
      setSiteName(configFile.branding ? configFile.branding.site_name : '');
      setBlurb(
        configFile.branding ? configFile.branding.welcome_blurb : undefined
      );
      setPlatformName(
        configFile.branding ? configFile.branding.platform_name : undefined
      );
      setSiteColor(
        configFile.branding ? configFile.branding.site_color : 'orange'
      );
      setBackgroundColor(
        (configFile.branding && configFile.branding.background_color) || 'black'
      );
      setContrastColor(
        (configFile.branding && configFile.branding.contrast_color) || 'white'
      );
      setHomeBanner(
        (configFile.branding && configFile.branding.home_banner) || undefined
      );
      setFooterMessage(
        configFile.branding ? configFile.branding.footer_message : undefined
      );
      setTopLogos(
        configFile.branding ? configFile.branding.top_logos_enabled : false
      );
      setBottomLogos(
        configFile.branding ? configFile.branding.bottom_logos_enabled : false
      );
      setFavicon(
        configFile.branding ? configFile.branding.favicon : 'favicon.svg'
      );
    }
  };

  const handleSave = () => {
    saveBranding({
      site_name: siteName,
      welcome_blurb: blurb,
      platform_name: platformName,
      site_color: siteColor,
      background_color: backgroundColor,
      contrast_color: contrastColor,
      bottom_logos_enabled: bottomLogos,
      home_banner: homeBanner,
      footer_message: footerMessage,
      top_logos_enabled: topLogos,
      favicon: favicon,
    });
  };

  const saveEnabled = siteName && siteName.length > 0;
  return (
    <FlexColumn fullWidth padBottom={32}>
      <FlexRow padTop={20} padBottom={20}>
        <Typography variant='h5' color='black'>
          Branding
        </Typography>
      </FlexRow>
      <FlexRow fullWidth>
        <FlexColumn width={300}>
          <FlexRow fullWidth padding={5}>
            <TextField
              autoFocus
              margin='dense'
              id='platform'
              label='Platform Name'
              type='text'
              fullWidth
              variant='standard'
              value={platformName || ''}
              onChange={(e) => setPlatformName(e.target.value)}
            />
          </FlexRow>
          <FlexRow fullWidth padding={5}>
            <TextField
              autoFocus
              margin='dense'
              id='siteName'
              label='Site Name'
              type='text'
              fullWidth
              variant='standard'
              value={siteName || ''}
              onChange={(e) => setSiteName(e.target.value)}
            />
          </FlexRow>
          <FlexRow fullWidth padding={5}>
            <TextField
              autoFocus
              margin='dense'
              id='blurb'
              label='Welcome Blurb'
              type='text'
              fullWidth
              variant='standard'
              value={blurb || ''}
              onChange={(e) => setBlurb(e.target.value)}
            />
          </FlexRow>
          <FlexRow fullWidth padding={5} alignLeftCenter>
            <TextField
              autoFocus
              margin='dense'
              id='siteColor'
              label='Site Color'
              type='text'
              fullWidth
              variant='standard'
              value={siteColor || ''}
              onChange={(e) => setSiteColor(e.target.value)}
            />
            <div
              style={{
                paddingLeft: 5,
                width: 30,
                height: 30,
                backgroundColor: siteColor,
              }}
            />
          </FlexRow>
          <FlexRow fullWidth padding={5} alignLeftCenter>
            <TextField
              autoFocus
              margin='dense'
              id='backgroundColor'
              label='Background Color'
              type='text'
              fullWidth
              variant='standard'
              value={backgroundColor || ''}
              onChange={(e) => setBackgroundColor(e.target.value)}
            />
            <div
              style={{
                paddingLeft: 5,
                width: 30,
                height: 30,
                backgroundColor: backgroundColor,
              }}
            />
          </FlexRow>
          <FlexRow fullWidth padding={5} alignLeftCenter>
            <TextField
              autoFocus
              margin='dense'
              id='contrastColor'
              label='Contrast Color'
              type='text'
              fullWidth
              variant='standard'
              value={contrastColor || ''}
              onChange={(e) => setContrastColor(e.target.value)}
            />
            <div
              style={{
                paddingLeft: 5,
                width: 30,
                height: 30,
                backgroundColor: contrastColor,
              }}
            />
          </FlexRow>
          <FlexRow fullWidth padding={5}>
            <TextField
              autoFocus
              margin='dense'
              id='footerMessage'
              label='Footer Message'
              type='text'
              fullWidth
              variant='standard'
              value={footerMessage || ''}
              onChange={(e) => setFooterMessage(e.target.value)}
            />
          </FlexRow>
          <FlexRow fullWidth padding={5}>
            <TextField
              autoFocus
              margin='dense'
              id='homeBanner'
              label='Home Banner'
              type='text'
              fullWidth
              variant='standard'
              value={homeBanner || ''}
              onChange={(e) => setHomeBanner(e.target.value)}
            />
          </FlexRow>
          <FlexRow fullWidth padding={5}>
            <TextField
              autoFocus
              margin='dense'
              id='favicon'
              label='Favicon'
              type='text'
              fullWidth
              variant='standard'
              value={favicon || ''}
              onChange={(e) => setFavicon(e.target.value)}
            />
          </FlexRow>
          <FlexRow fullWidth spaceBetween padTop={32}>
            <Button
              variant='contained'
              color='secondary'
              onClick={handleCancel}
            >
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
        <FlexColumn width={800} padLeft={30}>
          <FlexRow
            fullWidth
            height={50}
            padRight={5}
            style={{ backgroundColor: backgroundColor }}
            alignLeftCenter
            padLeft={32}
          >
            <Typography
              variant='body1'
              style={{ color: contrastColor, paddingRight: 10 }}
            >
              Contrast Color
            </Typography>
            <Divider
              orientation='vertical'
              flexItem
              variant='middle'
              sx={{ backgroundColor: 'white', height: 35 }}
            />
            <Typography
              variant='body1'
              style={{ color: siteColor, paddingLeft: 10 }}
            >
              Site Color
            </Typography>
            <div style={{ float: 'right' }}></div>
          </FlexRow>
          <img src={homeBanner} width={837} />
          <FlexRow
            fullWidth
            height={50}
            padRight={5}
            style={{ backgroundColor: backgroundColor }}
            alignLeftCenter
            padLeft={32}
          ></FlexRow>
          <FlexRow fullWidth padding={5}>
            <FormGroup>
              <FormControlLabel
                sx={{ color: 'black' }}
                control={
                  <Switch
                    checked={topLogos}
                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                      setTopLogos(ev.target.checked)
                    }
                  />
                }
                label='Enable Top Bar Logos'
              />
              <FormControlLabel
                sx={{ color: 'black' }}
                control={
                  <Switch
                    checked={bottomLogos}
                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                      setBottomLogos(ev.target.checked)
                    }
                  />
                }
                label='Enable Bottom Bar Logos'
              />
            </FormGroup>
          </FlexRow>
        </FlexColumn>
      </FlexRow>
    </FlexColumn>
  );
}

export default Branding;
