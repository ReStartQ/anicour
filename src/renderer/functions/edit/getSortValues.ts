export function getStatusValues(status: string) {
  switch (status) {
    case 'NOT_YET_RELEASED':
      return 0;
    case 'RELEASING':
      return 1;
    case 'HIATUS':
      return 1;
    case 'FINISHED':
      return 2;
    case 'CANCELLED':
      return 4;
    default:
      return 3;
  }
}

export function getTestSort() {
  return 0;
}
