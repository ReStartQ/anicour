import createMediaListEntryData from '../generator/createMediaListEntryData';

export function updateSeasonsList(
  queryClient: any,
  mediaType: string,
  data: any,
  mediaListEntry: any,
  indexInfo: any[],
) {
  if (queryClient.getQueryData(['seasons']) !== undefined) {
    switch (mediaType) {
      case 'TV':
        queryClient.setQueryData(
          ['seasons'],
          // ✅ this is the way
          (oldData: any) => {
            console.log('test');
            console.log(data.advancedMedia);
            const myEntry = data.advancedMedia;
            myEntry.mediaListEntry = mediaListEntry.SaveMediaListEntry;
            const myArray = [...oldData.TV];
            const allArray = [...oldData.All];
            if (indexInfo[2] === false) {
              // if not found return old data
              return {
                ...oldData,
              };
            }
            allArray[indexInfo[0]] = myEntry;
            myArray[indexInfo[1]] = myEntry;
            // indexInfo[0] is All index and [1] is TV index
            return {
              ...oldData,
              TV: myArray,
              All: allArray,
            };
          },
        );
        break;
      case 'TV_SHORT':
        queryClient.setQueryData(
          ['seasons'],
          // ✅ this is the way
          (oldData: any) => {
            console.log('test');
            console.log(data.advancedMedia);
            const myEntry = data.advancedMedia;
            myEntry.mediaListEntry = mediaListEntry.SaveMediaListEntry;
            const myArray = [...oldData.TV];
            const allArray = [...oldData.All];
            if (indexInfo[2] === false) {
              // if not found return old data
              return {
                ...oldData,
              };
            }
            allArray[indexInfo[0]] = myEntry;
            myArray[indexInfo[1]] = myEntry;
            // indexInfo[0] is All index and [1] is TV index
            return {
              ...oldData,
              TV: myArray,
              All: allArray,
            };
          },
        );
        break;
      case 'OVA':
        queryClient.setQueryData(
          ['seasons'],
          // ✅ this is the way
          (oldData: any) => {
            console.log('test');
            console.log(data.advancedMedia);
            const myEntry = data.advancedMedia;
            myEntry.mediaListEntry = mediaListEntry.SaveMediaListEntry;
            const myArray = [...oldData.OVAONASpecial];
            const allArray = [...oldData.All];
            if (indexInfo[2] === false) {
              // if not found return old data
              return {
                ...oldData,
              };
            }
            allArray[indexInfo[0]] = myEntry;
            myArray[indexInfo[1]] = myEntry;
            // indexInfo[0] is All index and [1] is OVAONASpecial index
            return {
              ...oldData,
              OVAONASpecial: myArray,
              All: allArray,
            };
          },
        );
        break;
      case 'ONA':
        queryClient.setQueryData(
          ['seasons'],
          // ✅ this is the way
          (oldData: any) => {
            console.log('test');
            console.log(data.advancedMedia);
            const myEntry = data.advancedMedia;
            myEntry.mediaListEntry = mediaListEntry.SaveMediaListEntry;
            const myArray = [...oldData.OVAONASpecial];
            const allArray = [...oldData.All];
            if (indexInfo[2] === false) {
              // if not found return old data
              return {
                ...oldData,
              };
            }
            allArray[indexInfo[0]] = myEntry;
            myArray[indexInfo[1]] = myEntry;
            // indexInfo[0] is All index and [1] is OVAONASpecial index
            return {
              ...oldData,
              OVAONASpecial: myArray,
              All: allArray,
            };
          },
        );
        break;
      case 'SPECIAL':
        queryClient.setQueryData(
          ['seasons'],
          // ✅ this is the way
          (oldData: any) => {
            console.log('test');
            console.log(data.advancedMedia);
            const myEntry = data.advancedMedia;
            myEntry.mediaListEntry = mediaListEntry.SaveMediaListEntry;
            const myArray = [...oldData.OVAONASpecial];
            const allArray = [...oldData.All];
            if (indexInfo[2] === false) {
              // if not found return old data
              return {
                ...oldData,
              };
            }
            allArray[indexInfo[0]] = myEntry;
            myArray[indexInfo[1]] = myEntry;
            // indexInfo[0] is All index and [1] is OVAONASpecial index
            return {
              ...oldData,
              OVAONASpecial: myArray,
              All: allArray,
            };
          },
        );
        break;
      case 'MOVIE':
        queryClient.setQueryData(
          ['seasons'],
          // ✅ this is the way
          (oldData: any) => {
            console.log('test');
            console.log(data.advancedMedia);
            const myEntry = data.advancedMedia;
            myEntry.mediaListEntry = mediaListEntry.SaveMediaListEntry;
            const myArray = [...oldData.Movies];
            const allArray = [...oldData.All];
            if (indexInfo[2] === false) {
              // if not found return old data
              return {
                ...oldData,
              };
            }
            allArray[indexInfo[0]] = myEntry;
            myArray[indexInfo[1]] = myEntry;
            // indexInfo[0] is All index and [1] is Movies index
            return {
              ...oldData,
              Movies: myArray,
              All: allArray,
            };
          },
        );
        break;
      default:
        console.log('NOT ANIME');
    }
  }
}

