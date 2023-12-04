import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { IconButton, Tooltip } from '@mui/material';
import { useAdvancedDefaultLink } from 'renderer/context/advanced/AdvancedDefaultLinkContext';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';
import { getMalLink } from 'renderer/functions/edit/getAdjustedSiteLink';

export default function AlternativeLink({ props }: any) {
  const myAdvancedMedia: any = useAdvancedMedia();
  const myAdvancedDefaultLink: any = useAdvancedDefaultLink();

  const handleOnClick = () => {
    if (myAdvancedDefaultLink.advancedDefaultLink === 'MyAnimeList') {
      // AniList
      window.electron.ipcRenderer.sendMessage('openExternalLink', [
        myAdvancedMedia.advancedMedia.siteUrl,
      ]);
    } else {
      // MyAnimeList
      window.electron.ipcRenderer.sendMessage('openExternalLink', [
        getMalLink(
          myAdvancedMedia.advancedMedia.idMal,
          myAdvancedMedia.advancedMedia.type,
        ),
      ]);
    }
  };

  return (
    <Tooltip
      title={
        myAdvancedDefaultLink.advancedDefaultLink === 'AniList'
          ? 'Go to MyAnimeList'
          : 'Go to AniList'
      }
    >
      <IconButton onClick={handleOnClick}>
        <OpenInNewIcon />
      </IconButton>
    </Tooltip>
  );
}
