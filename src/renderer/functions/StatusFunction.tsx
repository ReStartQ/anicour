export default function getStatusColor(status: string) {
  switch (status) {
    case 'NOT_YET_RELEASED':
      return 'plum';
    case 'RELEASING':
      return '#32CD32';
    case 'HIATUS':
      return '#FFD700';
    case 'FINISHED':
      return 'deepskyblue';
    case 'CANCELLED':
      return '#FF4500';
    default:
      return 'deepskyblue';
  }
}

export function getCategoryColor(filter: string) {
  if (filter !== '') {
    return 'warning';
  }
  return 'primary';
}
