export const getComponentType = () => {
  console.log('hi');
};

export const getSnackbarType = (type: number) => {
  switch (type) {
    case 0:
      return 'info';
    case 1:
      return 'success';
    case 2:
      return 'error';
    case 3:
      return 'error';
    default:
      return 'info';
  }
};
