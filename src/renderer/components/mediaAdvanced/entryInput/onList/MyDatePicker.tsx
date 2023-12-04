import { Box } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { useAdvancedInput } from 'renderer/context/advanced/AdvancedInputContext';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';

export default function MyDatePicker({ props }: any) {
  const myMediaAdvanced: any = useAdvancedMedia();
  const myAdvancedInput: any = useAdvancedInput();

  const onChange = (e: any) => {
    console.log(myAdvancedInput.advancedInput.startedAt);
    console.log(e.year());
    console.log(e.month() + 1);
    console.log(e.date());

    myAdvancedInput.dispatch({
      type: 'updateStartedAt',
      payload: { year: e.year(), month: e.month() + 1, day: e.date() },
    });
  };

  return (
    <Box flexBasis="32%">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DemoItem label={props === 0 ? 'Date Started: ' : 'Date Completed: '}>
            <DesktopDatePicker
              value={dayjs(
                `${myAdvancedInput.advancedInput.startedAt.year}-${myAdvancedInput.advancedInput.startedAt.month}-${myAdvancedInput.advancedInput.startedAt.day}`,
              )}
              onChange={onChange}
              slotProps={{ textField: { size: 'small' } }}
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    </Box>
  );
}
