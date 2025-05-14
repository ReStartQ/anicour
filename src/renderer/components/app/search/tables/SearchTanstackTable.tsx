/* eslint-disable jsx-a11y/click-events-have-key-events */
import '../../../../styles/Tables.scss';
import React, { useState } from 'react';

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  useReactTable,
} from '@tanstack/react-table';

import { useVirtualizer } from '@tanstack/react-virtual';

import { useTitle } from 'renderer/context/TitleContext';
import { useSidebarButton } from 'renderer/context/SidebarContext';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';
import { useCategory } from 'renderer/context/CategoryContext';
import TableSeason from '../../etc/table/TableSeason';
import TableReleased from '../../etc/table/TableReleased';
import TableStatus from '../../etc/table/TableStatus';
import TableType from '../../etc/table/TableType';
import TanstackTableRow from '../../etc/table/TanstackTableRow';
import TableTitleOther from '../../etc/table/TableTitleOther';
import TableChapters from '../../etc/table/TableChapters';
import TableVolumes from '../../etc/table/TableVolumes';
import TableEpisodes from '../../etc/table/TableEpisodes';
import TableAverageScore from '../../etc/table/TableAverageScore';

// This is a dynamic row height example, which is more complicated, but allows for a more realistic table.
// See https://tanstack.com/virtual/v3/docs/examples/react/table for a simpler fixed row height example.
function SearchTanstackTable({ props, title }: any) {
  const myTitlePreference: any = useTitle();
  const mySidebar: any = useSidebarButton();
  const myAdvancedMedia: any = useAdvancedMedia();
  const titlePreference: any = useTitle();
  const myCategory: any = useCategory();
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
          return <TableTitleOther row={row} />;
        },
        id: 'Title',
        cell: (info: any) => info.getValue(),
        // header: () => <span>Title</span>,
        header: () => 'Title',
        size: 390,
      },
      {
        accessorFn: (row: any) => {
          return <TableEpisodes row={row} />;
        },
        header: 'Episodes',
        cell: (info: any) => info.getValue(),
        size: 80,
      },
      {
        accessorFn: (row: any) => {
          return <TableAverageScore row={row} />;
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
          return <TableTitleOther row={row} />;
        },
        id: 'Title',
        cell: (info: any) => info.getValue(),
        // header: () => <span>Title</span>,
        header: () => 'Title',
        size: 390,
      },
      {
        accessorFn: (row: any) => {
          return <TableChapters row={row} />;
        },
        header: 'Chapters',
        cell: (info: any) => info.getValue(),
        size: 80,
      },
      {
        accessorFn: (row: any) => {
          return <TableVolumes row={row} />;
        },
        header: 'Volumes',
        cell: (info: any) => info.getValue(),
        size: 80,
      },
      {
        accessorFn: (row: any) => {
          return <TableAverageScore row={row} />;
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
    columns: myCategory.category === 0 ? columnsAnime : columnsManga,
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
    <div className="media-table" style={{ marginTop: 0 }}>
      <div
        className="container-table"
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
              const row: any = rows[virtualRow.index] as Row<any>;
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

export default SearchTanstackTable;
