import { Tooltip } from '@mui/joy';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import CopyButton from 'renderer/components/app/etc/copy/CopyButton';
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
        <Box sx={{ display: 'flex' }}>
          <Tooltip
            title={getTitle(
              titlePreference.title,
              myAdvancedMedia.advancedMedia,
            )}
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
              width="90%"
            >
              {getTitle(titlePreference.title, myAdvancedMedia.advancedMedia)}
            </Typography>
          </Tooltip>
          <CopyButton
            type={1}
            text={getTitle(
              titlePreference.title,
              myAdvancedMedia.advancedMedia,
            )}
            height={24}
            width={24}
            show
          />
        </Box>
      </CardContent>
    </Card>
  );
}
