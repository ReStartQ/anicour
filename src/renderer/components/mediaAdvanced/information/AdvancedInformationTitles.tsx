import React, { useEffect, useState } from 'react';
import { Box, CardContent, Tooltip, Typography } from '@mui/material';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';
import {
  formatSeason,
  formatSource,
  formatStatus,
  formatType,
} from 'renderer/functions/edit/formatInfo';
import { getOtherTitles } from 'renderer/functions/view/TitlePreferenceFunctions';
import { useTitle } from 'renderer/context/TitleContext';
import getStatusColor from 'renderer/functions/StatusFunction';
import ThemeSongButton from '../extra/ThemeSongButton';

const AdvancedInformationTitles = () => {
  const myAdvancedMedia: any = useAdvancedMedia();
  const titlePreference: any = useTitle();

  const textRomajiRef: any = useState(null);

  const [isOverflowedRomaji, setIsOverflowRomaji] = useState(false);

  useEffect(() => {
    setIsOverflowRomaji(
      textRomajiRef?.current?.scrollWidth > textRomajiRef?.current?.clientWidth,
    );
  }, [textRomajiRef, myAdvancedMedia]);

  const textEnglishRef: any = useState(null);

  const [isOverflowedEnglish, setIsOverflowEnglish] = useState(false);

  useEffect(() => {
    setIsOverflowEnglish(
      textEnglishRef?.current?.scrollWidth >
        textEnglishRef?.current?.clientWidth,
    );
  }, [textEnglishRef, myAdvancedMedia]);

  const textNativeRef: any = useState(null);

  const [isOverflowedNative, setIsOverflowNative] = useState(false);

  useEffect(() => {
    setIsOverflowNative(
      textNativeRef?.current?.scrollWidth > textNativeRef?.current?.clientWidth,
    );
  }, [textNativeRef, myAdvancedMedia]);

  const synonymsList = myAdvancedMedia.advancedMedia.synonyms.map(
    (name: any, index: number) => (
      <Typography fontSize={12} key={name}>
        {name}
      </Typography>
    ),
  );
  const synonymsListNumbered = myAdvancedMedia.advancedMedia.synonyms.map(
    (name: any, index: number) => (
      <Typography fontSize={12} key={name}>
        {`${index + 1}: ${name}`}
      </Typography>
    ),
  );

  return (
    <Box sx={{ overflowY: 'auto', height: '100%', width: '100%', pr: '10px' }}>
      <Tooltip
        title={
          <Typography fontSize={12}>
            {myAdvancedMedia.advancedMedia.titleRomaji !== null
              ? myAdvancedMedia.advancedMedia.titleRomaji
              : '?'}
          </Typography>
        }
        followCursor
        placement="bottom-end"
        disableHoverListener={!isOverflowedRomaji}
      >
        <Box>
          <Typography
            fontSize={12}
            fontWeight="bold"
            noWrap
            sx={{ textDecoration: 'underline' }}
          >
            {`Romaji: `}
          </Typography>
          <Typography fontSize={12} noWrap ref={textRomajiRef}>
            {myAdvancedMedia.advancedMedia.titleRomaji !== null
              ? myAdvancedMedia.advancedMedia.titleRomaji
              : '?'}
          </Typography>
        </Box>
      </Tooltip>
      <Tooltip
        title={
          <Typography fontSize={12}>
            {myAdvancedMedia.advancedMedia.titleEnglish !== null
              ? myAdvancedMedia.advancedMedia.titleEnglish
              : '?'}
          </Typography>
        }
        followCursor
        placement="bottom-end"
        disableHoverListener={!isOverflowedEnglish}
      >
        <Box>
          <Typography
            fontSize={12}
            fontWeight="bold"
            noWrap
            sx={{ textDecoration: 'underline' }}
          >
            {`English: `}
          </Typography>
          <Typography fontSize={12} noWrap ref={textEnglishRef}>
            {myAdvancedMedia.advancedMedia.titleEnglish !== null
              ? myAdvancedMedia.advancedMedia.titleEnglish
              : '?'}
          </Typography>
        </Box>
      </Tooltip>
      <Tooltip
        title={
          <Typography fontSize={12}>
            {myAdvancedMedia.advancedMedia.titleNative !== null
              ? myAdvancedMedia.advancedMedia.titleNative
              : '?'}
          </Typography>
        }
        followCursor
        placement="bottom-end"
        disableHoverListener={!isOverflowedNative}
      >
        <Box>
          <Typography
            fontSize={12}
            fontWeight="bold"
            noWrap
            sx={{ textDecoration: 'underline' }}
          >
            {`Native: `}
          </Typography>
          <Typography fontSize={12} noWrap ref={textNativeRef}>
            {myAdvancedMedia.advancedMedia.titleNative !== null
              ? myAdvancedMedia.advancedMedia.titleNative
              : '?'}
          </Typography>
        </Box>
      </Tooltip>
      {myAdvancedMedia.advancedMedia.synonyms.length > 0 ? (
        <Typography
          fontSize={12}
          fontWeight="bold"
          noWrap
          sx={{ textDecoration: 'underline' }}
        >
          {`Synonyms: `}
        </Typography>
      ) : null}
      {myAdvancedMedia.advancedMedia.synonyms.length > 1
        ? synonymsListNumbered
        : synonymsList}
    </Box>
  );
};

export default AdvancedInformationTitles;
