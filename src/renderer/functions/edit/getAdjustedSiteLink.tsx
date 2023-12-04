export function getMalLink(malId: any, type: any) {
  if (malId != null) {
    switch (type) {
      case 'ANIME':
        return `https://myanimelist.net/anime/${malId}`;
      case 'MANGA':
        return `https://myanimelist.net/manga/${malId}`;
      default:
        return 'https://myanimelist.net';
    }
  }
  return 'https://myanimelist.net';
}

export function getAniListLink() {
  return null;
}
