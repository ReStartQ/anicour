import { Card, CardContent } from '@mui/material';
import { infoTypeAtom } from 'renderer/store';
import { useAtom } from 'jotai';
import CardContentPaddingAdjusted from 'renderer/components/settings/etc/CardContentPaddingAdjusted';
import AdvancedInformationDefault from './AdvancedInformationDefault';
import AdvancedInformationTitles from './AdvancedInformationTitles';
import AdvancedInformationThemes from './AdvancedInformationThemes';
import AdvancedInformationTrailer from './AdvancedInformationTrailer';
import AdvancedInformationDelete from './AdvancedInformationDelete';

const AdvancedInformation = () => {
  const [infoType, setInfoType] = useAtom(infoTypeAtom);
  if (infoType === 1) {
    return (
      <Card
        elevation={0}
        sx={{
          gridColumn: '1/2',
          gridRow: '5/6',
          border: '1px solid SteelBlue',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        variant="outlined"
      >
        <CardContent>
          <AdvancedInformationTrailer />
        </CardContent>
      </Card>
    );
  }
  if (infoType === 2) {
    return (
      <Card
        elevation={0}
        sx={{
          gridColumn: '1/2',
          gridRow: '5/6',
          border: '1px solid SteelBlue',
          height: '100%',
          display: 'flex',
        }}
        variant="outlined"
      >
        <CardContentPaddingAdjusted
          sx={{
            height: '100%',
            width: '100%',
          }}
        >
          <AdvancedInformationThemes />
        </CardContentPaddingAdjusted>
      </Card>
    );
  }

  if (infoType === 3) {
    return (
      <Card
        elevation={0}
        sx={{
          gridColumn: '1/2',
          gridRow: '5/6',
          border: '1px solid SteelBlue',
          height: '100%',
          display: 'flex',
        }}
        variant="outlined"
      >
        <CardContentPaddingAdjusted
          sx={{
            height: '100%',
            width: '100%',
          }}
        >
          <AdvancedInformationTitles />
        </CardContentPaddingAdjusted>
      </Card>
    );
  }

  if (infoType === 4) {
    return (
      <Card
        elevation={0}
        sx={{
          gridColumn: '1/2',
          gridRow: '5/6',
          border: '1px solid SteelBlue',
          height: '100%',
          display: 'flex',
        }}
        variant="outlined"
      >
        <CardContentPaddingAdjusted
          sx={{
            height: '100%',
            width: '100%',
          }}
        >
          <AdvancedInformationDelete />
        </CardContentPaddingAdjusted>
      </Card>
    );
  }
  return (
    <Card
      elevation={0}
      sx={{
        gridColumn: '1/2',
        gridRow: '5/6',
        border: '1px solid SteelBlue',
        height: '100%',
        display: 'flex',
      }}
      variant="outlined"
    >
      <CardContentPaddingAdjusted
        sx={{
          height: '100%',
          width: '100%',
        }}
      >
        <AdvancedInformationDefault />
      </CardContentPaddingAdjusted>
    </Card>
  );
};

export default AdvancedInformation;
