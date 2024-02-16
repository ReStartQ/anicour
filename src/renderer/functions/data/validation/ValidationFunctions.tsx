/* eslint-disable no-plusplus */
// on list = true, not on list = false

export function validateMainMediaList(listData: any, data: any) {
  console.log('validate main media list');
  for (let i = 0; i < listData.anime.animeAll.length; i++) {
    if (listData.anime.animeAll[i].id === data.advancedMedia.id) {
      // if found check where it is
      for (let j = 0; j < listData.anime.animeWatching.length; j++) {
        if (listData.anime.animeWatching[j].id === data.advancedMedia.id) {
          return [i, j, 'animeWatching'];
        }
      }
      for (let k = 0; k < listData.anime.animeCompleted.length; k++) {
        if (listData.anime.animeCompleted[k].id === data.advancedMedia.id) {
          return [i, k, 'animeCompleted'];
        }
      }
      for (let l = 0; l < listData.anime.animeOnHold.length; l++) {
        if (listData.anime.animeOnHold[l].id === data.advancedMedia.id) {
          return [i, l, 'animeOnHold'];
        }
      }
      for (let m = 0; m < listData.anime.animeDropped.length; m++) {
        if (listData.anime.animeDropped[m].id === data.advancedMedia.id) {
          return [i, m, 'animeDropped'];
        }
      }
      for (let n = 0; n < listData.anime.animePlanToWatch.length; n++) {
        if (listData.anime.animePlanToWatch[n].id === data.advancedMedia.id) {
          return [i, n, 'animePlanToWatch'];
        }
      }
    }
  }
  for (let i = 0; i < listData.manga.mangaAll.length; i++) {
    if (listData.manga.mangaAll[i].id === data.advancedMedia.id) {
      // if found check where it is
      for (let j = 0; j < listData.manga.mangaReading.length; j++) {
        if (listData.manga.mangaReading[j].id === data.advancedMedia.id) {
          return [i, j, 'mangaReading'];
        }
      }
      for (let k = 0; k < listData.manga.mangaCompleted.length; k++) {
        if (listData.manga.mangaCompleted[k].id === data.advancedMedia.id) {
          return [i, k, 'mangaCompleted'];
        }
      }
      for (let l = 0; l < listData.manga.mangaOnHold.length; l++) {
        if (listData.manga.mangaOnHold[l].id === data.advancedMedia.id) {
          return [i, l, 'mangaOnHold'];
        }
      }
      for (let m = 0; m < listData.manga.mangaDropped.length; m++) {
        if (listData.manga.mangaDropped[m].id === data.advancedMedia.id) {
          return [i, m, 'mangaDropped'];
        }
      }
      for (let n = 0; n < listData.manga.mangaPlanToRead.length; n++) {
        if (listData.manga.mangaPlanToRead[n].id === data.advancedMedia.id) {
          return [i, n, 'mangaPlanToRead'];
        }
      }
    }
  }
  for (let i = 0; i < listData.lightNovels.lightNovelsAll.length; i++) {
    if (listData.lightNovels.lightNovelsAll[i].id === data.advancedMedia.id) {
      // if found check where it is
      for (let j = 0; j < listData.lightNovels.lightNovelsReading.length; j++) {
        if (
          listData.lightNovels.lightNovelsReading[j].id ===
          data.advancedMedia.id
        ) {
          return [i, j, 'lightNovelsReading'];
        }
      }
      for (
        let k = 0;
        k < listData.lightNovels.lightNovelsCompleted.length;
        k++
      ) {
        if (
          listData.lightNovels.lightNovelsCompleted[k].id ===
          data.advancedMedia.id
        ) {
          return [i, k, 'lightNovelsCompleted'];
        }
      }
      for (let l = 0; l < listData.lightNovels.lightNovelsOnHold.length; l++) {
        if (
          listData.lightNovels.lightNovelsOnHold[l].id === data.advancedMedia.id
        ) {
          return [i, l, 'lightNovelsOnHold'];
        }
      }
      for (let m = 0; m < listData.lightNovels.lightNovelsDropped.length; m++) {
        if (
          listData.lightNovels.lightNovelsDropped[m].id ===
          data.advancedMedia.id
        ) {
          return [i, m, 'lightNovelsDropped'];
        }
      }
      for (
        let n = 0;
        n < listData.lightNovels.lightNovelsPlanToRead.length;
        n++
      ) {
        if (
          listData.lightNovels.lightNovelsPlanToRead[n].id ===
          data.advancedMedia.id
        ) {
          return [i, n, 'lightNovelsPlanToRead'];
        }
      }
    }
  }
  return [0, 0, false];
}

