import { Card, CardContent } from '@mui/material';
import AddToList from './AddToList';

export default function EntryInputNotOnList() {
  return (
    <Card
      elevation={0}
      sx={{
        gridColumn: '2/3',
        gridRow: '3/6',
        border: '1px solid SteelBlue',
      }}
      variant="outlined"
    >
      <CardContent
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AddToList />
      </CardContent>
    </Card>
  );
}
