import Chip from '@mui/joy/Chip';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabList from '@mui/joy/TabList';
import { Typography } from '@mui/material';
import { useAdult } from 'renderer/context/AdultContext';
import { useCategory } from 'renderer/context/CategoryContext';
import { useFilter } from 'renderer/context/FilterContext';
import { useSeasonInput } from 'renderer/context/SeasonInputContext';
import { useSidebarButton } from 'renderer/context/SidebarContext';
import { useTheme } from 'renderer/context/ThemeContext';
import { useAniListToken } from 'renderer/context/services/AniListTokenContext';
import { useAniListUsername } from 'renderer/context/services/AniListUsernameContext';
import { useSeasonsQuery } from 'renderer/functions/SeasonsFunctions';
import { getCategoryColor } from 'renderer/functions/StatusFunction';
import { FilterCount } from 'renderer/functions/view/CountFunctions';

export default function MainCategoryBar({ listValue }: any) {
  const myCategory: any = useCategory();
  const myTheme: any = useTheme();
  const seasonInput: any = useSeasonInput();
  const myToken: any = useAniListToken();
  const myUserName: any = useAniListUsername();
  const mySidebarValue: any = useSidebarButton();
  const adult: any = useAdult();
  const myFilter: any = useFilter();

  const { isLoading, isError, error, data, refetch } = useSeasonsQuery(
    seasonInput.seasonInput,
    myToken.AniListToken,
    myUserName.AniListUsername,
    adult.adult,
  );

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
            fontSize={12}
            color={
              myCategory.category === 0
                ? getCategoryColor(myFilter.filter)
                : 'neutral'
            }
            fontWeight="bold"
          >
            TV
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
            OVA/ONA/Special
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
            Movies
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
          fontSize={12}
          color={
            myCategory.category === 0
              ? getCategoryColor(myFilter.filter)
              : 'neutral'
          }
          fontWeight="bold"
        >
          TV
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
          OVA/ONA/Special
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
          Movies
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
