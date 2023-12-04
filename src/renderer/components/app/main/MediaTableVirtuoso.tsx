/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { useEffect } from 'react';
import { TableComponents, TableVirtuoso } from 'react-virtuoso';

interface Data {
  progress: number;
  type: string;
  title: string;
  score: number;
  id: number;
  season: string;
}

interface ColumnData {
  dataKey: keyof Data;
  label: string;
  numeric?: boolean;
  width: number;
}

interface MediaProps {
  titleRomaji: string;
  image: string;
  key: number;
}

type Sample = [string, number, number, string, string];

const sample: readonly Sample[] = [
  ['Frozen yoghurt', 159, 5.0, 'TV', 'Winter 2020'],
  ['Ice cream sandwich', 237, 9.0, 'TV', 'Winter 2020'],
  ['Eclair', 262, 6.0, 'TV', 'Winter 2020'],
  ['Cupcake', 305, 7.7, 'TV', 'Winter 2020'],
  ['Gingerbread', 356, 10.0, 'TV', 'Winter 2020'],
];

function createData(
  id: number,
  title: string,
  progress: number,
  score: number,
  type: string,
  season: string,
): Data {
  return { id, title, progress, score, type, season };
}

const columns: ColumnData[] = [
  {
    width: 150,
    label: 'Title',
    dataKey: 'title',
  },
  {
    width: 120,
    label: 'Progress',
    dataKey: 'progress',
    numeric: true,
  },
  {
    width: 120,
    label: 'Score',
    dataKey: 'score',
    numeric: true,
  },
  {
    width: 120,
    label: 'Type',
    dataKey: 'type',
  },
  {
    width: 120,
    label: 'Season',
    dataKey: 'season',
  },
];

const rows: Data[] = Array.from({ length: 10000 }, (_, index) => {
  const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  return createData(index, ...randomSelection);
});

const VirtuosoTableComponents: TableComponents<Data> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => <Table {...props} style={{ borderCollapse: 'separate' }} />,
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? 'right' : 'left'}
          style={{ width: column.width }}
          sx={{
            backgroundColor: 'background.paper',
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index: number, row: Data) {
  return (
    <>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? 'right' : 'left'}
        >
          {column.dataKey === 'progress' ? (
            <IconButton>
              <RemoveIcon />
            </IconButton>
          ) : null}
          {row[column.dataKey]}
          {column.dataKey === 'progress' ? (
            <IconButton>
              <AddIcon />
            </IconButton>
          ) : null}
        </TableCell>
      ))}
    </>
  );
}

export default function ReactVirtualizedTable({ props }: any) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  /*   const { data, refetch } = useMainMediaList(
    myUsername.AniListUsername,
    myToken.AniListToken
  ); */
  useEffect(() => {
    console.log(props);
    console.log(rows);
  }, [props]);

  return (
    <Paper style={{ height: '100%', width: '100%' }}>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}
