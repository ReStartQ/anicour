import React, { useEffect, useRef, useState } from 'react';
import { useTitle } from 'renderer/context/TitleContext';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';
import { getTitle } from 'renderer/functions/view/TitlePreferenceFunctions';
import { flexRender } from '@tanstack/react-table';
import ContextMenu from '../ContextMenu';
import DeleteModal from '../DeleteModal';

const TanstackTableRow = ({
  virtualRow,
  rowVirtualizer,
  row,
  rowSelection,
  setRowSelection,
}: any) => {
  const titlePreference: any = useTitle();
  const myAdvancedMedia: any = useAdvancedMedia();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const timer: any = useRef();

  const handleSelect = (event: any) => {
    console.log('handleSelect');
  };
  const onClick = (event: any) => {
    if (
      event.target.tagName.toLowerCase() === 'td' ||
      event.target.tagName.toLowerCase() === 'p' ||
      event.target.tagName.toLowerCase() === 'tr'
    ) {
      if (rowSelection === row.id) {
        setRowSelection({});
      } else {
        setRowSelection(row.id);
      }
    } else if (row.id !== rowSelection) {
      setRowSelection(row.id);
    }
    console.log('deselect');
  };

  const onDoubleClick = (event: any) => {
    console.log('double');
    // if double select row
    if (event.detail === 2) {
      setRowSelection(row.id);
    }
  };

  const onClickHandler = (event: any) => {
    clearTimeout(timer.current);

    console.log(event.target.tagName.toLowerCase());
    if (event.detail === 1) {
      if (row.id !== rowSelection) {
        // if row clicked is not already selected then select row
        setRowSelection(row.id);
      } else {
        // if row is already selected, wait 200 ms for deselection (single) or double click
        timer.current = setTimeout(() => {
          return onClick(event);
        }, 200);
      }
    } else if (event.detail === 2) {
      onDoubleClick(event);
      if (
        event.target.tagName.toLowerCase() === 'td' ||
        event.target.tagName.toLowerCase() === 'p' ||
        event.target.tagName.toLowerCase() === 'tr'
      ) {
        window.electron.ipcRenderer.sendMessage('advancedMedia', [
          getTitle(titlePreference.title, row.original),
          row.original,
        ]);
        myAdvancedMedia.dispatch({
          type: 'getNewMedia',
          payload: row.original,
        });
        // console.log('advanced');
      }
    }
  };

  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    // console.log(event);
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

  return (
    <tr
      data-index={virtualRow.index} // needed for dynamic row height measurement
      ref={(node) => rowVirtualizer.measureElement(node)} // measure dynamic row height
      key={row.id}
      className={rowSelection === row.id ? 'selectedRow' : 'normalRow'}
      style={{
        display: 'flex',
        position: 'absolute',
        transform: `translateY(${virtualRow.start}px)`, // this should always be a `style` as it changes on scroll
        width: '100%',
        background: rowSelection === row.id ? ' #243341' : '#1e1e1e', // #1e1e1e rgba(8, 132, 186, 0.637) #38444c #243341
      }}
      onClick={onClickHandler}
      // context menu
      onContextMenu={(e: any) => {
        handleContextMenu(e);
      }}
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
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        );
      })}
      <ContextMenu
        props={row.original}
        contextMenu={contextMenu}
        setContextMenu={setContextMenu}
        handleClickOpen={handleClickOpen}
      />
      <DeleteModal props={row.original} open={open} setOpen={setOpen} />
    </tr>
  );
};

export default TanstackTableRow;
