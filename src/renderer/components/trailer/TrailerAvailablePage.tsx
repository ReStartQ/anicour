import { Box, IconButton, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from 'renderer/context/ThemeContext';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useColorScheme as useJoyColorScheme } from '@mui/joy/styles';
import { useColorScheme as useMaterialColorScheme } from '@mui/material/styles';
import 'renderer/styles/Trailer.scss';
import MyTrailer from './MyTrailer';

export default function TrailerAvailablePage({ props }: any) {
  const myTheme: any = useTheme();
  const myAdvancedMedia: any = useAdvancedMedia();
  const { setMode: setJoyMode } = useJoyColorScheme();
  const { mode, setMode: setMaterialMode } = useMaterialColorScheme();
  const [mounted, setMounted] = useState(false);

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
    <Box sx={{ display: 'inline-flex', flexDirection: 'column' }}>
      <Link
        to="/media"
        style={{
          display: 'inline-block',
          width: 'fit-content',
          height: 'fit-content',
          margin: '5px',
        }}
      >
        <IconButton size="small">
          <ArrowBackIcon />
        </IconButton>
      </Link>
      <MyTrailer />
    </Box>
  );
}
// check if trailer is null + on youtube
