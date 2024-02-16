import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton, NativeSelect, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function ScoreSelect({
  props,
  advancedInput,
  inputDispatch,
}: any) {
  const onChange = (e: any) => {
    inputDispatch({
      type: 'updateScore',
      payload: e.target.value,
    });
  };

  useEffect(() => {
    inputDispatch({
      type: 'updateScore',
      payload: props.mediaListEntry.score,
    });
  }, [inputDispatch, props.mediaListEntry.score]);

  return (
    <Box display="flex" flexDirection="column" sx={{ gridColumn: '1/2' }}>
      <Typography fontSize={12} fontWeight="bold">
        Score{' '}
      </Typography>
      <NativeSelect
        value={advancedInput.score}
        size="small"
        sx={{
          pt: '4px',
          width: '55px',
          height: '22px',
          fontSize: '12px',
          textAlignLast: 'right',
          border: '1px solid #03a9f4',
          borderRadius: '5px',
          color: ' #81d4fa',
          '&:hover': {
            backgroundColor: '#1F242F',
          },
          backgroundColor: '#0b0d0e',
        }}
        disableUnderline
        onChange={onChange}
      >
        {props.mediaListEntry.score % 1 !== 0 ? (
          <option value={props.mediaListEntry.score} disabled>
            {props.mediaListEntry.score}
          </option>
        ) : null}
        <option value={0}> </option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
        <option value={7}>7</option>
        <option value={8}>8</option>
        <option value={9}>9</option>
        <option value={10}>10</option>
      </NativeSelect>
    </Box>
  );
}
