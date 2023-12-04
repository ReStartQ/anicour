import { useAdvancedInput } from 'renderer/context/advanced/AdvancedInputContext';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';
import Box from '@mui/joy/Box';
import Checkbox, { checkboxClasses } from '@mui/joy/Checkbox';
import { FormControl, FormLabel } from '@mui/joy';

export default function PrivateCheckBox() {
  const myAdvancedMedia: any = useAdvancedMedia();
  const myAdvancedInput: any = useAdvancedInput();

  const onClick = (e: any) => {
    myAdvancedInput.dispatch({
      type: 'updatePrivate',
      payload: !myAdvancedInput.advancedInput.private,
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gridColumn: '3/4',
        gridRow: '2/3',
      }}
    >
      <FormControl>
        <FormLabel sx={{ marginLeft: '20px', marginBottom: '10px' }}>
          Private:
        </FormLabel>
        <Checkbox
          size="lg"
          sx={{ justifySelf: 'center', marginLeft: '20px' }}
          onClick={onClick}
          checked={myAdvancedInput.advancedInput.private}
          // to demonstrate the focus outline
        />
      </FormControl>
    </Box>
  );
}
