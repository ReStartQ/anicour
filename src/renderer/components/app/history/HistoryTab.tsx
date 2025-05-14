import React, { useState } from 'react';

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  useReactTable,
} from '@tanstack/react-table';

import { useVirtualizer } from '@tanstack/react-virtual';

import { Typography } from '@mui/material';
import { getTitle } from 'renderer/functions/view/TitlePreferenceFunctions';
import { useTitle } from 'renderer/context/TitleContext';
import { useSidebarButton } from 'renderer/context/SidebarContext';

function createData(title: string, date: string) {
  return { title, date };
}

const TestRows = [
  createData('Oregairu', '1/21/2022 04:02:01'),
  createData('Hyouka', '1/21/2022 04:02:01'),
  createData('Pokemon', '1/21/2022 04:02:01'),
  createData('Digimon', '1/21/2022 04:02:01'),
  createData('Yugioh', '1/21/2022 04:02:01'),
];

const HistoryTab = ({ props }: any) => {
  const myTitlePreference: any = useTitle();
  const mySidebar: any = useSidebarButton();
  const [rowSelection, setRowSelection] = useState({});

  const columns = React.useMemo<any>(
    () => [
      {
        accessorFn: (row: any) => {
          return (
            <Typography noWrap fontSize={12}>
              {getTitle(myTitlePreference.title, row)}
            </Typography>
          );
        },
        id: 'Title',
        cell: (info: any) => info.getValue(),
        header: () => <span>Title</span>,
        size: 300,
      },
    ],
    [myTitlePreference.title],
  );

  const table = useReactTable({
    data: TestRows,
    columns,
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
    overscan: 5,
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
          height: 'calc(100vh - 140px)', // should be a fixed height 606 calc(100vh - 134px)
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
                <tr
                  data-index={virtualRow.index} // needed for dynamic row height measurement
                  ref={(node) => rowVirtualizer.measureElement(node)} // measure dynamic row height
                  key={row.id}
                  style={{
                    display: 'flex',
                    position: 'absolute',
                    transform: `translateY(${virtualRow.start}px)`, // this should always be a `style` as it changes on scroll
                    width: '100%',
                    background:
                      rowSelection === row.id
                        ? 'rgba(9, 152, 218, 0.637)'
                        : 'none',
                  }}
                  onClick={() => {
                    if (rowSelection === row.id) {
                      setRowSelection({});
                    } else {
                      setRowSelection(row.id);
                    }
                    console.log(rowSelection);
                  }}
                  // context menu
                >
                  {row.getVisibleCells().map((cell: any) => {
                    return (
                      <td
                        key={cell.id}
                        style={{
                          display: 'flex',
                          width: cell.column.getSize(),
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default HistoryTab;
