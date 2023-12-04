import { FormControl, FormLabel, Input } from '@mui/joy';
import { Box } from '@mui/material';
import { useState } from 'react';
import { useAdvancedInput } from 'renderer/context/advanced/AdvancedInputContext';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';

export default function RepeatInput() {
  const myAdvancedMedia: any = useAdvancedMedia();
  const myAdvancedInput: any = useAdvancedInput();

  const handleOnChange = (e: any) => {
    const value = e.target.value
      .replace(/[^0-9]+/g, '')
      .replace(/^(?:0+(?=[1-9])|0+(?=0$))/gm, '');
    console.log(parseInt(value, 10) || 0);

    const maxValue = 9999;
    let isMaxNull = false;
    if (maxValue === null) {
      isMaxNull = true;
    }
    if (isMaxNull) {
      if (parseInt(value, 10) > 9999) {
        myAdvancedInput.dispatch({
          type: 'updateRepeat',
          payload: 9999,
        });
      } else {
        myAdvancedInput.dispatch({
          type: 'updateRepeat',
          payload: value, // leave it like this
        });
      }
    }
    if (!isMaxNull) {
      if (parseInt(value, 10) > maxValue) {
        myAdvancedInput.dispatch({
          type: 'updateRepeat',
          payload: maxValue,
        });
      } else {
        myAdvancedInput.dispatch({
          type: 'updateRepeat',
          payload: value, // leave it like this
        });
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gridColumn: '3/4',
        gridRow: '1/2',
      }}
    >
      <FormControl>
        <FormLabel sx={{ marginLeft: '20px' }}>
          {myAdvancedMedia.advancedMedia.type === 'ANIME'
            ? 'Total Rewatches:'
            : 'Total Rereads:'}
        </FormLabel>
        <Input
          size="sm"
          type="number"
          onChange={handleOnChange}
          onKeyDown={(evt) =>
            ['e', 'E', '+', '-', '.'].includes(evt.key) && evt.preventDefault()
          }
          sx={{ marginLeft: '20px' }}
          value={myAdvancedInput.advancedInput.repeat}
          slotProps={{
            input: {
              pattern: '[0-9]',
              min: 0,
              max: 9999,
              step: 1,
            },
          }}
        />
      </FormControl>
    </Box>
  );
}
