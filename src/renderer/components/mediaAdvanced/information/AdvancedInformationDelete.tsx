import React, { useEffect, useState } from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Box,
  Button,
  CardContent,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';
import {
  formatReleaseDate,
  formatSeason,
  formatSource,
  formatStartYear,
  formatStatus,
  formatType,
} from 'renderer/functions/edit/formatInfo';
import getStatusColor from 'renderer/functions/StatusFunction';
import AdvancedExtraSelect from '../extra/AdvancedExtraSelect';
import DeleteButton from '../extra/DeleteButton';

const AdvancedInformationDelete = () => {
  const myAdvancedMedia: any = useAdvancedMedia();

  const textGenresRef: any = useState(null);

  const [isOverflowedGenres, setIsOverflowGenres] = useState(false);

  useEffect(() => {
    setIsOverflowGenres(
      textGenresRef?.current?.scrollWidth > textGenresRef?.current?.clientWidth,
    );
  }, [textGenresRef, myAdvancedMedia]);

  const textStudioRef: any = useState(null);

  const [isOverflowedStudio, setIsOverflowStudio] = useState(false);

  useEffect(() => {
    setIsOverflowStudio(
      textStudioRef?.current?.scrollWidth > textStudioRef?.current?.clientWidth,
    );
  }, [textStudioRef, myAdvancedMedia]);

  const textTagsRef: any = useState(null);

  const [isOverflowedTags, setIsOverflowTags] = useState(false);

  useEffect(() => {
    setIsOverflowTags(
      textTagsRef?.current?.scrollWidth > textTagsRef?.current?.clientWidth,
    );
  }, [textTagsRef, myAdvancedMedia]);

  return (
    <Box>
      <DeleteButton />
    </Box>
  );
};

export default AdvancedInformationDelete;
