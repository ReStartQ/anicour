import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Parser from 'html-react-parser';
import * as React from 'react';
import { useState } from 'react';
import { useTitle } from 'renderer/context/TitleContext';
import getStatusColor from 'renderer/functions/StatusFunction';
import {
  formatReleaseDate,
  formatReleaseDateNumbers,
  formatSeason,
  formatSource,
  formatStartYear,
  formatStatus,
  formatType,
} from 'renderer/functions/edit/formatInfo';
import { getTitle } from 'renderer/functions/view/TitlePreferenceFunctions';
import { useSearchTerm } from 'renderer/context/SearchTermContext';
import { useAniListToken } from 'renderer/context/services/AniListTokenContext';
import { useAdult } from 'renderer/context/AdultContext';
import { useSearchQuery } from 'renderer/functions/SearchFunctions';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';
import { Tooltip } from '@mui/joy';
import { Circle } from '@mui/icons-material';
import ContextMenu from '../etc/ContextMenu';
import DeleteModal from '../etc/DeleteModal';

export default function SearchMediaCard({ props }: any) {
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

  const handleClick = (myTitle: string) => {
    navigator.clipboard.writeText(myTitle);
  };

  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleContextMenu = (event: React.MouseEvent) => {
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
          variant="h6"
          fontSize={14}
          fontWeight="bold"
          component="div"
          noWrap
          gutterBottom
          className="title"
        >
          {getTitle(titlePreference.title, props)}
        </Typography>
        {props.type === 'ANIME' ? (
          <Box display="flex" flexDirection="row" alignItems="center" gap="5px">
            <Box
              component="span"
              fontWeight="bold"
              fontSize={14}
              className="label-information"
            >
              Episodes:{'  '}
            </Box>
            <Typography fontSize={12} noWrap className="information">
              {props.episodes !== null ? props.episodes : '?'}
            </Typography>
          </Box>
        ) : (
          <Box display="flex" flexDirection="row" alignItems="center" gap="5px">
            <Box
              component="span"
              fontWeight="bold"
              fontSize={14}
              className="label-information"
            >
              Chapters:{'  '}
            </Box>
            <Typography fontSize={12} noWrap className="information">
              {props.chapters !== null ? props.chapters : '?'}
            </Typography>
          </Box>
        )}
        {props.type !== 'ANIME' ? (
          <Box display="flex" flexDirection="row" alignItems="center" gap="5px">
            <Box
              component="span"
              fontWeight="bold"
              fontSize={14}
              className="label-information"
            >
              Volumes:{'  '}
            </Box>
            <Typography fontSize={12} noWrap className="information">
              {props.volumes !== null ? props.volumes : '?'}
            </Typography>
          </Box>
        ) : null}
        {props.type === 'ANIME' ? (
          <Box display="flex" flexDirection="row" alignItems="center" gap="5px">
            <Box
              component="span"
              fontSize={14}
              fontWeight="bold"
              className="label-information"
            >
              Type:{'  '}
            </Box>
            <Typography fontSize={12} noWrap className="information">
              {formatType(props.format)}
            </Typography>
          </Box>
        ) : null}
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
            Score:{'  '}
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
            Genres:{'  '}
          </Box>
          <Typography fontSize={12} noWrap className="information">
            {props.genres.map((e: any, index: number) => {
              if (index + 1 !== props.genres.length) {
                return `${e}, `;
              }
              return `${e}`;
            })}
          </Typography>
        </Box>
        <Box display="flex" flexDirection="row" alignItems="center" gap="5px">
          <Box
            component="span"
            fontSize={14}
            fontWeight="bold"
            className="label-information"
          >
            Source:{'  '}
          </Box>
          <Typography fontSize={12} noWrap className="information">
            {formatSource(props.source)}
          </Typography>
        </Box>
        {props.type === 'ANIME' ? (
          <Box display="flex" flexDirection="row" alignItems="center" gap="5px">
            <Box
              component="span"
              fontWeight="bold"
              fontSize={14}
              className="label-information"
            >
              Season:{'  '}
            </Box>
            <Typography fontSize={12} noWrap className="information">
              {props.season !== null && props.seasonYear !== null
                ? formatSeason(props.season, props.seasonYear)
                : formatStartYear(props.startYear)}
            </Typography>
          </Box>
        ) : (
          <Box display="flex" flexDirection="row" alignItems="center" gap="5px">
            <Box
              component="span"
              fontWeight="bold"
              fontSize={14}
              className="label-information"
            >
              Released:{'  '}
            </Box>
            <Typography fontSize={12} noWrap className="information">
              {formatReleaseDateNumbers(
                props.startDay,
                props.startMonth,
                props.startYear,
              )}
            </Typography>
          </Box>
        )}
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

/* props.type === 'ANIME' ? (
  <Box display="flex" flexDirection="row" alignItems="center" gap="5px">
    <Box
      component="span"
      fontWeight="bold"
      fontSize={14}
      className="label-information"
    >
      Studio:{'  '}
    </Box>
    <Typography fontSize={12} noWrap className="information">
      {props.mainStudioIndex !== -1
        ? props.studios[props.mainStudioIndex].node.name
        : '?'}
    </Typography>
  </Box>
) : null */
