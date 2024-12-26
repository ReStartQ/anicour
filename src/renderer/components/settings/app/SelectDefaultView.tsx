import { Box, FormControl, InputLabel, NativeSelect } from '@mui/material';
import React from 'react';
import { useMainView } from 'renderer/context/MainViewContext';

const SelectDefaultView = () => {
  const myMainView: any = useMainView();

  const handleChange = (event: any) => {
    myMainView.setView(event.target.value);
    window.electron.store.set('defaultView', Number(event.target.value));
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel variant="standard" id="defaultLinkLabel">
          List View Type
        </InputLabel>
        <NativeSelect
          id="defaultLinkSelect"
          value={myMainView.view}
          onChange={handleChange}
        >
          <option value={0}>Grid</option>
          <option value={1}>Compact</option>
          <option value={2}>List</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
};

export default SelectDefaultView;
