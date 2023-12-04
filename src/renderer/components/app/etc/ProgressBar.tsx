import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, IconButton } from '@mui/material';

export default function ProgressBar({ props }: any) {
  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      <Box>Episodes: </Box>
      <IconButton size="small">
        <RemoveIcon />
      </IconButton>
      120000/120000
      <IconButton size="small">
        <AddIcon />
      </IconButton>
    </Box>
  );
}
