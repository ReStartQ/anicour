import { Menu } from '@mui/material';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import { useTitle } from 'renderer/context/TitleContext';
import { useAniListToken } from 'renderer/context/services/AniListTokenContext';
import { useAniListUsername } from 'renderer/context/services/AniListUsernameContext';
import { useAddNewEntryData } from 'renderer/functions/api/mutations/addEntry';
import { useDeleteEntryData } from 'renderer/functions/api/mutations/deleteEntry';
import createMediaListEntryData from 'renderer/functions/data/generator/createMediaListEntryData';
import { getMalLink } from 'renderer/functions/edit/getAdjustedSiteLink';
import { getTitle } from 'renderer/functions/view/TitlePreferenceFunctions';

export default function ContextMenuAlternative({
  props,
  contextMenu,
  setContextMenu,
}: any) {
  const titlePreference: any = useTitle();
  const deleteMutation: any = useDeleteEntryData();
  const myUserName: any = useAniListUsername();
  const myToken: any = useAniListToken();
  const addMutation: any = useAddNewEntryData();

  const handleClose = () => {
    setContextMenu(null);
  };

  const handleCloseAdvanced = () => {
    setContextMenu(null);
    window.electron.ipcRenderer.sendMessage('advancedMedia', [
      getTitle(titlePreference.title, props),
      props,
    ]);
  };

  const handleCloseTrailer = () => {
    setContextMenu(null);
    window.electron.ipcRenderer.sendMessage('advancedMedia', [
      getTitle(titlePreference.title, props),
      props,
      'trailer',
    ]);
  };

  const handleCloseMalPage = () => {
    setContextMenu(null);
    window.electron.ipcRenderer.sendMessage('openExternalLink', [
      getMalLink(props.idMal, props.type),
    ]);
  };

  const handleCloseAniListPage = () => {
    setContextMenu(null);
    window.electron.ipcRenderer.sendMessage('openExternalLink', [
      props.siteUrl,
    ]);
  };

  const handleCloseDelete = () => {
    setContextMenu(null);

    const entry: any = {
      myUserName: myUserName.AniListUsername,
      myToken: myToken.AniListToken,
      myMediaId: props.id,
      mediaListEntry: props.mediaListEntry,
      advancedMedia: props,
    };
    deleteMutation.mutate(entry);
  };

  const handleCloseAdd = () => {
    setContextMenu(null);

    const today = new Date();

    const entry: any = {
      myUserName: myUserName.AniListUsername,
      myToken: myToken.AniListToken,
      myMediaId: props.id,
      myStatus: 'CURRENT',
      advancedInput: createMediaListEntryData(
        props.id,
        {
          day: today.getDate(),
          month: today.getMonth() + 1,
          year: today.getFullYear(),
        },
        'CURRENT',
        props.type,
      ),
      advancedMedia: props,
    };
    addMutation.mutate(entry);
  };

  return (
    <Menu
      open={contextMenu !== null}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={
        contextMenu !== null
          ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
          : undefined
      }
      MenuListProps={{ dense: true }}
    >
      <MenuItem onClick={handleCloseAdvanced}>More Information / Edit</MenuItem>
      <MenuItem onClick={handleCloseTrailer} disabled={props.trailer === null}>
        Watch Trailer
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleCloseMalPage} disabled={props.idMal === null}>
        Go to MyAnimeList page
      </MenuItem>
      <MenuItem
        onClick={handleCloseAniListPage}
        disabled={props.siteUrl === null}
      >
        Go to AniList page
      </MenuItem>
      {props.mediaListEntry !== null ? (
        <MenuItem onClick={handleCloseDelete}>Delete from list</MenuItem>
      ) : (
        <MenuItem onClick={handleCloseAdd}>Add to List</MenuItem>
      )}
    </Menu>
  );
}
