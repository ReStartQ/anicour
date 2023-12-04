import { FormControl, FormLabel, Input } from '@mui/joy';
import { useAdvancedInput } from 'renderer/context/advanced/AdvancedInputContext';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';

export default function ProgressVolumesInput() {
  const myAdvancedMedia: any = useAdvancedMedia();
  const myAdvancedInput: any = useAdvancedInput();

  const onChange = (e: any) => {
    // min and max function, where 0 is min and max is episode/chapter number depending on if ANIME or MANGA
    const value = e.target.value
      .replace(/[^0-9]+/g, '')
      .replace(/^(?:0+(?=[1-9])|0+(?=0$))/gm, '');
    console.log(parseInt(value, 10) || 0);

    const maxValue = myAdvancedMedia.advancedMedia.volumes;
    let isMaxNull = false;
    if (maxValue === null) {
      isMaxNull = true;
    }
    // if it is null check if the value is greater than 9999
    if (isMaxNull) {
      if (parseInt(value, 10) > 9999) {
        myAdvancedInput.dispatch({
          type: 'updateProgressVolumes',
          payload: 9999,
        });
      } else {
        myAdvancedInput.dispatch({
          type: 'updateProgressVolumes',
          payload: value, // leave it like this
        });
      }
    }
    if (!isMaxNull) {
      if (parseInt(value, 10) > maxValue) {
        myAdvancedInput.dispatch({
          type: 'updateProgressVolumes',
          payload: maxValue,
        });
      } else {
        myAdvancedInput.dispatch({
          type: 'updateProgressVolumes',
          payload: value, // leave it like this
        });
      }
    }

    console.log(myAdvancedInput.advancedInput.progressVolumes);
  };

  return (
    <FormControl sx={{ gridColumn: '2/3', gridRow: '1/2' }}>
      <FormLabel sx={{ marginLeft: '10px' }}>Volumes:</FormLabel>
      <Input
        size="sm"
        type="number"
        value={myAdvancedInput.advancedInput.progressVolumes}
        onChange={onChange}
        onKeyDown={(evt) =>
          ['e', 'E', '+', '-', '.'].includes(evt.key) && evt.preventDefault()
        }
        sx={{ marginLeft: '10px' }}
        slotProps={{
          input: {
            pattern: '[0-9]',
            min: 0,
            max:
              myAdvancedMedia.advancedMedia.volumes !== null
                ? myAdvancedMedia.advancedMedia.volumes
                : 9999,
            step: 1,
          },
        }}
      />
    </FormControl>
  );
}
