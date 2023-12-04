import {
  createContext,
  useState,
  useReducer,
  useContext,
  ReactNode,
} from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

type MainContextProviderProps = {
  children: ReactNode;
};

export const MainContext = createContext({});

export const initialMainState: any = {
  anime: {
    animeWatching: [
      {
        titleRomaji:
          'Koizumiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii',
        image:
          'https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/nx98529-EwZwzKGNaU8b.jpg',
        key: 0,
      },
      {
        titleRomaji:
          'Koizumi is koizumi is koizumi is koizumi is koizumi is koizumi is koizumi is koizumi is koizumi is koizumi is koizumi is koizumi is koizumi is koizumi is koizumi',
        image:
          'https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/nx98529-EwZwzKGNaU8b.jpg',
        key: 1,
      },
      {
        titleRomaji: 'Koizumi',
        image:
          'https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/nx98529-EwZwzKGNaU8b.jpg',
        key: 2,
      },
      {
        titleRomaji: 'Koizumi',
        image:
          'https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/nx98529-EwZwzKGNaU8b.jpg',
        key: 3,
      },
      {
        titleRomaji: 'Koizumi',
        image:
          'https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/nx98529-EwZwzKGNaU8b.jpg',
        key: 4,
      },
      {
        titleRomaji: 'Koizumi',
        image:
          'https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/nx98529-EwZwzKGNaU8b.jpg',
        key: 5,
      },
      {
        titleRomaji: 'Koizumi',
        image:
          'https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/nx98529-EwZwzKGNaU8b.jpg',
        key: 6,
      },
      {
        titleRomaji: 'Koizumi',
        image:
          'https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/nx98529-EwZwzKGNaU8b.jpg',
        key: 7,
      },
      {
        titleRomaji: 'Koizumi',
        image:
          'https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/nx98529-EwZwzKGNaU8b.jpg',
        key: 8,
      },
      {
        titleRomaji: 'Koizumi',
        image:
          'https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/nx98529-EwZwzKGNaU8b.jpg',
        key: 9,
      },
      {
        titleRomaji: 'Koizumi',
        image:
          'https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/nx98529-EwZwzKGNaU8b.jpg',
        key: 10,
      },
      {
        titleRomaji: 'Koizumi',
        image:
          'https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/nx98529-EwZwzKGNaU8b.jpg',
        key: 11,
      },
      {
        titleRomaji: 'Koizumi',
        image:
          'https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/nx98529-EwZwzKGNaU8b.jpg',
        key: 12,
      },
    ],
    animeCompleted: [
      {
        titleRomaji: 'Koizumi',
        image:
          'https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/nx98529-EwZwzKGNaU8b.jpg',
        key: 12,
      },
    ],
    animeOnHold: [
      {
        titleRomaji: 'Koizumi',
        image:
          'https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/nx98529-EwZwzKGNaU8b.jpg',
        key: 12,
      },
      {
        titleRomaji: 'Koizumi',
        image:
          'https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/nx98529-EwZwzKGNaU8b.jpg',
        key: 11,
      },
    ],
    animeDropped: [],
    animePlanToWatch: [],
    animeAll: [],
  },
  manga: {
    mangaReading: [],
    mangaCompleted: [],
    mangaOnHold: [],
    mangaDropped: [],
    mangaPlanToRead: [],
    mangaAll: [],
  },
  lightNovel: {
    lightNovelReading: [],
    lightNovelCompleted: [],
    lightNovelOnHold: [],
    lightNovelDropped: [],
    lightNovelPlanToRead: [],
    lightNovelAll: [],
  },
};

const query = `
    query ($userName: String){
            MediaListCollection(userName:$userName, type:ANIME sort:UPDATED_TIME_DESC){
                lists{
                    status
                    isSplitCompletedList
                    isCustomList
                    name
                    entries{
                        media{
                            id
                            idMal
                            title{
                                romaji
                                english
                                native
                            }
                            season
                            seasonYear
                            episodes
                            chapters
                            volumes
                            type
                            format
                            status
                            coverImage{
                                medium
                                large
                            }
                            startDate{
                                year
                                month
                                day
                            }
                            description
                            genres
                            status
                            siteUrl
                            duration
                            averageScore
                            meanScore
                            mediaListEntry {
                                mediaId
                                progress
                                progressVolumes
                                userId
                                id
                                user{
                                    name
                                }
                                status
                            }
                            trailer {
                              id
                              site
                              thumbnail
                            }
                            nextAiringEpisode {
                              episode
                            }
                        }
                        mediaId
                        progress
                        progressVolumes
                        score
                        status
                        notes
                        startedAt{
                            year
                            month
                            day
                        }
                        completedAt{
                            year
                            month
                            day
                        }
                        repeat
                    }
                }
            }
        }
    `;

const variables = {
  userName: 'ReStart',
};

const url = 'https://graphql.anilist.co';
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  body: JSON.stringify({
    query,
    variables,
  }),
};

const queryManga = `
    query ($userName: String){
            MediaListCollection(userName:$userName, type:MANGA sort:UPDATED_TIME_DESC){
                lists{
                    status
                    isSplitCompletedList
                    isCustomList
                    name
                    entries{
                        media{
                            id
                            idMal
                            title{
                                romaji
                                english
                                native
                            }
                            season
                            seasonYear
                            episodes
                            chapters
                            volumes
                            type
                            format
                            status
                            coverImage{
                                medium
                                large
                            }
                            startDate{
                                year
                                month
                                day
                            }
                            description
                            genres
                            status
                            siteUrl
                            duration
                            averageScore
                            meanScore
                            mediaListEntry {
                                mediaId
                                progress
                                progressVolumes
                                userId
                                id
                                user{
                                    name
                                }
                                status
                            }
                            trailer {
                              id
                              site
                              thumbnail
                            }
                            nextAiringEpisode {
                              episode
                            }
                        }
                        mediaId
                        progress
                        progressVolumes
                        score
                        status
                        notes
                        startedAt{
                            year
                            month
                            day
                        }
                        completedAt{
                            year
                            month
                            day
                        }
                        repeat
                    }
                }
            }
        }
    `;

