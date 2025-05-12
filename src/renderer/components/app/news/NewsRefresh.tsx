import RefreshIcon from '@mui/icons-material/Refresh';
import { ToggleButton, Typography } from '@mui/material';
import { useState } from 'react';
import { useNews } from 'renderer/context/NewsContext';
import { useNewsServiceType } from 'renderer/context/NewsServiceTypeContext';
import { useNewsQuery } from 'renderer/functions/NewsFunctions';
import isOnline from 'is-online';
import HtmlTooltip from '../etc/CustomTooltip1';

export default function NewsRefresh({ props }: any) {
  const newsCards: any = useNews();
  const newsServiceType: any = useNewsServiceType();

  const { data, refetch } = useNewsQuery(newsCards);
  const [isDisabled, setIsDisabled] = useState(false);

  async function fetchAPI() {
    setIsDisabled(true);
    let checkOnline = false;
    checkOnline = await isOnline();
    console.log(checkOnline);
    if (checkOnline) {
      await refetch();
    }
    setIsDisabled(false);
  }

  const handleClick = () => {
    if (newsServiceType.news === true) {
      fetchAPI();
    } else {
      window.electron.ipcRenderer.sendMessage('newsList', ['ping']);
    }
    console.log(newsServiceType.news);
  };

  return (
    <HtmlTooltip
      title={
        <>
          <Typography color="inherit" fontSize="14px">
            Refresh News
          </Typography>
        </>
      }
      placement="top"
    >
      <ToggleButton
        value="right"
        aria-label="right aligned"
        onClick={handleClick}
        disabled={isDisabled}
      >
        <RefreshIcon />
      </ToggleButton>
    </HtmlTooltip>
  );
}
