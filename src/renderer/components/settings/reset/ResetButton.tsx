import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import { SettingsBackupRestore } from '@mui/icons-material';

export default function ResetButton() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: boolean) => {
    setOpen(false);
    if (value) {
      window.electron.store.clear();
    }
    // update in main
  };
  return (
    <div>
      <Button
        variant="outlined"
        color="error"
        onClick={handleClickOpen}
        fullWidth
      >
        <SettingsBackupRestore sx={{ mr: 1 }} />
        <Typography>Reset to Default</Typography>
      </Button>
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
      >
        <DialogTitle id="alert-dialog-title">
          Reset app data to default
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description2">
            The app will be reset to the default settings.
          </DialogContentText>
          <DialogContentText id="alert-dialog-description3">
            You will need to re-enter your AniList account information.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleClose(true)}
            variant="outlined"
            color="error"
          >
            <SettingsBackupRestore sx={{ mr: 1 }} />
            <Typography>Reset to Default</Typography>
          </Button>
          <Button onClick={() => handleClose(false)} variant="outlined">
            <Typography>Cancel</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
