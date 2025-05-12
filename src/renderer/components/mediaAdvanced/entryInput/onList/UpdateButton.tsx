import { Box } from '@mui/material';
import Button from '@mui/joy/Button';
import { useAdvancedInput } from 'renderer/context/advanced/AdvancedInputContext';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';
import { useAniListToken } from 'renderer/context/services/AniListTokenContext';
import { useAniListUsername } from 'renderer/context/services/AniListUsernameContext';
import { useUpdateEntryData } from 'renderer/functions/api/mutations/updateEntry';
import { useAtom } from 'jotai';
import { isValidCompleteDateAtom, isValidStartDateAtom } from 'renderer/store';
import { useState } from 'react';

export default function UpdateButton() {
  const myAdvancedMedia: any = useAdvancedMedia();
  const myAdvancedInput: any = useAdvancedInput();
  const updateMutation: any = useUpdateEntryData();
  const myUserName: any = useAniListUsername();
  const myToken: any = useAniListToken();
  const [isDisabled, setIsDisabled] = useState(false);

  const [isValidCompleteDate, setIsValidCompleteDate] = useAtom(
    isValidCompleteDateAtom,
  );

  const [isValidStartDate, setIsValidStartDate] = useAtom(isValidStartDateAtom);

  const handleUpdate = () => {
    console.log(myAdvancedInput.advancedInput);
    const today = new Date();

    if (isValidStartDate) {
      console.log('valid date');
      setIsValidStartDate(true);
    } else {
      console.log('invalid date');
      setIsValidStartDate(true);
    }

    if (isValidCompleteDate) {
      console.log('valid date');
      setIsValidCompleteDate(true);
    } else {
      console.log('invalid date');
      setIsValidCompleteDate(true);
    }

    let isValidProgress = false; // can only be a whole number
    // let isValidProgressVolumes = false; // can be a whole number or null
    let isValidRepeat = false; // can only be a whole number
    // let isValidScore = false; // can be either a whole number or decimal to the first decimal place

    if (Number.isInteger(myAdvancedInput.advancedInput.progress)) {
      isValidProgress = true;
    }

    if (Number.isInteger(myAdvancedInput.advancedInput.progress)) {
      isValidRepeat = true;
    }

    const myScore: any = parseFloat(myAdvancedInput.advancedInput.score) || 0;

    const entry: any = {
      myUserName: myUserName.AniListUsername, // same
      myToken: myToken.AniListToken, // same
      myMediaId: myAdvancedMedia.advancedMedia.id, // props.id
      myStatus: myAdvancedInput.advancedInput.status, // for main, it is props.mediaListEntry.status
      advancedInput: {
        ...myAdvancedInput.advancedInput,
        progress: parseInt(myAdvancedInput.advancedInput.progress, 10) || 0,
        progressVolumes:
          parseInt(myAdvancedInput.advancedInput.progressVolumes, 10) || 0,
        repeat: parseInt(myAdvancedInput.advancedInput.repeat, 10) || 0,
        score: myScore.toFixed(1),
      }, // for main, it is props.mediaListEntry, edit out props.mediaListEntry - progress, progressVolumes and score
      advancedMedia: myAdvancedMedia.advancedMedia, // for main, it is props
    };

    // update if empty and it fails
    myAdvancedInput.dispatch({
      type: 'updateInput',
      payload: parseInt(myAdvancedInput.advancedInput.progress, 10) || 0,
    });
    myAdvancedInput.dispatch({
      type: 'updateProgressVolumes',
      payload: parseInt(myAdvancedInput.advancedInput.progressVolumes, 10) || 0,
    });
    myAdvancedInput.dispatch({
      type: 'updateRepeat',
      payload: parseInt(myAdvancedInput.advancedInput.repeat, 10) || 0,
    });

    myAdvancedInput.dispatch({
      type: 'updateScore',
      payload:
        myScore.toFixed(1) % 1 === 0
          ? Math.round(myScore.toFixed(1))
          : myScore.toFixed(1),
    });

    updateMutation.mutate(entry);
    // need to solve the issue for when the entry is freshly added and you try to save
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gridColumn: '3/4',
        gridRow: '4/5',
        width: '100%',
      }}
    >
      <Button
        variant="soft"
        color="primary"
        size="lg"
        onClick={handleUpdate}
        sx={{
          alignSelf: 'end',
          flexBasis: '100%',
          ml: '20px',
        }}
        disabled={isDisabled}
      >
        Update
      </Button>
    </Box>
  );
}
