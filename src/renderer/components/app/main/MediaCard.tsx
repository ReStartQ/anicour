import {
  Alert,
  CardActionArea,
  IconButton,
  Snackbar,
  SvgIcon,
} from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useTitle } from 'renderer/context/TitleContext';
import getStatusColor from 'renderer/functions/StatusFunction';
import { getTitle } from 'renderer/functions/view/TitlePreferenceFunctions';
import RepeatOnIcon from '@mui/icons-material/RepeatOn';
import RepeatIcon from '@mui/icons-material/Repeat';
import StarIcon from '@mui/icons-material/Star';
import {
  useEffect,
  useReducer,
  useState,
  MouseEvent,
  SyntheticEvent,
} from 'react';
import { useAniListToken } from 'renderer/context/services/AniListTokenContext';
import { useAniListUsername } from 'renderer/context/services/AniListUsernameContext';
import { AdvancedInputContextReducer } from 'renderer/context/advanced/AdvancedInputContext';
import { useUpdateEntryData } from 'renderer/functions/api/mutations/updateEntry';
import {
  formatReleaseDate,
  formatReleaseDateNumbers,
  formatSeason,
  formatSource,
  formatStartYear,
  formatStatus,
  formatType,
} from 'renderer/functions/edit/formatInfo';
import { useMainMediaList } from 'renderer/functions/MainMediaListFunctions';
import { useAtom } from 'jotai';
import {
  nextAiringEpisodeAtom,
  notificationMediaNamesAtom,
  notificationOpenAtom,
  notificationTypeAtom,
} from 'renderer/store';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';
import { useCategory } from 'renderer/context/CategoryContext';
import { Button, Tooltip } from '@mui/joy';
import { useSidebarButton } from 'renderer/context/SidebarContext';
import { getTime, getTimeFormat } from 'renderer/functions/SeasonsFunctions';
import ContextMenu from '../etc/ContextMenu';
import ProgressStepper from '../etc/ProgressStepper';
import ProgressVolumesStepper from '../etc/ProgressVolumesStepper';
import ScoreSelect from '../etc/ScoreSelect';
import { MediaIcons } from '../etc/SvgIcons';
import DeleteModal from '../etc/DeleteModal';

