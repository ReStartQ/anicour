export function getTrailerPreviewLink(trailer: {
  site: string;
  id: string;
  thumbnail: string;
}) {
  if (trailer.site == 'youtube') {
    return `https://www.youtube.com/watch?v=${trailer.id}`;
  }
  if (trailer.site == 'dailymotion') {
    return `https://www.dailymotion.com/video/${trailer.id}`;
  }

  return ``;
}
