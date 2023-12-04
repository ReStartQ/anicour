import { Box } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import { useAdvancedInput } from 'renderer/context/advanced/AdvancedInputContext';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';
import { isValidStartDateAtom } from 'renderer/store';

export default function MyDatePickerStartedAt({ props }: any) {
  const myMediaAdvanced: any = useAdvancedMedia();
  const myAdvancedInput: any = useAdvancedInput();

  const [isValidStartDate, setIsValidStartDate] = useAtom(isValidStartDateAtom);

  const onChange = (e: any) => {
    if (e !== null) {
      if (
        Number.isNaN(e.year()) ||
        Number.isNaN(e.month()) ||
        Number.isNaN(e.date())
      ) {
        console.log('setting to null');
        myAdvancedInput.dispatch({
          type: 'updateStartedAt',
          payload: { year: null, month: null, day: null },
        });
        // set isValidStartDate to true
        setIsValidStartDate(true);
      } else {
        console.log('setting state');
        // set isValidCompleteDate to true
        setIsValidStartDate(true);
        myAdvancedInput.dispatch({
          type: 'updateStartedAt',
          payload: { year: e.year(), month: e.month() + 1, day: e.date() },
        });
      }
      console.log(myAdvancedInput.advancedInput.startedAt);
      console.log(e.year());
      console.log(e.month() + 1);
      console.log(e.date());
      console.log(e);
    } else {
      console.log(e);
      console.log(myAdvancedInput.advancedInput.startedAt);
    }
  };

  const onError = (e: any) => {
    console.log('error');
    // set isValidCompleteDate to false
    if (
      myAdvancedInput.advancedInput.completedAt.year === null &&
      myAdvancedInput.advancedInput.completedAt.month === null &&
      myAdvancedInput.advancedInput.completedAt.day === null
    )
      setIsValidStartDate(false);
  };

  return (
    <Box sx={{ gridRow: '4/5', width: '170px', marginRight: '10px' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DemoItem label="Date Started: ">
            <DesktopDatePicker
              value={
                myAdvancedInput.advancedInput.startedAt.year !== null &&
                myAdvancedInput.advancedInput.startedAt.month !== null &&
                myAdvancedInput.advancedInput.startedAt.day !== null
                  ? dayjs(
                      `${myAdvancedInput.advancedInput.startedAt.year}-${myAdvancedInput.advancedInput.startedAt.month}-${myAdvancedInput.advancedInput.startedAt.day}`,
                    )
                  : null
              }
              onChange={onChange}
              slotProps={{
                textField: {
                  size: 'small',
                },
                openPickerButton: {
                  size: 'small',
                },
              }}
              onError={onError}
              key={isValidStartDate ? 'validStart' : 'notValidStart'}
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    </Box>
  );
}
