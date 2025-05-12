import { ContextMenu } from 'mui-nested-menu';
import { useState } from 'react';
import { useTitle } from 'renderer/context/TitleContext';
import { useAniListToken } from 'renderer/context/services/AniListTokenContext';
import { useAniListUsername } from 'renderer/context/services/AniListUsernameContext';
import { useAddNewEntryData } from 'renderer/functions/api/mutations/addEntry';
import { useDeleteEntryData } from 'renderer/functions/api/mutations/deleteEntry';
import createMediaListEntryData from 'renderer/functions/data/generator/createMediaListEntryData';
import { getMalLink } from 'renderer/functions/edit/getAdjustedSiteLink';
import { getTitle } from 'renderer/functions/view/TitlePreferenceFunctions';

const ContextMenuNested = ({ props, contextMenu, setContextMenu }: any) => {
  const titlePreference: any = useTitle();
  const deleteMutation: any = useDeleteEntryData();
  const myUserName: any = useAniListUsername();
  const myToken: any = useAniListToken();
  const addMutation: any = useAddNewEntryData();

  const [showSubMenu, setShowSubMenu] = useState(false);

  const handleMouseEnter1 = () => {
    setShowSubMenu(true);
  };

  const handleMouseLeave1 = () => {
    setShowSubMenu(false);
  };

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

  const items = [
    {
      label: 'File',
      items: [
        { label: 'New', action: () => console.log('New') },
        { label: 'Open', action: () => console.log('Open') },
        { label: 'Save', action: () => console.log('Save') },
        { label: 'Save As...', action: () => console.log('Save As...') },
        { label: 'Close', action: () => console.log('Close') },
      ],
    },
    {
      label: 'Edit',
      items: [
        { label: 'Undo', action: () => console.log('Undo') },
        { label: 'Redo', action: () => console.log('Redo') },
        { label: 'Cut', action: () => console.log('Cut') },
        { label: 'Copy', action: () => console.log('Copy') },
        { label: 'Paste', action: () => console.log('Paste') },
      ],
    },
  ];

  return <ContextMenu menuItemsData={items} />;
};

export default ContextMenuNested;
