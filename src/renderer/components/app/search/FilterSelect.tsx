import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { FilterList } from '@mui/icons-material';
import { useAtom } from 'jotai';
import { filterTypeAtom } from 'renderer/store';
import { Box, IconButton } from '@mui/material';
import { useSidebarButton } from 'renderer/context/SidebarContext';
import { Button, Tooltip } from '@mui/joy';
import { StyledMenu } from '../styled/StyledComponents';

const options = [
  'All',
  'Title',
  'Type',
  'Status',
  'Source',
  'Season/Year',
  'Studio/Producer',
  'Genres',
  'Tags',
];

const ITEM_HEIGHT = 100;

export default function FilterSelect() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [filterType, setFilterType] = useAtom(filterTypeAtom);
  const mySideBar: any = useSidebarButton();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: any) => {
    setAnchorEl(null);
    const { myValue } = event.currentTarget.dataset;
    console.log(myValue);
    if (myValue !== undefined && myValue !== null) {
      setFilterType(myValue);
    }
    console.log(filterType);
  };

  return (
    <Box sx={{ ml: '4px', mr: '4px' }}>
      <Tooltip
        title={
          filterType === 'All' ? 'Filter by' : `Filtered by: ${filterType}`
        }
        arrow
        variant="outlined"
        color="primary"
      >
        <Button
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          sx={{
            mx: '3px',
            borderRadius: '8px',
            height: '34px',
            width: '34px',
            backgroundColor: '#1C2636',
            '&:hover': { bgcolor: '#121A26' },
          }}
          size="sm"
        >
          <FilterList
            fontSize="small"
            sx={{ color: filterType === 'All' ? 'white' : '#ffeb3b' }}
          />
        </Button>
      </Tooltip>
      <StyledMenu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === filterType}
            onClick={handleClose}
            data-my-value={option}
          >
            {option}
          </MenuItem>
        ))}
      </StyledMenu>
    </Box>
  );
}
