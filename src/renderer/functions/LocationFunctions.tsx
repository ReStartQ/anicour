export function getLocationAbbreviation(location: string) {
  switch (location) {
    case 'animeWatching':
      return 'W';
    case 'mangaReading':
      return 'R';
    case 'lightNovelsReading':
      return 'R';
    case 'animeCompleted':
      return 'C';
    case 'mangaCompleted':
      return 'C';
    case 'lightNovelsCompleted':
      return 'C';
    case 'animeOnHold':
      return 'OH';
    case 'mangaOnHold':
      return 'OH';
    case 'lightNovelsOnHold':
      return 'OH';
    case 'animeDropped':
      return 'D';
    case 'mangaDropped':
      return 'D';
    case 'lightNovelsDropped':
      return 'D';
    case 'animePlanToWatch':
      return 'PTW';
    case 'mangaPlanToRead':
      return 'PTR';
    case 'lightNovelsPlanToRead':
      return 'PTR';
    default:
      return 'X';
  }
}

export function locationTest() {
  console.log('test');
}
