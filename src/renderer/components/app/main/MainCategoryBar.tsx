import Chip from '@mui/joy/Chip';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabList from '@mui/joy/TabList';
import { Box, Typography } from '@mui/material';
import { memo } from 'react';
import { useCategory } from 'renderer/context/CategoryContext';
import { useFilter } from 'renderer/context/FilterContext';
import { useSidebarButton } from 'renderer/context/SidebarContext';
import { useTheme } from 'renderer/context/ThemeContext';
import { useAniListToken } from 'renderer/context/services/AniListTokenContext';
import { useAniListUsername } from 'renderer/context/services/AniListUsernameContext';
import { useMainMediaList } from 'renderer/functions/MainMediaListFunctions';
import { getCategoryColor } from 'renderer/functions/StatusFunction';
import { FilterCount } from 'renderer/functions/view/CountFunctions';

const MainCategoryBar = memo(({ listValue }: any) => {
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
          userSelect: 'none',
          '--List-item-radius': '0px',
          borderRadius: 0,
          width: '770px', // 770 max
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
              variant="outlined"
              color={myCategory.category === 0 ? 'primary' : 'neutral'}
              sx={{ ml: 1 }}
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
              variant="outlined"
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
              variant="outlined"
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
              variant="outlined"
              color={myCategory.category === 3 ? 'primary' : 'neutral'}
              sx={{ ml: 1 }}
            >
              0
            </Chip>
          </ListItemDecorator>
        </Tab>
        <Tab
          sx={{ py: 1.5, borderRadius: 0, px: '5px', minWidth: '128px' }}
          value={4}
        >
          <Box
            sx={{
              width: '128px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
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
                variant="outlined"
                color={myCategory.category === 4 ? 'primary' : 'neutral'}
                sx={{ ml: 1 }}
              >
                0
              </Chip>
            </ListItemDecorator>
          </Box>
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
              variant="outlined"
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
        userSelect: 'none',
        '--List-item-radius': '0px',
        borderRadius: 0,
        width: '770px', // 770 max
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
          py: 1,
          borderRadius: 0,
        }}
        value={0}
      >
        {mySidebarValue.sidebar === 0 ? (
          <Typography
            fontSize={12}
            fontWeight="bold"
            color={
              myCategory.category === 0
                ? getCategoryColor(myFilter.filter)
                : 'neutral'
            }
          >
            Watching
          </Typography>
        ) : (
          <Typography
            fontSize={12}
            fontWeight="bold"
            color={
              myCategory.category === 0
                ? getCategoryColor(myFilter.filter)
                : 'neutral'
            }
          >
            Reading
          </Typography>
        )}
        <ListItemDecorator>
          <Chip
            size="sm"
            variant="outlined"
            sx={{ ml: 1 }}
            color={
              myCategory.category === 0
                ? getCategoryColor(myFilter.filter)
                : 'neutral'
            }
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
          Completed
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
          On Hold
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
      <Tab sx={{ py: 1.5, borderRadius: 0 }} value={3}>
        <Typography
          color={
            myCategory.category === 3
              ? getCategoryColor(myFilter.filter)
              : 'neutral'
          }
          fontSize={12}
          fontWeight="bold"
        >
          Dropped
        </Typography>
        <ListItemDecorator>
          <Chip
            size="sm"
            variant="outlined"
            color={
              myCategory.category === 3
                ? getCategoryColor(myFilter.filter)
                : 'neutral'
            }
            sx={{ ml: 1 }}
          >
            <FilterCount
              sidebar={mySidebarValue.sidebar}
              category={3}
              data={data}
              filterTerm={myFilter.filter}
            />
          </Chip>
        </ListItemDecorator>
      </Tab>
      <Tab
        sx={{ py: 1.5, borderRadius: 0, px: '5px', minWidth: '128px' }}
        value={4}
      >
        <Box
          sx={{
            width: '128px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          {mySidebarValue.sidebar === 0 ? (
            <Typography
              fontSize={12}
              fontWeight="bold"
              color={
                myCategory.category === 4
                  ? getCategoryColor(myFilter.filter)
                  : 'neutral'
              }
            >
              Planning
            </Typography>
          ) : (
            <Typography
              fontSize={12}
              fontWeight="bold"
              color={
                myCategory.category === 4
                  ? getCategoryColor(myFilter.filter)
                  : 'neutral'
              }
            >
              Planning
            </Typography>
          )}
          <ListItemDecorator>
            <Chip
              size="sm"
              variant="outlined"
              color={
                myCategory.category === 4
                  ? getCategoryColor(myFilter.filter)
                  : 'neutral'
              }
              sx={{ ml: 1 }}
            >
              <FilterCount
                sidebar={mySidebarValue.sidebar}
                category={4}
                data={data}
                filterTerm={myFilter.filter}
              />
            </Chip>
          </ListItemDecorator>
        </Box>
      </Tab>
      <Tab sx={{ py: 1.5, borderRadius: 0 }} value={5}>
        <Typography
          fontSize={12}
          fontWeight="bold"
          color={
            myCategory.category === 5
              ? getCategoryColor(myFilter.filter)
              : 'neutral'
          }
        >
          All
        </Typography>
        <ListItemDecorator>
          <Chip
            size="sm"
            variant="outlined"
            color={
              myCategory.category === 5
                ? getCategoryColor(myFilter.filter)
                : 'neutral'
            }
            sx={{ ml: 1 }}
          >
            <FilterCount
              sidebar={mySidebarValue.sidebar}
              category={5}
              data={data}
              filterTerm={myFilter.filter}
            />
          </Chip>
        </ListItemDecorator>
      </Tab>
    </TabList>
  );
});

export default MainCategoryBar;
// {main.main.anime.animeWatching.length}
