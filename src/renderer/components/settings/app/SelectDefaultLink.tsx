import { Box, FormControl, InputLabel, NativeSelect } from '@mui/material';
import React from 'react';
import { useAdvancedDefaultLink } from 'renderer/context/advanced/AdvancedDefaultLinkContext';

function SelectDefaultLink() {
  const myAdvancedDefaultLink: any = useAdvancedDefaultLink();

  const handleChange = (event: any) => {
    myAdvancedDefaultLink.setAdvancedDefaultLink(event.target.value as string);
    window.electron.store.set('defaultLink', event.target.value);
    window.electron.ipcRenderer.sendMessage('updateMainFromSettings', [
      'defaultLink',
      event.target.value,
    ]);
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel variant="standard" id="defaultLinkLabel">
          Image Links
        </InputLabel>
        <NativeSelect
          id="defaultLinkSelect"
          value={myAdvancedDefaultLink.advancedDefaultLink}
          onChange={handleChange}
        >
          <option value="AniList">AniList</option>
          <option value="MyAnimeList">MyAnimeList</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}

export default SelectDefaultLink;
