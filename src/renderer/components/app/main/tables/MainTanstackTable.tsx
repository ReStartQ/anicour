/* eslint-disable jsx-a11y/click-events-have-key-events */
import '../../../../styles/tables.scss';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  useReactTable,
} from '@tanstack/react-table';

import { useVirtualizer } from '@tanstack/react-virtual';

import { Box, Typography } from '@mui/material';
import { getTitle } from 'renderer/functions/view/TitlePreferenceFunctions';
import { useTitle } from 'renderer/context/TitleContext';
import getStatusColor from 'renderer/functions/StatusFunction';
import CircleIcon from '@mui/icons-material/Circle';
import { useSidebarButton } from 'renderer/context/SidebarContext';
import { IconButton } from '@mui/joy';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';
import { formatStatus } from 'renderer/functions/edit/formatInfo';
import { makeData, Person } from './makeData';
import { MediaIcons } from '../../etc/SvgIcons';
import HtmlTooltip from '../../etc/CustomTooltip1';
import ContextMenu from '../../etc/ContextMenu';
import TanstackTableRow from '../../etc/table/TanstackTableRow';
import TableProgressStepper from '../../etc/table/TableProgressStepper';
import TableTitleMain from '../../etc/table/TableTitleMain';
import TableProgressVolumeStepper from '../../etc/table/TableProgressVolumeStepper';
import TableSeason from '../../etc/table/TableSeason';
import TableReleased from '../../etc/table/TableReleased';
import TableStatus from '../../etc/table/TableStatus';
import TableScore from '../../etc/table/TableScore';
import TableType from '../../etc/table/TableType';

// This is a dynamic row height example, which is more complicated, but allows for a more realistic table.
// See https://tanstack.com/virtual/v3/docs/examples/react/table for a simpler fixed row height example.
function MainTanstackTable({ props, title }: any) {
  const myTitlePreference: any = useTitle();
  const mySidebar: any = useSidebarButton();
  const myAdvancedMedia: any = useAdvancedMedia();
  const titlePreference: any = useTitle();
  const [rowSelection, setRowSelection] = useState({});

  const columnsAnime = React.useMemo<any>(
    () => [
      {
        header: 'Status',
        id: 'Status',
        cell: ({ row }: any) => {
          return <TableStatus row={row} />;
        },
        size: 50,
      },
      {
        accessorFn: (row: any) => {
          return <TableTitleMain row={row} />;
        },
        id: 'Title',
        cell: (info: any) => info.getValue(),
        // header: () => <span>Title</span>,
        header: () => 'Title',
        size: 290,
      },
      {
        accessorFn: (row: any) => {
          return <TableProgressStepper row={row} />;
        },
        header: 'Progress',
        cell: (info: any) => info.getValue(),
        size: 180,
      },
      {
        accessorFn: (row: any) => {
          return <TableScore row={row} />;
        },
        header: 'Score',
        cell: (info: any) => info.getValue(),
        size: 58,
      },
      {
        accessorFn: (row: any) => {
          return <TableType row={row} />;
        },
        header: 'Type',
        cell: (info: any) => info.getValue(),
        size: 72,
      },
      {
        accessorFn: (row: any) => {
          return <TableSeason row={row} />;
        },
        header: 'Season',
        cell: (info: any) => info.getValue(),
        size: 94, // 84
      },
    ],
    [],
  );

  // 744 max width
  const columnsManga = React.useMemo<any>(
    () => [
      {
        header: 'Status',
        id: 'Status',
        cell: ({ row }: any) => {
          return <TableStatus row={row} />;
        },
        size: 50,
      },
      {
        accessorFn: (row: any) => {
          return <TableTitleMain row={row} />;
        },
        id: 'Title',
        cell: (info: any) => info.getValue(),
        // header: () => <span>Title</span>,
        header: () => 'Title',
        size: 290,
      },
      {
        accessorFn: (row: any) => {
          return <TableProgressStepper row={row} />;
        },
        header: 'Chapter Progress',
        cell: (info: any) => info.getValue(),
        size: 130,
      },
      {
        accessorFn: (row: any) => {
          return <TableProgressVolumeStepper row={row} />;
        },
        header: 'Volume Progress',
        cell: (info: any) => info.getValue(),
        size: 130,
      },
      {
        accessorFn: (row: any) => {
          return <TableScore row={row} />;
        },
        header: 'Score',
        cell: (info: any) => info.getValue(),
        size: 58,
      },
      {
        accessorFn: (row: any) => {
          return <TableReleased row={row} />;
        },
        header: 'Released',
        cell: (info: any) => info.getValue(),
        size: 82,
      },
    ],
    [],
  );

  const table = useReactTable({
    data: props,
    columns: mySidebar.sidebar === 0 ? columnsAnime : columnsManga,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
    enableRowSelection: true,
    enableMultiRowSelection: false,
    manualSorting: true,
  });

  const { rows } = table.getRowModel();

  // The virtualizer needs to know the scrollable container element
  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 33, // estimate row height for accurate scrollbar dragging
    getScrollElement: () => tableContainerRef.current,
    // measure dynamic row height, except in firefox because it measures table border height incorrectly
    measureElement:
      typeof window !== 'undefined' &&
      navigator.userAgent.indexOf('Firefox') === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 3,
  });

  // All important CSS styles are included as inline styles for this example. This is not recommended for your code.
  return (
    <div className="mediatables" style={{ marginTop: 0 }}>
      <div
        className="containerTable"
        ref={tableContainerRef}
        style={{
          overflowY: 'auto', // our scrollable table container
          position: 'relative', // needed for sticky header
          height: 'calc(100vh - 124px)', // should be a fixed height 606 calc(100vh - 134px)
          width: '100%',
          borderRadius: '3px',
        }}
      >
        {/* Even though we're still using sematic table tags, we must use CSS grid and flexbox for dynamic row heights */}
        <table style={{ display: 'grid' }}>
          <thead
            style={{
              display: 'grid',
              position: 'sticky',
              top: 0,
              zIndex: 1,
            }}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                style={{ display: 'flex', width: '100%' }}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      style={{
                        display: 'flex',
                        width: header.getSize(),
                      }}
                    >
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody
            style={{
              display: 'grid',
              height: `${rowVirtualizer.getTotalSize()}px`, // tells scrollbar how big the table is
              position: 'relative', // needed for absolute positioning of rows
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row: any = rows[virtualRow.index] as Row<Person>;
              return (
                <TanstackTableRow
                  key={row.original.titleRomaji + row.original.id}
                  virtualRow={virtualRow}
                  rowVirtualizer={rowVirtualizer}
                  row={row}
                  rowSelection={rowSelection}
                  setRowSelection={setRowSelection}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MainTanstackTable;
