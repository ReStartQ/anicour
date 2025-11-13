import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import { CardActionArea, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { useState, MouseEvent, useEffect } from 'react';
import { useTitle } from 'renderer/context/TitleContext';
import getStatusColor from 'renderer/functions/StatusFunction';
import { getMalLink } from 'renderer/functions/edit/getAdjustedSiteLink';
import { getTitle } from 'renderer/functions/view/TitlePreferenceFunctions';
import { useSearchTerm } from 'renderer/context/SearchTermContext';
import { useAniListToken } from 'renderer/context/services/AniListTokenContext';
import { useAdult } from 'renderer/context/AdultContext';
import { useSearchQuery } from 'renderer/functions/SearchFunctions';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';
import { Tooltip } from '@mui/joy';
import { Circle } from '@mui/icons-material';
import { useAtom } from 'jotai';
import { nextAiringEpisodeAtom } from 'renderer/store';
import { getTime, getTimeFormat } from 'renderer/functions/SeasonsFunctions';
import DeleteModal from '../etc/DeleteModal';
import ContextMenu from '../etc/ContextMenu';

export default function SearchMediaCardCompact({ props }: any) {
  const titlePreference: any = useTitle();
  const searchTerm: any = useSearchTerm();
  const myToken: any = useAniListToken();
  const adult: any = useAdult();
  const myAdvancedMedia: any = useAdvancedMedia();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  // this fixes the setQuery not reupdating
  const { data, refetch, dataUpdatedAt } = useSearchQuery(
    searchTerm.SearchTerm,
    myToken.AniListToken,
    adult.adult,
  );

  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const [time, setTime] = useState(
    props.nextAiringEpisode !== null
      ? props.nextAiringEpisode.timeUntilAiring
      : null,
  );

  const [nextAiringEpisode, setNextAiringEpisode] = useAtom(
    nextAiringEpisodeAtom,
  );

  const handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX,
            mouseY: event.clientY,
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null,
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (time !== null && time >= 0 && props.nextAiringEpisode !== null) {
        // eslint-disable-next-line no-plusplus
        setTime(getTime(props.nextAiringEpisode.airingAt));
      }
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  return (
    <Card
      variant="outlined"
      sx={{
        width: '140px',
        height: '200px',
      }}
      onContextMenu={handleContextMenu}
    >
      <CardActionArea
        sx={{
          width: '140px',
          height: '200px',
        }}
        onClick={() => {
          window.electron.ipcRenderer.sendMessage('advancedMedia', [
            getTitle(titlePreference.title, props),
            props,
          ]);
          myAdvancedMedia.dispatch({ type: 'getNewMedia', payload: props });
        }}
      >
        <CardMedia
          component="img"
          image={props.image}
          sx={{
            cursor: 'pointer',
            gridRow: '1/4',
            maxWidth: '140px',
            maxHeight: '200px',
          }}
        />
        {props.mediaListEntry !== null ? (
          <Tooltip title="On List" arrow variant="outlined" color="primary">
            <PlaylistAddCheckCircleIcon
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                margin: '5px',
                bgcolor: 'rgba(0, 0, 0, 0.69)',
                color: 'white',
                borderRadius: '3px',
              }}
            />
          </Tooltip>
        ) : null}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            bgcolor: 'rgba(0, 0, 0, 0.69)',
            color: 'white',
            padding: '10px',
            height: '55px',
          }}
        >
          <Typography
            fontSize={12}
            fontWeight="bold"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '1',
              WebkitBoxOrient: 'vertical',
            }}
            className="title"
          >
            <Circle
              fontSize="inherit"
              sx={{
                pt: '4px',
                pr: '2px',
                color: getStatusColor(props.status),
              }}
            />
            {getTitle(titlePreference.title, props)}
          </Typography>
          {props.nextAiringEpisode !== null && nextAiringEpisode === 'Show' ? (
            <Typography variant="body2" fontSize={11} color="aliceblue" noWrap>
              <Box
                component="span"
                style={{
                  color: '#00FFFF',
                  fontSize: 13,
                  fontWeight: 'bold',
                }}
              >
                {`EP${props.nextAiringEpisode.episode}:`}
              </Box>{' '}
              {`${getTimeFormat(props.nextAiringEpisode.airingAt)}`}
            </Typography>
          ) : null}
        </Box>
      </CardActionArea>
      <ContextMenu
        props={props}
        contextMenu={contextMenu}
        setContextMenu={setContextMenu}
        handleClickOpen={handleClickOpen}
      />
      <DeleteModal props={props} open={open} setOpen={setOpen} />
    </Card>
  );
}

/* <Box sx={{ display: 'flex', flexDirection: 'row' }}>
  <Typography noWrap fontSize={12}>
    {props.titleRomaji}
  </Typography>
</Box>;
 */
