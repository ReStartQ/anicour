import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  MaterialReactTable,
  type MRT_SortingState,
  type MRT_Virtualizer,
} from 'material-react-table';
import { Tooltip, Typography } from '@mui/material';
import { getTitle } from 'renderer/functions/view/TitlePreferenceFunctions';
import { useTitle } from 'renderer/context/TitleContext';
import getStatusColor from 'renderer/functions/StatusFunction';
import { formatSeason, formatType } from 'renderer/functions/edit/formatInfo';

export default function MediaMuiReactTable({ props }: any) {
  const myTitlePreference: any = useTitle();

  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleContextMenu = (event: React.MouseEvent) => {
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

  const columnsAnime = useMemo(
    // column definitions...
    () => [
      {
        size: 100,
        header: 'Title',
        accessorFn: (row: any) => {
          return (
            <Tooltip title={getTitle(myTitlePreference.title, row)}>
              <Typography
                noWrap
                fontSize={12}
                color={getStatusColor(row.status)}
              >
                {getTitle(myTitlePreference.title, row)}
              </Typography>
            </Tooltip>
          );
        },
      },
      {
        size: 100,
        header: 'Progress',
        accessorFn: (row: any) => {
          return (
            <Typography fontSize={12}>
              {`${row.mediaListEntry.progress}/${row.episodes}`}
            </Typography>
          );
        },
      },
      {
        size: 50,
        header: 'Score',
        accessorFn: (row: any) => {
          return row.score;
        },
      },
      {
        size: 80,
        header: 'Type',
        accessorFn: (row: any) => formatType(row.format),
      },
      {
        size: 120,
        header: 'Season',
        accessorFn: (row: any) => formatSeason(row.season, row.seasonYear),
      },
    ],
    [myTitlePreference.title],
    // end
  );

  // optionally access the underlying virtualizer instance
  const rowVirtualizerInstanceRef =
    useRef<MRT_Virtualizer<HTMLDivElement, HTMLTableRowElement>>(null);

  const [isLoading, setIsLoading] = useState(false);
  // used to be isLoading useState true
  const [sorting, setSorting] = useState<MRT_SortingState>([]);

  useEffect(() => {
    /* if (typeof window !== 'undefined') {
      setIsLoading(false);
    } */
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

  return (
    <MaterialReactTable
      columns={columnsAnime}
      data={props} // 10,000 rows
      defaultDisplayColumn={{ enableResizing: true }}
      enableFilters={false}
      enableTopToolbar={false}
      enableBottomToolbar={false}
      enableColumnResizing
      enableGlobalFilterModes
      enablePagination={false}
      enableStickyHeader
      enableColumnPinning={false}
      // changed for v2 enablePinning={false}
      enableColumnActions={false}
      // enableRowNumbers
      enableHiding={false}
      enableRowVirtualization
      muiTableContainerProps={{
        sx: { height: '100%' },
      }}
      muiTablePaperProps={{ sx: { height: '100%' } }}
      muiTableBodyRowProps={({ row }) => ({
        onDoubleClick: (event) => {
          console.info(event, row.id);
        },
        onClick: row.getToggleSelectedHandler(),
        onContextMenu: handleContextMenu,
      })}
      enableRowSelection
      enableMultiRowSelection={false}
      onRowSelectionChange={setRowSelection}
      onSortingChange={setSorting}
      state={{
        isLoading,
        sorting,
        rowSelection,
        columnVisibility: {
          'mrt-row-select': false,
        },
        density: 'compact',
      }}
      rowVirtualizerInstanceRef={rowVirtualizerInstanceRef} // optional
      rowVirtualizerOptions={{ overscan: 2 }} // optionally customize the virtualizer
    />
  );
}

// virtualizerInstanceRef was renamed to rowVirtualizerInstanceRef in v1.5.0
// virtualizerProps was renamed to rowVirtualizerProps in v1.5.0
