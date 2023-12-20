import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useAtom } from 'jotai';
import { filterTypeAtom } from 'renderer/store';
import { Box, Tooltip } from '@mui/material';
import { useSidebarButton } from 'renderer/context/SidebarContext';
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
    <Box sx={{ ml: '3px' }}>
      <Tooltip
        title={
          filterType === 'All' ? 'Filter by:' : `Filtered by: ${filterType}`
        }
        arrow
      >
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          sx={{ mx: '3px', borderRadius: 1 }}
          size="small"
        >
          <MoreVertIcon
            fontSize="small"
            sx={{ color: filterType === 'All' ? 'skyblue' : '#ffeb3b' }}
          />
        </IconButton>
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
