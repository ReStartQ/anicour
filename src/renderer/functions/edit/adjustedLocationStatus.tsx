export default function getAdjustedLocationStatus(data: any) {
  if (data.startsWith('anime') || data.startsWith('manga')) {
    return data.substring(5);
  }
  if (data.startsWith('lightNovels')) {
    return data.substring(11);
  }
  return data;
}
