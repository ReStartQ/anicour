import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_SortingState,
  type MRT_Virtualizer,
} from 'material-react-table';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { getTitle } from 'renderer/functions/view/TitlePreferenceFunctions';
import { useTitle } from 'renderer/context/TitleContext';
import {
  formatReleaseDate,
  formatSeason,
  formatStartYear,
  formatStatus,
  formatType,
} from 'renderer/functions/edit/formatInfo';
import getStatusColor from 'renderer/functions/StatusFunction';
import { useSidebarButton } from 'renderer/context/SidebarContext';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import CircleIcon from '@mui/icons-material/Circle';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';
import createMediaListEntryData from 'renderer/functions/data/generator/createMediaListEntryData';
import { useDeleteEntryData } from 'renderer/functions/api/mutations/deleteEntry';
import { useAniListUsername } from 'renderer/context/services/AniListUsernameContext';
import { useAniListToken } from 'renderer/context/services/AniListTokenContext';
import { useAddNewEntryData } from 'renderer/functions/api/mutations/addEntry';
import { useAtom } from 'jotai';
import { statusAddSelectAtom } from 'renderer/store';
import { getMalLink } from 'renderer/functions/edit/getAdjustedSiteLink';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { useCategory } from 'renderer/context/CategoryContext';
import { useSearchQuery } from 'renderer/functions/SearchFunctions';
import { useSearchTerm } from 'renderer/context/SearchTermContext';
import { useAdult } from 'renderer/context/AdultContext';
import { MediaIcons, OnListIcon } from '../../etc/SvgIcons';
import { StyledMenu } from '../../styled/StyledComponents';
import SeasonTitleTableBox from './SeasonTitleTableBox';

