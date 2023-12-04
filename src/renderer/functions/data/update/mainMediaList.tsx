import createMediaListEntryData from '../generator/createMediaListEntryData';

export function addToMainMediaList(
  queryClient: any,
  mediaFormat: string,
  data: any,
  mediaListEntry: any,
) {
  if (queryClient.getQueryData(['mainMediaList']) !== undefined) {
    /*
      mediaListEntry.status can be any of these values
      CURRENT
      Currently watching/reading

      PLANNING
      Planning to watch/read

      COMPLETED
      Finished watching/reading

      DROPPED
      Stopped watching/reading before completing

      PAUSED
      Paused watching/reading

      REPEATING IS NOT POSSIBLE WITH THIS APP BECAUSE STATUS IS SENT AS AN ARG
      REPEATING
      Re-watching/reading
    */
    switch (mediaFormat) {
      case 'anime':
        queryClient.setQueryData(
          ['mainMediaList'],
          // ✅ this is the way
          (oldData: any) => {
            console.log('test');
            console.log(data.advancedMedia);
            console.log(queryClient.getQueryData(['mainMediaList']));
            switch (mediaListEntry.SaveMediaListEntry.status) {
              case 'CURRENT': {
                const myNewArray = [...oldData.anime.animeWatching];
                const myEntry = data.advancedMedia;
                myEntry.mediaListEntry = mediaListEntry.SaveMediaListEntry;
                myNewArray.unshift(myEntry);
                const myNewAllArray = [...oldData.anime.animeAll];
                myNewAllArray.unshift(myEntry);
                return {
                  ...oldData,
                  anime: {
                    ...oldData.anime,
                    animeWatching: myNewArray,
                    animeAll: myNewAllArray,
                  },
                };
              }
              case 'PLANNING': {
                const myNewArray = [...oldData.anime.animePlanToWatch];
                const myEntry = data.advancedMedia;
                myEntry.mediaListEntry = mediaListEntry.SaveMediaListEntry;
                myNewArray.unshift(myEntry);
                const myNewAllArray = [...oldData.anime.animeAll];
                myNewAllArray.unshift(myEntry);
                return {
                  ...oldData,
                  anime: {
                    ...oldData.anime,
                    animePlanToWatch: myNewArray,
                    animeAll: myNewAllArray,
                  },
                };
              }
              case 'COMPLETED': {
                const myNewArray = [...oldData.anime.animeCompleted];
                const myEntry = data.advancedMedia;
                myEntry.mediaListEntry = mediaListEntry.SaveMediaListEntry;
                myNewArray.unshift(myEntry);
                const myNewAllArray = [...oldData.anime.animeAll];
                myNewAllArray.unshift(myEntry);
                return {
                  ...oldData,
                  anime: {
                    ...oldData.anime,
                    animeCompleted: myNewArray,
                    animeAll: myNewAllArray,
                  },
                };
              }
              case 'DROPPED': {
                const myNewArray = [...oldData.anime.animeDropped];
                const myEntry = data.advancedMedia;
                myEntry.mediaListEntry = mediaListEntry.SaveMediaListEntry;
                myNewArray.unshift(myEntry);
                const myNewAllArray = [...oldData.anime.animeAll];
                myNewAllArray.unshift(myEntry);
                return {
                  ...oldData,
                  anime: {
                    ...oldData.anime,
                    animeDropped: myNewArray,
                    animeAll: myNewAllArray,
                  },
                };
              }
              case 'PAUSED': {
                const myNewArray = [...oldData.anime.animeOnHold];
                const myEntry = data.advancedMedia;
                myEntry.mediaListEntry = mediaListEntry.SaveMediaListEntry;
                myNewArray.unshift(myEntry);
                const myNewAllArray = [...oldData.anime.animeAll];
                myNewAllArray.unshift(myEntry);
                return {
                  ...oldData,
                  anime: {
                    ...oldData.anime,
                    animeOnHold: myNewArray,
                    animeAll: myNewAllArray,
                  },
                };
              }
              default:
                return {
                  ...oldData,
                };
            }
          },
        );
        break;
      case 'manga':
        queryClient.setQueryData(
          ['mainMediaList'],
          // ✅ this is the way
          (oldData: any) => {
            console.log('test');
            console.log(data.advancedMedia);
            console.log(queryClient.getQueryData(['mainMediaList']));
            switch (mediaListEntry.SaveMediaListEntry.status) {
              case 'CURRENT': {
                const myNewArray = [...oldData.manga.mangaReading];
                const myEntry = data.advancedMedia;
                myEntry.mediaListEntry = mediaListEntry.SaveMediaListEntry;
                myNewArray.unshift(myEntry);
                const myNewAllArray = [...oldData.manga.mangaAll];
                myNewAllArray.unshift(myEntry);
                return {
                  ...oldData,
                  manga: {
                    ...oldData.manga,
                    mangaReading: myNewArray,
                    mangaAll: myNewAllArray,
                  },
                };
              }
              case 'PLANNING': {
                const myNewArray = [...oldData.manga.mangaPlanToRead];
                const myEntry = data.advancedMedia;
                myEntry.mediaListEntry = mediaListEntry.SaveMediaListEntry;
                myNewArray.unshift(myEntry);
                const myNewAllArray = [...oldData.manga.mangaAll];
                myNewAllArray.unshift(myEntry);
                return {
                  ...oldData,
                  manga: {
                    ...oldData.manga,
                    mangaPlanToRead: myNewArray,
                    mangaAll: myNewAllArray,
                  },
                };
              }
              case 'COMPLETED': {
                const myNewArray = [...oldData.manga.mangaCompleted];
                const myEntry = data.advancedMedia;
                myEntry.mediaListEntry = mediaListEntry.SaveMediaListEntry;
                myNewArray.unshift(myEntry);
                const myNewAllArray = [...oldData.manga.mangaAll];
                myNewAllArray.unshift(myEntry);
                return {
                  ...oldData,
                  manga: {
                    ...oldData.manga,
                    mangaCompleted: myNewArray,
                    mangaAll: myNewAllArray,
                  },
                };
              }
              case 'DROPPED': {
                const myNewArray = [...oldData.manga.mangaDropped];
                const myEntry = data.advancedMedia;
                myEntry.mediaListEntry = mediaListEntry.SaveMediaListEntry;
                myNewArray.unshift(myEntry);
                const myNewAllArray = [...oldData.manga.mangaAll];
                myNewAllArray.unshift(myEntry);
                return {
                  ...oldData,
                  manga: {
                    ...oldData.manga,
                    mangaDropped: myNewArray,
                    mangaAll: myNewAllArray,
                  },
                };
              }
              case 'PAUSED': {
                const myNewArray = [...oldData.manga.mangaOnHold];
                const myEntry = data.advancedMedia;
                myEntry.mediaListEntry = mediaListEntry.SaveMediaListEntry;
                myNewArray.unshift(myEntry);
                const myNewAllArray = [...oldData.manga.mangaAll];
                myNewAllArray.unshift(myEntry);
                return {
                  ...oldData,
                  manga: {
                    ...oldData.manga,
                    mangaOnHold: myNewArray,
                    mangaAll: myNewAllArray,
                  },
                };
              }
              default:
                return {
                  ...oldData,
                };
            }
          },
        );
        break;
      case 'lightNovels':
        queryClient.setQueryData(
          ['mainMediaList'],
          // ✅ this is the way
          (oldData: any) => {
            console.log('test');
            console.log(data.advancedMedia);
            console.log(queryClient.getQueryData(['mainMediaList']));
            switch (mediaListEntry.SaveMediaListEntry.status) {
              case 'CURRENT': {
                const myNewArray = [...oldData.lightNovels.lightNovelsReading];
                const myEntry = data.advancedMedia;
                myEntry.mediaListEntry = mediaListEntry.SaveMediaListEntry;
                myNewArray.unshift(myEntry);
                const myNewAllArray = [...oldData.lightNovels.lightNovelsAll];
                myNewAllArray.unshift(myEntry);
                return {
                  ...oldData,
                  lightNovels: {
                    ...oldData.lightNovels,
                    lightNovelsReading: myNewArray,
                    lightNovelsAll: myNewAllArray,
                  },
                };
              }
              case 'PLANNING': {
                const myNewArray = [
                  ...oldData.lightNovels.lightNovelsPlanToRead,
                ];
                const myEntry = data.advancedMedia;
                myEntry.mediaListEntry = mediaListEntry.SaveMediaListEntry;
                myNewArray.unshift(myEntry);
                const myNewAllArray = [...oldData.lightNovels.lightNovelsAll];
                myNewAllArray.unshift(myEntry);
                return {
                  ...oldData,
                  lightNovels: {
                    ...oldData.lightNovels,
                    lightNovelsPlanToRead: myNewArray,
                    lightNovelsAll: myNewAllArray,
                  },
                };
              }
              case 'COMPLETED': {
                const myNewArray = [
                  ...oldData.lightNovels.lightNovelsCompleted,
                ];
                const myEntry = data.advancedMedia;
                myEntry.mediaListEntry = mediaListEntry.SaveMediaListEntry;
                myNewArray.unshift(myEntry);
                const myNewAllArray = [...oldData.lightNovels.lightNovelsAll];
                myNewAllArray.unshift(myEntry);
                return {
                  ...oldData,
                  lightNovels: {
                    ...oldData.lightNovels,
                    lightNovelsCompleted: myNewArray,
                    lightNovelsAll: myNewAllArray,
                  },
                };
              }
              case 'DROPPED': {
                const myNewArray = [...oldData.lightNovels.lightNovelsDropped];
                const myEntry = data.advancedMedia;
                myEntry.mediaListEntry = mediaListEntry.SaveMediaListEntry;
                myNewArray.unshift(myEntry);
                const myNewAllArray = [...oldData.lightNovels.lightNovelsAll];
                myNewAllArray.unshift(myEntry);
                return {
                  ...oldData,
                  lightNovels: {
                    ...oldData.lightNovels,
                    lightNovelsDropped: myNewArray,
                    lightNovelsAll: myNewAllArray,
                  },
                };
              }
              case 'PAUSED': {
                const myNewArray = [...oldData.lightNovels.lightNovelsOnHold];
                const myEntry = data.advancedMedia;
                myEntry.mediaListEntry = mediaListEntry.SaveMediaListEntry;
                myNewArray.unshift(myEntry);
                const myNewAllArray = [...oldData.lightNovels.lightNovelsAll];
                myNewAllArray.unshift(myEntry);
                return {
                  ...oldData,
                  lightNovels: {
                    ...oldData.lightNovels,
                    lightNovelsOnHold: myNewArray,
                    lightNovelsAll: myNewAllArray,
                  },
                };
              }
              default:
                return {
                  ...oldData,
                };
            }
          },
        );
        break;
      default:
        console.log(0);
    }
  }
}

