import { ExpandLess, ExpandMore } from '@mui/icons-material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import PageviewIcon from '@mui/icons-material/Pageview';
import SortIcon from '@mui/icons-material/Sort';
import Collapse from '@mui/material/Collapse';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { useCategory } from 'renderer/context/CategoryContext';
import { useNewsServiceType } from 'renderer/context/NewsServiceTypeContext';
import { useSidebarButton } from 'renderer/context/SidebarContext';
import { useSort } from 'renderer/context/SortContext';
import { useSortLast } from 'renderer/context/SortLastContext';
import { useNewsAnn } from 'renderer/context/NewsAnnContext';
import { useSeasonInput } from 'renderer/context/SeasonInputContext';
import { collapseStatusReducerAtom, newsLocationYAtom } from 'renderer/store';
import { useAtom } from 'jotai';
import { Box, SvgIcon } from '@mui/material';
import { formatSeason } from 'renderer/functions/edit/formatInfo';
import { useMainView } from 'renderer/context/MainViewContext';
import FeatureButtonGroup from './FeatureButtonGroup';
import ListViewToggle from './ListViewToggle';
import SortMenu from './SortMenu';
import FeatureButtonGroupNews from './FeatureButtonGroupNews';
import SeasonSearch from '../seasons/SeasonSearch';

const drawerWidth = 240;

function OtherIcons({ index }: any) {
  if (index === 0) {
    return <PageviewIcon />;
  }
  if (index === 1) {
    return <CalendarMonthIcon />;
  }
  return <NewspaperIcon />;
}

