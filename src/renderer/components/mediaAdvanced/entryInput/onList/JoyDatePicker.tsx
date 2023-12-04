import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';

export default function JoyDatePicker() {
  return (
    <Stack spacing={1.5} sx={{ minWidth: 300 }}>
      <Input
        type="date"
        slotProps={{
          input: {
            min: '2018-06-07T00:00',
            max: '2018-06-14T00:00',
          },
        }}
      />
    </Stack>
  );
}
