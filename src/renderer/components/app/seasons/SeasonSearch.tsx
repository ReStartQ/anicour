import SearchIcon from '@mui/icons-material/Search';
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  NativeSelect,
} from '@mui/material';
import Box from '@mui/material/Box';
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
    setMySeason(event.target.value);
  };

  const handleChange2 = (event: any) => {
    /*
    seasonInput.setSeasonInput([
      seasonInput.seasonInput[0],
      event.target.value,
    ]);
    */
    setMyYear(event.target.value);
  };

  const handleOnClick = () => {
    if (
      mySeason !== seasonInput.seasonInput[0] ||
      myYear !== seasonInput.seasonInput[1]
    ) {
      seasonInput.setSeasonInput([mySeason, myYear]);
    }
  };

  const handleKeyboard = (e: any) => {
    console.log(e.key);
    // e.preventDefault();
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
      ml="10px"
    >
      <FormControl sx={{ flexBasis: '42%' }}>
        <InputLabel
          variant="standard"
          htmlFor="uncontrolled-nativeSeasonSelect"
        >
          Season
        </InputLabel>
        <NativeSelect
          value={mySeason}
          inputProps={{
            name: 'Season',
            id: 'uncontrolled-nativeSeasonSelect',
          }}
          onChange={handleChange}
          onKeyDown={handleKeyboard}
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
      <FormControl sx={{ flexBasis: '30%' }}>
        <InputLabel variant="standard" htmlFor="uncontrolled-nativeYearSelect">
          Year
        </InputLabel>
        <NativeSelect
          value={myYear}
          inputProps={{
            name: 'Year',
            id: 'uncontrolled-nativeYearSelect',
          }}
          onChange={handleChange2}
          onKeyDown={handleKeyboard}
        >
          {years.map((year: any) => {
            return (
              <option value={year} key={year}>
                {year}
              </option>
            );
          })}
        </NativeSelect>
      </FormControl>
      <IconButton
        sx={{
          flexBasis: '15%',
          alignSelf: 'flex-end',
          borderRadius: 1,
          backgroundColor: '#1873CC',
          ':hover': { backgroundColor: 'dodgerblue' },
        }}
        onClick={handleOnClick}
        size="small"
      >
        <SearchIcon fontSize="medium" />
      </IconButton>
    </Box>
  );
}