export function validateMainMediaListForListMediaEntry(
  listData: any,
  data: any,
) {
  console.log('validate main media list');

  if (typeof listData !== 'undefined') {
    for (let i = 0; i < listData.anime.animeAll.length; i++) {
      if (listData.anime.animeAll[i].id === data.advancedMedia.id) {
        // if found check where it is
        for (let j = 0; j < listData.anime.animeWatching.length; j++) {
          if (listData.anime.animeWatching[j].id === data.advancedMedia.id) {
            return listData.anime.animeWatching[j].mediaListEntry;
          }
        }
        for (let k = 0; k < listData.anime.animeCompleted.length; k++) {
          if (listData.anime.animeCompleted[k].id === data.advancedMedia.id) {
            return listData.anime.animeCompleted[k].mediaListEntry;
          }
        }
        for (let l = 0; l < listData.anime.animeOnHold.length; l++) {
          if (listData.anime.animeOnHold[l].id === data.advancedMedia.id) {
            return listData.anime.animeOnHold[l].mediaListEntry;
          }
        }
        for (let m = 0; m < listData.anime.animeDropped.length; m++) {
          if (listData.anime.animeDropped[m].id === data.advancedMedia.id) {
            return listData.anime.animeDropped[m].mediaListEntry;
          }
        }
        for (let n = 0; n < listData.anime.animePlanToWatch.length; n++) {
          if (listData.anime.animePlanToWatch[n].id === data.advancedMedia.id) {
            return listData.anime.animePlanToWatch[n].mediaListEntry;
          }
        }
      }
    }
    for (let i = 0; i < listData.manga.mangaAll.length; i++) {
      if (listData.manga.mangaAll[i].id === data.advancedMedia.id) {
        // if found check where it is
        for (let j = 0; j < listData.manga.mangaReading.length; j++) {
          if (listData.manga.mangaReading[j].id === data.advancedMedia.id) {
            return listData.manga.mangaReading[j].mediaListEntry;
          }
        }
        for (let k = 0; k < listData.manga.mangaCompleted.length; k++) {
          if (listData.manga.mangaCompleted[k].id === data.advancedMedia.id) {
            return listData.manga.mangaCompleted[k].mediaListEntry;
          }
        }
        for (let l = 0; l < listData.manga.mangaOnHold.length; l++) {
          if (listData.manga.mangaOnHold[l].id === data.advancedMedia.id) {
            return listData.manga.mangaOnHold[l].mediaListEntry;
          }
        }
        for (let m = 0; m < listData.manga.mangaDropped.length; m++) {
          if (listData.manga.mangaDropped[m].id === data.advancedMedia.id) {
            return listData.manga.mangaDropped[m].mediaListEntry;
          }
        }
        for (let n = 0; n < listData.manga.mangaPlanToRead.length; n++) {
          if (listData.manga.mangaPlanToRead[n].id === data.advancedMedia.id) {
            return listData.manga.mangaPlanToRead[n].mediaListEntry;
          }
        }
      }
    }
    for (let i = 0; i < listData.lightNovels.lightNovelsAll.length; i++) {
      if (listData.lightNovels.lightNovelsAll[i].id === data.advancedMedia.id) {
        // if found check where it is
        for (
          let j = 0;
          j < listData.lightNovels.lightNovelsReading.length;
          j++
        ) {
          if (
            listData.lightNovels.lightNovelsReading[j].id ===
            data.advancedMedia.id
          ) {
            return listData.lightNovels.lightNovelsReading[j].mediaListEntry;
          }
        }
        for (
          let k = 0;
          k < listData.lightNovels.lightNovelsCompleted.length;
          k++
        ) {
          if (
            listData.lightNovels.lightNovelsCompleted[k].id ===
            data.advancedMedia.id
          ) {
            return listData.lightNovels.lightNovelsCompleted[k].mediaListEntry;
          }
        }
        for (
          let l = 0;
          l < listData.lightNovels.lightNovelsOnHold.length;
          l++
        ) {
          if (
            listData.lightNovels.lightNovelsOnHold[l].id ===
            data.advancedMedia.id
          ) {
            return listData.lightNovels.lightNovelsOnHold[l].mediaListEntry;
          }
        }
        for (
          let m = 0;
          m < listData.lightNovels.lightNovelsDropped.length;
          m++
        ) {
          if (
            listData.lightNovels.lightNovelsDropped[m].id ===
            data.advancedMedia.id
          ) {
            return listData.lightNovels.lightNovelsDropped[m].mediaListEntry;
          }
        }
        for (
          let n = 0;
          n < listData.lightNovels.lightNovelsPlanToRead.length;
          n++
        ) {
          if (
            listData.lightNovels.lightNovelsPlanToRead[n].id ===
            data.advancedMedia.id
          ) {
            return listData.lightNovels.lightNovelsPlanToRead[n].mediaListEntry;
          }
        }
      }
    }
  }
  return false;
}

