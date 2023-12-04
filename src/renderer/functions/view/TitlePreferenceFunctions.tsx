export function getTitle(titlePreference: any, media: any) {
  if (titlePreference === 'Romaji' && media.titleRomaji !== null) {
    return media.titleRomaji;
  }
  if (titlePreference === 'English' && media.titleEnglish !== null) {
    return media.titleEnglish;
  }
  if (titlePreference === 'Native' && media.titleNative !== null) {
    return media.titleNative;
  }
  if (media.titleEnglish === null || media.titleNative === null) {
    if (media.titleRomaji !== null) {
      return media.titleRomaji;
    }
  }
  return '?';
}

export function getOtherTitles(titlePreference: any, media: any) {
  switch (titlePreference) {
    case 'Romaji':
      return [media.titleEnglish, media.titleNative];
    case 'English':
      return [media.titleRomaji, media.titleNative];
    case 'Native':
      return [media.titleRomaji, media.titleEnglish];
    default:
      return [null, null];
  }
}

export function titlePreferenceTest() {
  console.log('test');
}
