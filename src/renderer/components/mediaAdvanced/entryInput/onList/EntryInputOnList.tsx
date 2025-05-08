import { Card, CardContent } from '@mui/material';
import { useAdvancedInput } from 'renderer/context/advanced/AdvancedInputContext';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';
import MyDatePickerCompletedAt from './MyDatePickerCompletedAt';
import MyDatePickerStartedAt from './MyDatePickerStartedAt';
import NotesInput from './NotesInput';
import PrivateCheckBox from './PrivateCheckBox';
import ProgressInput from './ProgressInput';
import ProgressVolumesInput from './ProgressVolumesInput';
import RepeatInput from './RepeatInput';
import ScoreInput from './ScoreInput';
import StatusSelect from './StatusSelect';
import UpdateButton from './UpdateButton';

export default function EntryInputOnList() {
  const myAdvancedMedia: any = useAdvancedMedia();
  const myAdvancedInput: any = useAdvancedInput();

  return (
    <Card
      elevation={0}
      sx={{
        gridColumn: '2/3',
        gridRow: '3/6',
        border: '1px solid SteelBlue',
      }}
      variant="outlined"
    >
      <CardContent
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)', // 175 px
          gridTemplateRows: 'repeat(4, 1fr)', // 73 px
          width: '100%',
          height: '100%',
          padding: '16px',
          '&:last-child': { pb: '16px' },
        }}
      >
        <ProgressInput />
        {myAdvancedMedia.advancedMedia.type === 'MANGA' ? (
          <ProgressVolumesInput />
        ) : null}
        <RepeatInput />
        <ScoreInput />
        <StatusSelect />
        <PrivateCheckBox />
        <MyDatePickerStartedAt />
        <MyDatePickerCompletedAt />
        <NotesInput />
        <UpdateButton />
      </CardContent>
    </Card>
  );
}

//      <MyDatePicker props={0} />
