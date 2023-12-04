import Chip from '@mui/joy/Chip';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabList from '@mui/joy/TabList';
import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { useAdult } from 'renderer/context/AdultContext';
import { useCategory } from 'renderer/context/CategoryContext';
import { useFilter } from 'renderer/context/FilterContext';
import { useSearchTerm } from 'renderer/context/SearchTermContext';
import { useSidebarButton } from 'renderer/context/SidebarContext';
import { useSort } from 'renderer/context/SortContext';
import { useSortLast } from 'renderer/context/SortLastContext';
import { useTheme } from 'renderer/context/ThemeContext';
import { useAniListToken } from 'renderer/context/services/AniListTokenContext';
import { useSearchQuery } from 'renderer/functions/SearchFunctions';
import { getCategoryColor } from 'renderer/functions/StatusFunction';
import { FilterCount } from 'renderer/functions/view/CountFunctions';

export default function SearchCategoryBar({ listValue }: any) {
  const myCategory: any = useCategory();
  const mySidebarValue: any = useSidebarButton();
  const sortValue: any = useSort();
  const sortLast: any = useSortLast();
  const myTheme: any = useTheme();
  const searchTerm: any = useSearchTerm();
  const myToken: any = useAniListToken();
  const adult: any = useAdult();
  const myFilter: any = useFilter();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isLoading, isError, error, data, refetch } = useSearchQuery(
    searchTerm.SearchTerm,
    myToken.AniListToken,
    adult.adult,
  );

  useEffect(() => {
    if (myCategory.category === 0) {
      sortValue.setSort(sortLast.sortLast.searchAnime);
    } else if (myCategory.category === 1) {
      sortValue.setSort(sortLast.sortLast.searchManga);
    } else {
      sortValue.setSort(sortLast.sortLast.searchLightNovels);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myCategory]);

  if (isLoading || isError) {
    return (
      <TabList
        variant="outlined"
        sx={(theme) => ({
          userSelect: 'none',
          '--List-item-radius': '0px',
          borderRadius: 0,
          width: '500px', // 770 max
          height: '50px',
          [`& .${tabClasses.root}[aria-selected="true"]`]: {
            boxShadow: 'sm',
            bgcolor: 'primary',
          },
          borderBottom: myTheme.theme ? '1px solid #858585' : '1px solid black',
          // this was added in
          [`&& .${tabClasses.root}`]: {
            fontWeight: 'lg',
            flex: 1,
            bgcolor: 'background.body',
            position: 'relative',
            [`&.${tabClasses.selected}`]: {
              color: 'primary.600',
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
              // borderLeft: `1px solid ${theme.vars.palette.divider}`,
              borderLeft: `1px solid #404040`,
            },
          },
          [`&.${tabClasses.focusVisible}`]: {
            outlineOffset: '-3px',
          },
        })}
      >
        <Tab
          sx={{
            py: 1.5,
            borderRadius: 0,
          }}
          value={0}
        >
          <Typography
            color={
              myCategory.category === 0
                ? getCategoryColor(myFilter.filter)
                : 'neutral'
            }
            fontSize={12}
            fontWeight="bold"
          >
            Anime
          </Typography>
          <ListItemDecorator>
            <Chip
              size="sm"
              variant="outlined"
              color={
                myCategory.category === 0
                  ? getCategoryColor(myFilter.filter)
                  : 'neutral'
              }
              sx={{ ml: 1 }}
            >
              0
            </Chip>
          </ListItemDecorator>
        </Tab>
        <Tab sx={{ py: 1.5, borderRadius: 0 }} value={1}>
          <Typography
            color={
              myCategory.category === 1
                ? getCategoryColor(myFilter.filter)
                : 'neutral'
            }
            fontSize={12}
            fontWeight="bold"
          >
            Manga
          </Typography>
          <ListItemDecorator>
            <Chip
              size="sm"
              variant="outlined"
              color={
                myCategory.category === 1
                  ? getCategoryColor(myFilter.filter)
                  : 'neutral'
              }
              sx={{ ml: 1 }}
            >
              0
            </Chip>
          </ListItemDecorator>
        </Tab>
        <Tab sx={{ py: 1.5, borderRadius: 0 }} value={2}>
          <Typography
            color={
              myCategory.category === 2
                ? getCategoryColor(myFilter.filter)
                : 'neutral'
            }
            fontSize={12}
            fontWeight="bold"
          >
            Light Novels
          </Typography>
          <ListItemDecorator>
            <Chip
              size="sm"
              variant="outlined"
              color={
                myCategory.category === 2
                  ? getCategoryColor(myFilter.filter)
                  : 'neutral'
              }
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
        userSelect: 'none',
        '--List-item-radius': '0px',
        borderRadius: 0,
        width: '500px', // 770 max
        height: '50px',
        borderBottom: myTheme.theme ? '1px solid white' : '1px solid black',
        [`& .${tabClasses.root}[aria-selected="true"]`]: {
          boxShadow: 'sm',
        },
        [`& .${tabClasses.root}`]: {
          boxShadow: 'sm',
          fontWeight: 'lg',
          flex: 1,
          bgcolor: 'background.body',
          position: 'relative',
          // selected tab whole
          [`&.${tabClasses.selected}`]: {
            color: myFilter.filter === '' ? 'primary.600' : 'warning.600',
          },
          [`&.${tabClasses.selected}:before`]: {
            content: '""',
            display: 'block',
            position: 'absolute',
            bottom: -1,
            width: '100%',
            height: 2,
            bgcolor: myFilter.filter === '' ? 'primary.400' : 'warning.400',
          },
          '&:not(:first-of-type)': {
            // borderLeft: `1px solid ${theme.vars.palette.divider}`,
            borderLeft: `1px solid #404040`,
          },
          [`&.${tabClasses.focusVisible}`]: {
            outlineOffset: '-3px',
          },
        },
      })}
    >
      <Tab
        sx={{
          py: 1.5,
          borderRadius: 0,
        }}
        value={0}
      >
        <Typography
          color={
            myCategory.category === 0
              ? getCategoryColor(myFilter.filter)
              : 'neutral'
          }
          fontSize={12}
          fontWeight="bold"
        >
          Anime
        </Typography>
        <ListItemDecorator>
          <Chip
            size="sm"
            variant="outlined"
            color={
              myCategory.category === 0
                ? getCategoryColor(myFilter.filter)
                : 'neutral'
            }
            sx={{ ml: 1 }}
          >
            <FilterCount
              sidebar={mySidebarValue.sidebar}
              category={0}
              data={data}
              filterTerm={myFilter.filter}
            />
          </Chip>
        </ListItemDecorator>
      </Tab>
      <Tab sx={{ py: 1.5, borderRadius: 0 }} value={1}>
        <Typography
          color={
            myCategory.category === 1
              ? getCategoryColor(myFilter.filter)
              : 'neutral'
          }
          fontSize={12}
          fontWeight="bold"
        >
          Manga
        </Typography>
        <ListItemDecorator>
          <Chip
            size="sm"
            variant="outlined"
            color={
              myCategory.category === 1
                ? getCategoryColor(myFilter.filter)
                : 'neutral'
            }
            sx={{ ml: 1 }}
          >
            <FilterCount
              sidebar={mySidebarValue.sidebar}
              category={1}
              data={data}
              filterTerm={myFilter.filter}
            />
          </Chip>
        </ListItemDecorator>
      </Tab>
      <Tab sx={{ py: 1.5, borderRadius: 0 }} value={2}>
        <Typography
          color={
            myCategory.category === 2
              ? getCategoryColor(myFilter.filter)
              : 'neutral'
          }
          fontSize={12}
          fontWeight="bold"
        >
          Light Novels
        </Typography>
        <ListItemDecorator>
          <Chip
            size="sm"
            variant="outlined"
            color={
              myCategory.category === 2
                ? getCategoryColor(myFilter.filter)
                : 'neutral'
            }
            sx={{ ml: 1 }}
          >
            <FilterCount
              sidebar={mySidebarValue.sidebar}
              category={2}
              data={data}
              filterTerm={myFilter.filter}
            />
          </Chip>
        </ListItemDecorator>
      </Tab>
    </TabList>
  );
}
