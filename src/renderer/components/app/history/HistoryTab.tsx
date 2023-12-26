import { Box } from '@mui/material';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name: string, date: string) {
  return { name, date };
}

const rows = [
  createData('Oregairu', '1/21/2022 04:02:01'),
  createData('Hyouka', '1/21/2022 04:02:01'),
  createData('Pokemon', '1/21/2022 04:02:01'),
  createData('Digimon', '1/21/2022 04:02:01'),
  createData('Yugioh', '1/21/2022 04:02:01'),
];

const HistoryTab = () => {
  return (
    <Box
      sx={{
        height: 'calc(100vh - 110px)',
        width: '100%',
        userSelect: 'none',
        // overflowY: 'auto',
      }}
    >
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, height: '100%' }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Modified Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default HistoryTab;
