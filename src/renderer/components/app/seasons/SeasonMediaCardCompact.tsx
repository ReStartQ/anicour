import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import { CardActionArea, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { IconButtonProps } from '@mui/material/IconButton';
import { useEffect, useState, MouseEvent, useRef } from 'react';
import { useTitle } from 'renderer/context/TitleContext';
import {
  getTime,
  getTimeFormat,
  useSeasonsQuery,
} from 'renderer/functions/SeasonsFunctions';
import getStatusColor from 'renderer/functions/StatusFunction';
import { getTitle } from 'renderer/functions/view/TitlePreferenceFunctions';
import { useSeasonInput } from 'renderer/context/SeasonInputContext';
import { useAniListToken } from 'renderer/context/services/AniListTokenContext';
import { useAniListUsername } from 'renderer/context/services/AniListUsernameContext';
import { useAdult } from 'renderer/context/AdultContext';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';
import ContextMenu from '../etc/ContextMenu';

export default function SeasonMediaCardCompact({ props }: any) {
  const titlePreference: any = useTitle();
  const myAdvancedMedia: any = useAdvancedMedia();
  const seasonInput: any = useSeasonInput();
  const myToken: any = useAniListToken();
  const myUserName: any = useAniListUsername();
  const adult: any = useAdult();

  // this fixes the setQuery not reupdating
  const { data, refetch, dataUpdatedAt } = useSeasonsQuery(
    seasonInput.seasonInput,
    myToken.AniListToken,
    myUserName.AniListUsername,
    adult.adult,
  );

  const [time, setTime] = useState(
    props.nextAiringEpisode !== null
      ? props.nextAiringEpisode.timeUntilAiring
      : null,
  );

  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

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
            maxWidth: '140px',
            maxHeight: '200px',
          }}
        />
        {props.mediaListEntry !== null ? (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              bgcolor: 'rgba(0, 0, 0, 0.69)',
              color: 'white',
            }}
          >
            <PlaylistAddCheckCircleIcon />
          </Box>
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
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: props.nextAiringEpisode !== null ? '1' : '2',
              WebkitBoxOrient: 'vertical',
            }}
            color={getStatusColor(props.status)}
          >
            {getTitle(titlePreference.title, props)}
          </Typography>
          {props.nextAiringEpisode !== null ? (
            <Typography variant="body2" fontSize={11} color="aliceblue" noWrap>
              {`EP${props.nextAiringEpisode.episode}: ${getTimeFormat(
                props.nextAiringEpisode.airingAt,
              )}`}
            </Typography>
          ) : null}
        </Box>
      </CardActionArea>
      <ContextMenu
        props={props}
        contextMenu={contextMenu}
        setContextMenu={setContextMenu}
      />
    </Card>
  );
}
