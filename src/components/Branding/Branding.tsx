import { FlexColumn, FlexRow } from "../layouts";
import { useContext, useEffect, useState } from "react";
import { ConfigToolContext } from "../../providers/ConfigToolProvider";
import { TextField, Button, Typography } from "@mui/material";

function Branding() {
  const { configFile, saveBranding } = useContext(ConfigToolContext);

  /*
    welcome_message: string;
  welcome_blurb: string | undefined;
  site_color: string;
  brand: string;
  home_banner: string;
  */
  const [siteName, setSiteName] = useState<string>("");
  const [blurb, setBlurb] = useState<string | undefined>();
  const [siteColor, setSiteColor] = useState<string>("orange");
  const [homeBanner, setHomeBanner] = useState<string | undefined>();
  const [platformName, setPlatformName] = useState<string | undefined>();

  useEffect(() => {
    if (configFile) {
      setSiteName(configFile.branding ? configFile.branding.site_name : "");
      setBlurb(
        configFile.branding ? configFile.branding.welcome_blurb : undefined
      );
      setPlatformName(
        configFile.branding ? configFile.branding.platform_name : undefined
      );
      setSiteColor(
        configFile.branding ? configFile.branding.site_color : "orange"
      );
      setHomeBanner(
        configFile.branding ? configFile.branding.home_banner : undefined
      );
    }
  }, [configFile]);

  const handleCancel = () => {
    if (configFile) {
      setSiteName(configFile.branding ? configFile.branding.site_name : "");
      setBlurb(
        configFile.branding ? configFile.branding.welcome_blurb : undefined
      );
      setPlatformName(
        configFile.branding ? configFile.branding.platform_name : undefined
      );
      setSiteColor(
        configFile.branding ? configFile.branding.site_color : "orange"
      );
      setHomeBanner(
        configFile.branding ? configFile.branding.home_banner : undefined
      );
    }
  };

  const handleSave = () => {
    saveBranding({
      site_name: siteName,
      welcome_blurb: blurb,
      platform_name: platformName,
      site_color: siteColor,
      home_banner: homeBanner,
    });
  };

  const saveEnabled = siteName && siteName.length > 0;
  return (
    <FlexColumn width={1200} padTop={32}>
      <FlexRow fullWidth>
        <FlexColumn width={300}>
          <FlexRow fullWidth padding={5}>
            <TextField
              autoFocus
              margin="dense"
              id="platform"
              label="Platform Name"
              type="text"
              fullWidth
              variant="standard"
              value={platformName || ""}
              onChange={(e) => setPlatformName(e.target.value)}
            />
          </FlexRow>
          <FlexRow fullWidth padding={5}>
            <TextField
              autoFocus
              margin="dense"
              id="siteName"
              label="Site Name"
              type="text"
              fullWidth
              variant="standard"
              value={siteName || ""}
              onChange={(e) => setSiteName(e.target.value)}
            />
          </FlexRow>
          <FlexRow fullWidth padding={5}>
            <TextField
              autoFocus
              margin="dense"
              id="blurb"
              label="Welcome Blurb"
              type="text"
              fullWidth
              variant="standard"
              value={blurb || ""}
              onChange={(e) => setBlurb(e.target.value)}
            />
          </FlexRow>
          <FlexRow fullWidth padding={5} alignLeftCenter>
            <TextField
              autoFocus
              margin="dense"
              id="siteColor"
              label="Site Color"
              type="text"
              fullWidth
              variant="standard"
              value={siteColor || ""}
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
          <FlexRow fullWidth padding={5}>
            <TextField
              autoFocus
              margin="dense"
              id="homeBanner"
              label="Home Banner"
              type="text"
              fullWidth
              variant="standard"
              value={homeBanner || ""}
              onChange={(e) => setHomeBanner(e.target.value)}
            />
          </FlexRow>
          <FlexRow fullWidth spaceBetween padTop={32}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={!saveEnabled}
            >
              Save
            </Button>
          </FlexRow>
        </FlexColumn>
        <FlexColumn width={800} padLeft={30}>
          <Typography variant="h6">Home Banner</Typography>
          <img src={homeBanner} />
        </FlexColumn>
      </FlexRow>
    </FlexColumn>
  );
}

export default Branding;
