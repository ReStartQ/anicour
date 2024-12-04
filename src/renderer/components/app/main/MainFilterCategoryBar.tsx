import Chip from '@mui/joy/Chip';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabList from '@mui/joy/TabList';
import { Typography } from '@mui/material';
import { useCategory } from 'renderer/context/CategoryContext';
import { useSidebarButton } from 'renderer/context/SidebarContext';
import { useTheme } from 'renderer/context/ThemeContext';
import { useAniListToken } from 'renderer/context/services/AniListTokenContext';
import { useAniListUsername } from 'renderer/context/services/AniListUsernameContext';
import { useMainMediaList } from 'renderer/functions/MainMediaListFunctions';
import { memo } from 'react';
import { useFilter } from 'renderer/context/FilterContext';
import { getFilteredTabText } from 'renderer/functions/view/FilterFunctions';
import { FilterCount } from '../../../functions/view/CountFunctions';

const MainFilterCategoryBar = memo(({ listValue }: any) => {
  const myCategory: any = useCategory();
  const mySidebarValue: any = useSidebarButton();
  const myTheme: any = useTheme();
  const myFilter: any = useFilter();

  const myToken: any = useAniListToken();
  const myUsername: any = useAniListUsername();

  const { isLoading, isError, error, data, refetch } = useMainMediaList(
    myUsername.AniListUsername,
    myToken.AniListToken,
  );

  if (isLoading || isError) {
    // if isError or isLoading display 0 count
    return (
      <TabList
        variant="outlined"
        sx={(theme) => ({
          '--List-item-radius': '0px',
          borderRadius: 0,
          width: '770px', // 770 max
          height: '50px',
          [`& .${tabClasses.root}[aria-selected="true"]`]: {
            boxShadow: 'sm',
            bgcolor: 'primary.900',
          },
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
          sx={{
            py: 1,
            borderRadius: 0,
          }}
          value={0}
        >
          {mySidebarValue.sidebar === 0 ? (
            <Typography
              fontSize={12}
              fontWeight="bold"
              color={myCategory.category === 0 ? 'primary' : 'neutral'}
            >
              Watching
            </Typography>
          ) : (
            <Typography
              fontSize={12}
              fontWeight="bold"
              color={myCategory.category === 0 ? 'primary' : 'neutral'}
            >
              Reading
            </Typography>
          )}
          <ListItemDecorator>
            <Chip
              size="sm"
              variant="soft"
              sx={{ ml: 1 }}
              color={myCategory.category === 0 ? 'primary' : 'neutral'}
            >
              0
            </Chip>
          </ListItemDecorator>
        </Tab>
        <Tab sx={{ py: 1.5, borderRadius: 0 }} value={1}>
          <Typography
            color={myCategory.category === 1 ? 'primary' : 'neutral'}
            fontSize={12}
            fontWeight="bold"
          >
            Completed
          </Typography>
          <ListItemDecorator>
            <Chip
              size="sm"
              variant="soft"
              color={myCategory.category === 1 ? 'primary' : 'neutral'}
              sx={{ ml: 1 }}
            >
              0
            </Chip>
          </ListItemDecorator>
        </Tab>
        <Tab sx={{ py: 1.5, borderRadius: 0 }} value={2}>
          <Typography
            color={myCategory.category === 2 ? 'primary' : 'neutral'}
            fontSize={12}
            fontWeight="bold"
          >
            On Hold
          </Typography>
          <ListItemDecorator>
            <Chip
              size="sm"
              variant="soft"
              color={myCategory.category === 2 ? 'primary' : 'neutral'}
              sx={{ ml: 1 }}
            >
              0
            </Chip>
          </ListItemDecorator>
        </Tab>
        <Tab sx={{ py: 1.5, borderRadius: 0 }} value={3}>
          <Typography
            color={myCategory.category === 3 ? 'primary' : 'neutral'}
            fontSize={12}
            fontWeight="bold"
          >
            Dropped
          </Typography>
          <ListItemDecorator>
            <Chip
              size="sm"
              variant="soft"
              color={myCategory.category === 3 ? 'primary' : 'neutral'}
              sx={{ ml: 1 }}
            >
              0
            </Chip>
          </ListItemDecorator>
        </Tab>
        <Tab sx={{ py: 1.5, borderRadius: 0 }} value={4}>
          {mySidebarValue.sidebar === 0 ? (
            <Typography
              fontSize={12}
              fontWeight="bold"
              color={myCategory.category === 4 ? 'primary' : 'neutral'}
            >
              Planning
            </Typography>
          ) : (
            <Typography
              fontSize={12}
              fontWeight="bold"
              color={myCategory.category === 4 ? 'primary' : 'neutral'}
            >
              Planning
            </Typography>
          )}
          <ListItemDecorator>
            <Chip
              size="sm"
              variant="soft"
              color={myCategory.category === 4 ? 'primary' : 'neutral'}
            >
              0
            </Chip>
          </ListItemDecorator>
        </Tab>
        <Tab sx={{ py: 1.5, borderRadius: 0 }} value={5}>
          <Typography
            fontSize={12}
            fontWeight="bold"
            color={myCategory.category === 5 ? 'primary' : 'neutral'}
          >
            All
          </Typography>
          <ListItemDecorator>
            <Chip
              size="sm"
              variant="soft"
              color={myCategory.category === 5 ? 'primary' : 'neutral'}
              sx={{ ml: 1 }}
            >
              0
            </Chip>
          </ListItemDecorator>
        </Tab>
      </TabList>
    );
  }

  return (
    <TabList
      variant="outlined"
      sx={(theme) => ({
        '--List-item-radius': '0px',
        borderRadius: 0,
        width: '770px', // 770 max
        height: '50px',
        [`& .${tabClasses.root}[aria-selected="true"]`]: {
          boxShadow: 'sm',
          bgcolor: 'primary.900',
        },
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
          {getFilteredTabText(myCategory.category, mySidebarValue.sidebar) +
            myFilter.filter}
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
});

export default MainFilterCategoryBar;

// {main.main.anime.animeWatching.length}
