import SearchIcon from '@mui/icons-material/Search';
import { KeyboardArrowDown } from '@mui/icons-material';
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Option,
  Box,
  Button,
  IconButton,
} from '@mui/joy';
import { InputLabel, NativeSelect, Typography } from '@mui/material';
import { useState } from 'react';
import { useSeasonInput } from 'renderer/context/SeasonInputContext';

export default function SeasonSearch({ props }: any) {
  const seasonInput: any = useSeasonInput();

  const [mySeason, setMySeason] = useState(seasonInput.seasonInput[0]);
  const [myYear, setMyYear] = useState(seasonInput.seasonInput[1]);

  const currentYear = new Date().getFullYear();
  const range = (start: number, stop: number, step: number) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step,
    );
  console.log(range(currentYear, 1960, -1));
  const [years, setYears] = useState(range(currentYear + 1, 1960, -1));

  const handleChange = (event: any) => {
    /*
    seasonInput.setSeasonInput([
      event.target.value,
      seasonInput.seasonInput[1],
    ]);
    */
    console.log('change');
    setMySeason(event.target.value);
  };

  const handleChange2 = (event: any) => {
    /*
    seasonInput.setSeasonInput([
      seasonInput.seasonInput[0],
      event.target.value,
    ]);
    */
    console.log(`change year${event.target.value}`);
    if (event.target.value > currentYear + 1) {
      setMyYear(currentYear + 1);
    } else {
      setMyYear(event.target.value);
    }
  };

  const handleOnClick = () => {
    if (
      mySeason !== seasonInput.seasonInput[0] ||
      myYear !== seasonInput.seasonInput[1]
    ) {
      if (myYear < 1960) {
        setMyYear(currentYear);
        seasonInput.setSeasonInput([mySeason, currentYear]);
      } else {
        seasonInput.setSeasonInput([mySeason, myYear]);
      }
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignContent="center"
      flexWrap="wrap"
      gap="10px"
      my="10px"
      mx="5px"
    >
      <FormControl>
        <FormLabel>Season</FormLabel>
        <NativeSelect
          value={mySeason}
          inputProps={{
            name: 'Season',
            id: 'uncontrolled-nativeSeasonSelect',
          }}
          sx={{
            border: '1px solid #03a9f4',
            borderRadius: '5px',
            mt: '1px',
            pl: '10px',
            pr: '10px',
            color: ' #81d4fa',
            '&:hover': {
              backgroundColor: '#1F242F',
            },
            backgroundColor: '#0b0d0e',
          }}
          disableUnderline
          onChange={handleChange}
        >
          <option value="WINTER" key="WINTER">
            Winter
          </option>
          <option value="SPRING" key="SPRING">
            Spring
          </option>
          <option value="SUMMER" key="SUMMER">
            Summer
          </option>
          <option value="FALL" key="FALL">
            Fall
          </option>
        </NativeSelect>
      </FormControl>
      <FormControl>
        <FormLabel>Year</FormLabel>
        <Input
          variant="outlined"
          color="primary"
          size="md"
          type="number"
          value={myYear}
          onChange={handleChange2}
          onKeyDown={(evt) =>
            ['e', 'E', '+', '-', '.'].includes(evt.key) && evt.preventDefault()
          }
          sx={{ width: '90px' }}
          slotProps={{
            input: {
              pattern: '[0-9]',
              min: 1960,
              max: currentYear + 1,
              step: 1,
            },
          }}
        />
      </FormControl>
      <Button
        onClick={handleOnClick}
        size="sm"
        color="primary"
        fullWidth
        sx={{
          px: '2px',
          // height: '28px',
          // width: '28px',
          mx: '12px',
          alignSelf: 'flex-end',
          mb: '2px',
          '&:hover': {
            backgroundColor: '#213963', // #1F242F
          },
          backgroundColor: '#142543',
        }}
        variant="soft"
      >
        <Typography fontSize="16px">Search</Typography>
      </Button>
    </Box>
  );
}
