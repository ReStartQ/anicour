import { Box, Button, IconButton, Input, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAniListUsername } from 'renderer/context/services/AniListUsernameContext';
import { useAniListToken } from 'renderer/context/services/AniListTokenContext';
import { useTestSettings } from 'renderer/functions/TestSettingsFunction';
import { useAtom } from 'jotai';
import {
  notificationOpenAltSettingsAtom,
  notificationOpenSettingsAtom,
} from 'renderer/store';

export default function AccountSection() {
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const myUsername: any = useAniListUsername();
  const myToken: any = useAniListToken();
  const [isSave, setIsSave] = useState(false);

  const queryClient = useQueryClient();
  const [notifcationAltOpen, setNotificationAltOpen] = useAtom(
    notificationOpenAltSettingsAtom,
  );
  const [notifcationOpen, setNotificationOpen] = useAtom(
    notificationOpenSettingsAtom,
  );

  useEffect(() => {
    setUsername(myUsername.AniListUsername);
    setToken(myToken.AniListToken);
  }, [myUsername, myToken]);

  const { data, refetch }: any = useTestSettings(
    myUsername.AniListUsername,
    myToken.AniListToken,
    notifcationAltOpen,
    setNotificationAltOpen,
    notifcationOpen,
    setNotificationOpen,
  );

  const handleReset = () => {
    window.electron.ipcRenderer.sendMessage('resetLogin', ['ping']);
  };

  const handleSave = async () => {
    window.electron.store.set('aniListUsername', username);
    window.electron.store.set('aniListToken', token);
    // send to main
    window.electron.ipcRenderer.sendMessage('updateMainFromSettings', [
      'aniListUsernameToken',
      username,
      token,
    ]);
    await setIsSave(true);
    await myUsername.setAniListUsername(username);
    await myToken.setAniListToken(token);

    await refetch();
    await setIsSave(false);
  };

  const inputChange1 = (e: any) => {
    setUsername(e.target.value);
    console.log(username);
  };

  const inputChange2 = (e: any) => {
    setToken(e.target.value);
    console.log(token);
  };

  const client = '9413';

  const authLink = `https://anilist.co/api/v2/oauth/authorize?client_id=${client}&response_type=token`;

  const ariaLabel = { 'aria-label': 'description' };

  return (
    <Box display="flex" flexDirection="column" gap="15px">
      <Box display="flex" flexDirection="row" gap="15px">
        <Input
          placeholder="Username"
          defaultValue={
            myUsername.AniListUsername !== ''
              ? myUsername.AniListUsername
              : null
          }
          inputProps={ariaLabel}
          onChange={inputChange1}
          spellCheck={false}
          sx={{ width: '100%' }}
        />
        <Input
          placeholder="Token"
          inputProps={ariaLabel}
          onChange={inputChange2}
          spellCheck={false}
          sx={{ width: '100%' }}
        />
      </Box>
      <Box display="flex" flexDirection="row" gap="15px">
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            window.electron.ipcRenderer.sendMessage('openExternalLink', [
              authLink,
            ]);
          }}
          fullWidth
        >
          Get AniList Token
        </Button>
        <Button
          variant="outlined"
          color="success"
          disabled={isSave}
          onClick={handleSave}
          fullWidth
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}