let result: any = {};

let resultAllLists: any = [];

let resultAllMedia: any = [];

function handleResponse(response: any) {
  return response.json().then(function (json: any) {
    return response.ok ? json : Promise.reject(json);
  });
}

async function handleData(data: any) {
  console.log(data);
  resultAllLists = data.data.MediaListCollection.lists.map(
    (list: any, index: any) => list,
  );
  console.log(resultAllLists);

  let watchingIndex = 0;
  let completedIndex = 0;
  let onHoldIndex = 0;
  let droppedIndex = 0;
  let planToWatchIndex = 0;

  resultAllMedia = resultAllLists.map(
    (entry: any, index: any) => entry.entries,
  );

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < resultAllLists.length; i++) {
    if (
      resultAllLists[i].status === 'CURRENT' &&
      resultAllLists[i].isCustomList === false
    ) {
      watchingIndex = i;
    } else if (
      resultAllLists[i].status === 'COMPLETED' &&
      resultAllLists[i].isCustomList === false
    ) {
      completedIndex = i;
    } else if (
      resultAllLists[i].status === 'PLANNING' &&
      resultAllLists[i].isCustomList === false
    ) {
      planToWatchIndex = i;
    } else if (
      resultAllLists[i].status === 'PAUSED' &&
      resultAllLists[i].isCustomList === false
    ) {
      onHoldIndex = i;
    } else if (
      resultAllLists[i].status === 'DROPPED' &&
      resultAllLists[i].isCustomList === false
    ) {
      droppedIndex = i;
    }
  }

  console.log(resultAllMedia);
  result = {
    anime: {
      animeWatching: await resultAllMedia[watchingIndex].map(
        (entry: any, index: any) => ({
          titleRomaji: entry.media.title.romaji,
          image: entry.media.coverImage.large,
          progress: 0,
          progressVolumes: 0,
          episodes: 0,
          volumes: 0,
          type: entry.media.type,
          key: index,
        }),
      ),
      animeCompleted: await resultAllMedia[completedIndex].map(
        (entry: any, index: any) => ({
          titleRomaji: entry.media.title.romaji,
          image: entry.media.coverImage.large,
          progress: 0,
          progressVolumes: 0,
          episodes: 0,
          volumes: 0,
          type: entry.media.type,
          key: index,
        }),
      ),
      animeOnHold: await resultAllMedia[onHoldIndex].map(
        (entry: any, index: any) => ({
          titleRomaji: entry.media.title.romaji,
          image: entry.media.coverImage.large,
          progress: 0,
          progressVolumes: 0,
          episodes: 0,
          volumes: 0,
          type: entry.media.type,
          key: index,
        }),
      ),
      animeDropped: await resultAllMedia[droppedIndex].map(
        (entry: any, index: any) => ({
          titleRomaji: entry.media.title.romaji,
          image: entry.media.coverImage.large,
          progress: 0,
          progressVolumes: 0,
          episodes: 0,
          volumes: 0,
          type: entry.media.type,
          key: index,
        }),
      ),
      animePlanToWatch: await resultAllMedia[planToWatchIndex].map(
        (entry: any, index: any) => ({
          titleRomaji: entry.media.title.romaji,
          image: entry.media.coverImage.large,
          progress: 0,
          progressVolumes: 0,
          episodes: 0,
          volumes: 0,
          type: entry.media.type,
          key: index,
        }),
      ),
      animeAll: [],
    },
    manga: {
      mangaReading: [],
      mangaCompleted: [],
      mangaOnHold: [],
      mangaDropped: [],
      mangaPlanToRead: [],
      mangaAll: [],
    },
    lightNovel: {
      lightNovelReading: [],
      lightNovelCompleted: [],
      lightNovelOnHold: [],
      lightNovelDropped: [],
      lightNovelPlanToRead: [],
      lightNovelAll: [],
    },
  };
  //  progress: entry.media.mediaListEntry.progress,
  //  progressVolumes: entry.media.mediaListEntry.progressVolumes,
  return 0;
}

function handleError(error: any) {
  alert('Error, check console');
  console.error(error);
}

async function test() {
  const animeData = await fetch(url, options)
    .then(handleResponse)
    .then(handleData)
    .catch(handleError);
  console.log(result);
  const mangaData = 0;
  return result;
}

export const useMain = () => {
  return useContext(MainContext);
};

export const MainContextProvider = ({ children }: MainContextProviderProps) => {
  const MainContextUpdater = (state: any, action: any) => {
    switch (action.type) {
      case 'Update':
        return result;
      case 'Add':
        return [];
      case 'Remove':
        return [];
      default:
        throw new Error();
    }
  };
  const [main, dispatch] = useReducer(MainContextUpdater, initialMainState);

  const updateMain = async () => {
    const action = { type: 'Update' };
    await test();
    dispatch(action);
  };

  const addMain = async () => {
    const action = { type: 'Add' };
    await test();
    dispatch(action);
  };

  const removeMain = async () => {
    const action = { type: 'Remove' };
    await test();
    dispatch(action);
  };

  const syncMain = async () => {
    const action = { type: 'Sync' };
    await test();
    dispatch(action);
  };

  return (
    <MainContext.Provider
      value={{ main, updateMain, addMain, removeMain, syncMain }}
    >
      {children}
    </MainContext.Provider>
  );
};
