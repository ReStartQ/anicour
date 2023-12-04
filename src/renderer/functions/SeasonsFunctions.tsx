import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Axios from 'axios';

export const getMyDate = (date: any) => {
  const mm = date.getMonth() + 1;
  const yyyy = date.getFullYear();

  let mySeason = 'WINTER';
  if (mm === 1 || mm === 2 || mm === 3) {
    mySeason = 'WINTER';
  } else if (mm === 4 || mm === 5 || mm === 6) {
    mySeason = 'SPRING';
  } else if (mm === 7 || mm === 8 || mm === 9) {
    mySeason = 'SUMMER';
  } else if (mm === 10 || mm === 11 || mm === 12) {
    mySeason = 'FALL';
  }

  return [mySeason, yyyy];
};

export const getMyDateNext = (date: any) => {
  const mm = date.getMonth() + 1;
  const yyyy = date.getFullYear();

  let mySeason = 'WINTER';
  if (mm === 1 || mm === 2 || mm === 3) {
    mySeason = 'WINTER';
  } else if (mm === 4 || mm === 5 || mm === 6) {
    mySeason = 'SPRING';
  } else if (mm === 7 || mm === 8 || mm === 9) {
    mySeason = 'SUMMER';
  } else if (mm === 10 || mm === 11 || mm === 12) {
    mySeason = 'FALL';
  }

  return [mySeason, yyyy];
};

