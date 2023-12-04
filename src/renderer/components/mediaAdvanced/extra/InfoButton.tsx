import { IconButton, Tooltip } from '@mui/material';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';

import InfoIcon from '@mui/icons-material/Info';
import { useAdvancedMoreInfo } from 'renderer/context/advanced/AdvancedMoreInfoContext';

export default function InfoButton({ props }: any) {
  const myMediaAdvanced: any = useAdvancedMedia();
  const advancedMoreInfo: any = useAdvancedMoreInfo();

  const handleOnClick = () => {
    console.log('more info');
    advancedMoreInfo.setAdvancedMoreInfo(!advancedMoreInfo.advancedMoreInfo);
  };

  return (
    <Tooltip title="More Information">
      <IconButton onClick={handleOnClick}>
        <InfoIcon />
      </IconButton>
    </Tooltip>
  );
}