export default function SeasonMediaTable({ props }: any) {
  const myTitlePreference: any = useTitle();
  const mySidebar: any = useSidebarButton();
  const myCategory: any = useCategory();
  const myAdvancedMedia: any = useAdvancedMedia();
  const titlePreference: any = useTitle();
  const deleteMutation: any = useDeleteEntryData();
  const myUserName: any = useAniListUsername();
  const myToken: any = useAniListToken();
  const addMutation: any = useAddNewEntryData();
  const [statusAddSelect, setStatusAddSelect] = useAtom(statusAddSelectAtom);
  const [myFlag, setMyFlag] = useState(true);

  const searchTerm: any = useSearchTerm();
  const adult: any = useAdult();

  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX,
            mouseY: event.clientY,
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null,
    );
  };

  const columnsSearchAnime = useMemo<MRT_ColumnDef<any>[]>(
    // column definitions...
    () => [
      {
        size: 200,
        header: 'Title',
        accessorFn: (row: any) => {
          return (
            <SeasonTitleTableBox title={titlePreference.title} row={row} />
          );
        },
      },
      {
        size: 100,
        header: 'Episodes',
        accessorFn: (row: any) => {
          return (
            <Typography fontSize={12}>
              {`${row.episodes !== null ? row.episodes : '?'}`}
            </Typography>
          );
        },
      },
      {
        size: 70,
        header: 'Score',
        accessorFn: (row: any) => {
          return (
            <Typography fontSize="12px">
              {row.averageScore !== null ? row.averageScore : '?'}
            </Typography>
          );
        },
      },
      {
        size: 50,
        header: 'Status',
        accessorFn: (row: any) => {
          return (
            <CircleIcon
              fontSize="inherit"
              sx={{
                color: getStatusColor(row.status),
              }}
            />
          );
        },
      },
      {
        size: 90,
        header: 'Season',
        accessorFn: (row: any) => {
          return (
            <Typography fontSize={12}>
              {row.season !== null && row.seasonYear !== null
                ? formatSeason(row.season, row.seasonYear)
                : formatStartYear(row.startYear)}
            </Typography>
          );
        },
      },
      {
        id: 'Menu',
        header: 'Menu',
        enableHiding: true,
        columnDefType: 'display', // turns off data column features like sorting, filtering, etc.
        Cell: ({ row }: any) => {
          const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(
            null,
          );
          const open = Boolean(anchorEl);
          const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(event.currentTarget);
          };
          const handleClose = () => {
            setAnchorEl(null);
          };

          const handleCloseAdvanced = () => {
            setAnchorEl(null);
            window.electron.ipcRenderer.sendMessage('advancedMedia', [
              getTitle(titlePreference.title, row.original),
              row.original,
            ]);
            myAdvancedMedia.dispatch({
              type: 'getNewMedia',
              payload: row.original,
            });
          };

          const handleCloseTrailer = () => {
            setAnchorEl(null);
            window.electron.ipcRenderer.sendMessage('advancedMedia', [
              getTitle(titlePreference.title, row.original),
              row.original,
              'trailer',
            ]);
            myAdvancedMedia.dispatch({
              type: 'getNewMedia',
              payload: row.original,
            });
          };

          const handleCloseMalPage = () => {
            setAnchorEl(null);
            window.electron.ipcRenderer.sendMessage('openExternalLink', [
              getMalLink(row.original.idMal, row.original.type),
            ]);
          };

          const handleCloseAniListPage = () => {
            setAnchorEl(null);
            window.electron.ipcRenderer.sendMessage('openExternalLink', [
              row.original.siteUrl,
            ]);
          };

          const handleCloseDelete = () => {
            setAnchorEl(null);

            const entry: any = {
              myUserName: myUserName.AniListUsername,
              myToken: myToken.AniListToken,
              myMediaId: row.original.id,
              mediaListEntry: row.original.mediaListEntry,
              advancedMedia: row.original,
            };
            deleteMutation.mutate(entry);

            // only send message if successful mutation
            /*
            window.electron.ipcRenderer.sendMessage('advancedMediaListEntry', [
              getTitle(titlePreference.title, row.original),
              row.original,
              'delete',
              null,
            ]);
            */
          };

          const handleCloseAdd = async () => {
            setAnchorEl(null);

            const today = new Date();

            const entry: any = {
              myUserName: myUserName.AniListUsername,
              myToken: myToken.AniListToken,
              myMediaId: row.original.id,
              myStatus: statusAddSelect,
              advancedInput: createMediaListEntryData(
                row.original.id,
                {
                  day: today.getDate(),
                  month: today.getMonth() + 1,
                  year: today.getFullYear(),
                },
                statusAddSelect,
                row.original.type,
              ),
              advancedMedia: row.original,
            };
            addMutation.mutate(entry);

            // only send message if successful mutation
            /*
            window.electron.ipcRenderer.sendMessage('advancedMediaListEntry', [
              getTitle(titlePreference.title, row.original),
              row.original,
              'add',
              createMediaListEntryData(
                row.original.id,
                {
                  day: today.getDate(),
                  month: today.getMonth() + 1,
                  year: today.getFullYear(),
                },
                'CURRENT',
                row.original.type,
              ),
            ]);
            */
          };

          return (
            <div>
              <IconButton
                size="small"
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                className="MenuButtons"
              >
                <MoreHorizIcon className="MenuButtonIcons" />
              </IconButton>
              <StyledMenu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                  dense: true,
                }}
                className="Menu"
              >
                <MenuItem onClick={handleCloseAdvanced} className="MenuItems">
                  More Information / Edit
                </MenuItem>
                <MenuItem
                  onClick={handleCloseTrailer}
                  disabled={row.original.trailer === null}
                  className="MenuItems"
                >
                  Watch Trailer
                </MenuItem>
                <Divider className="MenuItems" />
                <MenuItem
                  onClick={handleCloseAniListPage}
                  className="MenuItems"
                >
                  Go To AniList Page
                </MenuItem>
                <MenuItem
                  onClick={handleCloseMalPage}
                  disabled={row.original.idMal === null}
                  className="MenuItems"
                >
                  Go To MyAnimeList Page
                </MenuItem>
                <Divider className="MenuItems" />
                {row.original.mediaListEntry !== null ? (
                  <MenuItem onClick={handleCloseDelete} className="MenuItems">
                    Remove from List
                  </MenuItem>
                ) : (
                  <MenuItem onClick={handleCloseAdd} className="MenuItems">
                    Add to List
                  </MenuItem>
                )}
              </StyledMenu>
            </div>
          );
        },
        size: 50,
      },
    ],
    [
      addMutation,
      deleteMutation,
      myAdvancedMedia,
      myToken.AniListToken,
      myUserName.AniListUsername,
      statusAddSelect,
      titlePreference.title,
    ],
    // end
  );

  // optionally access the underlying virtualizer instance
  const rowVirtualizerInstanceRef =
    useRef<MRT_Virtualizer<HTMLDivElement, HTMLTableRowElement>>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [sorting, setSorting] = useState<MRT_SortingState>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // scroll to the top of the table when the sorting changes
    try {
      rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
    } catch (error) {
      console.error(error);
    }
  }, [sorting]);

  const [rowSelection, setRowSelection] = useState({});

  const myColumnOrder = [
    'Status',
    'Title',
    'Episodes',
    'Chapters',
    'Volumes',
    'Studio',
    'Score',
    'Type',
    'Popularity',
    'Season',
    'Released',
    'Menu',
  ];

  const myTable = useMaterialReactTable({
    columns: columnsSearchAnime,
    data: props, // 10,000 rows
    defaultDisplayColumn: { enableResizing: true },
    enableFilters: false,
    enableTopToolbar: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableBottomToolbar: false,
    enableColumnResizing: false,
    enableGlobalFilterModes: true,
    enablePagination: false,
    enableStickyHeader: true,
    enableColumnPinning: false,
    enableRowPinning: false,
    enableColumnActions: false,
    enableSorting: false,
    manualSorting: true,
    enableEditing: true,
    enableHiding: false,
    enableRowVirtualization: true,
    muiTableContainerProps: {
      sx: { height: '100%' },
    },
    muiTablePaperProps: { sx: { height: '100%' } },
    /*
            MenuButtons
            MenuIcons
            Menu
            MenuItems
    */
    muiTableBodyRowProps: ({ row }) => ({
      onDoubleClick: (event: any) => {
        console.info(event, row.id);
        console.log(row);
        if (
          event.target.classList.contains('MenuButtons') ||
          event.target.classList.contains('MenuIcons') ||
          event.target.classList.contains('Menu') ||
          event.target.classList.contains('MenuItems')
        ) {
          console.log('more');
        } else {
          window.electron.ipcRenderer.sendMessage('advancedMedia', [
            getTitle(myTitlePreference.title, row.original),
            row.original,
          ]);
          myAdvancedMedia.dispatch({ type: 'getNewMedia', payload: props });
          row.toggleSelected(true);
        }
      },
      onClick: (event: any) => {
        console.info(event, row.id);
        console.log(event.target);
        if (
          event.target.classList.contains('MenuButtons') ||
          event.target.classList.contains('MenuIcons') ||
          event.target.classList.contains('Menu') ||
          event.target.classList.contains('MenuItems')
        ) {
          console.log('more');
        } else {
          row.toggleSelected(!row.getIsSelected());
        }
        // if click on menu button and menu
        // normal
      },
      onContextMenu: (event: any) => {
        handleContextMenu(event);
      },
    }),
    enableRowSelection: true,
    enableMultiRowSelection: false,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    state: {
      isLoading,
      sorting,
      rowSelection,
      columnVisibility: {
        'mrt-row-actions': true,
      },
      columnOrder: myColumnOrder,
      density: 'compact',
    },
    rowVirtualizerInstanceRef, // optional
    rowVirtualizerOptions: { overscan: 5 }, // optionally customize the virtualizer
  });

  return <MaterialReactTable table={myTable} />;
}

// virtualizerInstanceRef was renamed to rowVirtualizerInstanceRef in v1.5.0
// virtualizerProps was renamed to rowVirtualizerProps in v1.5.0
