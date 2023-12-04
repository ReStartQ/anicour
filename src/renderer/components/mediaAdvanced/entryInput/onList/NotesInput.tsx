import { Box, FormControl, FormLabel, Input, Textarea } from '@mui/joy';
import { useAdvancedInput } from 'renderer/context/advanced/AdvancedInputContext';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';

export default function NotesInput() {
  const myAdvancedMedia: any = useAdvancedMedia();
  const myAdvancedInput: any = useAdvancedInput();

  const onChange = (e: any) => {
    myAdvancedInput.dispatch({ type: 'updateNotes', payload: e.target.value });
  };

  const changeValue = (value: any) => {
    myAdvancedInput.dispatch({ type: 'updateNotes', payload: value });
  };

  const handleKeyDown = (event: any) => {
    if (event.keyCode === 9) {
      // Check if the pressed key is the tab key
      event.preventDefault(); // Prevent the default tab behavior
      const { selectionStart, selectionEnd, value } = event.target;
      const newValue = `${value.substring(
        0,
        selectionStart,
      )}  ${value.substring(selectionEnd)}`;
      changeValue(newValue); // Update the value of the textarea
      event.target.setSelectionRange(selectionStart + 2, selectionStart + 2); // Move the cursor two spaces forward
    }
  };

  return (
    <FormControl sx={{ width: '100%', gridColumn: '1/4', gridRow: '3/4' }}>
      <FormLabel>Notes: </FormLabel>
      <Box>
        <Input
          size="sm"
          value={
            myAdvancedInput.advancedInput.notes !== null
              ? myAdvancedInput.advancedInput.notes
              : ''
          }
          onKeyDown={handleKeyDown}
          onChange={onChange}
          slotProps={{
            input: {
              spellCheck: 'false',
            },
          }}
        />
      </Box>
    </FormControl>
  );
}

/*
        <Textarea
          size="sm"
          minRows={1}
          maxRows={1}
          value={
            myAdvancedInput.advancedInput.notes !== null
              ? myAdvancedInput.advancedInput.notes
              : ''
          }
          onKeyDown={handleKeyDown}
          slotProps={{ textarea: { spellCheck: false } }}
          onChange={onChange}
        />
*/
