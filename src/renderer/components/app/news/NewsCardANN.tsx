import { CardActionArea, CardMedia, Divider, Link } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useNewsAdv } from 'renderer/context/NewsAdvContext';
import { Link as RouterLink } from 'react-router-dom';

export default function NewsCardANN({ props }: any) {
  const newsAdv: any = useNewsAdv();

  return (
    <Card variant="outlined" sx={{ display: 'flex', height: 320 }}>
      <RouterLink
        to="/news"
        style={{
          textDecoration: 'none',
          height: 'fit-content',
          alignSelf: 'center',
        }}
        preventScrollReset
      >
        <CardActionArea
          onClick={() => {
            newsAdv.toggleNews();
            window.electron.ipcRenderer.sendMessage('newsAdvanced', [
              props.link,
              props.title,
            ]);
          }}
          sx={{ height: 320, width: 225 }}
        >
          <CardMedia
            component="img"
            image={props.image}
            sx={{ height: 320, width: 225 }}
          />
        </CardActionArea>
      </RouterLink>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ overflowY: 'auto', py: '10px', maxHeight: 120 }}>
          <Link
            href={props.link}
            underline="hover"
            target="_blank"
            rel="noreferrer"
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {props.title}
            </Typography>
          </Link>
        </CardContent>
        <Divider orientation="horizontal" variant="middle" />
        <CardContent
          sx={{
            overflowY: 'auto',
            '&:last-child': { pb: '16px' },
            minHeight: 200,
          }}
        >
          <Typography variant="body2">{props.text}</Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
