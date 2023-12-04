import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { IconButton } from '@mui/material';

export default function NewsFullscreen({ props }: any) {
  const handleClick = () => {
    console.log('fullscreen');
  };

  return (
    <IconButton sx={{ margin: '5px' }} onClick={handleClick} size="small">
      <FullscreenIcon />
    </IconButton>
  );
}
