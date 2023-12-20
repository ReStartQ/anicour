import { useColorScheme as useJoyColorScheme } from '@mui/joy/styles';
import { Card, Paper } from '@mui/material';
import { useColorScheme as useMaterialColorScheme } from '@mui/material/styles';
import { useEffect } from 'react';
import { useTheme } from 'renderer/context/ThemeContext';
import AdvancedDescription from './description/AdvancedDescription';
import EntryInputOnList from './entryInput/onList/EntryInputOnList';
import AdvancedExtra from './extra/AdvancedExtra';
import AdvancedImage from './image/AdvancedImage';
import AdvancedInformation from './information/AdvancedInformation';
import AdvancedTitle from './title/AdvancedTitle';

export default function AdvancedMain({ props }: any) {
  const myTheme: any = useTheme();
  const { setMode: setJoyMode } = useJoyColorScheme();
  const { mode, setMode: setMaterialMode } = useMaterialColorScheme();

  useEffect(() => {
    if (myTheme.theme === true) {
      setJoyMode('dark');
      setMaterialMode('dark');
    } else {
      setJoyMode('light');
      setMaterialMode('light');
    }
  }, [myTheme, setJoyMode, setMaterialMode]);

  return (
    <Paper
      elevation={0}
      square
      sx={{
        height: 'calc( 100vh )',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '250px 564px', // 844 - 10 -20 = 814
        gridTemplateRows: '55px 232px 33px 40px 210px', // 611 - 40 - 20 = 551
        gridGap: '10px',
        padding: '15px',
      }}
    >
      <AdvancedImage />
      <AdvancedTitle />
      <AdvancedDescription />
      <AdvancedExtra />
      <AdvancedInformation />
      <EntryInputOnList />
    </Paper>
  );
}

// title is a 2 liner