function SeasonIcons({ season }: any) {
  if (season === 'WINTER') {
    return (
      <SvgIcon>
        <svg
          viewBox="0 0 36 36"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          className="iconify iconify--twemoji"
          preserveAspectRatio="xMidYMid meet"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g id="SVGRepo_iconCarrier">
            <path
              fill="#88C9F9"
              d="M19 27.586V8.415l4.828-4.829s.707-.707 0-1.415c-.707-.707-1.414 0-1.414 0L19 5.586V1s0-1-1-1s-1 1-1 1v4.586l-3.414-3.415s-.707-.707-1.414 0c-.707.708 0 1.415 0 1.415L17 8.415v19.171l-4.828 4.828s-.707.707 0 1.414s1.414 0 1.414 0L17 30.414V35s0 1 1 1s1-1 1-1v-4.586l3.414 3.414s.707.707 1.414 0s0-1.414 0-1.414L19 27.586z"
            />
            <path
              fill="#88C9F9"
              d="M34.622 20.866c-.259-.966-1.225-.707-1.225-.707l-6.595 1.767l-16.603-9.586l-1.767-6.595s-.259-.966-1.225-.707C6.24 5.297 6.5 6.263 6.5 6.263l1.25 4.664l-3.972-2.294s-.866-.5-1.366.366c-.5.866.366 1.366.366 1.366l3.971 2.293l-4.664 1.249s-.967.259-.707 1.225c.259.967 1.225.708 1.225.708l6.596-1.767l16.603 9.586l1.767 6.596s.259.966 1.225.707c.966-.26.707-1.225.707-1.225l-1.25-4.664l3.972 2.293s.867.5 1.367-.365c.5-.867-.367-1.367-.367-1.367l-3.971-2.293l4.663-1.249c0-.001.966-.26.707-1.226z"
            />
            <path
              fill="#88C9F9"
              d="M33.915 13.907l-4.664-1.25l3.972-2.293s.867-.501.367-1.367c-.501-.867-1.367-.366-1.367-.366l-3.971 2.292l1.249-4.663s.259-.966-.707-1.225c-.966-.259-1.225.707-1.225.707l-1.767 6.595l-16.604 9.589l-6.594-1.768s-.966-.259-1.225.707c-.26.967.707 1.225.707 1.225l4.663 1.249l-3.971 2.293s-.865.501-.365 1.367c.5.865 1.365.365 1.365.365l3.972-2.293l-1.25 4.663s-.259.967.707 1.225c.967.26 1.226-.706 1.226-.706l1.768-6.597l16.604-9.585l6.595 1.768s.966.259 1.225-.707c.255-.967-.71-1.225-.71-1.225z"
            />
          </g>
        </svg>
      </SvgIcon>
    );
  }
  if (season === 'SPRING') {
    return (
      <SvgIcon>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g id="SVGRepo_iconCarrier">
            {' '}
            <path
              opacity="0.1"
              d="M4.44905 17.0091C-0.246262 7.83768 7.34063 0.686186 19.5547 3.61251C20.4161 3.81888 21.0082 4.6099 20.9652 5.49458C20.5863 13.288 17.0342 17.7048 6.13264 17.9858C5.43034 18.0039 4.7692 17.6344 4.44905 17.0091Z"
              fill="#618a3d"
            />{' '}
            <path
              d="M4.44905 17.0091C-0.246262 7.83768 7.34063 0.686186 19.5547 3.61251C20.4161 3.81888 21.0082 4.6099 20.9652 5.49458C20.5863 13.288 17.0342 17.7048 6.13264 17.9858C5.43034 18.0039 4.7692 17.6344 4.44905 17.0091Z"
              stroke="#618a3d"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />{' '}
            <path
              d="M3.99987 21C5.49993 15.5 5.99988 12.5 11.9998 9.99997"
              stroke="#618a3d"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />{' '}
          </g>
        </svg>
      </SvgIcon>
    );
  }
  if (season === 'SUMMER') {
    return (
      <SvgIcon>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g id="SVGRepo_iconCarrier">
            {' '}
            <path
              d="M18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12Z"
              fill="#ffdc00"
            />{' '}
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 1.25C12.4142 1.25 12.75 1.58579 12.75 2V3C12.75 3.41421 12.4142 3.75 12 3.75C11.5858 3.75 11.25 3.41421 11.25 3V2C11.25 1.58579 11.5858 1.25 12 1.25ZM1.25 12C1.25 11.5858 1.58579 11.25 2 11.25H3C3.41421 11.25 3.75 11.5858 3.75 12C3.75 12.4142 3.41421 12.75 3 12.75H2C1.58579 12.75 1.25 12.4142 1.25 12ZM20.25 12C20.25 11.5858 20.5858 11.25 21 11.25H22C22.4142 11.25 22.75 11.5858 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75H21C20.5858 12.75 20.25 12.4142 20.25 12ZM12 20.25C12.4142 20.25 12.75 20.5858 12.75 21V22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22V21C11.25 20.5858 11.5858 20.25 12 20.25Z"
              fill="#ffdc00"
            />{' '}
            <g opacity="0.5">
              {' '}
              <path
                d="M4.39838 4.39838C4.69127 4.10549 5.16615 4.10549 5.45904 4.39838L5.85188 4.79122C6.14477 5.08411 6.14477 5.55898 5.85188 5.85188C5.55898 6.14477 5.08411 6.14477 4.79122 5.85188L4.39838 5.45904C4.10549 5.16615 4.10549 4.69127 4.39838 4.39838Z"
                fill="#ffdc00"
              />{' '}
              <path
                d="M19.6009 4.39864C19.8938 4.69153 19.8938 5.16641 19.6009 5.4593L19.2081 5.85214C18.9152 6.14503 18.4403 6.14503 18.1474 5.85214C17.8545 5.55924 17.8545 5.08437 18.1474 4.79148L18.5402 4.39864C18.8331 4.10575 19.308 4.10575 19.6009 4.39864Z"
                fill="#ffdc00"
              />{' '}
              <path
                d="M18.1474 18.1474C18.4403 17.8545 18.9152 17.8545 19.2081 18.1474L19.6009 18.5402C19.8938 18.8331 19.8938 19.308 19.6009 19.6009C19.308 19.8938 18.8331 19.8938 18.5402 19.6009L18.1474 19.2081C17.8545 18.9152 17.8545 18.4403 18.1474 18.1474Z"
                fill="#ffdc00"
              />{' '}
              <path
                d="M5.85188 18.1477C6.14477 18.4406 6.14477 18.9154 5.85188 19.2083L5.45904 19.6012C5.16615 19.8941 4.69127 19.8941 4.39838 19.6012C4.10549 19.3083 4.10549 18.8334 4.39838 18.5405L4.79122 18.1477C5.08411 17.8548 5.55898 17.8548 5.85188 18.1477Z"
                fill="#ffdc00"
              />{' '}
            </g>{' '}
          </g>
        </svg>
      </SvgIcon>
    );
  }
  if (season === 'FALL') {
    return (
      <SvgIcon>
        <svg
          height="200px"
          width="200px"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 25.263 25.263"
          xmlSpace="preserve"
          fill="orange"
          transform="rotate(45)"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g id="SVGRepo_iconCarrier">
            {' '}
            <g>
              {' '}
              <path d="M15.362,9.69c0,0-0.75,1.108-1.068,0c-0.318-1.109-1.346-4.949-1.762-5.226 c-0.417-0.278-0.417-0.278-0.417-0.278s-0.078,1.506-0.594,1.307c-0.515-0.198-4.313-2.217-4.63-2.652L6.574,2.444 c0,0,0.355,3.328-0.515,2.615c0,0,1.113,2.771-2.573,3.048c0,0,1.186,3.087,4.552,4.75c0,0,1.148,1.783-0.949,1.503 c0,0-2.932-0.395-3.325-0.752c0,0-1.548,3.01-3.764,3.128c0,0,2.656,1.504,2.337,4.156c0,0,5.107,0.041,4.911,0.832 c-0.2,0.795-0.555,1.601-0.555,1.601s4.71-0.929,5.422-2.194c0,0,0.989,0.99,1.071,1.939c0,0,2.693-0.594,2.452-2.296 c0,0,1.269,0.948,1.427,2.551l0.554-0.375c0,0-0.319-1.661-1.464-2.967c0,0-0.517-1.308,0.789-0.633c0,0,3.085,1.029,5.7-0.833 c0,0-2.888-0.948-3.006-1.978c0,0,5.394-3.326,5.625-5.542c0,0-1.944,0.198-2.972-0.633c0,0-1.309-0.396,0.394-4.791 c0,0-1.227,0.724-1.62-3.636c0,0-3.051,4.665-4.518,3.082C16.548,5.018,15.165,8.066,15.362,9.69z" />{' '}
            </g>{' '}
          </g>
        </svg>
      </SvgIcon>
    );
  }
  return <SvgIcon />;
}

