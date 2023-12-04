import { CardContent, Tooltip, Typography } from '@mui/material';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';
import {
  formatSeason,
  formatSource,
  formatStatus,
  formatType,
} from 'renderer/functions/edit/formatInfo';
import { infoTypeAtom } from 'renderer/store';
import { useAtom } from 'jotai';
import AdvancedInformationDefault from './AdvancedInformationDefault';
import AdvancedInformationTitles from './AdvancedInformationTitles';
import AdvancedInformationThemes from './AdvancedInformationThemes';
import AdvancedInformationTrailer from './AdvancedInformationTrailer';
import AdvancedInformationDelete from './AdvancedInformationDelete';

const AdvancedInformation = () => {
  const [infoType, setInfoType] = useAtom(infoTypeAtom);
  if (infoType === 1) {
    return (
      <CardContent
        sx={{
          gridColumn: '1/2',
          gridRow: '5/6',
          border: '1px solid SteelBlue',
          height: '100%',
          pt: '12px',
          px: '14px',
          pb: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AdvancedInformationTrailer />
      </CardContent>
    );
  }
  if (infoType === 2) {
    return (
      <CardContent
        sx={{
          gridColumn: '1/2',
          gridRow: '5/6',
          border: '1px solid SteelBlue',
          height: '100%',
          pt: '12px',
          px: '14px',
          pb: '14px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <AdvancedInformationThemes />
      </CardContent>
    );
  }

  if (infoType === 3) {
    return (
      <CardContent
        sx={{
          gridColumn: '1/2',
          gridRow: '5/6',
          border: '1px solid SteelBlue',
          height: '100%',
          pt: '12px',
          px: '14px',
          pb: '14px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <AdvancedInformationTitles />
      </CardContent>
    );
  }

  if (infoType === 4) {
    return (
      <CardContent
        sx={{
          gridColumn: '1/2',
          gridRow: '5/6',
          border: '1px solid SteelBlue',
          height: '100%',
          pt: '12px',
          px: '14px',
          pb: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AdvancedInformationDelete />
      </CardContent>
    );
  }
  return (
    <CardContent
      sx={{
        gridColumn: '1/2',
        gridRow: '5/6',
        border: '1px solid SteelBlue',
        height: '100%',
        pt: '12px',
        px: '14px',
        pb: '14px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <AdvancedInformationDefault />
    </CardContent>
  );
};

export default AdvancedInformation;