export const useSeasonsQuery = (
  seasonInput: any,
  myToken: any,
  myUsername: any,
  adult: boolean,
) =>
  useQuery({
    queryKey: ['seasons'],
    queryFn: async () => {
      const url = 'https://graphql.anilist.co';
      console.log();
      let fullResult;

      const headers = {
        headers: {
          Authorization: `Bearer ${myToken}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      };

      let pageFlag = true;
      let myPage = 1;
      let myQuery: any;
      let myResult: any[] = [];
      while (pageFlag) {
        // eslint-disable-next-line no-await-in-loop
        myQuery = await Axios.post(
          url,
          {
            query: `query ($page: Int, $season: MediaSeason, $seasonYear: Int) {
          Page (page: $page) {
            pageInfo {
              total
              currentPage
              lastPage
              hasNextPage
              perPage
            }
            media (season: $season, seasonYear: $seasonYear) {
              id
              idMal
              title{
                  romaji
                  english
                  native
              }
              synonyms
              season
              seasonYear
              episodes
              chapters
              volumes
              type
              format
              coverImage{
                  medium
                  large
                  extraLarge
              }
              bannerImage
              startDate{
                  year
                  month
                  day
              }
              description
              genres
              tags {
                id
                name
                description
                isGeneralSpoiler
                isMediaSpoiler
                isAdult
                category
              }
              status
              siteUrl
              duration
              averageScore
              popularity
              studios {
                edges {
                  isMain
                  node {
                    name
                  }
                }
              }
              source
              meanScore
              mediaListEntry {
                  mediaId
                  progress
                  progressVolumes
                  userId
                  status
                  score
                  id
                  user{
                      name
                  }
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
                  private
                  repeat
              }
              trailer {
                id
                site
                thumbnail
              }
              nextAiringEpisode {
                episode
                airingAt
                timeUntilAiring
              }
            }
          }
        }
        `,
            variables: {
              page: myPage,
              season: seasonInput[0],
              seasonYear: seasonInput[1],
            },
          },
          headers,
        ).then((res) => res.data.data.Page);
        console.log(myQuery);

        if (myPage === 1) {
          // eslint-disable-next-line no-await-in-loop
          myResult = await myQuery.media.map((entry: any, index: any) => ({
            id: entry.id,
            idMal: entry.idMal,
            titleRomaji: entry.title.romaji,
            titleEnglish: entry.title.english,
            titleNative: entry.title.native,
            synonyms: entry.synonyms,
            season: entry.season,
            seasonYear: entry.seasonYear,
            episodes: entry.episodes,
            chapters: entry.chapters,
            volumes: entry.volumes,
            type: entry.type,
            format: entry.format,
            image: entry.coverImage.large,
            imageMedium: entry.coverImage.medium,
            imageExtraLarge: entry.coverImage.extraLarge,
            bannerImage: entry.bannerImage,
            startYear: entry.startDate.year,
            startMonth: entry.startDate.month,
            startDay: entry.startDate.day,
            description: entry.description,
            genres: entry.genres,
            tags: entry.tags,
            status: entry.status,
            siteUrl: entry.siteUrl,
            duration: entry.duration,
            averageScore: entry.averageScore,
            popularity: entry.popularity,
            studios: entry.studios.edges,
            mainStudioIndex: entry.studios.edges
              .map((e: any) => {
                return e.isMain;
              })
              .indexOf(true),
            source: entry.source,
            meanScore: entry.meanScore,
            mediaListEntry: entry.mediaListEntry,
            trailer: entry.trailer,
            nextAiringEpisode: entry.nextAiringEpisode,
            key: entry.title.romaji + entry.id,
          }));
        } else {
          // eslint-disable-next-line no-await-in-loop
          const tempResult = await myQuery.media.map(
            (entry: any, index: any) => ({
              id: entry.id,
              idMal: entry.idMal,
              titleRomaji: entry.title.romaji,
              titleEnglish: entry.title.english,
              titleNative: entry.title.native,
              synonyms: entry.synonyms,
              season: entry.season,
              seasonYear: entry.seasonYear,
              episodes: entry.episodes,
              chapters: entry.chapters,
              volumes: entry.volumes,
              type: entry.type,
              format: entry.format,
              image: entry.coverImage.large,
              imageMedium: entry.coverImage.medium,
              imageExtraLarge: entry.coverImage.extraLarge,
              bannerImage: entry.bannerImage,
              startYear: entry.startDate.year,
              startMonth: entry.startDate.month,
              startDay: entry.startDate.day,
              description: entry.description,
              genres: entry.genres,
              tags: entry.tags,
              status: entry.status,
              siteUrl: entry.siteUrl,
              duration: entry.duration,
              averageScore: entry.averageScore,
              popularity: entry.popularity,
              studios: entry.studios.edges,
              mainStudioIndex: entry.studios.edges
                .map((e: any) => {
                  return e.isMain;
                })
                .indexOf(true),
              source: entry.source,
              meanScore: entry.meanScore,
              mediaListEntry: entry.mediaListEntry,
              trailer: entry.trailer,
              nextAiringEpisode: entry.nextAiringEpisode,
              key: entry.title.romaji + entry.id,
            }),
          );
          myResult = myResult.concat(tempResult);
          console.log(tempResult);
          console.log(myResult);
        }

        if (myQuery.pageInfo.hasNextPage) {
          pageFlag = true;
          // eslint-disable-next-line no-plusplus
          myPage++;
        } else {
          pageFlag = false;
        }
      }

      // seasonCards.setSeason(result);

      const myObject: any = { TV: [], OVAONASpecial: [], Movies: [], All: [] };

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < myResult.length; i++) {
        if (myResult[i].format === 'TV' || myResult[i].format === 'TV_SHORT') {
          myObject.TV = myObject.TV.concat(myResult[i]);
        } else if (
          myResult[i].format === 'OVA' ||
          myResult[i].format === 'ONA' ||
          myResult[i].format === 'SPECIAL' ||
          myResult[i].format === 'MUSIC'
        ) {
          myObject.OVAONASpecial = myObject.OVAONASpecial.concat(myResult[i]);
        } else if (myResult[i].format === 'MOVIE') {
          myObject.Movies = myObject.Movies.concat(myResult[i]);
        }
        myObject.All = myObject.All.concat(myResult[i]);
      }
      console.log(myObject);
      return myObject;
    },
    // enabled: false,
    // initialData: { TV: [], OVAONASpecial: [], Movies: [], All: [] },
  });

export function seasonsTest() {
  console.log('seasons test');
}

export const seasonAiringTime = (seconds: number) => {
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const dDisplay = d > 0 ? d + (d === 1 ? 'd ' : 'd ') : ''; // day and days
  const hDisplay = h > 0 ? h + (h === 1 ? 'h ' : 'h ') : '';
  const mDisplay = m > 0 ? m + (m === 1 ? 'm  ' : 'm ') : '';
  const sDisplay = s > 0 ? s + (s === 1 ? 's ' : 's ') : '';
  return dDisplay + hDisplay + mDisplay + sDisplay;
};

export const updateTime = (seasons: any) => {
  const mySeason = seasons;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < mySeason.length; i++) {
    if (
      mySeason[i].nextAiringEpisode !== null &&
      mySeason[i].nextAiringEpisode !== 0
    ) {
      mySeason[i].nextAiringEpisode.timeUntilAiring -= 1;
    }
  }
  return mySeason;
};

export const useDecreaseTimeUntilAiring = (time: any) => {
  return useMutation(updateTime(time));
};

export const useGetSeasons = () => {
  const queryClient = useQueryClient();

  return queryClient.getQueryData(['seasons']);
};

export const getTime = (myTime: any) => {
  const time = new Date().getTime() / 1000;

  const seconds = myTime - time;
  if (seconds >= 0) {
    return seconds;
  }
  return 0;
};

export const getTimeFormat = (myTime: any) => {
  const time = new Date().getTime() / 1000;

  const seconds = myTime - time;
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const dDisplay = d > 0 ? d + (d === 1 ? 'd ' : 'd ') : ''; // day and days
  const hDisplay = h > 0 ? h + (h === 1 ? 'h ' : 'h ') : '';
  const mDisplay = m > 0 ? m + (m === 1 ? 'm  ' : 'm ') : '';
  const sDisplay = s > 0 ? s + (s === 1 ? 's ' : 's ') : '';
  /*
  if (seconds <= 0) {
    return 'Episode Aired';
  }
  */
  return dDisplay + hDisplay + mDisplay + sDisplay;
};
