import { CardContent, Tooltip, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useTitle } from 'renderer/context/TitleContext';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';
import {
  getOtherTitles,
  getTitle,
} from 'renderer/functions/view/TitlePreferenceFunctions';

export default function AdvancedTitle() {
  const myAdvancedMedia: any = useAdvancedMedia();
  const titlePreference: any = useTitle();
  const textElementRef: any = useState(null);

  const [isOverflowed, setIsOverflow] = useState(false);

  useEffect(() => {
    setIsOverflow(
      textElementRef?.current?.scrollWidth >
        textElementRef?.current?.clientWidth,
    );
  }, [textElementRef, myAdvancedMedia]);

  return (
    <CardContent
      sx={{
        gridColumn: '2/3',
        gridRow: '1/2',
        border: '1px solid SteelBlue',
      }}
    >
      <Tooltip
        title={getTitle(titlePreference.title, myAdvancedMedia.advancedMedia)}
        followCursor
        disableHoverListener={!isOverflowed}
      >
        <Typography noWrap fontWeight="bold" ref={textElementRef}>
          {getTitle(titlePreference.title, myAdvancedMedia.advancedMedia)}
        </Typography>
      </Tooltip>
    </CardContent>
  );
}