export function deleteFromMainMediaList(
  queryClient: any,
  mediaFormat: string,
  data: any,
  mediaListEntry: any,
  indexInfo: any[], // indexInfo [all index, specific index, 'animeWatching(specific)']
) {
  switch (indexInfo[2]) {
    case 'animeWatching':
      console.log('animeWatching');
      queryClient.setQueryData(
        ['mainMediaList'],
        // ✅ this is the way
        (oldData: any) => {
          console.log(queryClient.getQueryData(['mainMediaList']));
          console.log(indexInfo);
          const myNewAllArray = [...oldData.anime.animeAll];
          const myNewArray = [...oldData.anime.animeWatching];
          myNewAllArray.splice(indexInfo[0], 1);
          myNewArray.splice(indexInfo[1], 1);
          console.log(myNewAllArray);
          console.log(myNewArray);
          return {
            ...oldData,
            anime: {
              ...oldData.anime,
              animeWatching: myNewArray,
              animeAll: myNewAllArray,
            },
          };
        },
      );
      break;
    case 'animeCompleted':
      queryClient.setQueryData(
        ['mainMediaList'],
        // ✅ this is the way
        (oldData: any) => {
          console.log(queryClient.getQueryData(['mainMediaList']));
          const myNewAllArray = [...oldData.anime.animeAll];
          const myNewArray = [...oldData.anime.animeCompleted];
          myNewAllArray.splice(indexInfo[0], 1);
          myNewArray.splice(indexInfo[1], 1);

          return {
            ...oldData,
            anime: {
              ...oldData.anime,
              animeCompleted: myNewArray,
              animeAll: myNewAllArray,
            },
          };
        },
      );
      break;
    case 'animeDropped':
      queryClient.setQueryData(
        ['mainMediaList'],
        // ✅ this is the way
        (oldData: any) => {
          console.log(queryClient.getQueryData(['mainMediaList']));
          const myNewAllArray = [...oldData.anime.animeAll];
          const myNewArray = [...oldData.anime.animeDropped];
          myNewAllArray.splice(indexInfo[0], 1);
          myNewArray.splice(indexInfo[1], 1);

          return {
            ...oldData,
            anime: {
              ...oldData.anime,
              animeDropped: myNewArray,
              animeAll: myNewAllArray,
            },
          };
        },
      );
      break;
    case 'animeOnHold':
      queryClient.setQueryData(
        ['mainMediaList'],
        // ✅ this is the way
        (oldData: any) => {
          console.log(queryClient.getQueryData(['mainMediaList']));
          const myNewAllArray = [...oldData.anime.animeAll];
          const myNewArray = [...oldData.anime.animeOnHold];
          myNewAllArray.splice(indexInfo[0], 1);
          myNewArray.splice(indexInfo[1], 1);

          return {
            ...oldData,
            anime: {
              ...oldData.anime,
              animeOnHold: myNewArray,
              animeAll: myNewAllArray,
            },
          };
        },
      );
      break;
    case 'animePlanToWatch':
      queryClient.setQueryData(
        ['mainMediaList'],
        // ✅ this is the way
        (oldData: any) => {
          console.log(queryClient.getQueryData(['mainMediaList']));
          const myNewAllArray = [...oldData.anime.animeAll];
          const myNewArray = [...oldData.anime.animePlanToWatch];
          myNewAllArray.splice(indexInfo[0], 1);
          myNewArray.splice(indexInfo[1], 1);

          return {
            ...oldData,
            anime: {
              ...oldData.anime,
              animePlanToWatch: myNewArray,
              animeAll: myNewAllArray,
            },
          };
        },
      );
      break;
    case 'mangaReading':
      queryClient.setQueryData(
        ['mainMediaList'],
        // ✅ this is the way
        (oldData: any) => {
          console.log(queryClient.getQueryData(['mainMediaList']));
          const myNewAllArray = [...oldData.manga.mangaAll];
          const myNewArray = [...oldData.manga.mangaReading];
          myNewAllArray.splice(indexInfo[0], 1);
          myNewArray.splice(indexInfo[1], 1);

          return {
            ...oldData,
            manga: {
              ...oldData.manga,
              mangaReading: myNewArray,
              mangaAll: myNewAllArray,
            },
          };
        },
      );
      break;
    case 'mangaCompleted':
      queryClient.setQueryData(
        ['mainMediaList'],
        // ✅ this is the way
        (oldData: any) => {
          console.log(queryClient.getQueryData(['mainMediaList']));
          const myNewAllArray = [...oldData.manga.mangaAll];
          const myNewArray = [...oldData.manga.mangaCompleted];
          myNewAllArray.splice(indexInfo[0], 1);
          myNewArray.splice(indexInfo[1], 1);

          return {
            ...oldData,
            manga: {
              ...oldData.manga,
              mangaCompleted: myNewArray,
              mangaAll: myNewAllArray,
            },
          };
        },
      );
      break;
    case 'mangaDropped':
      queryClient.setQueryData(
        ['mainMediaList'],
        // ✅ this is the way
        (oldData: any) => {
          console.log(queryClient.getQueryData(['mainMediaList']));
          const myNewAllArray = [...oldData.manga.mangaAll];
          const myNewArray = [...oldData.manga.mangaDropped];
          myNewAllArray.splice(indexInfo[0], 1);
          myNewArray.splice(indexInfo[1], 1);
          return {
            ...oldData,
            manga: {
              ...oldData.manga,
              mangaDropped: myNewArray,
              mangaAll: myNewAllArray,
            },
          };
        },
      );
      break;
    case 'mangaOnHold':
      queryClient.setQueryData(
        ['mainMediaList'],
        // ✅ this is the way
        (oldData: any) => {
          console.log(queryClient.getQueryData(['mainMediaList']));
          const myNewAllArray = [...oldData.manga.mangaAll];
          const myNewArray = [...oldData.manga.mangaOnHold];
          myNewAllArray.splice(indexInfo[0], 1);
          myNewArray.splice(indexInfo[1], 1);

          return {
            ...oldData,
            manga: {
              ...oldData.manga,
              mangaOnHold: myNewArray,
              mangaAll: myNewAllArray,
            },
          };
        },
      );
      break;
    case 'mangaPlanToRead':
      queryClient.setQueryData(
        ['mainMediaList'],
        // ✅ this is the way
        (oldData: any) => {
          console.log(queryClient.getQueryData(['mainMediaList']));
          const myNewAllArray = [...oldData.manga.mangaAll];
          const myNewArray = [...oldData.manga.mangaPlanToRead];
          myNewAllArray.splice(indexInfo[0], 1);
          myNewArray.splice(indexInfo[1], 1);
          return {
            ...oldData,
            manga: {
              ...oldData.manga,
              mangaPlanToRead: myNewArray,
              mangaAll: myNewAllArray,
            },
          };
        },
      );
      break;
    case 'lightNovelsReading':
      queryClient.setQueryData(
        ['mainMediaList'],
        // ✅ this is the way
        (oldData: any) => {
          console.log(queryClient.getQueryData(['mainMediaList']));
          const myNewAllArray = [...oldData.lightNovels.lightNovelsAll];
          const myNewArray = [...oldData.lightNovels.lightNovelsReading];
          myNewAllArray.splice(indexInfo[0], 1);
          myNewArray.splice(indexInfo[1], 1);
          return {
            ...oldData,
            lightNovels: {
              ...oldData.lightNovels,
              lightNovelsReading: myNewArray,
              lightNovelsAll: myNewAllArray,
            },
          };
        },
      );
      break;
    case 'lightNovelsCompleted':
      queryClient.setQueryData(
        ['mainMediaList'],
        // ✅ this is the way
        (oldData: any) => {
          console.log(queryClient.getQueryData(['mainMediaList']));
          const myNewAllArray = [...oldData.lightNovels.lightNovelsAll];
          const myNewArray = [...oldData.lightNovels.lightNovelsCompleted];
          myNewAllArray.splice(indexInfo[0], 1);
          myNewArray.splice(indexInfo[1], 1);
          return {
            ...oldData,
            lightNovels: {
              ...oldData.lightNovels,
              lightNovelsCompleted: myNewArray,
              lightNovelsAll: myNewAllArray,
            },
          };
        },
      );
      break;
    case 'lightNovelsDropped':
      queryClient.setQueryData(
        ['mainMediaList'],
        // ✅ this is the way
        (oldData: any) => {
          console.log(queryClient.getQueryData(['mainMediaList']));
          const myNewAllArray = [...oldData.lightNovels.lightNovelsAll];
          const myNewArray = [...oldData.lightNovels.lightNovelsDropped];
          myNewAllArray.splice(indexInfo[0], 1);
          myNewArray.splice(indexInfo[1], 1);
          return {
            ...oldData,
            lightNovels: {
              ...oldData.lightNovels,
              lightNovelsDropped: myNewArray,
              lightNovelsAll: myNewAllArray,
            },
          };
        },
      );
      break;
    case 'lightNovelsOnHold':
      queryClient.setQueryData(
        ['mainMediaList'],
        // ✅ this is the way
        (oldData: any) => {
          console.log(queryClient.getQueryData(['mainMediaList']));
          const myNewAllArray = [...oldData.lightNovels.lightNovelsAll];
          const myNewArray = [...oldData.lightNovels.lightNovelsOnHold];
          myNewAllArray.splice(indexInfo[0], 1);
          myNewArray.splice(indexInfo[1], 1);
          return {
            ...oldData,
            lightNovels: {
              ...oldData.lightNovels,
              lightNovelsOnHold: myNewArray,
              lightNovelsAll: myNewAllArray,
            },
          };
        },
      );
      break;
    case 'lightNovelsPlanToRead':
      queryClient.setQueryData(
        ['mainMediaList'],
        // ✅ this is the way
        (oldData: any) => {
          console.log(queryClient.getQueryData(['mainMediaList']));
          const myNewAllArray = [...oldData.lightNovels.lightNovelsAll];
          const myNewArray = [...oldData.lightNovels.lightNovelsPlanToRead];
          myNewAllArray.splice(indexInfo[0], 1);
          myNewArray.splice(indexInfo[1], 1);
          return {
            ...oldData,
            lightNovels: {
              ...oldData.lightNovels,
              lightNovelsPlanToRead: myNewArray,
              lightNovelsAll: myNewAllArray,
            },
          };
        },
      );
      break;
    default:
      console.log('not on list');
  }
}

