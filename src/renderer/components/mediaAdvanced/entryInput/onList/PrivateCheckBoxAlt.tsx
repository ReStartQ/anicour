import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { useAdvancedInput } from 'renderer/context/advanced/AdvancedInputContext';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';

export default function PrivateCheckBoxAlt() {
  const myAdvancedMedia: any = useAdvancedMedia();
  const myAdvancedInput: any = useAdvancedInput();

  const onClick = (e: any) => {
    myAdvancedInput.dispatch({
      type: 'updatePrivate',
      payload: !myAdvancedInput.advancedInput.private,
    });
  };

  return (
    <FormGroup
      aria-label="position"
      sx={{ gridRow: '2 / 3', gridColumn: '3 / 4' }}
    >
      <FormControlLabel
        control={
          <Checkbox size="medium" sx={{ alignSelf: 'start', padding: 0 }} />
        }
        onClick={onClick}
        sx={{ alignSelf: 'start', margin: 0 }}
        checked={myAdvancedInput.advancedInput.private}
        label="Private:"
        labelPlacement="top"
      />
    </FormGroup>
  );
}
