import { FormControl, FormLabel, Input } from '@mui/joy';
import { forwardRef } from 'react';
import { useAdvancedInput } from 'renderer/context/advanced/AdvancedInputContext';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';
import { getMaxValueEpisodesOrChapters } from 'renderer/functions/input/InputFunctions';

export default function ProgressInput() {
  const myAdvancedMedia: any = useAdvancedMedia();
  const myAdvancedInput: any = useAdvancedInput();

  const onChange = (e: any) => {
    // min and max function, where 0 is min and max is episode/chapter number depending on if ANIME or MANGA
    const value = e.target.value
      .replace(/[^0-9]+/g, '')
      .replace(/^(?:0+(?=[1-9])|0+(?=0$))/gm, ''); // removes all leading 0's except 0
    console.log(parseInt(value, 10) || 0);

    const maxValue = getMaxValueEpisodesOrChapters(
      myAdvancedMedia.advancedMedia.type,
      myAdvancedMedia.advancedMedia.episodes,
      myAdvancedMedia.advancedMedia.chapters,
    );
    let isMaxNull = false;
    if (maxValue === null) {
      isMaxNull = true;
    }
    // if it is null check if the value is greater than 9999
    if (isMaxNull) {
      if (parseInt(value, 10) > 9999) {
        myAdvancedInput.dispatch({
          type: 'updateProgress',
          payload: 9999,
        });
      } else {
        myAdvancedInput.dispatch({
          type: 'updateProgress',
          payload: value, // leave it like this for now
        });
      }
    }
    if (!isMaxNull) {
      if (parseInt(value, 10) > maxValue) {
        myAdvancedInput.dispatch({
          type: 'updateProgress',
          payload: maxValue,
        });
      } else {
        myAdvancedInput.dispatch({
          type: 'updateProgress',
          payload: value, // leave it like this for now
        });
      }
    }

    console.log(myAdvancedInput.advancedInput.progress);
  };

  return (
    <FormControl sx={{ gridColumn: '1/2', gridRow: '1/2' }}>
      <FormLabel>
        {myAdvancedMedia.advancedMedia.type === 'ANIME'
          ? `Episodes:
            `
          : `Chapters:
            `}
      </FormLabel>
      <Input
        size="sm"
        type="number"
        value={myAdvancedInput.advancedInput.progress}
        onChange={onChange}
        onKeyDown={(evt) =>
          ['e', 'E', '+', '-', '.'].includes(evt.key) && evt.preventDefault()
        }
        sx={{ marginRight: '10px' }}
        slotProps={{
          input: {
            pattern: '[0-9]',
            min: 0,
            max:
              getMaxValueEpisodesOrChapters(
                myAdvancedMedia.advancedMedia.type,
                myAdvancedMedia.advancedMedia.episodes,
                myAdvancedMedia.advancedMedia.chapters,
              ) !== null
                ? getMaxValueEpisodesOrChapters(
                    myAdvancedMedia.advancedMedia.type,
                    myAdvancedMedia.advancedMedia.episodes,
                    myAdvancedMedia.advancedMedia.chapters,
                  )
                : 9999,
            step: 1,
          },
        }}
      />
    </FormControl>
  );
}
