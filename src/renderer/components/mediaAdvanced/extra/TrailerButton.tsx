import YouTubeIcon from '@mui/icons-material/YouTube';
import { Button, Typography } from '@mui/joy';
import { Link } from 'react-router-dom';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';

export default function TrailerButton({ props }: any) {
  const myMediaAdvanced: any = useAdvancedMedia();

  return (
    <Link
      to="/trailer"
      style={{
        textDecoration: 'none',
        height: 'fit-content',
        alignSelf: 'center',
      }}
    >
      <Button variant="soft">
        <YouTubeIcon sx={{ mr: 1 }} fontSize="medium" />
        <Typography>Watch Trailer</Typography>
      </Button>
    </Link>
  );
}