export function updateDeleteOnSeasonsList(
  queryClient: any,
  mediaType: string,
  data: any,
  mediaListEntry: any,
  indexInfo: any[],
) {
  console.log('update delete');
  if (queryClient.getQueryData(['seasons']) !== undefined) {
    switch (mediaType) {
      case 'TV':
        queryClient.setQueryData(
          ['seasons'],
          // ✅ this is the way
          (oldData: any) => {
            console.log('test');
            console.log(data.advancedMedia);
            const myEntry = data.advancedMedia;
            myEntry.mediaListEntry = null;
            const myArray = [...oldData.TV];
            const allArray = [...oldData.All];
            console.log(oldData);
            if (indexInfo[2] === false) {
              // if not found return old data
              return {
                ...oldData,
              };
            }
            allArray[indexInfo[0]] = myEntry;
            myArray[indexInfo[1]] = myEntry;
            // indexInfo[0] is All index and [1] is TV index
            return {
              ...oldData,
              TV: myArray,
              All: allArray,
            };
          },
        );
        break;
      case 'TV_SHORT':
        queryClient.setQueryData(
          ['seasons'],
          // ✅ this is the way
          (oldData: any) => {
            console.log('test');
            console.log(data.advancedMedia);
            const myEntry = data.advancedMedia;
            myEntry.mediaListEntry = null;
            const myArray = [...oldData.TV];
            const allArray = [...oldData.All];
            console.log(oldData);
            console.log(indexInfo);
            if (indexInfo[2] === false) {
              // if not found return old data
              return {
                ...oldData,
              };
            }
            allArray[indexInfo[0]] = myEntry;
            myArray[indexInfo[1]] = myEntry;
            // indexInfo[0] is All index and [1] is TV index
            return {
              ...oldData,
              TV: myArray,
              All: allArray,
            };
          },
        );
        break;
      case 'OVA':
        queryClient.setQueryData(
          ['seasons'],
          // ✅ this is the way
          (oldData: any) => {
            console.log('test');
            console.log(data.advancedMedia);
            const myEntry = data.advancedMedia;
            myEntry.mediaListEntry = null;
            const myArray = [...oldData.OVAONASpecial];
            const allArray = [...oldData.All];
            if (indexInfo[2] === false) {
              // if not found return old data
              return {
                ...oldData,
              };
            }
            allArray[indexInfo[0]] = myEntry;
            myArray[indexInfo[1]] = myEntry;
            // indexInfo[0] is All index and [1] is OVAONASpecial index
            return {
              ...oldData,
              OVAONASpecial: myArray,
              All: allArray,
            };
          },
        );
        break;
      case 'ONA':
        queryClient.setQueryData(
          ['seasons'],
          // ✅ this is the way
          (oldData: any) => {
            console.log('test');
            console.log(data.advancedMedia);
            const myEntry = data.advancedMedia;
            myEntry.mediaListEntry = null;
            const myArray = [...oldData.OVAONASpecial];
            const allArray = [...oldData.All];
            if (indexInfo[2] === false) {
              // if not found return old data
              return {
                ...oldData,
              };
            }
            allArray[indexInfo[0]] = myEntry;
            myArray[indexInfo[1]] = myEntry;
            // indexInfo[0] is All index and [1] is OVAONASpecial index
            return {
              ...oldData,
              OVAONASpecial: myArray,
              All: allArray,
            };
          },
        );
        break;
      case 'SPECIAL':
        queryClient.setQueryData(
          ['seasons'],
          // ✅ this is the way
          (oldData: any) => {
            console.log('test');
            console.log(data.advancedMedia);
            const myEntry = data.advancedMedia;
            myEntry.mediaListEntry = null;
            const myArray = [...oldData.OVAONASpecial];
            const allArray = [...oldData.All];
            if (indexInfo[2] === false) {
              // if not found return old data
              return {
                ...oldData,
              };
            }
            allArray[indexInfo[0]] = myEntry;
            myArray[indexInfo[1]] = myEntry;
            // indexInfo[0] is All index and [1] is OVAONASpecial index
            return {
              ...oldData,
              OVAONASpecial: myArray,
              All: allArray,
            };
          },
        );
        break;
      case 'MOVIE':
        queryClient.setQueryData(
          ['seasons'],
          // ✅ this is the way
          (oldData: any) => {
            console.log('test');
            console.log(data.advancedMedia);
            const myEntry = data.advancedMedia;
            myEntry.mediaListEntry = null;
            const myArray = [...oldData.Movies];
            const allArray = [...oldData.All];
            if (indexInfo[2] === false) {
              // if not found return old data
              return {
                ...oldData,
              };
            }
            allArray[indexInfo[0]] = myEntry;
            myArray[indexInfo[1]] = myEntry;
            // indexInfo[0] is All index and [1] is Movies index
            return {
              ...oldData,
              Movies: myArray,
              All: allArray,
            };
          },
        );
        break;
      default:
        console.log('NOT ANIME');
        console.log(mediaType);
    }
  }
}
