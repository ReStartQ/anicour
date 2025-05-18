import { Tooltip } from '@mui/joy';
import { Card, CardContent, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTitle } from 'renderer/context/TitleContext';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';
import { getTitle } from 'renderer/functions/view/TitlePreferenceFunctions';

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
    <Card
      elevation={0}
      sx={{
        gridColumn: '2/3',
        gridRow: '1/2',
        border: '1px solid SteelBlue',
      }}
      variant="outlined"
    >
      <CardContent>
        <Tooltip
          title={getTitle(titlePreference.title, myAdvancedMedia.advancedMedia)}
          followCursor
          disableHoverListener={!isOverflowed}
          variant="outlined"
          color="primary"
          size="sm"
        >
          <Typography
            noWrap
            fontWeight="bold"
            ref={textElementRef}
            className="title"
          >
            {getTitle(titlePreference.title, myAdvancedMedia.advancedMedia)}
          </Typography>
        </Tooltip>
      </CardContent>
    </Card>
  );
}
