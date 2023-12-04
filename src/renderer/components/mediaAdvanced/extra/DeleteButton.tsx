import { Box, Button } from '@mui/joy';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAtom } from 'jotai';
import { infoTypeAtom } from 'renderer/store';
import { useAniListUsername } from 'renderer/context/services/AniListUsernameContext';
import { useAniListToken } from 'renderer/context/services/AniListTokenContext';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';
import { useDeleteEntryData } from 'renderer/functions/api/mutations/deleteEntry';
import { useAdvancedInput } from 'renderer/context/advanced/AdvancedInputContext';

const DeleteButton = () => {
  const [infoType, setInfoType] = useAtom(infoTypeAtom);
  const myUserName: any = useAniListUsername();
  const myToken: any = useAniListToken();
  const myAdvancedMedia: any = useAdvancedMedia();
  const deleteMutation: any = useDeleteEntryData();
  const myAdvancedInput: any = useAdvancedInput();
  const onClick = () => {
    setInfoType(0);
    console.log('deleted');
    const entry: any = {
      myUserName: myUserName.AniListUsername,
      myToken: myToken.AniListToken,
      myMediaId: myAdvancedMedia.advancedMedia.id,
      mediaListEntry: myAdvancedInput.advancedInput,
      advancedMedia: myAdvancedMedia.advancedMedia,
    };
    deleteMutation.mutate(entry);
  };

  return (
    <Box
      style={{
        textDecoration: 'none',
        height: 'fit-content',
        alignSelf: 'center',
      }}
    >
      <Button variant="soft" color="danger" onClick={onClick}>
        <DeleteIcon sx={{ mr: 1 }} fontSize="medium" />
        Remove from List
      </Button>
    </Box>
  );
};

export default DeleteButton;
