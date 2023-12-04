import { useEffect, useState } from 'react';
import CachedIcon from '@mui/icons-material/Cached';
import SettingsIcon from '@mui/icons-material/Settings';
import HistoryIcon from '@mui/icons-material/History';
import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import { useMainMediaList } from 'renderer/functions/MainMediaListFunctions';
import { useAniListToken } from 'renderer/context/services/AniListTokenContext';
import { useAniListUsername } from 'renderer/context/services/AniListUsernameContext';
import { v4 as uuidv4 } from 'uuid';
import { useAtom } from 'jotai';
import { sessionIdAtom } from 'renderer/store';
import isOnline from 'is-online';
import {
  validateMainMediaList,
  validateMainMediaListForListMediaEntry,
} from 'renderer/functions/data/validation/ValidationFunctions';
import { useQueryClient } from '@tanstack/react-query';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';
import { getTitle } from 'renderer/functions/view/TitlePreferenceFunctions';
import { useTitle } from 'renderer/context/TitleContext';

export default function FeatureButtonGroup() {
  const myToken: any = useAniListToken();
  const titlePreference: any = useTitle();
  const myUsername: any = useAniListUsername();
  const myAdvancedMedia: any = useAdvancedMedia();
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();

  const { data, refetch } = useMainMediaList(
    myUsername.AniListUsername,
    myToken.AniListToken,
  );

  const [sessionId, setSessionId] = useAtom(sessionIdAtom);

  async function fetchAPI() {
    const myId = uuidv4();
    setSessionId(myId);
    setIsDisabled(true);
    let checkOnline = false;
    checkOnline = await isOnline();
    console.log(checkOnline);
    if (checkOnline) {
      await refetch();
      /*
      const validationMain = await validateMainMediaList(
        queryClient.getQueryData(['mainMediaList']),
        data,
      );
      // returns [0,0,false] if not found, if found returns [index on all, index on where(animeWatching), 'animeWatching']
      // if found, get the data from all based on anime, manga, or lightNovels as first word of validationMain[2], get the mediaListEntry and update advancedMain
      // new function should return the mediaListEntry or if not found, false
      */
      const validationMain = await validateMainMediaListForListMediaEntry(
        queryClient.getQueryData(['mainMediaList']),
        myAdvancedMedia,
      );
      if (validationMain !== false) {
        window.electron.ipcRenderer.sendMessage('advancedMediaListEntry', [
          getTitle(titlePreference.title, myAdvancedMedia.advancedMedia),
          myAdvancedMedia.advancedMedia,
          'sync',
          validationMain,
        ]);
      }
      console.log(validationMain);
    }
    // check if on list and then update advancedMedia if the mediaListEntry exists on the list
    setIsDisabled(false);
  }
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
      sx={{ flexBasis: '40%' }}
    >
      <Tooltip title="Sync" placement="top">
        <ToggleButton
          value="center"
          aria-label="centered"
          disabled={isDisabled}
          onClick={async () => {
            fetchAPI();
          }}
        >
          <CachedIcon />
        </ToggleButton>
      </Tooltip>
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
