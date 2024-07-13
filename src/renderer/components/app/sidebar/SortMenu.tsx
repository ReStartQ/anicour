import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useCategory } from 'renderer/context/CategoryContext';
import { useSidebarButton } from 'renderer/context/SidebarContext';
import { useSort } from 'renderer/context/SortContext';
import { useSortLast } from 'renderer/context/SortLastContext';
import { useAtom } from 'jotai';
import { nextAiringEpisodeAtom } from 'renderer/store';

function SortValueIcon({ value, currentSort }: any) {
  if (value === currentSort + 0.5) {
    // up
    return <ArrowDropUpIcon />;
  }
  if (value === currentSort) {
    //  down
    return <ArrowDropDownIcon />;
  }
  return <ListItemIcon />;
}

export function sortByTitle(arr: any, direction: boolean) {
  let result;
  if (direction) {
    // descending
    arr.sort(function (a: any, b: any) {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
  } else {
    // ascending
    arr.sort(function (a: any, b: any) {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
    arr.reverse();
  }
  return result;
}

export default function SortMenu() {
  const sidebar: any = useSidebarButton();
  const sortValue: any = useSort();
  const sortLast: any = useSortLast();
  const myCategory: any = useCategory();

  const [nextAiringEpisode, setNextAiringEpisode] = useAtom(
    nextAiringEpisodeAtom,
  );

  if (sidebar.sidebar === 0 && nextAiringEpisode === 'Show') {
    // anime list
    return (
      <List component="div" disablePadding>
        {[
          'Next Airing Time',
          'Status',
          'Title',
          'Episode Progress',
          'Score',
          'Type',
          'Season',
        ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              sx={{}}
              dense
              onClick={() => {
                switch (sortValue.sort) {
                  case index + 1:
                    sortValue.setSort(index + 1.5);
                    sortLast.dispatch({
                      type: 'updateAnimeSort',
                      payload: index + 1.5,
                    });
                    break;
                  case index + 1.5:
                    sortValue.setSort(0);
                    sortLast.dispatch({
                      type: 'updateAnimeSort',
                      payload: 0,
                    });
                    break;
                  default:
                    sortValue.setSort(index + 1);
                    sortLast.dispatch({
                      type: 'updateAnimeSort',
                      payload: index + 1,
                    });
                }
              }}
            >
              <ListItemIcon>
                <SortValueIcon value={sortValue.sort} currentSort={index + 1} />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    );
  }
  if (sidebar.sidebar === 0) {
    // anime list
    return (
      <List component="div" disablePadding>
        {['Status', 'Title', 'Episode Progress', 'Score', 'Type', 'Season'].map(
          (text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                sx={{}}
                dense
                onClick={() => {
                  switch (sortValue.sort) {
                    case index + 1:
                      sortValue.setSort(index + 1.5);
                      sortLast.dispatch({
                        type: 'updateAnimeSort',
                        payload: index + 1.5,
                      });
                      break;
                    case index + 1.5:
                      sortValue.setSort(0);
                      sortLast.dispatch({
                        type: 'updateAnimeSort',
                        payload: 0,
                      });
                      break;
                    default:
                      sortValue.setSort(index + 1);
                      sortLast.dispatch({
                        type: 'updateAnimeSort',
                        payload: index + 1,
                      });
                  }
                }}
              >
                <ListItemIcon>
                  <SortValueIcon
                    value={sortValue.sort}
                    currentSort={index + 1}
                  />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ),
        )}
      </List>
    );
  }
  if (sidebar.sidebar === 1) {
    // manga list
    return (
      <List component="div" disablePadding>
        {[
          'Status',
          'Title',
          'Chapter Progress',
          'Volume Progress',
          'Score',
          'Released ',
        ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              sx={{}}
              dense
              onClick={() => {
                switch (sortValue.sort) {
                  case index + 1:
                    sortValue.setSort(index + 1.5);
                    sortLast.dispatch({
                      type: 'updateMangaSort',
                      payload: index + 1.5,
                    });
                    break;
                  case index + 1.5:
                    sortValue.setSort(0);
                    sortLast.dispatch({
                      type: 'updateMangaSort',
                      payload: 0,
                    });
                    break;
                  default:
                    sortValue.setSort(index + 1);
                    sortLast.dispatch({
                      type: 'updateMangaSort',
                      payload: index + 1,
                    });
                }
              }}
            >
              <ListItemIcon>
                <SortValueIcon value={sortValue.sort} currentSort={index + 1} />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    );
  }
  if (sidebar.sidebar === 2) {
    // light novels list
    return (
      <List component="div" disablePadding>
        {[
          'Status',
          'Title',
          'Chapter Progress',
          'Volume Progress',
          'Score',
          'Released ',
        ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              sx={{}}
              dense
              onClick={() => {
                switch (sortValue.sort) {
                  case index + 1:
                    sortValue.setSort(index + 1.5);
                    sortLast.dispatch({
                      type: 'updateLightNovelsSort',
                      payload: index + 1.5,
                    });
                    break;
                  case index + 1.5:
                    sortValue.setSort(0);
                    sortLast.dispatch({
                      type: 'updateLightNovelsSort',
                      payload: 0,
                    });
                    break;
                  default:
                    sortValue.setSort(index + 1);
                    sortLast.dispatch({
                      type: 'updateLightNovelsSort',
                      payload: index + 1,
                    });
                }
              }}
            >
              <ListItemIcon>
                <SortValueIcon value={sortValue.sort} currentSort={index + 1} />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    );
  }
  if (sidebar.sidebar === 3 && myCategory.category === 0) {
    // search anime
    return (
      <List component="div" disablePadding>
        {['Status', 'Title', 'Episodes', 'Score', 'Type', 'Season'].map(
          (text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                sx={{}}
                dense
                onClick={() => {
                  switch (sortValue.sort) {
                    case index + 1:
                      sortValue.setSort(index + 1.5);
                      sortLast.dispatch({
                        type: 'updateSearchAnimeSort',
                        payload: index + 1.5,
                      });
                      break;
                    case index + 1.5:
                      sortValue.setSort(0);
                      sortLast.dispatch({
                        type: 'updateSearchAnimeSort',
                        payload: 0,
                      });
                      break;
                    default:
                      sortValue.setSort(index + 1);
                      sortLast.dispatch({
                        type: 'updateSearchAnimeSort',
                        payload: index + 1,
                      });
                  }
                }}
              >
                <ListItemIcon>
                  <SortValueIcon
                    value={sortValue.sort}
                    currentSort={index + 1}
                  />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ),
        )}
      </List>
    );
  }
  if (sidebar.sidebar === 3 && myCategory.category === 1) {
    // search manga
    return (
      <List component="div" disablePadding>
        {['Status', 'Title', 'Chapters', 'Volumes', 'Score', 'Released'].map(
          (text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                sx={{}}
                dense
                onClick={() => {
                  switch (sortValue.sort) {
                    case index + 1:
                      sortValue.setSort(index + 1.5);
                      sortLast.dispatch({
                        type: 'updateSearchMangaSort',
                        payload: index + 1.5,
                      });
                      break;
                    case index + 1.5:
                      sortValue.setSort(0);
                      sortLast.dispatch({
                        type: 'updateSearchMangaSort',
                        payload: 0,
                      });
                      break;
                    default:
                      sortValue.setSort(index + 1);
                      sortLast.dispatch({
                        type: 'updateSearchMangaSort',
                        payload: index + 1,
                      });
                  }
                }}
              >
                <ListItemIcon>
                  <SortValueIcon
                    value={sortValue.sort}
                    currentSort={index + 1}
                  />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ),
        )}
      </List>
    );
  }
  if (sidebar.sidebar === 3 && myCategory.category === 2) {
    // search light novels
    return (
      <List component="div" disablePadding>
        {['Status', 'Title', 'Chapters', 'Volumes', 'Score', 'Released'].map(
          (text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                sx={{}}
                dense
                onClick={() => {
                  switch (sortValue.sort) {
                    case index + 1:
                      sortValue.setSort(index + 1.5);
                      sortLast.dispatch({
                        type: 'updateSearchLightNovelsSort',
                        payload: index + 1.5,
                      });
                      break;
                    case index + 1.5:
                      sortValue.setSort(0);
                      sortLast.dispatch({
                        type: 'updateSearchLightNovelsSort',
                        payload: 0,
                      });
                      break;
                    default:
                      sortValue.setSort(index + 1);
                      sortLast.dispatch({
                        type: 'updateSearchLightNovelsSort',
                        payload: index + 1,
                      });
                  }
                }}
              >
                <ListItemIcon>
                  <SortValueIcon
                    value={sortValue.sort}
                    currentSort={index + 1}
                  />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ),
        )}
      </List>
    );
  }
  if (sidebar.sidebar === 4) {
    // seasons
    return (
      <List component="div" disablePadding dense>
        {[
          'Next Airing Time',
          'Popularity',
          'Score',
          'Status',
          'Title',
          'Episodes',
        ].map((text, index) => (
          <ListItem key={text} disablePadding dense>
            <ListItemButton
              sx={{}}
              dense
              onClick={() => {
                switch (sortValue.sort) {
                  case index + 1:
                    sortValue.setSort(index + 1.5);
                    sortLast.dispatch({
                      type: 'updateSeasonsSort',
                      payload: index + 1.5,
                    });
                    break;
                  case index + 1.5:
                    sortValue.setSort(0);
                    sortLast.dispatch({
                      type: 'updateSeasonsSort',
                      payload: 0,
                    });
                    break;
                  default:
                    sortValue.setSort(index + 1);
                    sortLast.dispatch({
                      type: 'updateSeasonsSort',
                      payload: index + 1,
                    });
                }
              }}
            >
              <ListItemIcon>
                <SortValueIcon value={sortValue.sort} currentSort={index + 1} />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    );
  }
  return <></>;
}
