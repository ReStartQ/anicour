import { CardContent } from '@mui/material';
import { Divider } from '@mui/joy';
import AddToList from './AddToList';

export default function EntryInputNotOnList() {
  return (
    <CardContent
      sx={{
        overflowY: 'auto',
        gridColumn: '2/3',
        gridRow: '3/6',
        border: '1px solid SteelBlue',
        width: '100%',
        height: '100%',
        gridTemplateColumns: 'repeat(3, 175px)',
        gridTemplateRows: 'repeat(4, 73px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <AddToList />
    </CardContent>
  );
}
