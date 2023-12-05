import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useAtom } from 'jotai';
import React from 'react';
import { statusAddSelectAtom } from 'renderer/store';

const DefaultStatus = () => {
  const [defaultAddStatus, setDefaultAddStatus] = useAtom(statusAddSelectAtom);

  const handleChange = (event: any) => {
    console.log(event.target.value);
    setDefaultAddStatus(event.target.value);
    window.electron.store.set('defaultAddStatus', event.target.value);
    window.electron.ipcRenderer.sendMessage('updateMainFromSettings', [
      'addStatus',
      event.target.value,
    ]);
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Status for Add to List
        </InputLabel>
        <NativeSelect
          id="demo-select"
          value={defaultAddStatus}
          onChange={handleChange}
        >
          <option value="CURRENT">Watching / Reading</option>
          <option value="COMPLETED">Completed</option>
          <option value="PAUSED">On Hold</option>
          <option value="DROPPED">Dropped</option>
          <option value="PLANNING">Plan to Watch / Plan to Read</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
};

export default DefaultStatus;
