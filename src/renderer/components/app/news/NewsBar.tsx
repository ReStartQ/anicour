import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from '@mui/material';
import { useNewsAdv } from 'renderer/context/NewsAdvContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { useNewsInfo } from 'renderer/context/NewsInfoContext';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function NewsBack({ props }: any) {
  const newsAdv: any = useNewsAdv();
  const myNewsInfo: any = useNewsInfo();
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      PaperProps={{ sx: { width: 60 } }}
      sx={{ width: 60 }}
    >
      <List sx={{ width: 59, alignSelf: 'center' }}>
        {['Back'].map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: 'inline-block' }}>
            <ListItemButton
              sx={{
                minHeight: 50,
                justifyContent: 'center',
              }}
              onClick={() => {
                newsAdv.toggleNews();
                myNewsInfo.setNewsInfo({
                  title: '',
                  titleURL: '',
                  author: '',
                  authorUrl: '',
                  main: '',
                  date: '',
                });
                navigate('/');
              }}
            >
              <ListItemIcon
                sx={{
                  justifyContent: 'center',
                }}
              >
                <ArrowBackIcon />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
