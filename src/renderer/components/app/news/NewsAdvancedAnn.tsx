import { Card, CardContent, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import parse from 'html-react-parser';
import { memo, useEffect } from 'react';
import { useNewsInfo } from 'renderer/context/NewsInfoContext';
import { useNewsServiceType } from 'renderer/context/NewsServiceTypeContext';
import 'renderer/styles/NewsAdvanced.scss';
import { useNewsAnn } from 'renderer/context/NewsAnnContext';
import LoadingMessage from '../etc/LoadingMessage';
import LoadingNews from '../etc/LoadingNews';

const NewsAdvancedAnn = memo(({ props }: any) => {
  const myNewsInfo: any = useNewsInfo();
  const myService: any = useNewsServiceType();
  const newsCards: any = useNewsAnn();
  console.log(myNewsInfo.NewsInfo.main);
  useEffect(() => {
    // Update the document title using the browser API\
    if (myService.news === false) {
      window.electron.ipcRenderer.on('newsAdvanced', (arg) => {
        // eslint-disable-next-line no-console
        console.log(arg);
        myNewsInfo.setNewsInfo(arg);
      });
    }
  }, [myNewsInfo, myService.news]);

  /*
  useEffect(() => {
    // Update the document title using the browser API\
    window.electron.ipcRenderer.once('newsList', (arg) => {
      // eslint-disable-next-line no-console
      console.log(arg);
      newsCards.setNewsAnn(arg);
    });
  }, [newsCards]);
 */

  return myNewsInfo.NewsInfo.title !== '' ? (
    <Card
      id="newsAdvanced"
      sx={{
        paddingTop: '24px',
        px: '50px',
        height: '100vh',
        width: '100%',
        overflowY: 'auto',
      }}
    >
      <CardContent>
        <h1 id="title">
          <a
            href={myNewsInfo.NewsInfo.titleURL}
            target="_blank"
            rel="noreferrer"
          >
            {parse(myNewsInfo.NewsInfo.title)}
          </a>
        </h1>
      </CardContent>
      <Divider />
      <CardContent>
        <h5>{myNewsInfo.NewsInfo.author}</h5>
        <h5>{myNewsInfo.NewsInfo.date}</h5>
        <br />
        {parse(myNewsInfo.NewsInfo.main)}
      </CardContent>
    </Card>
  ) : (
    <LoadingNews />
  );
});

export default NewsAdvancedAnn;
// add target = _blank to a tags and add allowfullscreen to iframe. Also look at special html characters when converting to string.