const SideBar = React.memo(() => {
  const sidebarValue: any = useSidebarButton();
  const mySort: any = useSort();
  const mySortLast: any = useSortLast();
  const myCategory: any = useCategory();
  const mySeasonInput: any = useSeasonInput();
  const [collapseStatus, collapseStatusDispatch] = useAtom(
    collapseStatusReducerAtom,
  );
  const mainView: any = useMainView();

  const [open, setOpen] = React.useState(false);
  const newsServiceType: any = useNewsServiceType();
  const newsCards: any = useNewsAnn();
  const [newsLocationY, setNewsLocationY] = useAtom(newsLocationYAtom);

  const handleClickSeason = () => {
    collapseStatusDispatch({ type: 'season' });
  };

  const handleClickSort = () => {
    collapseStatusDispatch({ type: 'sort' });
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar variant="dense" />
      <Divider />
      <Toolbar
        variant="dense"
        disableGutters
        sx={{
          padding: 0,
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {sidebarValue.sidebar !== 5 ? <ListViewToggle /> : null}
        {sidebarValue.sidebar !== 5 ? (
          <FeatureButtonGroup />
        ) : (
          <FeatureButtonGroupNews />
        )}
      </Toolbar>
      <Divider />
      <CssBaseline />
      <List>
        {['Anime List', 'Manga List', 'Light Novel List'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              selected={sidebarValue.sidebar === index}
              onClick={(event) => {
                switch (index) {
                  case 0:
                    mySort.setSort(mySortLast.sortLast.anime);
                    break;
                  case 1:
                    mySort.setSort(mySortLast.sortLast.manga);
                    break;
                  case 2:
                    mySort.setSort(mySortLast.sortLast.lightNovels);
                    break;
                  default:
                    mySort.setSort(0);
                }
                sidebarValue.setSidebar(index);
                // myFilter.setFilter('');
                if (newsLocationY !== 0) {
                  setNewsLocationY(0);
                }
              }}
            >
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Search', 'Seasons', 'News'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              selected={sidebarValue.sidebar === index + 3}
              onClick={() => {
                sidebarValue.setSidebar(index + 3);
                // myFilter.setFilter('');
                if (index === 0 && myCategory.category === 0) {
                  mySort.setSort(mySortLast.sortLast.searchAnime);
                }
                if (index === 0 && myCategory.category === 1) {
                  mySort.setSort(mySortLast.sortLast.searchManga);
                }
                if (index === 0 && myCategory.category === 2) {
                  mySort.setSort(mySortLast.sortLast.searchLightNovels);
                }
                if (index === 1) {
                  mySort.setSort(mySortLast.sortLast.seasons);
                }
                if (index + 3 === 5) {
                  console.log('news');
                  if (newsCards.NewsAnn.length === 0) {
                    if (newsServiceType.news === false) {
                      window.electron.ipcRenderer.sendMessage('newsList', [
                        'ping',
                      ]);
                    }
                  }
                }
                if (newsLocationY !== 0) {
                  setNewsLocationY(0);
                }
              }}
            >
              <ListItemIcon>
                <OtherIcons index={index} />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {sidebarValue.sidebar === 4 ? (
        <List
          sx={{ width: '100%', maxWidth: 240, bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <ListItemButton onClick={handleClickSeason} dense>
            <ListItemIcon>
              <SeasonIcons season={mySeasonInput.seasonInput[0]} />
            </ListItemIcon>
            <ListItemText
              primary={formatSeason(
                mySeasonInput.seasonInput[0],
                mySeasonInput.seasonInput[1],
              )}
            />
            {collapseStatus.season ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={collapseStatus.season} timeout="auto" unmountOnExit>
            <SeasonSearch />
          </Collapse>
        </List>
      ) : null}
      <Divider />
      {sidebarValue.sidebar === 4 ? <Divider /> : null}
      {sidebarValue.sidebar !== 5 ? (
        <List
          sx={{ width: '100%', maxWidth: 240, bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <ListItemButton onClick={handleClickSort} dense sx={{ py: 0 }}>
            <ListItemIcon>
              <SortIcon />
            </ListItemIcon>
            <ListItemText primary="Sort By" />
            {collapseStatus.sort ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={collapseStatus.sort} timeout="auto" unmountOnExit>
            <SortMenu /> {/* Sort Menu inserted here */}
          </Collapse>
        </List>
      ) : null}
      <Divider />
    </Drawer>
  );
});

export default SideBar;
