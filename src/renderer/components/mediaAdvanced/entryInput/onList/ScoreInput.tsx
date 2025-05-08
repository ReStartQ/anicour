import { FormControl, FormLabel, Input } from '@mui/joy';
import { useAdvancedInput } from 'renderer/context/advanced/AdvancedInputContext';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';

export default function ScoreInput() {
  const myAdvancedMedia: any = useAdvancedMedia();
  const myAdvancedInput: any = useAdvancedInput();

  const onChange = (e: any) => {
    const value = e.target.value
      .replace(/[^0-9.]+/g, '')
      .replace(/^(?:0+(?=[1-9])|0+(?=0$))/gm, ''); // removes all leading 0's except 0
    console.log(parseFloat(value).toFixed(1) || 0);

    const maxValue = 10;
    let isMaxNull = false;
    if (maxValue === null) {
      isMaxNull = true;
    }
    if (isMaxNull) {
      if (parseFloat(value) > 10) {
        myAdvancedInput.dispatch({
          type: 'updateScore',
          payload: 10,
        });
      } else {
        myAdvancedInput.dispatch({
          type: 'updateScore',
          payload: value, // leave it like this
        });
      }
    }
    if (!isMaxNull) {
      if (parseFloat(value) > maxValue) {
        myAdvancedInput.dispatch({
          type: 'updateScore',
          payload: maxValue,
        });
      } else {
        myAdvancedInput.dispatch({
          type: 'updateScore',
          payload: value, // leave it like this
        });
      }
    }
  };

  return (
    <FormControl sx={{ gridColumn: '1/2', gridRow: '2/3' }}>
      <FormLabel sx={{ marginRight: '10px' }}>Score:</FormLabel>
      <Input
        size="sm"
        type="number"
        value={myAdvancedInput.advancedInput.score}
        onKeyDown={(evt) =>
          ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
        }
        slotProps={{
          input: {
            min: 0,
            max: 10,
            step: 0.1,
          },
        }}
        sx={{ marginRight: '10px' }}
        onChange={onChange}
      />
    </FormControl>
  );
}
