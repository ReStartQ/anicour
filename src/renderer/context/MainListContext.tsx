import {
  createContext,
  useState,
  useReducer,
  useContext,
  ReactNode,
} from 'react';
import axios from 'axios';

type MainListContextProviderProps = {
  children: ReactNode;
};

export const MainListContext = createContext({});

export const initialMainListState: any = [
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
];

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

let result: any = [];

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

  resultAllMedia = resultAllLists.map(
    (entry: any, index: any) => entry.entries,
  );

  console.log(resultAllMedia);

  result = await resultAllMedia[1].map((entry: any, index: any) => ({
    titleRomaji: entry.media.title.romaji,
    image: entry.media.coverImage.large,
    key: index,
  }));
  //  progress: entry.media.mediaListEntry.progress,
  //  progressVolumes: entry.media.mediaListEntry.progressVolumes,
}

function handleError(error: any) {
  alert('Error, check console');
  console.error(error);
}

async function test() {
  const dog = await fetch(url, options)
    .then(handleResponse)
    .then(handleData)
    .catch(handleError);
  console.log(result);
  return result;
}

export const MainListContextUpdater = (state: any, action: any) => {
  switch (action.type) {
    case 'Update':
      test();
      return result;
    case 'Add':
      return [];
    case 'Remove':
      return [];
    default:
      throw new Error();
  }
};

export const useMainList = () => {
  return useContext(MainListContext);
};

export const MainListContextProvider = ({
  children,
}: MainListContextProviderProps) => {
  const [mainList, dispatch] = useReducer(
    MainListContextUpdater,
    initialMainListState,
  );

  const updateMainList = async () => {
    const action = { type: 'Update' };
    await test();
    dispatch(action);
  };

  return (
    <MainListContext.Provider value={{ mainList, updateMainList }}>
      {children}
    </MainListContext.Provider>
  );
};
