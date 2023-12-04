import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import { CardActionArea, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { IconButtonProps } from '@mui/material/IconButton';
import { useState, MouseEvent } from 'react';
import { useTitle } from 'renderer/context/TitleContext';
import getStatusColor from 'renderer/functions/StatusFunction';
import { getMalLink } from 'renderer/functions/edit/getAdjustedSiteLink';
import { getTitle } from 'renderer/functions/view/TitlePreferenceFunctions';
import { useSearchTerm } from 'renderer/context/SearchTermContext';
import { useAniListToken } from 'renderer/context/services/AniListTokenContext';
import { useAdult } from 'renderer/context/AdultContext';
import { useSearchQuery } from 'renderer/functions/SearchFunctions';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';
import ContextMenu from '../etc/ContextMenu';

export default function SearchMediaCardCompact({ props }: any) {
  const titlePreference: any = useTitle();
  const searchTerm: any = useSearchTerm();
  const myToken: any = useAniListToken();
  const adult: any = useAdult();
  const myAdvancedMedia: any = useAdvancedMedia();

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

  const handleClose = () => {
    setContextMenu(null);
  };

  const handleCloseAdvanced = () => {
    setContextMenu(null);
    window.electron.ipcRenderer.sendMessage('advancedMedia', [
      getTitle(titlePreference.title, props),
      props,
    ]);
  };

  const handleCloseTrailer = () => {
    setContextMenu(null);
    window.electron.ipcRenderer.sendMessage('advancedMedia', [
      getTitle(titlePreference.title, props),
      props,
      'trailer',
    ]);
  };

  const handleCloseMalPage = () => {
    setContextMenu(null);
    window.electron.ipcRenderer.sendMessage('openExternalLink', [
      getMalLink(props.idMal, props.type),
    ]);
  };

  const handleCloseAniListPage = () => {
    setContextMenu(null);
    window.electron.ipcRenderer.sendMessage('openExternalLink', [
      props.siteUrl,
    ]);
  };

  const handleCloseDelete = () => {
    setContextMenu(null);
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
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
            }}
            color={getStatusColor(props.status)}
          >
            {getTitle(titlePreference.title, props)}
          </Typography>
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
