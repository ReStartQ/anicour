export default function getStatusColor(status: string) {
  switch (status) {
    case 'NOT_YET_RELEASED':
      return 'plum';
    case 'RELEASING':
      return '#4CBB17'; // kelly green
    case 'HIATUS':
      return '#4CBB17'; // kelly green
    case 'FINISHED':
      return 'deepskyblue';
    case 'CANCELLED':
      return '#FF3131'; // neon red
    default:
      return 'dodgerblue';
  }
}

export function getCategoryColor(filter: string) {
  if (filter !== '') {
    return 'warning';
  }
  return 'primary';
}

export function getStatusColorForTranslucentBackground(status: string) {
  if (status === 'NOT_YET_RELEASED') {
    return '#FF3131'; // neon red
  }
  if (status === 'RELEASING') {
    return '#4CBB17'; // kelly green
  }
  if (status === 'HIATUS') {
    return 'gray';
  }
  if (status === 'FINISHED') {
    return 'deepskyblue';
  }
  if (status === 'CANCELLED') {
    return 'deepskyblue';
  }

  return 'deepskyblue';
}
