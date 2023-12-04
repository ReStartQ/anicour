import { Box, Typography } from '@mui/material';
import React from 'react';
import { getTitle } from 'renderer/functions/view/TitlePreferenceFunctions';
import { useTitle } from 'renderer/context/TitleContext';
import { useSearchTerm } from 'renderer/context/SearchTermContext';
import { useAniListToken } from 'renderer/context/services/AniListTokenContext';
import { useAdult } from 'renderer/context/AdultContext';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';
import { useSearchQuery } from 'renderer/functions/SearchFunctions';
import { useSeasonsQuery } from 'renderer/functions/SeasonsFunctions';
import { useSeasonInput } from 'renderer/context/SeasonInputContext';
import { useAniListUsername } from 'renderer/context/services/AniListUsernameContext';
import { OnListIcon } from '../../etc/SvgIcons';

const SeasonTitleTableBox = ({ title, row }: any) => {
  const titlePreference: any = useTitle();
  const searchTerm: any = useSearchTerm();
  const myToken: any = useAniListToken();
  const adult: any = useAdult();
  const myAdvancedMedia: any = useAdvancedMedia();
  const seasonInput: any = useSeasonInput();
  const myUserName: any = useAniListUsername();

  // this fixes the setQuery not reupdating
  const { data, refetch, dataUpdatedAt } = useSeasonsQuery(
    seasonInput.seasonInput,
    myToken.AniListToken,
    myUserName.AniListUsername,
    adult.adult,
  );

  return (
    <Box display="flex" flexDirection="row" width="100%">
      {row.mediaListEntry !== null ? <OnListIcon type={0.5} /> : null}
      <Typography noWrap fontSize={12}>
        {getTitle(title, row)}
      </Typography>
    </Box>
  );
};

export default SeasonTitleTableBox;
