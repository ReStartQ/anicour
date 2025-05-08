import { NativeSelect, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect } from 'react';

export default function ScoreSelect({
  props,
  advancedInput,
  inputDispatch,
}: any) {
  const onChange = (e: any) => {
    console.log(advancedInput);
    console.log(props);
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
    <Box display="flex" flexDirection="column">
      <Typography fontSize={12} fontWeight="bold" className="label-information">
        Score{' '}
      </Typography>
      <NativeSelect
        value={advancedInput.score}
        size="small"
        sx={{
          width: '36px',
          height: '20px',
          fontSize: '12px',
          border: '1px solid #03a9f4',
          borderRadius: '5px',
          color: ' #81d4fa',
          '&:hover': {
            backgroundColor: '#1F242F',
          },
          backgroundColor: '#0b0d0e',
          textAlign: 'center', // Centers the text inside the select
          textAlignLast: 'center', // Ensures the selected value is centered
        }}
        inputProps={{
          style: {
            padding: '0px',
            paddingTop: '2px',
            textAlign: 'center',
          },
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
