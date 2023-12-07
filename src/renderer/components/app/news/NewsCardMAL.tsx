import { CardActionArea, CardMedia, Divider, Link } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { decode } from 'html-entities';
import { useAtom } from 'jotai';
import { useNewsAdv } from 'renderer/context/NewsAdvContext';
import { Link as RouterLink, useMatches } from 'react-router-dom';
import { newsLocationYAtom } from 'renderer/store';
import { useEffect, useRef } from 'react';

export default function NewsCardMAL({ props, reference, listValue }: any) {
  const descriptionDecoded = decode(decode(props.text)); // not really sure why i need to decode twice
  const titleDecoded = decode(decode(props.title));
  const newsAdv: any = useNewsAdv();
  const cardRef: any = useRef(null);
  const [newsLocationY, setNewsLocationY] = useAtom(newsLocationYAtom);

  useEffect(() => {
    if (
      (newsLocationY === listValue - 1 ||
        (newsLocationY === listValue && listValue === 19)) &&
      newsLocationY !== 0 // added newsLocationY !== 0 to make it so that smaller screens dont scroll to first card
    ) {
      // 19 is max value
      cardRef.current.scrollIntoView({
        block: 'end',
        behavior: 'auto',
      });
    }
  }, [listValue, newsLocationY]);

  return (
    <Card
      variant="outlined"
      sx={{ display: 'flex', height: 320, scrollMarginTop: '100px' }}
      ref={cardRef}
    >
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
              titleDecoded,
            ]);
            setNewsLocationY(listValue);
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
              {titleDecoded}
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
          <Typography variant="body2">{descriptionDecoded}</Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
