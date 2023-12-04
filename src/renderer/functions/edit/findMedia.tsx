/* eslint-disable no-plusplus */
export default function findMediaIndex(data: any, title: string, id: number) {
  for (let i = 0; i < data.length(); i++) {
    if (data.titleRomaji === title && data.id === id) {
      return i;
    }
  }
  return -1;
}
