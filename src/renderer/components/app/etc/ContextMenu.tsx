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
import { Popover } from '@mui/material';
import { SetStateAction, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { reRenderHelperAtom, statusAddSelectAtom } from 'renderer/store';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';
import { StyledMenu } from '../styled/StyledComponents';

export default function ContextMenu({
  props,
  contextMenu,
  setContextMenu,
  handleClickOpen,
}: any) {
  const titlePreference: any = useTitle();
  const myAdvancedMedia: any = useAdvancedMedia();
  const deleteMutation: any = useDeleteEntryData();
  const myUserName: any = useAniListUsername();
  const myToken: any = useAniListToken();
  const addMutation: any = useAddNewEntryData();
  const [statusAddSelect, setStatusAddSelect] = useAtom(statusAddSelectAtom);
  const [reRenderHelper, setReRenderHelper] = useAtom(reRenderHelperAtom);

  const [showSubMenu, setShowSubMenu] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMouseEnter = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const handleCloseAdvanced = () => {
    setContextMenu(null);
    window.electron.ipcRenderer.sendMessage('advancedMedia', [
      getTitle(titlePreference.title, props),
      props,
    ]);
    myAdvancedMedia.dispatch({ type: 'getNewMedia', payload: props });
  };

  const handleCloseTrailer = () => {
    setContextMenu(null);
    window.electron.ipcRenderer.sendMessage('advancedMedia', [
      getTitle(titlePreference.title, props),
      props,
      'trailer',
    ]);
    myAdvancedMedia.dispatch({ type: 'getNewMedia', payload: props });
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
    /* Previously, this function could delete by itself. Now it uses a modal to confirm with the user on deletion. */
    handleClickOpen();
    // deleteMutation.mutate(entry);

    // only send message if successful mutation
    /*
    window.electron.ipcRenderer.sendMessage('advancedMediaListEntry', [
      getTitle(titlePreference.title, props),
      props,
      'delete',
      null,
    ]);
    */
  };

  const handleCloseAdd = async () => {
    setContextMenu(null);

    const today = new Date();

    const entry: any = {
      myUserName: myUserName.AniListUsername,
      myToken: myToken.AniListToken,
      myMediaId: props.id,
      myStatus: statusAddSelect,
      advancedInput: createMediaListEntryData(
        props.id,
        {
          day: today.getDate(),
          month: today.getMonth() + 1,
          year: today.getFullYear(),
        },
        statusAddSelect,
        props.type,
      ),
      advancedMedia: props,
    };
    addMutation.mutate(entry);

    // only send message if successful mutation
    /*
    window.electron.ipcRenderer.sendMessage('advancedMediaListEntry', [
      getTitle(titlePreference.title, props),
      props,
      'add',
      createMediaListEntryData(
        props.id,
        {
          day: today.getDate(),
          month: today.getMonth() + 1,
          year: today.getFullYear(),
        },
        'CURRENT',
        props.type,
      ),
    ]);
    */
  };

  const menuItemRef = useRef(null);

  return (
    <StyledMenu
      open={contextMenu !== null}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={
        contextMenu !== null
          ? { top: contextMenu.mouseY - 3, left: contextMenu.mouseX - 3 }
          : undefined
      }
      MenuListProps={{ dense: true }}
    >
      <MenuItem onClick={handleCloseAdvanced}>More Information / Edit</MenuItem>
      <MenuItem onClick={handleCloseTrailer} disabled={props.trailer === null}>
        Watch Trailer
      </MenuItem>
      <Divider />
      <MenuItem
        onClick={handleCloseAniListPage}
        disabled={props.siteUrl === null}
      >
        Go to AniList Page
      </MenuItem>
      <MenuItem onClick={handleCloseMalPage} disabled={props.idMal === null}>
        Go to MyAnimeList Page
      </MenuItem>
      <Divider />
      {props.mediaListEntry !== null ? (
        <MenuItem onClick={handleCloseDelete}>Delete from list</MenuItem>
      ) : (
        <MenuItem onClick={handleCloseAdd} ref={menuItemRef}>
          Add to list
        </MenuItem>
      )}
    </StyledMenu>
  );
}
