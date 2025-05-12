import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';
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
