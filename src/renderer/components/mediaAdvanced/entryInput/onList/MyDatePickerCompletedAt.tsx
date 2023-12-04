import { Box } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useAdvancedInput } from 'renderer/context/advanced/AdvancedInputContext';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';
import { isValidCompleteDateAtom } from 'renderer/store';

export default function MyDatePickerCompletedAt({ props }: any) {
  const myMediaAdvanced: any = useAdvancedMedia();
  const myAdvancedInput: any = useAdvancedInput();

  const [isValidCompleteDate, setIsValidCompleteDate] = useAtom(
    isValidCompleteDateAtom,
  );

  const onChange = (e: any) => {
    console.log('changing');
    if (e !== null) {
      if (
        Number.isNaN(e.year()) ||
        Number.isNaN(e.month()) ||
        Number.isNaN(e.date())
      ) {
        console.log('setting to null');
        myAdvancedInput.dispatch({
          type: 'updateCompletedAt',
          payload: { year: null, month: null, day: null },
        });
        // set isValidCompleteDate to true
        setIsValidCompleteDate(true);
      } else {
        console.log('setting state');
        // set isValidCompleteDate to true
        setIsValidCompleteDate(true);
        myAdvancedInput.dispatch({
          type: 'updateCompletedAt',
          payload: { year: e.year(), month: e.month() + 1, day: e.date() },
        });
      }
      console.log(myAdvancedInput.advancedInput.completedAt);
      console.log(e.year());
      console.log(e.month() + 1);
      console.log(e.date());
      console.log(e);
    } else {
      console.log(e);
      console.log(myAdvancedInput.advancedInput.completedAt);
    }
  };

  const onError = (e: any) => {
    console.log(`error`);
    // set isValidCompleteDate to false
    if (
      myAdvancedInput.advancedInput.completedAt.year === null &&
      myAdvancedInput.advancedInput.completedAt.month === null &&
      myAdvancedInput.advancedInput.completedAt.day === null
    ) {
      setIsValidCompleteDate(false);
    }
  };

  return (
    <Box
      sx={{
        gridRow: '4/5',
        width: '170px',
        marginLeft: '10px',
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DemoItem label="Date Completed: ">
            <DesktopDatePicker
              value={
                myAdvancedInput.advancedInput.completedAt.year !== null &&
                myAdvancedInput.advancedInput.completedAt.month !== null &&
                myAdvancedInput.advancedInput.completedAt.day !== null
                  ? dayjs(
                      `${myAdvancedInput.advancedInput.completedAt.year}-${myAdvancedInput.advancedInput.completedAt.month}-${myAdvancedInput.advancedInput.completedAt.day}`,
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
              key={isValidCompleteDate ? 'validComplete' : 'notValidComplete'}
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    </Box>
  );
}
