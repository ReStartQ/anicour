import { Box, Typography } from '@mui/material';
import React from 'react';
import { getTitle } from 'renderer/functions/view/TitlePreferenceFunctions';
import { useTitle } from 'renderer/context/TitleContext';
import { useSearchTerm } from 'renderer/context/SearchTermContext';
import { useAniListToken } from 'renderer/context/services/AniListTokenContext';
import { useAdult } from 'renderer/context/AdultContext';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';
import { useSearchQuery } from 'renderer/functions/SearchFunctions';
import { OnListIcon } from '../../etc/SvgIcons';

const SearchTitleTableBox = ({ title, row }: any) => {
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

  return (
    <Box display="flex" flexDirection="row" width="100%">
      {row.mediaListEntry !== null ? <OnListIcon type={0.5} /> : null}
      <Typography noWrap fontSize={12}>
        {getTitle(title, row)}
      </Typography>
    </Box>
  );
};

export default SearchTitleTableBox;
