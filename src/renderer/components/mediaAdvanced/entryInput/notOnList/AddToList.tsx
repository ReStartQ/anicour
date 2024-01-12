import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import {
  Box,
  Button,
  Select,
  Typography,
  Option,
  Dropdown,
  MenuButton,
  Menu,
  MenuItem,
} from '@mui/joy';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useAdvancedInput } from 'renderer/context/advanced/AdvancedInputContext';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';
import { useAniListToken } from 'renderer/context/services/AniListTokenContext';
import { useAniListUsername } from 'renderer/context/services/AniListUsernameContext';
import { useAddNewEntryData } from 'renderer/functions/api/mutations/addEntry';
import createMediaListEntryData from 'renderer/functions/data/generator/createMediaListEntryData';
import { useAtom } from 'jotai';
import { statusAddSelectAtom } from 'renderer/store';
import { MouseEvent, useState } from 'react';
import { StyledMenu } from 'renderer/components/app/styled/StyledComponents';

export default function AddToList() {
  const myAdvancedInput: any = useAdvancedInput();
  const myAdvancedMedia: any = useAdvancedMedia();
  const myUserName: any = useAniListUsername();
  const myToken: any = useAniListToken();
  const addMutation: any = useAddNewEntryData();
  const [statusAddSelect, setStatusAddSelect] = useAtom(statusAddSelectAtom);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOnClick = (event: any) => {
    const today = new Date();
    // send it to main

    const entry: any = {
      myUserName: myUserName.AniListUsername,
      myToken: myToken.AniListToken,
      myMediaId: myAdvancedMedia.advancedMedia.id,
      myStatus: statusAddSelect,
      advancedInput: createMediaListEntryData(
        myAdvancedMedia.advancedMedia.id,
        {
          day: today.getDate(),
          month: today.getMonth() + 1,
          year: today.getFullYear(),
        },
        statusAddSelect,
        myAdvancedMedia.advancedMedia.type,
      ),
      advancedMedia: myAdvancedMedia.advancedMedia,
    };
    addMutation.mutate(entry);
    setAnchorEl(event.currentTarget);
  };

  /*
      mediaListEntry.status can be any of these values
      CURRENT
      Currently watching/reading

      PLANNING
      Planning to watch/read

      COMPLETED
      Finished watching/reading

      DROPPED
      Stopped watching/reading before completing

      PAUSED
      Paused watching/reading

      REPEATING IS NOT POSSIBLE WITH THIS APP BECAUSE STATUS IS SENT AS AN ARG
      REPEATING
      Re-watching/reading
    */
  const onChange = (e: any, value: any) => {
    console.log(value);
    setStatusAddSelect(value);
  };

  return (
    <Box display="flex" flexDirection="row" gap="10px">
      <Select
        value={statusAddSelect}
        sx={{ width: '150px' }}
        onChange={onChange}
        color="primary"
        slotProps={{
          listbox: {
            sx: {
              maxHeight: 145,
              overflow: 'auto', // required for scrolling
            },
          },
        }}
      >
        <Option value="CURRENT">
          {myAdvancedMedia.advancedMedia.type === 'ANIME'
            ? 'Watching'
            : 'Reading'}
        </Option>
        <Option value="COMPLETED">Completed</Option>
        <Option value="PAUSED">On Hold</Option>
        <Option value="DROPPED">Dropped</Option>
        <Option value="PLANNING">
          {myAdvancedMedia.advancedMedia.type === 'ANIME'
            ? 'Plan to Watch'
            : 'Plan to Read'}
        </Option>
      </Select>
      <Button
        variant="soft"
        size="sm"
        onClick={handleOnClick}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <AddCircleIcon fontSize="small" sx={{ mr: 1 }} />
        <Typography> Add to List </Typography>
      </Button>
    </Box>
  );
}
