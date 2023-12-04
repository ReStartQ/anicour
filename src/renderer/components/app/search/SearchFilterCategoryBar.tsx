import Chip from '@mui/joy/Chip';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabList from '@mui/joy/TabList';
import { Typography } from '@mui/material';
import { useAdult } from 'renderer/context/AdultContext';
import { useCategory } from 'renderer/context/CategoryContext';
import { useFilter } from 'renderer/context/FilterContext';
import { useSidebarButton } from 'renderer/context/SidebarContext';
import { useTheme } from 'renderer/context/ThemeContext';
import { useAniListToken } from 'renderer/context/services/AniListTokenContext';
import { useAniListUsername } from 'renderer/context/services/AniListUsernameContext';
import { useSearchQuery } from 'renderer/functions/SearchFunctions';
import { FilterCount } from '../../../functions/view/CountFunctions';

export default function SearchFilterCategoryBar({ listValue }: any) {
  const myCategory: any = useCategory();
  const mySidebarValue: any = useSidebarButton();
  const myTheme: any = useTheme();
  const myFilter: any = useFilter();

  const myToken: any = useAniListToken();
  const myUsername: any = useAniListUsername();
  const adult: any = useAdult();
  const { isLoading, isError, error, data, refetch } = useSearchQuery(
    myUsername.AniListUsername,
    myToken.AniListToken,
    adult.adult,
  );

  if (isLoading || isError) {
    <TabList
      variant="outlined"
      sx={(theme) => ({
        '--List-item-radius': '0px',
        borderRadius: 0,
        width: '100%', // 770 max
        height: '50px',
        borderBottom: myTheme.theme ? '1px solid white' : '1px solid black',
        [`& .${tabClasses.root}`]: {
          fontWeight: 'lg',
          flex: 1,
          bgcolor: 'background.body',
          position: 'relative',
          [`&.${tabClasses.selected}`]: {
            color: 'primary.500',
          },
          [`&.${tabClasses.selected}:before`]: {
            content: '""',
            display: 'block',
            position: 'absolute',
            bottom: -1,
            width: '100%',
            height: 2,
            bgcolor: 'primary.400',
          },
          '&:not(:first-of-type)': {
            borderLeft: `1px solid ${theme.vars.palette.divider}`,
          },
          [`&.${tabClasses.focusVisible}`]: {
            outlineOffset: '-3px',
          },
        },
      })}
    >
      <Tab
        sx={{ py: 1.5, borderRadius: 0 }}
        disabled
        value={myCategory.category}
      >
        <Typography fontSize={12} fontWeight="bold" color="primary" noWrap>
          {myFilter.filter}
        </Typography>
        <ListItemDecorator>
          <Chip size="sm" variant="soft" color="primary">
            0
          </Chip>
        </ListItemDecorator>
      </Tab>
    </TabList>;
  }

  return (
    <TabList
      variant="outlined"
      sx={(theme) => ({
        '--List-item-radius': '0px',
        borderRadius: 0,
        width: '100%', // 770 max
        height: '50px',
        borderBottom: myTheme.theme ? '1px solid white' : '1px solid black',
        [`& .${tabClasses.root}`]: {
          fontWeight: 'lg',
          flex: 1,
          bgcolor: 'background.body',
          position: 'relative',
          [`&.${tabClasses.selected}`]: {
            color: 'primary.500',
          },
          [`&.${tabClasses.selected}:before`]: {
            content: '""',
            display: 'block',
            position: 'absolute',
            bottom: -1,
            width: '100%',
            height: 2,
            bgcolor: 'primary.400',
          },
          '&:not(:first-of-type)': {
            borderLeft: `1px solid ${theme.vars.palette.divider}`,
          },
          [`&.${tabClasses.focusVisible}`]: {
            outlineOffset: '-3px',
          },
        },
      })}
    >
      <Tab
        sx={{ py: 1.5, borderRadius: 0 }}
        disabled
        value={myCategory.category}
      >
        <Typography fontSize={12} fontWeight="bold" color="primary" noWrap>
          {myFilter.filter}
        </Typography>
        <ListItemDecorator>
          <Chip size="sm" variant="soft" color="primary">
            <FilterCount
              sidebar={mySidebarValue.sidebar}
              filterTerm={myFilter.filter}
              data={data}
            />
          </Chip>
        </ListItemDecorator>
      </Tab>
    </TabList>
  );
}

// {main.main.anime.animeWatching.length}
