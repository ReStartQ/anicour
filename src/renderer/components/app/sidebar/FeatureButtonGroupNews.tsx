import { useEffect, useState } from 'react';
import CachedIcon from '@mui/icons-material/Cached';
import SettingsIcon from '@mui/icons-material/Settings';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import DownloadIcon from '@mui/icons-material/Download';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import { useMainMediaList } from 'renderer/functions/MainMediaListFunctions';
import { useAniListToken } from 'renderer/context/services/AniListTokenContext';
import { useAniListUsername } from 'renderer/context/services/AniListUsernameContext';
import NewsRefresh from '../news/NewsRefresh';

export default function FeatureButtonGroupNews() {
  /*
  useEffect(() => {
    if (myUsername.AniListUsername !== '' && myToken.AniListToken !== '') {
      fetchAPI();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myUsername.AniListUsername, myToken.AniListToken]);
  */
  return (
    <ToggleButtonGroup
      exclusive
      aria-label="text alignment"
      sx={{ width: '100%', justifyContent: 'end' }}
    >
      <NewsRefresh />
      <Tooltip title="Settings" placement="top">
        <ToggleButton
          value="left"
          aria-label="left aligned"
          onClick={() => {
            window.electron.ipcRenderer.sendMessage('settings', ['ping']);
          }}
        >
          <SettingsIcon />
        </ToggleButton>
      </Tooltip>
    </ToggleButtonGroup>
  );
}
