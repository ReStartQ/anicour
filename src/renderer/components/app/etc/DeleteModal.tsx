/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';
import { useAniListToken } from 'renderer/context/services/AniListTokenContext';
import { useAniListUsername } from 'renderer/context/services/AniListUsernameContext';
import { useTitle } from 'renderer/context/TitleContext';
import { useDeleteEntryData } from 'renderer/functions/api/mutations/deleteEntry';
import { getTitle } from 'renderer/functions/view/TitlePreferenceFunctions';

interface RemoveModalProps {
  props: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteModal = ({ props, open, setOpen }: RemoveModalProps) => {
  const titlePreference: any = useTitle();
  const myUserName: any = useAniListUsername();
  const myToken: any = useAniListToken();
  const deleteMutation: any = useDeleteEntryData();

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemove = () => {
    console.log('Delete has been clicked');
    setOpen(false);
    const entry: any = {
      myUserName: myUserName.AniListUsername,
      myToken: myToken.AniListToken,
      myMediaId: props.id,
      mediaListEntry: props.mediaListEntry,
      advancedMedia: props,
    };
    deleteMutation.mutate(entry);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          '& .MuiPaper-root': {
            background: '#121212',
            border: '1px solid #2f2f2f',
          },
        }}
        onContextMenu={(e) => {
          e.stopPropagation(); // Stop the event from reaching context menu
          e.preventDefault(); // Stop the electron context menu from appearing, can be removed if inspect element is needed
        }}
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this media from your list?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" fontSize={14}>
            {getTitle(titlePreference.title, props)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={handleRemove}
            size="small"
          >
            Delete
          </Button>
          <Button variant="contained" onClick={handleClose} size="small">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteModal;
