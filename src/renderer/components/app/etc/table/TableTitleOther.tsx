import { Box, Typography } from '@mui/material';
import React from 'react';
import MessageIcon from '@mui/icons-material/Message';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import { useTitle } from 'renderer/context/TitleContext';
import { getTitle } from 'renderer/functions/view/TitlePreferenceFunctions';
import { useSearchTerm } from 'renderer/context/SearchTermContext';
import { useAniListToken } from 'renderer/context/services/AniListTokenContext';
import { useAdult } from 'renderer/context/AdultContext';
import { useSearchQuery } from 'renderer/functions/SearchFunctions';
import { useSeasonsQuery } from 'renderer/functions/SeasonsFunctions';
import { useSeasonInput } from 'renderer/context/SeasonInputContext';
import { useAniListUsername } from 'renderer/context/services/AniListUsernameContext';
import HtmlTooltip from '../CustomTooltip1';

const TableTitleOther = ({ row }: any) => {
  const myTitlePreference: any = useTitle();
  const searchTerm: any = useSearchTerm();
  const myToken: any = useAniListToken();
  const adult: any = useAdult();
  const seasonInput: any = useSeasonInput();
  const myUserName: any = useAniListUsername();

  // this fixes the setQuery not reupdating
  const searchObject = useSearchQuery(
    searchTerm.SearchTerm,
    myToken.AniListToken,
    adult.adult,
  );
  // this fixes the setQuery not reupdating
  const seasonObject = useSeasonsQuery(
    seasonInput.seasonInput,
    myToken.AniListToken,
    myUserName.AniListUsername,
    adult.adult,
  );

  return (
    <Typography noWrap fontSize={12}>
      {row.mediaListEntry !== null ? (
        <HtmlTooltip title="On List">
          <PlaylistAddCheckCircleIcon fontSize="inherit" sx={{ mr: '5px' }} />
        </HtmlTooltip>
      ) : null}
      {getTitle(myTitlePreference.title, row)}
    </Typography>
  );
};

export default TableTitleOther;
