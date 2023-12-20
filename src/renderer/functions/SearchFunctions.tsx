import { useQuery } from '@tanstack/react-query';
import Axios from 'axios';

export const useSearchQuery = (
  searchTerm: string,
  myToken: string,
  adult: boolean,
) =>
  useQuery({
    queryKey: ['search'],
    queryFn: async () => {
      const url = 'https://graphql.anilist.co';

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
            query: `query ($page: Int, $search: String) {
          Page (page: $page) {
            pageInfo {
              total
              currentPage
              lastPage
              hasNextPage
              perPage
            }
            media (search: $search) {
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
              endDate{
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
              search: searchTerm,
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
            endYear: entry.endDate.year,
            endMonth: entry.endDate.month,
            endDay: entry.endDate.day,
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
              endYear: entry.endDate.year,
              endMonth: entry.endDate.month,
              endDay: entry.endDate.day,
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

      const myObject: any = { anime: [], manga: [], lightNovels: [], all: [] };
      // seasonCards.setSeason(result);

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < myResult.length; i++) {
        if (myResult[i].type === 'ANIME') {
          myObject.anime = myObject.anime.concat(myResult[i]);
        } else if (
          myResult[i].type === 'MANGA' &&
          myResult[i].format === 'NOVEL'
        ) {
          myObject.lightNovels = myObject.lightNovels.concat(myResult[i]);
        } else if (myResult[i].type === 'MANGA') {
          myObject.manga = myObject.manga.concat(myResult[i]);
        }
      }

      myObject.all = myResult;

      console.log(myObject);
      return myObject;
    },
    // initialData: { anime: [], manga: [], lightNovels: [], all: [] },
  });

export function SearchTest() {
  /*
          myQuery = await Axios.post(
          url,
          {
            query: `query ($page: Int, $search: String, $isAdult: Boolean) {
          Page (page: $page) {
            pageInfo {
              total
              currentPage
              lastPage
              hasNextPage
              perPage
            }
            media (search: $search, isAdult: $isAdult) {
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
              search: searchTerm,
              isAdult: adult,
            },
          },
          headers,
        ).then((res) => res.data.data.Page);
  */
  console.log('search test');
}
