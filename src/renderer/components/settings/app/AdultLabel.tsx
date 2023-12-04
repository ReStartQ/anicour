import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useAdult } from 'renderer/context/AdultContext';
import { useAniListToken } from 'renderer/context/services/AniListTokenContext';
import { useAniListUsername } from 'renderer/context/services/AniListUsernameContext';
import { changeUserAdult, getUser } from 'renderer/functions/UserFunctions';

function AdultLabel() {
  const adult: any = useAdult();
  const myToken: any = useAniListToken();
  const myUsername: any = useAniListUsername();

  const handleChange = async (event: any) => {
    await adult.setAdult(event.target.checked);
    if (event.target.checked) {
      window.electron.ipcRenderer.sendMessage('adultFlag', [
        event.target.checked,
      ]);
      console.log(adult);
      console.log(event.target.checked);
      console.log(
        getUser({
          username: myUsername.AniListUsername,
          myToken: myToken.AniListToken,
          adult: true,
        }),
      );
      /* console.log(
        changeUserAdult({
          username: myUsername.AniListUsername,
          myToken: myToken.AniListToken,
          adult: true,
        }),
      ); */
    }
    if (!event.target.checked) {
      window.electron.ipcRenderer.sendMessage('adultFlag', [
        event.target.checked,
      ]);
      console.log(event.target.checked);
      console.log(
        getUser({
          username: myUsername.AniListUsername,
          myToken: myToken.AniListToken,
          adult: true,
        }),
      );
      /* console.log(
        changeUserAdult({
          username: myUsername.AniListUsername,
          myToken: myToken.AniListToken,
          adult: false,
        }),
      ); */
    }
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={adult.adult} />}
          label="18+ Content"
          onChange={handleChange}
        />
      </FormGroup>
    </Box>
  );
}

export default AdultLabel;
