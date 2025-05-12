import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useEffect, useState, MouseEvent, memo } from 'react';
import { useTitle } from 'renderer/context/TitleContext';
import {
  getTime,
  getTimeFormat,
  useSeasonsQuery,
} from 'renderer/functions/SeasonsFunctions';
import getStatusColor from 'renderer/functions/StatusFunction';
import { getTitle } from 'renderer/functions/view/TitlePreferenceFunctions';
import { formatStatus } from 'renderer/functions/edit/formatInfo';
import { useSeasonInput } from 'renderer/context/SeasonInputContext';
import { useAniListToken } from 'renderer/context/services/AniListTokenContext';
import { useAniListUsername } from 'renderer/context/services/AniListUsernameContext';
import { useAdult } from 'renderer/context/AdultContext';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';
import { Tooltip } from '@mui/joy';
import { Circle } from '@mui/icons-material';
import ContextMenu from '../etc/ContextMenu';
import DeleteModal from '../etc/DeleteModal';

export const SeasonMediaCard = ({ props }: any) => {
  const titlePreference: any = useTitle();
  const seasonInput: any = useSeasonInput();
  const myToken: any = useAniListToken();
  const myUserName: any = useAniListUsername();
  const adult: any = useAdult();
  const myAdvancedMedia: any = useAdvancedMedia();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  // this fixes the setQuery not reupdating
  const { data, refetch, dataUpdatedAt } = useSeasonsQuery(
    seasonInput.seasonInput,
    myToken.AniListToken,
    myUserName.AniListUsername,
    adult.adult,
  );

  const handleClick = (myTitle: string) => {
    navigator.clipboard.writeText(myTitle);
  };

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
      color="primary"
      sx={{
        display: 'grid',
        gridTemplateColumns: '140px 220px',
        gridTemplateRows: '50px 150px',
        width: '360px',
        height: '200px',
        borderRadius: '3px',
      }}
      className="seasonMediaCard"
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
          console.log(props.description);
          console.log(getTitle(titlePreference.title, props));
        }}
      >
        <CardMedia
          component="img"
          image={props.image}
          sx={{
            cursor: 'pointer',
            gridRow: '1/3',
            gridColumn: '1/2',
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
        {props.nextAiringEpisode !== null ? (
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              bgcolor: 'rgba(0, 0, 0, 0.69)',
              color: 'white',
              padding: '10px',
            }}
          >
            <Typography variant="body2" fontSize={11}>
              {`EP${props.nextAiringEpisode.episode}: ${getTimeFormat(
                props.nextAiringEpisode.airingAt,
              )}`}
            </Typography>
          </Box>
        ) : null}
      </CardActionArea>
      <CardContent
        sx={{
          gridRow: '1/3',
          gridColumn: '2/3',
          paddingTop: '6px',
          '&:last-child': { pb: '6px' },
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography
          component="div"
          variant="h6"
          fontSize={14}
          fontWeight="bold"
          noWrap
          gutterBottom
          className="title"
        >
          {getTitle(titlePreference.title, props)}
        </Typography>
        <Box display="flex" flexDirection="row" alignItems="center" gap="5px">
          <Box
            component="span"
            fontWeight="bold"
            fontSize={14}
            className="label-information"
          >
            Episodes:
          </Box>{' '}
          <Typography fontSize={12} noWrap className="information">
            {props.episodes !== null ? props.episodes : '?'}
          </Typography>
        </Box>
        <Box display="flex" flexDirection="row" alignItems="center" gap="2px">
          <Box
            component="span"
            fontWeight="bold"
            fontSize={14}
            className="label-information"
          >
            Status:{'  '}
          </Box>
          <Circle
            fontSize="inherit"
            sx={{ padding: '2px', color: getStatusColor(props.status) }}
          />
          <Typography fontSize={12} noWrap className="information">
            {props.status !== null ? formatStatus(props.status) : '?'}
          </Typography>
        </Box>
        <Box display="flex" flexDirection="row" alignItems="center" gap="5px">
          <Box
            component="span"
            fontWeight="bold"
            fontSize={14}
            className="label-information"
          >
            Score:{' '}
          </Box>
          <Typography fontSize={12} noWrap className="information">
            {props.averageScore !== null ? `${props.averageScore}%` : '?'}
          </Typography>
        </Box>
        <Box display="flex" flexDirection="row" alignItems="center" gap="5px">
          <Box
            component="span"
            fontWeight="bold"
            fontSize={14}
            className="label-information"
          >
            Studio:
          </Box>{' '}
          <Typography fontSize={12} noWrap className="information">
            {props.mainStudioIndex !== -1
              ? props.studios[props.mainStudioIndex].node.name
              : '?'}
          </Typography>
        </Box>
        <Box display="flex" flexDirection="row" alignItems="center" gap="5px">
          <Box
            component="span"
            fontWeight="bold"
            fontSize={14}
            className="label-information"
          >
            Genres:
          </Box>{' '}
          <Typography fontSize={12} noWrap className="information">
            {props.genres.map((e: any, index: number) => {
              if (index + 1 !== props.genres.length) {
                return `${e}, `;
              }
              return `${e}`;
            })}
          </Typography>
        </Box>
        {/* <Typography fontSize={12} noWrap>
          <Box component="span" fontWeight="bold" fontSize={14}>
            Popularity:{' '}
          </Box>
          {props.popularity !== null ? props.popularity : '?'} users
        </Typography> */}
        <Typography
          fontSize={12}
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '3',
            WebkitBoxOrient: 'vertical',
          }}
          className="description"
        >
          {props.description !== null
            ? props.description.replace(/(<([^>]+)>)/gi, '')
            : null}
        </Typography>
      </CardContent>
      <ContextMenu
        props={props}
        contextMenu={contextMenu}
        setContextMenu={setContextMenu}
        handleClickOpen={handleClickOpen}
      />
      <DeleteModal props={props} open={open} setOpen={setOpen} />
    </Card>
  );
};

export default SeasonMediaCard;

// test image: https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx1-CXtrrkMpJ8Zq.png
// 225/320 is medium image dimensions MAL.
// 320/450 is large image dimensions MAL.
// 100/141 is medium image dimensions AniList
// 230/326 is large image dimensions AniList
// 460/690 is extra large image dimensions AniList

// these are the two images that will be used
// 230/326 is large image dimensions AniList
// 225/320 is medium image dimensions MAL.

/* {props.nextAiringEpisode !== null
  ? seasonAiringTime(props.nextAiringEpisode.timeUntilAiring)
  : null} */

/*
  <Box display="flex" flexDirection="row" alignItems="center" gap="5px">
    <Box
      component="span"
      fontWeight="bold"
      fontSize={14}
      className="label-information"
    >
      Studio:
    </Box>{' '}
    <Typography fontSize={12} noWrap className="information">
      {props.mainStudioIndex !== -1
        ? props.studios[props.mainStudioIndex].node.name
        : '?'}
    </Typography>
  </Box>
*/
