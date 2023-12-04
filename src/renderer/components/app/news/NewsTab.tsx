import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { memo, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { useFilter } from 'renderer/context/FilterContext';
import { useMainView } from 'renderer/context/MainViewContext';
import { useNewsAdv } from 'renderer/context/NewsAdvContext';
import { useNews } from 'renderer/context/NewsContext';
import { useNewsServiceType } from 'renderer/context/NewsServiceTypeContext';
import { useNewsQuery } from 'renderer/functions/NewsFunctions';
import NewsCardMAL from './NewsCardMAL';
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
  listValue: number;
  type: any;
}

const MainView = memo(
  ({ view, media, index, listValue, type }: MainViewProps) => {
    if (view === 0) {
      return (
        // 140
        <NewsCardMAL
          props={media}
          key={index}
          reference={listValue}
          listValue={listValue}
        />
      );
    }
    if (view === 1) {
      return (
        // 280
        <NewsCardMAL
          props={media}
          key={index}
          reference={listValue}
          listValue={listValue}
        />
      );
    }
    if (view === 0 && type === false) {
      return (
        // 140
        <NewsCardMAL
          props={media}
          key={index}
          reference={listValue}
          listValue={listValue}
        />
      );
    }
    if (view === 1 && type === false) {
      return (
        // 280
        <NewsCardMAL
          props={media}
          key={index}
          reference={listValue}
          listValue={listValue}
        />
      );
    }
    if (view === 2 && type === false) {
      return (
        // 280
        <NewsCardMAL
          props={media}
          key={index}
          reference={listValue}
          listValue={listValue}
        />
      );
    }
    return (
      <NewsCardMAL
        props={media}
        key={index}
        reference={listValue}
        listValue={listValue}
      />
    );
  },
);

export default function NewsTab({ props }: any) {
  const mainView: any = useMainView();
  const myFilter: any = useFilter();
  const newsCards: any = useNews();
  const newsServiceType: any = useNewsServiceType();

  const newsAdv: any = useNewsAdv();

  const RSS_URL = 'https://myanimelist.net/rss/news.xml';

  const { isLoading, isError, error, data, refetch }: any =
    useNewsQuery(newsCards);

  useEffect(() => {
    const removeEventListener = window.electron.ipcRenderer.on(
      'newsList',
      (arg) => {
        // eslint-disable-next-line no-console
        console.log(arg);
      },
    );
    return () => {
      removeEventListener();
    };
  }, [newsServiceType]);

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
          scrollPadding: '10px',
        }}
      >
        {/*
        <ScrollRestoration
          getKey={(location, matches) => {
            const paths = ['/'];
            return paths.includes(location.pathname)
              ? // home and notifications restore by pathname
                location.pathname
              : // everything else by location like the browser
                location.key;
          }}
        />
        */}
        {data
          .filter((media: any) => {
            return media.title
              .toLowerCase()
              .includes(myFilter.filter.toLowerCase());
          })
          .map((media: MediaProps, index: number) => {
            return (
              <MainView
                view={mainView.view}
                media={media}
                index={media.title}
                listValue={index}
                type={newsServiceType.news}
                key={media.title}
              />
            );
          })}
      </Grid>
    </Box>
  );
}

/* const { data, isLoading, isError, refetch } = useQuery(['news'], async () => {
  console.log(data);
  const myVar = await Axios.get(RSS_URL).then((res) => res.data);
  const jsonWithHeader = new XMLParser().parseFromString(myVar).children[0]
    .children;
  const json = jsonWithHeader.slice(3, jsonWithHeader.length);
  const result = await json.map((entry: any, index: any) => ({
    title: entry.children[1].value,
    text: entry.children[2].value,
    image: entry.children[3].value,
    date: entry.children[4].value,
    link: entry.children[5].value,
    key: index,
  }));
  console.log(json);
  console.log(result);
  newsCards.setNews(result);

  return result;



    const filteredList = useMemo(() => {
    console.log('memo');
    return data.filter((media: any) => {
      return media.title.toLowerCase().includes(myFilter.filter.toLowerCase());
    });
  }, [data, myFilter.filter]);
}); */
