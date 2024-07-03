import { CardActionArea, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { useState, MouseEvent, useEffect } from 'react';
import { useTitle } from 'renderer/context/TitleContext';
import getStatusColor from 'renderer/functions/StatusFunction';
import { getTitle } from 'renderer/functions/view/TitlePreferenceFunctions';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';
import { Tooltip } from '@mui/joy';
import { useCategory } from 'renderer/context/CategoryContext';
import { useSidebarButton } from 'renderer/context/SidebarContext';
import RepeatIcon from '@mui/icons-material/Repeat';
import { getTime, getTimeFormat } from 'renderer/functions/SeasonsFunctions';
import { nextAiringEpisodeAtom } from 'renderer/store';
import { useAtom } from 'jotai';
import ContextMenuAlternative from '../etc/ContextMenuAlternative';
import ContextMenu from '../etc/ContextMenu';
import { MediaIcons } from '../etc/SvgIcons';

export default function MediaCardCompact({ props }: any) {
  const titlePreference: any = useTitle();
  const myAdvancedMedia: any = useAdvancedMedia();
  const myCategory: any = useCategory();
  const mySidebar: any = useSidebarButton();

  const [time, setTime] = useState(
    props.nextAiringEpisode !== null
      ? props.nextAiringEpisode.timeUntilAiring
      : null,
  );

  const [nextAiringEpisode, setNextAiringEpisode] = useAtom(
    nextAiringEpisodeAtom,
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (time !== null && time >= 0 && props.nextAiringEpisode !== null) {
        // eslint-disable-next-line no-plusplus
        setTime(getTime(props.nextAiringEpisode.airingAt));
      }
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

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
        {props.mediaListEntry.notes !== null ? (
          <Tooltip
            title={props.mediaListEntry.notes}
            arrow
            variant="outlined"
            color="primary"
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                margin: '5px',
                bgcolor: 'rgba(0, 0, 0, 0.69)',
                color: 'white',
                borderRadius: '3px',
                height: '25px',
                width: '25px',
              }}
            >
              <MediaIcons type={0} />
            </Box>
          </Tooltip>
        ) : null}
        {(props.mediaListEntry.repeat > 0 ||
          props.mediaListEntry.completedAt.year !== null) &&
        myCategory.category !== 1 ? (
          <Tooltip
            title={mySidebar.sidebar === 0 ? `Rewatching` : `Rereading`}
            arrow
            variant="outlined"
            color="primary"
          >
            <Box
              sx={{
                position: 'absolute',
                top: props.mediaListEntry.notes === null ? 0 : 30,
                left: 0,
                margin: '5px',
                bgcolor: 'rgba(0, 0, 0, 0.69)',
                color: 'white',
                borderRadius: '3px',
                height: '25px',
                width: '25px',
              }}
            >
              <RepeatIcon />
            </Box>
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
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp:
                props.nextAiringEpisode !== null && nextAiringEpisode === 'Show'
                  ? '1'
                  : '2',
              WebkitBoxOrient: 'vertical',
            }}
            color={getStatusColor(props.status)}
          >
            {getTitle(titlePreference.title, props)}
          </Typography>
          {props.nextAiringEpisode !== null && nextAiringEpisode === 'Show' ? (
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

/* <Box sx={{ display: 'flex', flexDirection: 'row' }}>
  <Typography noWrap fontSize={12}>
    {props.titleRomaji}
  </Typography>
</Box>;
 */
