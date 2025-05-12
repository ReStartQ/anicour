import { Box } from '@mui/material';
import { useTheme } from 'renderer/context/ThemeContext';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';
import { useAtomValue } from 'jotai';
import { infoTypeAtom } from 'renderer/store';
import ThemeSongButton from './ThemeSongButton';
import TrailerButton from './TrailerButton';
import AdvancedExtraSelect from './AdvancedExtraSelect';

const ButtonBox = () => {
  const infoType = useAtomValue(infoTypeAtom);
  if (infoType === 1) {
    return <TrailerButton />;
  }
  if (infoType === 2) {
    return <ThemeSongButton />;
  }
  return <Box />;
};

export default function AdvancedExtra({ props }: any) {
  const myMediaAdvanced: any = useAdvancedMedia();
  const myTheme: any = useTheme();

  return (
    <Box
      sx={{
        gridColumn: '1/2',
        gridRow: '4/5',
        // border: '1px solid SteelBlue',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        // overflow: 'hidden',
      }}
    >
      <AdvancedExtraSelect />
      {/* myMediaAdvanced.advancedMedia.type === 'ANIME' ? (
        <ThemeSongButton />
      ) : null

      <ButtonBox /> */}
    </Box>
  );
}
