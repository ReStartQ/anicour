import { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useSidebarButton } from 'renderer/context/SidebarContext';
import { useFilter } from 'renderer/context/FilterContext';
import { keyframes } from '@emotion/react';
import { useQuery } from '@tanstack/react-query';
import Axios from 'axios';
import { useMainView } from '../../context/MainViewContext';
import SelectLanguage from './lang/SelectLanguage';
import SelectTheme from './theme/SelectTheme';
import ThemeToggle from './theme/ThemeToggle';
import SelectNews from './services/SelectNews';
import TestButton from './TestButton';
import ResetButton from './reset/ResetButton';
import TokenInput from './services/TokenInput';
import UsernameInput from './services/UsernameInput';
import TokenButton from './services/TokenButton';
import ResetLoginButton from './services/ResetLoginButton';
import SaveButton from './etc/SaveButton';
import AccountSection from './services/AccountSection';
import AdultLabel from './app/AdultLabel';
import SelectDefaultLink from './app/SelectDefaultLink';
import DefaultStatus from './app/DefaultStatus';
import SelectDefaultView from './app/SelectDefaultView';
import AboutSection from './about/AboutSection';
import SelectSeasonChange from './app/SelectSeasonChange';
import NextAiringEpisodeMainList from './app/NextAiringEpisodeMainList';

function SettingsMainTab({ view }: any) {
  if (view === 0) {
    return (
      <Box
        sx={{
          height: 'calc( 100vh )',
          width: '100%',
          overflowY: 'auto',
          gridGap: '10px',
          padding: '25px',
        }}
      >
        <AccountSection />
      </Box>
    );
  }
  if (view === 1) {
    return (
      <Box
        sx={{
          height: 'calc( 100vh )',
          width: '100%',
          overflowY: 'auto',
          gridGap: '20px',
          padding: '25px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <SelectLanguage />
        <SelectDefaultView />
        <SelectSeasonChange />
        <SelectDefaultLink />
        <DefaultStatus />
        <NextAiringEpisodeMainList />
      </Box>
    );
  }
  if (view === 2) {
    return (
      <Box
        sx={{
          height: 'calc( 100vh )',
          width: '100%',
          overflowY: 'auto',
          gridGap: '10px',
          padding: '25px',
        }}
      >
        <AboutSection />
      </Box>
    );
  }
  if (view === 3) {
    return (
      <Box
        sx={{
          height: 'calc( 100vh )',
          width: '100%',
          overflowY: 'auto',
          gridGap: '10px',
          padding: '25px',
        }}
      >
        <ResetButton />
      </Box>
    );
  }
  return <></>;
}

export default function SettingsMain({ props }: any) {
  const mainView: any = useMainView();
  const sidebarValue: any = useSidebarButton();
  const myFilter: any = useFilter();
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(48);
  const [more, setMore] = useState(true);

  return <SettingsMainTab view={sidebarValue.sidebar} />;
}
