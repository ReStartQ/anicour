import { Card, CardContent, Divider, Link, Typography } from '@mui/material';
import parse from 'html-react-parser';
import { memo, useEffect } from 'react';
import { useNewsInfo } from 'renderer/context/NewsInfoContext';
import { useNewsServiceType } from 'renderer/context/NewsServiceTypeContext';
import 'renderer/styles/NewsAdvanced.scss';
import LoadingNews from '../etc/LoadingNews';

const NewsAdvanced = memo(({ props }: any) => {
  const myNewsInfo: any = useNewsInfo();
  const myService: any = useNewsServiceType();

  useEffect(() => {
    const removeEventListener = window.electron.ipcRenderer.on(
      'newsAdvanced',
      (arg) => {
        // eslint-disable-next-line no-console
        if (myNewsInfo.NewsInfo !== arg) {
          console.log(arg);
          myNewsInfo.setNewsInfo(arg);
        }
      },
    );
    return () => {
      removeEventListener();
    };
  }, [myNewsInfo, myService.news]);

  return myNewsInfo.NewsInfo.title !== '' ? (
    <Card
      id="newsAdvanced"
      sx={{
        paddingTop: '24px',
        px: '10%',
        height: '100vh',
        width: '100%',
        overflowY: 'auto',
      }}
    >
      <CardContent>
        <Link
          href={myNewsInfo.NewsInfo.titleURL}
          target="_blank"
          rel="noreferrer"
          underline="hover"
        >
          <Typography variant="h5" component="div">
            {parse(myNewsInfo.NewsInfo.title)}
          </Typography>
        </Link>
      </CardContent>
      <Divider />
      <CardContent>
        <Typography variant="body2">
          {parse(myNewsInfo.NewsInfo.date)}
        </Typography>
        <Typography variant="body1">
          {parse(myNewsInfo.NewsInfo.main)}
        </Typography>
      </CardContent>
    </Card>
  ) : (
    <LoadingNews />
  );
});

export default NewsAdvanced;

// add target = _blank to a tags and add allowfullscreen to iframe. Also look at special html characters when converting to string.