export default function MediaCard({ props }: any) {
  const titlePreference: any = useTitle();
  const myAdvancedMedia: any = useAdvancedMedia();
  const myUserName: any = useAniListUsername();
  const myToken: any = useAniListToken();
  const myCategory: any = useCategory();
  const mySidebar: any = useSidebarButton();

  const [notificationType, setNotificationType] = useAtom(notificationTypeAtom);
  const [notifcationOpen, setNotificationOpen] = useAtom(notificationOpenAtom);
  const [notifcationMediaNames, setNotificationMediaNames] = useAtom(
    notificationMediaNamesAtom,
  );
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setNotificationOpen(false);
  };

  const { isLoading, isError, error, data, refetch, dateUpdatedAt }: any =
    useMainMediaList(myUserName.AniListUsername, myToken.AniListToken);

  const [time, setTime] = useState(
    props.nextAiringEpisode !== null
      ? props.nextAiringEpisode.timeUntilAiring
      : null,
  );

  const [nextAiringEpisode, setNextAiringEpisode] = useAtom(
    nextAiringEpisodeAtom,
  );

  const [myAdvancedInput, inputDispatch] = useReducer(
    AdvancedInputContextReducer,
    props.mediaListEntry,
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

  useEffect(() => {
    // every time the mediaListEntry is updated through advanced window, myAdvancedInput is also updated
    inputDispatch({
      type: 'getMediaListEntry',
      payload: props.mediaListEntry,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.mediaListEntry]);

  const updateMutation: any = useUpdateEntryData();

  const handleUpdate = () => {
    const today = new Date();
    let completeFlag = false;
    let whichNull = 'none';
    if (props.type === 'ANIME') {
      console.log('anime update');
      if (myAdvancedInput.progress === props.episodes) {
        completeFlag = true;
      }
    } else {
      console.log('manga update');
      if (
        myAdvancedInput.progress === props.chapters ||
        myAdvancedInput.progressVolumes === props.volumes
      ) {
        // only allows for check on if episodes is equal to null
        if (props.type !== 'ANIME') {
          if (props.chapters === null) {
            whichNull = 'chapters';
          }
          if (props.volumes === null) {
            whichNull = 'volumes';
          }
        }
        completeFlag = true;
      }
    }
    const entry: any = {
      myUserName: myUserName.AniListUsername,
      myToken: myToken.AniListToken,
      myMediaId: props.id,
      myStatus: props.mediaListEntry.status,
      // basically change progres, progressVolumes, and score
      advancedInput: myAdvancedInput, // Local card reducer state
      advancedMedia: props,
      /*
      example
      {
        ...props.mediaListEntry,
        progress: 2,
        progressVolumes: props.type === 'ANIME' ? null : 0,
        score: 0,
      }
      */
    };

    const entryCompletedAnime: any = {
      myUserName: myUserName.AniListUsername,
      myToken: myToken.AniListToken,
      myMediaId: props.id,
      myStatus: 'COMPLETED',
      // basically change progres, progressVolumes, and score
      advancedInput: {
        ...myAdvancedInput,
        progress: props.episodes,
        status: 'COMPLETED',
        completedAt:
          myAdvancedInput.completedAt.year === null
            ? {
                day: today.getDate(),
                month: today.getMonth() + 1,
                year: today.getFullYear(),
              }
            : {
                day: myAdvancedInput.completedAt.day,
                month: myAdvancedInput.completedAt.month,
                year: myAdvancedInput.completedAt.year,
              },
        repeat:
          (myAdvancedInput.completedAt.year !== null ||
            myAdvancedInput.repeat !== 0) &&
          myCategory.category !== 1
            ? myAdvancedInput.repeat + 1
            : myAdvancedInput.repeat,
      }, // Local card reducer state
      advancedMedia: props,
    };

    const entryCompletedManga: any = {
      myUserName: myUserName.AniListUsername,
      myToken: myToken.AniListToken,
      myMediaId: props.id,
      myStatus: 'COMPLETED',
      // basically change progres, progressVolumes, and score
      advancedInput: {
        ...myAdvancedInput,
        progress:
          whichNull !== 'chapters' ? props.chapters : myAdvancedInput.progress,
        progressVolumes:
          whichNull !== 'volumes'
            ? props.volumes
            : myAdvancedInput.progressVolumes,
        status: 'COMPLETED',
        completedAt:
          myAdvancedInput.completedAt.year === null
            ? {
                day: today.getDate(),
                month: today.getMonth() + 1,
                year: today.getFullYear(),
              }
            : {
                day: myAdvancedInput.completedAt.day,
                month: myAdvancedInput.completedAt.month,
                year: myAdvancedInput.completedAt.year,
              },
        repeat:
          (myAdvancedInput.completedAt.year !== null ||
            myAdvancedInput.repeat !== 0) &&
          myCategory.category !== 1
            ? myAdvancedInput.repeat + 1
            : myAdvancedInput.repeat,
      }, // Local card reducer state
      advancedMedia: props,
    };

    if (completeFlag === true) {
      // complete
      console.log('complete');
      if (props.type === 'ANIME') {
        updateMutation.mutate(entryCompletedAnime);
      } else {
        updateMutation.mutate(entryCompletedManga);
      }
    } else {
      console.log('regular');
      // regular
      updateMutation.mutate(entry);
    }
    // setNotificationOpen(true);
  };

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
        display: 'grid',
        gridTemplateColumns: '140px 220px',
        gridTemplateRows: '50px 150px',
        width: '360px',
        height: '200px',
        borderRadius: '3px',
      }}
      className="mediaCard"
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
          console.log('advanced');
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
        {props.nextAiringEpisode !== null && nextAiringEpisode === 'Show' ? (
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
      </CardActionArea>
      <CardContent
        sx={{
          gridRow: '1/3',
          gridColumn: '2/3',
          paddingTop: '4px',
          '&:last-child': { pb: '4px' },
          display: 'grid',
          gridTemplateRows: '26px 48px 42px 36px 1fr',
          gridTemplateColumns: '96px 96px',
        }}
      >
        <Box sx={{ gridColumn: '1/3', display: 'flex', flexDirection: 'row' }}>
          <Typography
            fontSize="14px"
            fontWeight="bold"
            component="div"
            color={getStatusColor(props.status)}
            noWrap
            gutterBottom
            sx={{ gridColumn: '1/3' }}
          >
            {getTitle(titlePreference.title, props)}
          </Typography>
        </Box>
        {props.type === 'ANIME' ? (
          <ProgressStepper
            props={props}
            advancedInput={myAdvancedInput}
            inputDispatch={inputDispatch}
          />
        ) : (
          <>
            <ProgressStepper
              props={props}
              advancedInput={myAdvancedInput}
              inputDispatch={inputDispatch}
            />
          </>
        )}
        {/* props.type === 'ANIME' ? (
          <Box sx={{ gridColumn: '2/3' }}>
            <Typography fontSize={12} fontWeight="bold">
              Studio:{' '}
            </Typography>
            <Typography fontSize={12} noWrap>
              {props.mainStudioIndex !== -1
                ? props.studios[props.mainStudioIndex].node.name
                : '?'}
            </Typography>
          </Box>
              ) : null */}
        <ScoreSelect
          props={props}
          advancedInput={myAdvancedInput}
          inputDispatch={inputDispatch}
        />
        {props.type === 'ANIME' ? (
          <Box sx={{ gridColumn: '2/3', gridRow: '2/3' }}>
            <Typography fontSize={12} fontWeight="bold">
              Studio{'  '}
            </Typography>
            <Typography fontSize={12} noWrap>
              {props.mainStudioIndex !== -1
                ? props.studios[props.mainStudioIndex].node.name
                : '?'}
            </Typography>
          </Box>
        ) : (
          <Box sx={{ gridColumn: '2/3', gridRow: '2/3' }}>
            <ProgressVolumesStepper
              props={props}
              advancedInput={myAdvancedInput}
              inputDispatch={inputDispatch}
            />
          </Box>
        )}
        <Box>
          <Typography fontSize={12} fontWeight="bold">
            Type{' '}
          </Typography>
          <Typography fontSize={12} noWrap>
            {props.format !== null ? formatType(props.format) : '?'}
          </Typography>
        </Box>
        <Box>
          <Typography fontSize={12} fontWeight="bold">
            Status{' '}
          </Typography>
          <Typography fontSize={12} noWrap>
            {props.status !== null ? formatStatus(props.status) : '?'}
          </Typography>
        </Box>
        {props.type === 'ANIME' ? (
          <Box>
            <Typography fontSize={12} fontWeight="bold">
              Season{' '}
            </Typography>
            <Typography fontSize={12} noWrap>
              {props.season !== null && props.seasonYear !== null
                ? formatSeason(props.season, props.seasonYear)
                : formatStartYear(props.startYear)}
            </Typography>
          </Box>
        ) : (
          <Box>
            <Typography fontSize={12} fontWeight="bold">
              Released{' '}
            </Typography>
            <Typography fontSize={12} noWrap>
              {formatReleaseDateNumbers(
                props.startDay,
                props.startMonth,
                props.startYear,
              )}
            </Typography>
          </Box>
        )}
        <Box
          sx={{
            gridColumn: '1/3',
            mt: '3px',
            mb: '5px',
          }}
        >
          <Button
            size="sm"
            fullWidth
            sx={{
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#0a2744',
                animation: 'none',
              },
              py: 0,
              height: '15px',
              '@keyframes backgroundChange': {
                '0%': { backgroundColor: '#121212' },
                '50%': { backgroundColor: '#0a2744' },
                '100%': { backgroundColor: '#121212' },
              },
              animation:
                props.mediaListEntry.progress === myAdvancedInput.progress &&
                props.mediaListEntry.progressVolumes ===
                  myAdvancedInput.progressVolumes &&
                props.mediaListEntry.score === Number(myAdvancedInput.score)
                  ? 'none'
                  : 'backgroundChange 2s infinite',
            }}
            variant="outlined"
            onClick={handleUpdate}
          >
            Update
          </Button>
        </Box>
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
}

// test image: https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx1-CXtrrkMpJ8Zq.png
// 225/320 is medium image dimensions MAL.
// 320/450 is large image dimensions MAL.
// 100/141 is medium image dimensions AniList
// 230/326 is large image dimensions AniList
// 460/690 is extra large image dimensions AniList

// these are the two images that will be used
// 230/326 is large image dimensions AniList
// 225/320 is medium image dimensions MAL.