export function updateMainMediaList(
  queryClient: any,
  mediaFormat: string,
  data: any,
  mediaListEntry: any,
) {
  if (queryClient.getQueryData(['mainMediaList']) !== undefined) {
    /*
      mediaListEntry.status can be any of these values
      CURRENT
      Currently watching/reading

      PLANNING
      Planning to watch/read

      COMPLETED
      Finished watching/reading

      DROPPED
      Stopped watching/reading before completing

      PAUSED
      Paused watching/reading

      REPEATING IS NOT POSSIBLE WITH THIS APP BECAUSE STATUS IS SENT AS AN ARG
      REPEATING
      Re-watching/reading
    */
    switch (mediaFormat) {
      case 'anime':
        queryClient.setQueryData(
          ['mainMediaList'],
          // ✅ this is the way
          (oldData: any) => {
            console.log('test');
            console.log(data.advancedMedia);
            console.log(queryClient.getQueryData(['mainMediaList']));
            switch (mediaListEntry.SaveMediaListEntry.status) {
              case 'CURRENT': {
                const myNewArray = [...oldData.anime.animeWatching];
                const myEntry = data.advancedMedia;
                myEntry.mediaListEntry = mediaListEntry.SaveMediaListEntry;
                const isListEntry = (element: any) => element.id === myEntry.id;
                const myArrayIndex = myNewArray.findIndex(isListEntry);
                if (myArrayIndex > -1) {
                  myNewArray[myArrayIndex] = myEntry;
                }
                const myNewAllArray = [...oldData.anime.animeAll];
                const myArrayAllIndex = myNewAllArray.findIndex(isListEntry);
                if (myArrayIndex > -1) {
                  myNewAllArray[myArrayAllIndex] = myEntry;
                }
                return {
                  ...oldData,
                  anime: {
                    ...oldData.anime,
                    animeWatching: myNewArray,
                    animeAll: myNewAllArray,
                  },
                };
              }
              case 'PLANNING': {
                const myNewArray = [...oldData.anime.animePlanToWatch];
                const myEntry = data.advancedMedia;
                myEntry.mediaListEntry = mediaListEntry.SaveMediaListEntry;
                const isListEntry = (element: any) => element.id === myEntry.id;
                const myArrayIndex = myNewArray.findIndex(isListEntry);
                if (myArrayIndex > -1) {
                  myNewArray[myArrayIndex] = myEntry;
                }
                const myNewAllArray = [...oldData.anime.animeAll];
                const myArrayAllIndex = myNewAllArray.findIndex(isListEntry);
                if (myArrayIndex > -1) {
                  myNewAllArray[myArrayAllIndex] = myEntry;
                }
                return {
                  ...oldData,
                  anime: {
                    ...oldData.anime,
                    animePlanToWatch: myNewArray,
                    animeAll: myNewAllArray,
                  },
                };
              }
              case 'COMPLETED': {
                const myNewArray = [...oldData.anime.animeCompleted];
                const myEntry = data.advancedMedia;
                myEntry.mediaListEntry = mediaListEntry.SaveMediaListEntry;
                const isListEntry = (element: any) => element.id === myEntry.id;
                const myArrayIndex = myNewArray.findIndex(isListEntry);
                if (myArrayIndex > -1) {
                  myNewArray[myArrayIndex] = myEntry;
                }
                const myNewAllArray = [...oldData.anime.animeAll];
                const myArrayAllIndex = myNewAllArray.findIndex(isListEntry);
                if (myArrayIndex > -1) {
                  myNewAllArray[myArrayAllIndex] = myEntry;
                }
                return {
                  ...oldData,
                  anime: {
                    ...oldData.anime,
                    animeCompleted: myNewArray,
                    animeAll: myNewAllArray,
                  },
                };
              }
              case 'DROPPED': {
                const myNewArray = [...oldData.anime.animeDropped];
                const myEntry = data.advancedMedia;
                myEntry.mediaListEntry = mediaListEntry.SaveMediaListEntry;
                const isListEntry = (element: any) => element.id === myEntry.id;
                const myArrayIndex = myNewArray.findIndex(isListEntry);
                if (myArrayIndex > -1) {
                  myNewArray[myArrayIndex] = myEntry;
                }
                const myNewAllArray = [...oldData.anime.animeAll];
                const myArrayAllIndex = myNewAllArray.findIndex(isListEntry);
                if (myArrayIndex > -1) {
                  myNewAllArray[myArrayAllIndex] = myEntry;
                }
                return {
                  ...oldData,
                  anime: {
                    ...oldData.anime,
                    animeDropped: myNewArray,
                    animeAll: myNewAllArray,
                  },
                };
              }
              case 'PAUSED': {
                const myNewArray = [...oldData.anime.animeOnHold];
                const myEntry = data.advancedMedia;
                myEntry.mediaListEntry = mediaListEntry.SaveMediaListEntry;
                const isListEntry = (element: any) => element.id === myEntry.id;
                const myArrayIndex = myNewArray.findIndex(isListEntry);
                if (myArrayIndex > -1) {
                  myNewArray[myArrayIndex] = myEntry;
                }
                const myNewAllArray = [...oldData.anime.animeAll];
                const myArrayAllIndex = myNewAllArray.findIndex(isListEntry);
                if (myArrayIndex > -1) {
                  myNewAllArray[myArrayAllIndex] = myEntry;
                }
                return {
                  ...oldData,
                  anime: {
                    ...oldData.anime,
                    animeOnHold: myNewArray,
                    animeAll: myNewAllArray,
                  },
                };
              }
              default:
                return {
                  ...oldData,
                };
            }
          },
        );
        break;
      case 'manga':
        queryClient.setQueryData(
          ['mainMediaList'],
          // ✅ this is the way
          (oldData: any) => {
            console.log('test');
            console.log(data.advancedMedia);
            console.log(queryClient.getQueryData(['mainMediaList']));
            switch (mediaListEntry.SaveMediaListEntry.status) {
              case 'CURRENT': {
                const myNewArray = [...oldData.manga.mangaReading];
                const myEntry = data.advancedMedia;
                myEntry.mediaListEntry = mediaListEntry.SaveMediaListEntry;
                const isListEntry = (element: any) => element.id === myEntry.id;
                const myArrayIndex = myNewArray.findIndex(isListEntry);
                if (myArrayIndex > -1) {
                  myNewArray[myArrayIndex] = myEntry;
                }
                const myNewAllArray = [...oldData.manga.mangaAll];
                const myArrayAllIndex = myNewAllArray.findIndex(isListEntry);
                if (myArrayIndex > -1) {
                  myNewAllArray[myArrayAllIndex] = myEntry;
                }
                return {
                  ...oldData,
                  manga: {
                    ...oldData.manga,
                    mangaReading: myNewArray,
                    mangaAll: myNewAllArray,
                  },
                };
              }
              case 'PLANNING': {
                const myNewArray = [...oldData.manga.mangaPlanToRead];
                const myEntry = data.advancedMedia;
                myEntry.mediaListEntry = mediaListEntry.SaveMediaListEntry;
                const isListEntry = (element: any) => element.id === myEntry.id;
                const myArrayIndex = myNewArray.findIndex(isListEntry);
                if (myArrayIndex > -1) {
                  myNewArray[myArrayIndex] = myEntry;
                }
                const myNewAllArray = [...oldData.manga.mangaAll];
                const myArrayAllIndex = myNewAllArray.findIndex(isListEntry);
                if (myArrayIndex > -1) {
                  myNewAllArray[myArrayAllIndex] = myEntry;
                }
                return {
                  ...oldData,
                  manga: {
                    ...oldData.manga,
                    mangaPlanToRead: myNewArray,
                    mangaAll: myNewAllArray,
                  },
                };
              }
              case 'COMPLETED': {
                const myNewArray = [...oldData.manga.mangaCompleted];
                const myEntry = data.advancedMedia;
                myEntry.mediaListEntry = mediaListEntry.SaveMediaListEntry;
                const isListEntry = (element: any) => element.id === myEntry.id;
                const myArrayIndex = myNewArray.findIndex(isListEntry);
                if (myArrayIndex > -1) {
                  myNewArray[myArrayIndex] = myEntry;
                }
                const myNewAllArray = [...oldData.manga.mangaAll];
                const myArrayAllIndex = myNewAllArray.findIndex(isListEntry);
                if (myArrayIndex > -1) {
                  myNewAllArray[myArrayAllIndex] = myEntry;
                }
                return {
                  ...oldData,
                  manga: {
                    ...oldData.manga,
                    mangaCompleted: myNewArray,
                    mangaAll: myNewAllArray,
                  },
                };
              }
              case 'DROPPED': {
                const myNewArray = [...oldData.manga.mangaDropped];
                const myEntry = data.advancedMedia;
                myEntry.mediaListEntry = mediaListEntry.SaveMediaListEntry;
                const isListEntry = (element: any) => element.id === myEntry.id;
                const myArrayIndex = myNewArray.findIndex(isListEntry);
                if (myArrayIndex > -1) {
                  myNewArray[myArrayIndex] = myEntry;
                }
                const myNewAllArray = [...oldData.manga.mangaAll];
                const myArrayAllIndex = myNewAllArray.findIndex(isListEntry);
                if (myArrayIndex > -1) {
                  myNewAllArray[myArrayAllIndex] = myEntry;
                }
                return {
                  ...oldData,
                  manga: {
                    ...oldData.manga,
                    mangaDropped: myNewArray,
                    mangaAll: myNewAllArray,
                  },
                };
              }
              case 'PAUSED': {
                const myNewArray = [...oldData.manga.mangaOnHold];
                const myEntry = data.advancedMedia;
                myEntry.mediaListEntry = mediaListEntry.SaveMediaListEntry;
                const isListEntry = (element: any) => element.id === myEntry.id;
                const myArrayIndex = myNewArray.findIndex(isListEntry);
                if (myArrayIndex > -1) {
                  myNewArray[myArrayIndex] = myEntry;
                }
                const myNewAllArray = [...oldData.manga.mangaAll];
                const myArrayAllIndex = myNewAllArray.findIndex(isListEntry);
                if (myArrayIndex > -1) {
                  myNewAllArray[myArrayAllIndex] = myEntry;
                }
                return {
                  ...oldData,
                  manga: {
                    ...oldData.manga,
                    mangaOnHold: myNewArray,
                    mangaAll: myNewAllArray,
                  },
                };
              }
              default:
                return {
                  ...oldData,
                };
            }
          },
        );
        break;
      case 'lightNovels':
        queryClient.setQueryData(
          ['mainMediaList'],
          // ✅ this is the way
          (oldData: any) => {
            console.log('test');
            console.log(data.advancedMedia);
            console.log(queryClient.getQueryData(['mainMediaList']));
            switch (mediaListEntry.SaveMediaListEntry.status) {
              case 'CURRENT': {
                const myNewArray = [...oldData.lightNovels.lightNovelsReading];
                const myEntry = data.advancedMedia;
                myEntry.mediaListEntry = mediaListEntry.SaveMediaListEntry;
                const isListEntry = (element: any) => element.id === myEntry.id;
                const myArrayIndex = myNewArray.findIndex(isListEntry);
                if (myArrayIndex > -1) {
                  myNewArray[myArrayIndex] = myEntry;
                }
                const myNewAllArray = [...oldData.lightNovels.lightNovelsAll];
                const myArrayAllIndex = myNewAllArray.findIndex(isListEntry);
                if (myArrayIndex > -1) {
                  myNewAllArray[myArrayAllIndex] = myEntry;
                }
                return {
                  ...oldData,
                  lightNovels: {
                    ...oldData.lightNovels,
                    lightNovelsReading: myNewArray,
                    lightNovelsAll: myNewAllArray,
                  },
                };
              }
              case 'PLANNING': {
                const myNewArray = [
                  ...oldData.lightNovels.lightNovelsPlanToRead,
                ];
                const myEntry = data.advancedMedia;
                myEntry.mediaListEntry = mediaListEntry.SaveMediaListEntry;
                const isListEntry = (element: any) => element.id === myEntry.id;
                const myArrayIndex = myNewArray.findIndex(isListEntry);
                if (myArrayIndex > -1) {
                  myNewArray[myArrayIndex] = myEntry;
                }
                const myNewAllArray = [...oldData.lightNovels.lightNovelsAll];
                const myArrayAllIndex = myNewAllArray.findIndex(isListEntry);
                if (myArrayIndex > -1) {
                  myNewAllArray[myArrayAllIndex] = myEntry;
                }
                return {
                  ...oldData,
                  lightNovels: {
                    ...oldData.lightNovels,
                    lightNovelsPlanToRead: myNewArray,
                    lightNovelsAll: myNewAllArray,
                  },
                };
              }
              case 'COMPLETED': {
                const myNewArray = [
                  ...oldData.lightNovels.lightNovelsCompleted,
                ];
                const myEntry = data.advancedMedia;
                myEntry.mediaListEntry = mediaListEntry.SaveMediaListEntry;
                const isListEntry = (element: any) => element.id === myEntry.id;
                const myArrayIndex = myNewArray.findIndex(isListEntry);
                if (myArrayIndex > -1) {
                  myNewArray[myArrayIndex] = myEntry;
                }
                const myNewAllArray = [...oldData.lightNovels.lightNovelsAll];
                const myArrayAllIndex = myNewAllArray.findIndex(isListEntry);
                if (myArrayIndex > -1) {
                  myNewAllArray[myArrayAllIndex] = myEntry;
                }
                return {
                  ...oldData,
                  lightNovels: {
                    ...oldData.lightNovels,
                    lightNovelsCompleted: myNewArray,
                    lightNovelsAll: myNewAllArray,
                  },
                };
              }
              case 'DROPPED': {
                const myNewArray = [...oldData.lightNovels.lightNovelsDropped];
                const myEntry = data.advancedMedia;
                myEntry.mediaListEntry = mediaListEntry.SaveMediaListEntry;
                const isListEntry = (element: any) => element.id === myEntry.id;
                const myArrayIndex = myNewArray.findIndex(isListEntry);
                if (myArrayIndex > -1) {
                  myNewArray[myArrayIndex] = myEntry;
                }
                const myNewAllArray = [...oldData.lightNovels.lightNovelsAll];
                const myArrayAllIndex = myNewAllArray.findIndex(isListEntry);
                if (myArrayIndex > -1) {
                  myNewAllArray[myArrayAllIndex] = myEntry;
                }
                return {
                  ...oldData,
                  lightNovels: {
                    ...oldData.lightNovels,
                    lightNovelsDropped: myNewArray,
                    lightNovelsAll: myNewAllArray,
                  },
                };
              }
              case 'PAUSED': {
                const myNewArray = [...oldData.lightNovels.lightNovelsOnHold];
                const myEntry = data.advancedMedia;
                myEntry.mediaListEntry = mediaListEntry.SaveMediaListEntry;
                const isListEntry = (element: any) => element.id === myEntry.id;
                const myArrayIndex = myNewArray.findIndex(isListEntry);
                if (myArrayIndex > -1) {
                  myNewArray[myArrayIndex] = myEntry;
                }
                const myNewAllArray = [...oldData.lightNovels.lightNovelsAll];
                const myArrayAllIndex = myNewAllArray.findIndex(isListEntry);
                if (myArrayIndex > -1) {
                  myNewAllArray[myArrayAllIndex] = myEntry;
                }
                return {
                  ...oldData,
                  lightNovels: {
                    ...oldData.lightNovels,
                    lightNovelsOnHold: myNewArray,
                    lightNovelsAll: myNewAllArray,
                  },
                };
              }
              default:
                return {
                  ...oldData,
                };
            }
          },
        );
        break;
      default:
        console.log(0);
    }
  }
}
