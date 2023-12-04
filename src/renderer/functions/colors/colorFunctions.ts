const getJoyChipColor = (
  filter: string,
  category: number,
  myCategory: number,
) => {
  if (filter === '') {
    return 'primary';
  }
  return 'neutral';
};

const getJoyTypographyColor = (
  filter: string,
  category: number,
  myCategory: number,
) => {
  return 'neutral';
};
