export function updateSearchList(
  queryClient: any,
  mediaType: string,
  data: any,
  mediaListEntry: any,
  indexInfo: any[],
) {
  if (queryClient.getQueryData(['search']) !== undefined) {
    switch (mediaType) {
      case 'ANIME':
        queryClient.setQueryData(
          ['search'],
          // ✅ this is the way
          (oldData: any) => {
            console.log('test');
            console.log(data.advancedMedia);
            const myEntry = data.advancedMedia;
            myEntry.mediaListEntry = mediaListEntry.SaveMediaListEntry;
            const myArray = [...oldData.anime];
            const allArray = [...oldData.all];
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
              anime: myArray,
              all: allArray,
            };
          },
        );
        break;
      case 'MANGA':
        queryClient.setQueryData(
          ['search'],
          // ✅ this is the way
          (oldData: any) => {
            console.log('test');
            console.log(data.advancedMedia);
            console.log(oldData);
            const myEntry = data.advancedMedia;
            const myEntryFormat = data.advancedMedia.format;
            myEntry.mediaListEntry = mediaListEntry.SaveMediaListEntry;
            const myArray = [...oldData.manga];
            const myArrayNovels = [...oldData.lightNovels];
            const allArray = [...oldData.all];
            if (indexInfo[2] === false) {
              // if not found return old data
              return {
                ...oldData,
              };
            }
            allArray[indexInfo[0]] = myEntry;
            myArray[indexInfo[1]] = myEntry;
            myArrayNovels[indexInfo[1]] = myEntry;
            // indexInfo[0] is All index and [1] is OVAONASpecial index
            if (myEntryFormat === 'NOVEL') {
              return {
                ...oldData,
                lightNovels: myArrayNovels,
                all: allArray,
              };
            }
            return {
              ...oldData,
              manga: myArray,
              all: allArray,
            };
          },
        );
        break;
      default:
        console.log('DEFAULT SEARCH UPDATE');
    }
  }
}

export function updateDeleteOnSearchList(
  queryClient: any,
  mediaType: string,
  data: any,
  mediaListEntry: any,
  indexInfo: any[],
) {
  console.log('update delete');
  if (queryClient.getQueryData(['search']) !== undefined) {
    switch (mediaType) {
      case 'ANIME':
        queryClient.setQueryData(
          ['search'],
          // ✅ this is the way
          (oldData: any) => {
            console.log('test');
            console.log(data.advancedMedia);
            const myEntry = data.advancedMedia;
            myEntry.mediaListEntry = null;
            const myArray = [...oldData.anime];
            const allArray = [...oldData.all];
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
              anime: myArray,
              all: allArray,
            };
          },
        );
        break;
      case 'MANGA':
        queryClient.setQueryData(
          ['search'],
          // ✅ this is the way
          (oldData: any) => {
            console.log('test');
            console.log(data.advancedMedia);
            const myEntry = data.advancedMedia;
            myEntry.mediaListEntry = null;
            const myEntryFormat = data.advancedMedia.format;
            const myArray = [...oldData.manga];
            const myArrayNovels = [...oldData.lightNovels];
            const allArray = [...oldData.all];
            if (indexInfo[2] === false) {
              // if not found return old data
              return {
                ...oldData,
              };
            }
            allArray[indexInfo[0]] = myEntry;
            myArray[indexInfo[1]] = myEntry;
            myArrayNovels[indexInfo[1]] = myEntry;
            // indexInfo[0] is All index and [1] is OVAONASpecial index

            if (myEntryFormat === 'NOVEL') {
              return {
                ...oldData,
                lightNovels: myArrayNovels,
                all: allArray,
              };
            }
            return {
              ...oldData,
              manga: myArray,
              all: allArray,
            };
          },
        );
        break;
      default:
        console.log('DEFAULT SEARCH DELETE');
    }
  }
}