export function validateSeasonsList(listData: any, data: any) {
  console.log('validate');
  if (listData !== undefined) {
    for (let i = 0; i < listData.All.length; i++) {
      if (listData.All[i].id === data.advancedMedia.id) {
        console.log('found');
        for (let j = 0; j < listData.TV.length; j++) {
          if (listData.TV[j].id === data.advancedMedia.id) {
            console.log([i, j, 'TV']);
            return [i, j, 'TV'];
          }
        }
        for (let j = 0; j < listData.OVAONASpecial.length; j++) {
          if (listData.OVAONASpecial[j].id === data.advancedMedia.id) {
            console.log([i, j, 'OVAONASpecial']);
            return [i, j, 'OVAONASpecial'];
          }
        }
        for (let j = 0; j < listData.Movies.length; j++) {
          if (listData.Movies[j].id === data.advancedMedia.id) {
            console.log([i, j, 'Movies']);
            return [i, j, 'Movies'];
          }
        }
      }
    }
  }

  console.log('not on seasons');
  return [0, 0, false];
}

export function validateSearchList(listData: any, data: any) {
  console.log('validate');
  if (listData !== undefined) {
    for (let i = 0; i < listData.all.length; i++) {
      if (listData.all[i].id === data.advancedMedia.id) {
        console.log('found');
        for (let j = 0; j < listData.anime.length; j++) {
          if (listData.anime[j].id === data.advancedMedia.id) {
            console.log([i, j, 'anime']);
            return [i, j, 'anime'];
          }
        }
        for (let j = 0; j < listData.manga.length; j++) {
          if (listData.manga[j].id === data.advancedMedia.id) {
            console.log([i, j, 'manga']);
            return [i, j, 'manga'];
          }
        }
        for (let j = 0; j < listData.lightNovels.length; j++) {
          if (listData.lightNovels[j].id === data.advancedMedia.id) {
            console.log([i, j, 'lightNovels']);
            return [i, j, 'lightNovels'];
          }
        }
      }
    }
  }
  console.log('not on search');
  return [0, 0, false];
}
