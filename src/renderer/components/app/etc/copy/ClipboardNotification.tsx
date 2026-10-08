import { Alert, Box, Snackbar } from '@mui/material';
import { useAtom } from 'jotai';
import { SyntheticEvent } from 'react';
import { messageIDAtom, notificationCopyOpenAtom } from 'renderer/store';

const ClipboardNotification = () => {
  const [notifcationCopyOpen, setNotificationCopyOpen] = useAtom(
    notificationCopyOpenAtom,
  );
  const [messageID, setMessageID] = useAtom(messageIDAtom);

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setNotificationCopyOpen(false);
  };

  return (
    <Box sx={{ width: 0, height: 0 }}>
      <Snackbar
        open={notifcationCopyOpen}
        autoHideDuration={3000}
        disableWindowBlurListener
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        key={`Message: ${messageID}`}
      >
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          Copied to Clipboard: {messageID}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ClipboardNotification;
