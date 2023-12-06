import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

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
        variant="contained"
        color="error"
        onClick={handleClickOpen}
        fullWidth
      >
        <PowerSettingsNewIcon sx={{ mr: '5px' }} />
        Reset Settings
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Reset app data to default?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This will reset all settings to default.
            <br />
            Your account settings data will be reset and you will have to
            reconnect your account to the app.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleClose(true)}
            variant="contained"
            color="error"
          >
            <PowerSettingsNewIcon sx={{ mr: '5px' }} />
            Reset
          </Button>
          <Button onClick={() => handleClose(false)} variant="contained">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
