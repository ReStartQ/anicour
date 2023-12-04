import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import { useSeasonInput } from 'renderer/context/SeasonInputContext';
import { useState } from 'react';
import { formatSeason } from 'renderer/functions/edit/formatInfo';
import SeasonSearch from './SeasonSearch';

export default function MaxWidthDialog() {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('sm');
  const seasonInput: any = useSeasonInput();

  const [mySeason, setMySeason] = useState(seasonInput.seasonInput[0]);
  const [myYear, setMyYear] = useState(seasonInput.seasonInput[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMaxWidthChange = (event: SelectChangeEvent<typeof maxWidth>) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value,
    );
  };

  const handleFullWidthChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFullWidth(event.target.checked);
  };

  return (
    <Box width="100%" sx={{ my: '5px' }}>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        fullWidth
        sx={{ textTransform: 'none' }}
      >
        {formatSeason(mySeason, myYear)}
      </Button>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Seasons</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Set the season + year to be displayed
          </DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
            }}
          >
            <SeasonSearch />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="success" onClick={handleClose}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
