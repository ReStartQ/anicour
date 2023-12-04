import { Box, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useColorScheme as useJoyColorScheme } from '@mui/joy/styles';
import { useColorScheme as useMaterialColorScheme } from '@mui/material/styles';
import { useTheme } from 'renderer/context/ThemeContext';
import { useEffect, useState } from 'react';
import TrailerButton from '../mediaAdvanced/extra/TrailerButton';

export default function TrailerNotAvailablePage({ props }: any) {
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
      <Typography sx={{ display: 'block', margin: 'auto' }}>
        No trailer
      </Typography>
    </Box>
  );
}
