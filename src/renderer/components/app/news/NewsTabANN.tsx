import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { memo, useEffect } from 'react';
import { useFilter } from 'renderer/context/FilterContext';
import { useMainView } from 'renderer/context/MainViewContext';
import { useNewsAdv } from 'renderer/context/NewsAdvContext';
import { useNewsAnn } from 'renderer/context/NewsAnnContext';
import { useNewsServiceType } from 'renderer/context/NewsServiceTypeContext';
import { useQueryClient } from '@tanstack/react-query';
import { useNewsANNQuery } from 'renderer/functions/NewsFunctions';
import NewsCardANN from './NewsCardANN';
import LoadingMessage from '../etc/LoadingMessage';
import ErrorNewsFetch from '../etc/ErrorNewsFetch';

const XMLParser = require('react-xml-parser');

interface MediaProps {
  anime: string;
  image: string;
  title: string;
  key: number;
}

interface MainViewProps {
  view: any;
  media: any;
  index: any;
  type: any;
}

const MainView = memo(({ view, media, index, type }: MainViewProps) => {
  if (view === 0 && type === false) {
    return (
      // 140
      <NewsCardANN props={media} key={index} />
    );
  }
  if (view === 1 && type === false) {
    return (
      // 280
      <NewsCardANN props={media} key={index} />
    );
  }
  if (view === 2 && type === false) {
    return (
      // 280
      <NewsCardANN props={media} key={index} />
    );
  }
  return <NewsCardANN props={media} key={index} />;
});

export default function NewsTabANN({ props }: any) {
  const mainView: any = useMainView();
  const myFilter: any = useFilter();
  const newsCards: any = useNewsAnn();
  const newsServiceType: any = useNewsServiceType();
  const queryClient = useQueryClient();

  const newsAdv: any = useNewsAdv();

  const RSS_URL = 'https://myanimelist.net/rss/news.xml';

  const { isLoading, isError, error, data, refetch }: any =
    useNewsANNQuery(newsCards);

  useEffect(() => {
    // Update the document title using the browser API\
    window.electron.ipcRenderer.on('newsList', (arg) => {
      // eslint-disable-next-line no-console
      console.log(arg);
      newsCards.setNewsAnn(arg);
      console.log(data);

      queryClient.setQueryData(['newsANN'], arg);
    });
  }, [data, newsCards, queryClient]);

  if (isLoading) {
    return <LoadingMessage />;
  }

  if (isError) {
    return <ErrorNewsFetch />;
  }

  return (
    <Box
      sx={{
        height: 'calc( 100% - 100px )',
        width: '100%',
        boxSizing: 'border-box',
        overflowY: 'auto',
        display: 'inline-block',
      }}
    >
      <Grid
        spacing={1}
        id="myGrid2ContainerMediaCards"
        sx={{
          width: '100%',
          overflowY: 'auto',
        }}
      >
        {data
          .filter((media: any) => {
            return media.title
              .toLowerCase()
              .includes(myFilter.filter.toLowerCase());
          })
          .map((media: MediaProps) => {
            return (
              <MainView
                view={mainView.view}
                media={media}
                index={media.title}
                type={newsServiceType.news}
                key={media.key}
              />
            );
          })}
      </Grid>
    </Box>
  );
}

/*
  const filteredList = useMemo(() => {
    return newsCards.NewsAnn.filter((media: any) => {
      return media.title.toLowerCase().includes(myFilter.filter.toLowerCase());
    });
  }, [newsCards.NewsAnn, myFilter.filter]);
*/
