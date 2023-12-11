import { useQuery, useQueryClient } from '@tanstack/react-query';
import Axios from 'axios';

export const useMainMediaList = (myUserName: string, myToken: string) =>
  useQuery({
    queryKey: ['mainMediaList'],
    queryFn: async () => {
      const url = 'https://graphql.anilist.co';

      const headers = {
        headers: {
          Authorization: `Bearer ${myToken}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      };

      // eslint-disable-next-line no-await-in-loop
      const myQuery = await Axios.post(
        url,
        {
          query: `
          query ($userName: String){
                  MediaListCollection(userName:$userName, type:ANIME, sort:UPDATED_TIME_DESC){
                      lists{
                          status
                          isSplitCompletedList
                          isCustomList
                          name
                          entries{
                            private
                            media {
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
                                  id
                                  status
                                  mediaId
                                  progress
                                  progressVolumes
                                  userId
                                  score
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
                  }
              }
          `,
          variables: {
            userName: myUserName,
          },
        },
        headers,
      ).then((res) => res.data.data.MediaListCollection.lists);
      console.log(myQuery);
      // eslint-disable-next-line no-await-in-loop
      /* myResult = await myQuery.media.map((entry: any, index: any) => ({
        titleRomaji: entry.title.romaji,
        image: entry.coverImage.large,
        type: entry.type,
        format: entry.format,
        key: entry.title.romaji + index,
      })); */

      let animeWatchingIndex = null;
      let animeCompletedIndex = null;
      let animeOnHoldIndex = null;
      let animeDroppedIndex = null;
      let animePlanToWatchIndex = null;

      // sets the indexes
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < myQuery.length; i++) {
        if (
          myQuery[i].status === 'CURRENT' &&
          myQuery[i].isCustomList === false
        ) {
          animeWatchingIndex = i;
        } else if (
          myQuery[i].status === 'COMPLETED' &&
          myQuery[i].isCustomList === false
        ) {
          animeCompletedIndex = i;
        } else if (
          myQuery[i].status === 'PLANNING' &&
          myQuery[i].isCustomList === false
        ) {
          animePlanToWatchIndex = i;
        } else if (
          myQuery[i].status === 'PAUSED' &&
          myQuery[i].isCustomList === false
        ) {
          animeOnHoldIndex = i;
        } else if (
          myQuery[i].status === 'DROPPED' &&
          myQuery[i].isCustomList === false
        ) {
          animeDroppedIndex = i;
        }
      }

      const myQueryManga = await Axios.post(
        url,
        {
          query: `
          query ($userName: String){
                  MediaListCollection(userName:$userName, type:MANGA, sort:UPDATED_TIME_DESC){
                      lists{
                          status
                          isSplitCompletedList
                          isCustomList
                          name
                          entries{
                              private
                              media {
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
                                    id
                                    status
                                    mediaId
                                    progress
                                    progressVolumes
                                    userId
                                    score
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
                  }
              }
          `,
          variables: {
            userName: myUserName,
          },
        },
        headers,
      ).then((res) => res.data.data.MediaListCollection.lists);

      const myObject: any = {
        anime: {
          animeWatching:
            animeWatchingIndex !== null
              ? await myQuery[animeWatchingIndex].entries.map(
                  (entry: any, index: any) => ({
                    id: entry.media.id,
                    idMal: entry.media.idMal,
                    private: entry.private,
                    titleRomaji: entry.media.title.romaji,
                    titleEnglish: entry.media.title.english,
                    titleNative: entry.media.title.native,
                    synonyms: entry.media.synonyms,
                    season: entry.media.season,
                    seasonYear: entry.media.seasonYear,
                    episodes: entry.media.episodes,
                    chapters: entry.media.chapters,
                    volumes: entry.media.volumes,
                    type: entry.media.type,
                    format: entry.media.format,
                    image: entry.media.coverImage.large,
                    imageMedium: entry.media.coverImage.medium,
                    imageExtraLarge: entry.media.coverImage.extraLarge,
                    bannerImage: entry.media.bannerImage,
                    startYear: entry.media.startDate.year,
                    startMonth: entry.media.startDate.month,
                    startDay: entry.media.startDate.day,
                    description: entry.media.description,
                    genres: entry.media.genres,
                    tags: entry.media.tags,
                    status: entry.media.status,
                    siteUrl: entry.media.siteUrl,
                    duration: entry.media.duration,
                    averageScore: entry.media.averageScore,
                    popularity: entry.media.popularity,
                    studios: entry.media.studios.edges,
                    mainStudioIndex: entry.media.studios.edges
                      .map((e: any) => {
                        return e.isMain;
                      })
                      .indexOf(true),
                    source: entry.media.source,
                    meanScore: entry.media.meanScore,
                    mediaListEntry: entry.media.mediaListEntry,
                    progress: entry.media.mediaListEntry.progress,
                    progressVolumes: entry.media.mediaListEntry.progressVolumes,
                    score: entry.media.mediaListEntry.score,
                    notes: entry.media.mediaListEntry.notes,
                    startedAt: entry.media.mediaListEntry.startedAt,
                    completedAt: entry.media.mediaListEntry.completedAt,
                    repeat: entry.media.mediaListEntry.repeat,
                    trailer: entry.media.trailer,
                    nextAiringEpisode: entry.media.nextAiringEpisode,
                    location: 'animeWatching',
                    key: entry.media.title.romaji + entry.media.id,
                  }),
                )
              : [],
          animeCompleted:
            animeCompletedIndex !== null
              ? await myQuery[animeCompletedIndex].entries.map(
                  (entry: any, index: any) => ({
                    id: entry.media.id,
                    idMal: entry.media.idMal,
                    private: entry.private,
                    titleRomaji: entry.media.title.romaji,
                    titleEnglish: entry.media.title.english,
                    titleNative: entry.media.title.native,
                    synonyms: entry.media.synonyms,
                    season: entry.media.season,
                    seasonYear: entry.media.seasonYear,
                    episodes: entry.media.episodes,
                    chapters: entry.media.chapters,
                    volumes: entry.media.volumes,
                    type: entry.media.type,
                    format: entry.media.format,
                    image: entry.media.coverImage.large,
                    imageMedium: entry.media.coverImage.medium,
                    imageExtraLarge: entry.media.coverImage.extraLarge,
                    bannerImage: entry.media.bannerImage,
                    startYear: entry.media.startDate.year,
                    startMonth: entry.media.startDate.month,
                    startDay: entry.media.startDate.day,
                    description: entry.media.description,
                    genres: entry.media.genres,
                    tags: entry.media.tags,
                    status: entry.media.status,
                    siteUrl: entry.media.siteUrl,
                    duration: entry.media.duration,
                    averageScore: entry.media.averageScore,
                    popularity: entry.media.popularity,
                    studios: entry.media.studios.edges,
                    mainStudioIndex: entry.media.studios.edges
                      .map((e: any) => {
                        return e.isMain;
                      })
                      .indexOf(true),
                    source: entry.media.source,
                    meanScore: entry.media.meanScore,
                    mediaListEntry: entry.media.mediaListEntry,
                    progress: entry.media.mediaListEntry.progress,
                    progressVolumes: entry.media.mediaListEntry.progressVolumes,
                    score: entry.media.mediaListEntry.score,
                    notes: entry.media.mediaListEntry.notes,
                    startedAt: entry.media.mediaListEntry.startedAt,
                    completedAt: entry.media.mediaListEntry.completedAt,
                    repeat: entry.media.mediaListEntry.repeat,
                    trailer: entry.media.trailer,
                    nextAiringEpisode: entry.media.nextAiringEpisode,
                    location: 'animeCompleted',
                    key: entry.media.title.romaji + entry.media.id,
                  }),
                )
              : [],
          animeOnHold:
            animeOnHoldIndex !== null
              ? await myQuery[animeOnHoldIndex].entries.map(
                  (entry: any, index: any) => ({
                    id: entry.media.id,
                    idMal: entry.media.idMal,
                    private: entry.private,
                    titleRomaji: entry.media.title.romaji,
                    titleEnglish: entry.media.title.english,
                    titleNative: entry.media.title.native,
                    synonyms: entry.media.synonyms,
                    season: entry.media.season,
                    seasonYear: entry.media.seasonYear,
                    episodes: entry.media.episodes,
                    chapters: entry.media.chapters,
                    volumes: entry.media.volumes,
                    type: entry.media.type,
                    format: entry.media.format,
                    image: entry.media.coverImage.large,
                    imageMedium: entry.media.coverImage.medium,
                    imageExtraLarge: entry.media.coverImage.extraLarge,
                    bannerImage: entry.media.bannerImage,
                    startYear: entry.media.startDate.year,
                    startMonth: entry.media.startDate.month,
                    startDay: entry.media.startDate.day,
                    description: entry.media.description,
                    genres: entry.media.genres,
                    tags: entry.media.tags,
                    status: entry.media.status,
                    siteUrl: entry.media.siteUrl,
                    duration: entry.media.duration,
                    averageScore: entry.media.averageScore,
                    popularity: entry.media.popularity,
                    studios: entry.media.studios.edges,
                    mainStudioIndex: entry.media.studios.edges
                      .map((e: any) => {
                        return e.isMain;
                      })
                      .indexOf(true),
                    source: entry.media.source,
                    meanScore: entry.media.meanScore,
                    mediaListEntry: entry.media.mediaListEntry,
                    progress: entry.media.mediaListEntry.progress,
                    progressVolumes: entry.media.mediaListEntry.progressVolumes,
                    score: entry.media.mediaListEntry.score,
                    notes: entry.media.mediaListEntry.notes,
                    startedAt: entry.media.mediaListEntry.startedAt,
                    completedAt: entry.media.mediaListEntry.completedAt,
                    repeat: entry.media.mediaListEntry.repeat,
                    trailer: entry.media.trailer,
                    nextAiringEpisode: entry.media.nextAiringEpisode,
                    location: 'animeOnHold',
                    key: entry.media.title.romaji + entry.media.id,
                  }),
                )
              : [],
          animeDropped:
            animeDroppedIndex !== null
              ? await myQuery[animeDroppedIndex].entries.map(
                  (entry: any, index: any) => ({
                    id: entry.media.id,
                    idMal: entry.media.idMal,
                    private: entry.private,
                    titleRomaji: entry.media.title.romaji,
                    titleEnglish: entry.media.title.english,
                    titleNative: entry.media.title.native,
                    synonyms: entry.media.synonyms,
                    season: entry.media.season,
                    seasonYear: entry.media.seasonYear,
                    episodes: entry.media.episodes,
                    chapters: entry.media.chapters,
                    volumes: entry.media.volumes,
                    type: entry.media.type,
                    format: entry.media.format,
                    image: entry.media.coverImage.large,
                    imageMedium: entry.media.coverImage.medium,
                    imageExtraLarge: entry.media.coverImage.extraLarge,
                    bannerImage: entry.media.bannerImage,
                    startYear: entry.media.startDate.year,
                    startMonth: entry.media.startDate.month,
                    startDay: entry.media.startDate.day,
                    description: entry.media.description,
                    genres: entry.media.genres,
                    tags: entry.media.tags,
                    status: entry.media.status,
                    siteUrl: entry.media.siteUrl,
                    duration: entry.media.duration,
                    averageScore: entry.media.averageScore,
                    popularity: entry.media.popularity,
                    studios: entry.media.studios.edges,
                    mainStudioIndex: entry.media.studios.edges
                      .map((e: any) => {
                        return e.isMain;
                      })
                      .indexOf(true),
                    source: entry.media.source,
                    meanScore: entry.media.meanScore,
                    mediaListEntry: entry.media.mediaListEntry,
                    progress: entry.media.mediaListEntry.progress,
                    progressVolumes: entry.media.mediaListEntry.progressVolumes,
                    score: entry.media.mediaListEntry.score,
                    notes: entry.media.mediaListEntry.notes,
                    startedAt: entry.media.mediaListEntry.startedAt,
                    completedAt: entry.media.mediaListEntry.completedAt,
                    repeat: entry.media.mediaListEntry.repeat,
                    trailer: entry.media.trailer,
                    nextAiringEpisode: entry.media.nextAiringEpisode,
                    location: 'animeDropped',
                    key: entry.media.title.romaji + entry.media.id,
                  }),
                )
              : [],
          animePlanToWatch:
            animePlanToWatchIndex !== null
              ? await myQuery[animePlanToWatchIndex].entries.map(
                  (entry: any, index: any) => ({
                    id: entry.media.id,
                    idMal: entry.media.idMal,
                    private: entry.private,
                    titleRomaji: entry.media.title.romaji,
                    titleEnglish: entry.media.title.english,
                    titleNative: entry.media.title.native,
                    synonyms: entry.media.synonyms,
                    season: entry.media.season,
                    seasonYear: entry.media.seasonYear,
                    episodes: entry.media.episodes,
                    chapters: entry.media.chapters,
                    volumes: entry.media.volumes,
                    type: entry.media.type,
                    format: entry.media.format,
                    image: entry.media.coverImage.large,
                    imageMedium: entry.media.coverImage.medium,
                    imageExtraLarge: entry.media.coverImage.extraLarge,
                    bannerImage: entry.media.bannerImage,
                    startYear: entry.media.startDate.year,
                    startMonth: entry.media.startDate.month,
                    startDay: entry.media.startDate.day,
                    description: entry.media.description,
                    genres: entry.media.genres,
                    tags: entry.media.tags,
                    status: entry.media.status,
                    siteUrl: entry.media.siteUrl,
                    duration: entry.media.duration,
                    averageScore: entry.media.averageScore,
                    popularity: entry.media.popularity,
                    studios: entry.media.studios.edges,
                    mainStudioIndex: entry.media.studios.edges
                      .map((e: any) => {
                        return e.isMain;
                      })
                      .indexOf(true),
                    source: entry.media.source,
                    meanScore: entry.media.meanScore,
                    mediaListEntry: entry.media.mediaListEntry,
                    progress: entry.media.mediaListEntry.progress,
                    progressVolumes: entry.media.mediaListEntry.progressVolumes,
                    score: entry.media.mediaListEntry.score,
                    notes: entry.media.mediaListEntry.notes,
                    startedAt: entry.media.mediaListEntry.startedAt,
                    completedAt: entry.media.mediaListEntry.completedAt,
                    repeat: entry.media.mediaListEntry.repeat,
                    trailer: entry.media.trailer,
                    nextAiringEpisode: entry.media.nextAiringEpisode,
                    location: 'animePlanToWatch',
                    key: entry.media.title.romaji + entry.media.id,
                  }),
                )
              : [],
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
        lightNovels: {
          lightNovelsReading: [],
          lightNovelsCompleted: [],
          lightNovelsOnHold: [],
          lightNovelsDropped: [],
          lightNovelsPlanToRead: [],
          lightNovelsAll: [],
        },
      };

      console.log(myQueryManga);
      let mangaQueryReadingIndex = null;
      let mangaQueryCompletedIndex = null;
      let mangaQueryPlanToReadIndex = null;
      let mangaQueryDroppedIndex = null;
      let mangaQueryOnHoldIndex = null;

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < myQueryManga.length; i++) {
        if (
          myQueryManga[i].status === 'CURRENT' &&
          myQueryManga[i].isCustomList === false
        ) {
          mangaQueryReadingIndex = i;
        } else if (
          myQueryManga[i].status === 'COMPLETED' &&
          myQueryManga[i].isCustomList === false
        ) {
          mangaQueryCompletedIndex = i;
        } else if (
          myQueryManga[i].status === 'PLANNING' &&
          myQueryManga[i].isCustomList === false
        ) {
          mangaQueryPlanToReadIndex = i;
        } else if (
          myQueryManga[i].status === 'PAUSED' &&
          myQueryManga[i].isCustomList === false
        ) {
          mangaQueryOnHoldIndex = i;
        } else if (
          myQueryManga[i].status === 'DROPPED' &&
          myQueryManga[i].isCustomList === false
        ) {
          mangaQueryDroppedIndex = i;
        }
      }
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < myQueryManga.length; i++) {
        // lists
        // eslint-disable-next-line no-plusplus
        for (let j = 0; j < myQueryManga[i].entries.length; j++) {
          // entries
          if (
            myQueryManga[i].entries[j].media.type === 'MANGA' &&
            myQueryManga[i].entries[j].media.format === 'NOVEL'
          ) {
            if (i === mangaQueryReadingIndex) {
              myObject.lightNovels.lightNovelsReading =
                myObject.lightNovels.lightNovelsReading.concat({
                  id: myQueryManga[i].entries[j].media.id,
                  idMal: myQueryManga[i].entries[j].media.idMal,
                  private: myQueryManga[i].entries[j].private,
                  titleRomaji: myQueryManga[i].entries[j].media.title.romaji,
                  titleEnglish: myQueryManga[i].entries[j].media.title.english,
                  titleNative: myQueryManga[i].entries[j].media.title.native,
                  synonyms: myQueryManga[i].entries[j].media.synonyms,
                  season: myQueryManga[i].entries[j].media.season,
                  seasonYear: myQueryManga[i].entries[j].media.seasonYear,
                  episodes: myQueryManga[i].entries[j].media.episodes,
                  chapters: myQueryManga[i].entries[j].media.chapters,
                  volumes: myQueryManga[i].entries[j].media.volumes,
                  type: myQueryManga[i].entries[j].media.type,
                  format: myQueryManga[i].entries[j].media.format,
                  image: myQueryManga[i].entries[j].media.coverImage.large,
                  imageMedium:
                    myQueryManga[i].entries[j].media.coverImage.medium,
                  imageExtraLarge:
                    myQueryManga[i].entries[j].media.coverImage.extraLarge,
                  bannerImage: myQueryManga[i].entries[j].media.bannerImage,
                  startYear: myQueryManga[i].entries[j].media.startDate.year,
                  startMonth: myQueryManga[i].entries[j].media.startDate.month,
                  startDay: myQueryManga[i].entries[j].media.startDate.day,
                  description: myQueryManga[i].entries[j].media.description,
                  genres: myQueryManga[i].entries[j].media.genres,
                  tags: myQueryManga[i].entries[j].media.tags,
                  status: myQueryManga[i].entries[j].media.status,
                  siteUrl: myQueryManga[i].entries[j].media.siteUrl,
                  duration: myQueryManga[i].entries[j].media.duration,
                  averageScore: myQueryManga[i].entries[j].media.averageScore,
                  popularity: myQueryManga[i].entries[j].media.popularity,
                  studios: myQueryManga[i].entries[j].media.studios.edges,
                  mainStudioIndex: myQueryManga[i].entries[
                    j
                  ].media.studios.edges
                    .map((e: any) => {
                      return e.isMain;
                    })
                    .indexOf(true),
                  source: myQueryManga[i].entries[j].media.source,
                  meanScore: myQueryManga[i].entries[j].media.meanScore,
                  mediaListEntry:
                    myQueryManga[i].entries[j].media.mediaListEntry,
                  progress:
                    myQueryManga[i].entries[j].media.mediaListEntry.progress,
                  progressVolumes:
                    myQueryManga[i].entries[j].media.mediaListEntry
                      .progressVolumes,
                  score: myQueryManga[i].entries[j].media.mediaListEntry.score,
                  notes: myQueryManga[i].entries[j].media.mediaListEntry.notes,
                  startedAt:
                    myQueryManga[i].entries[j].media.mediaListEntry.startedAt,
                  completedAt:
                    myQueryManga[i].entries[j].media.mediaListEntry.completedAt,
                  repeat:
                    myQueryManga[i].entries[j].media.mediaListEntry.repeat,
                  trailer: myQueryManga[i].entries[j].media.trailer,
                  nextAiringEpisode:
                    myQueryManga[i].entries[j].media.nextAiringEpisode,
                  location: 'lightNovelsReading',
                  key:
                    myQueryManga[i].entries[j].media.title.romaji +
                    myQueryManga[i].entries[j].media.id,
                });
            }
            if (i === mangaQueryCompletedIndex) {
              myObject.lightNovels.lightNovelsCompleted =
                myObject.lightNovels.lightNovelsCompleted.concat({
                  id: myQueryManga[i].entries[j].media.id,
                  idMal: myQueryManga[i].entries[j].media.idMal,
                  private: myQueryManga[i].entries[j].private,
                  titleRomaji: myQueryManga[i].entries[j].media.title.romaji,
                  titleEnglish: myQueryManga[i].entries[j].media.title.english,
                  titleNative: myQueryManga[i].entries[j].media.title.native,
                  synonyms: myQueryManga[i].entries[j].media.synonyms,
                  season: myQueryManga[i].entries[j].media.season,
                  seasonYear: myQueryManga[i].entries[j].media.seasonYear,
                  episodes: myQueryManga[i].entries[j].media.episodes,
                  chapters: myQueryManga[i].entries[j].media.chapters,
                  volumes: myQueryManga[i].entries[j].media.volumes,
                  type: myQueryManga[i].entries[j].media.type,
                  format: myQueryManga[i].entries[j].media.format,
                  image: myQueryManga[i].entries[j].media.coverImage.large,
                  imageMedium:
                    myQueryManga[i].entries[j].media.coverImage.medium,
                  imageExtraLarge:
                    myQueryManga[i].entries[j].media.coverImage.extraLarge,
                  bannerImage: myQueryManga[i].entries[j].media.bannerImage,
                  startYear: myQueryManga[i].entries[j].media.startDate.year,
                  startMonth: myQueryManga[i].entries[j].media.startDate.month,
                  startDay: myQueryManga[i].entries[j].media.startDate.day,
                  description: myQueryManga[i].entries[j].media.description,
                  genres: myQueryManga[i].entries[j].media.genres,
                  tags: myQueryManga[i].entries[j].media.tags,
                  status: myQueryManga[i].entries[j].media.status,
                  siteUrl: myQueryManga[i].entries[j].media.siteUrl,
                  duration: myQueryManga[i].entries[j].media.duration,
                  averageScore: myQueryManga[i].entries[j].media.averageScore,
                  popularity: myQueryManga[i].entries[j].media.popularity,
                  studios: myQueryManga[i].entries[j].media.studios.edges,
                  mainStudioIndex: myQueryManga[i].entries[
                    j
                  ].media.studios.edges
                    .map((e: any) => {
                      return e.isMain;
                    })
                    .indexOf(true),
                  source: myQueryManga[i].entries[j].media.source,
                  meanScore: myQueryManga[i].entries[j].media.meanScore,
                  mediaListEntry:
                    myQueryManga[i].entries[j].media.mediaListEntry,
                  progress:
                    myQueryManga[i].entries[j].media.mediaListEntry.progress,
                  progressVolumes:
                    myQueryManga[i].entries[j].media.mediaListEntry
                      .progressVolumes,
                  score: myQueryManga[i].entries[j].media.mediaListEntry.score,
                  notes: myQueryManga[i].entries[j].media.mediaListEntry.notes,
                  startedAt:
                    myQueryManga[i].entries[j].media.mediaListEntry.startedAt,
                  completedAt:
                    myQueryManga[i].entries[j].media.mediaListEntry.completedAt,
                  repeat:
                    myQueryManga[i].entries[j].media.mediaListEntry.repeat,
                  trailer: myQueryManga[i].entries[j].media.trailer,
                  nextAiringEpisode:
                    myQueryManga[i].entries[j].media.nextAiringEpisode,
                  location: 'lightNovelsCompleted',
                  key:
                    myQueryManga[i].entries[j].media.title.romaji +
                    myQueryManga[i].entries[j].media.id,
                });
            }
            if (i === mangaQueryOnHoldIndex) {
              myObject.lightNovels.lightNovelsOnHold =
                myObject.lightNovels.lightNovelsOnHold.concat({
                  id: myQueryManga[i].entries[j].media.id,
                  idMal: myQueryManga[i].entries[j].media.idMal,
                  private: myQueryManga[i].entries[j].private,
                  titleRomaji: myQueryManga[i].entries[j].media.title.romaji,
                  titleEnglish: myQueryManga[i].entries[j].media.title.english,
                  titleNative: myQueryManga[i].entries[j].media.title.native,
                  synonyms: myQueryManga[i].entries[j].media.synonyms,
                  season: myQueryManga[i].entries[j].media.season,
                  seasonYear: myQueryManga[i].entries[j].media.seasonYear,
                  episodes: myQueryManga[i].entries[j].media.episodes,
                  chapters: myQueryManga[i].entries[j].media.chapters,
                  volumes: myQueryManga[i].entries[j].media.volumes,
                  type: myQueryManga[i].entries[j].media.type,
                  format: myQueryManga[i].entries[j].media.format,
                  image: myQueryManga[i].entries[j].media.coverImage.large,
                  imageMedium:
                    myQueryManga[i].entries[j].media.coverImage.medium,
                  imageExtraLarge:
                    myQueryManga[i].entries[j].media.coverImage.extraLarge,
                  bannerImage: myQueryManga[i].entries[j].media.bannerImage,
                  startYear: myQueryManga[i].entries[j].media.startDate.year,
                  startMonth: myQueryManga[i].entries[j].media.startDate.month,
                  startDay: myQueryManga[i].entries[j].media.startDate.day,
                  description: myQueryManga[i].entries[j].media.description,
                  genres: myQueryManga[i].entries[j].media.genres,
                  tags: myQueryManga[i].entries[j].media.tags,
                  status: myQueryManga[i].entries[j].media.status,
                  siteUrl: myQueryManga[i].entries[j].media.siteUrl,
                  duration: myQueryManga[i].entries[j].media.duration,
                  averageScore: myQueryManga[i].entries[j].media.averageScore,
                  popularity: myQueryManga[i].entries[j].media.popularity,
                  studios: myQueryManga[i].entries[j].media.studios.edges,
                  mainStudioIndex: myQueryManga[i].entries[
                    j
                  ].media.studios.edges
                    .map((e: any) => {
                      return e.isMain;
                    })
                    .indexOf(true),
                  source: myQueryManga[i].entries[j].media.source,
                  meanScore: myQueryManga[i].entries[j].media.meanScore,
                  mediaListEntry:
                    myQueryManga[i].entries[j].media.mediaListEntry,
                  progress:
                    myQueryManga[i].entries[j].media.mediaListEntry.progress,
                  progressVolumes:
                    myQueryManga[i].entries[j].media.mediaListEntry
                      .progressVolumes,
                  score: myQueryManga[i].entries[j].media.mediaListEntry.score,
                  notes: myQueryManga[i].entries[j].media.mediaListEntry.notes,
                  startedAt:
                    myQueryManga[i].entries[j].media.mediaListEntry.startedAt,
                  completedAt:
                    myQueryManga[i].entries[j].media.mediaListEntry.completedAt,
                  repeat:
                    myQueryManga[i].entries[j].media.mediaListEntry.repeat,
                  trailer: myQueryManga[i].entries[j].media.trailer,
                  nextAiringEpisode:
                    myQueryManga[i].entries[j].media.nextAiringEpisode,
                  location: 'lightNovelsOnHold',
                  key:
                    myQueryManga[i].entries[j].media.title.romaji +
                    myQueryManga[i].entries[j].media.id,
                });
            }
            if (i === mangaQueryDroppedIndex) {
              myObject.lightNovels.lightNovelsDropped =
                myObject.lightNovels.lightNovelsDropped.concat({
                  id: myQueryManga[i].entries[j].media.id,
                  idMal: myQueryManga[i].entries[j].media.idMal,
                  private: myQueryManga[i].entries[j].private,
                  titleRomaji: myQueryManga[i].entries[j].media.title.romaji,
                  titleEnglish: myQueryManga[i].entries[j].media.title.english,
                  titleNative: myQueryManga[i].entries[j].media.title.native,
                  synonyms: myQueryManga[i].entries[j].media.synonyms,
                  season: myQueryManga[i].entries[j].media.season,
                  seasonYear: myQueryManga[i].entries[j].media.seasonYear,
                  episodes: myQueryManga[i].entries[j].media.episodes,
                  chapters: myQueryManga[i].entries[j].media.chapters,
                  volumes: myQueryManga[i].entries[j].media.volumes,
                  type: myQueryManga[i].entries[j].media.type,
                  format: myQueryManga[i].entries[j].media.format,
                  image: myQueryManga[i].entries[j].media.coverImage.large,
                  imageMedium:
                    myQueryManga[i].entries[j].media.coverImage.medium,
                  imageExtraLarge:
                    myQueryManga[i].entries[j].media.coverImage.extraLarge,
                  bannerImage: myQueryManga[i].entries[j].media.bannerImage,
                  startYear: myQueryManga[i].entries[j].media.startDate.year,
                  startMonth: myQueryManga[i].entries[j].media.startDate.month,
                  startDay: myQueryManga[i].entries[j].media.startDate.day,
                  description: myQueryManga[i].entries[j].media.description,
                  genres: myQueryManga[i].entries[j].media.genres,
                  tags: myQueryManga[i].entries[j].media.tags,
                  status: myQueryManga[i].entries[j].media.status,
                  siteUrl: myQueryManga[i].entries[j].media.siteUrl,
                  duration: myQueryManga[i].entries[j].media.duration,
                  averageScore: myQueryManga[i].entries[j].media.averageScore,
                  popularity: myQueryManga[i].entries[j].media.popularity,
                  studios: myQueryManga[i].entries[j].media.studios.edges,
                  mainStudioIndex: myQueryManga[i].entries[
                    j
                  ].media.studios.edges
                    .map((e: any) => {
                      return e.isMain;
                    })
                    .indexOf(true),
                  source: myQueryManga[i].entries[j].media.source,
                  meanScore: myQueryManga[i].entries[j].media.meanScore,
                  mediaListEntry:
                    myQueryManga[i].entries[j].media.mediaListEntry,
                  progress:
                    myQueryManga[i].entries[j].media.mediaListEntry.progress,
                  progressVolumes:
                    myQueryManga[i].entries[j].media.mediaListEntry
                      .progressVolumes,
                  score: myQueryManga[i].entries[j].media.mediaListEntry.score,
                  notes: myQueryManga[i].entries[j].media.mediaListEntry.notes,
                  startedAt:
                    myQueryManga[i].entries[j].media.mediaListEntry.startedAt,
                  completedAt:
                    myQueryManga[i].entries[j].media.mediaListEntry.completedAt,
                  repeat:
                    myQueryManga[i].entries[j].media.mediaListEntry.repeat,
                  trailer: myQueryManga[i].entries[j].media.trailer,
                  nextAiringEpisode:
                    myQueryManga[i].entries[j].media.nextAiringEpisode,
                  location: 'lightNovelsDropped',
                  key:
                    myQueryManga[i].entries[j].media.title.romaji +
                    myQueryManga[i].entries[j].media.id,
                });
            }
            if (i === mangaQueryPlanToReadIndex) {
              myObject.lightNovels.lightNovelsPlanToRead =
                myObject.lightNovels.lightNovelsPlanToRead.concat({
                  id: myQueryManga[i].entries[j].media.id,
                  idMal: myQueryManga[i].entries[j].media.idMal,
                  private: myQueryManga[i].entries[j].private,
                  titleRomaji: myQueryManga[i].entries[j].media.title.romaji,
                  titleEnglish: myQueryManga[i].entries[j].media.title.english,
                  titleNative: myQueryManga[i].entries[j].media.title.native,
                  synonyms: myQueryManga[i].entries[j].media.synonyms,
                  season: myQueryManga[i].entries[j].media.season,
                  seasonYear: myQueryManga[i].entries[j].media.seasonYear,
                  episodes: myQueryManga[i].entries[j].media.episodes,
                  chapters: myQueryManga[i].entries[j].media.chapters,
                  volumes: myQueryManga[i].entries[j].media.volumes,
                  type: myQueryManga[i].entries[j].media.type,
                  format: myQueryManga[i].entries[j].media.format,
                  image: myQueryManga[i].entries[j].media.coverImage.large,
                  imageMedium:
                    myQueryManga[i].entries[j].media.coverImage.medium,
                  imageExtraLarge:
                    myQueryManga[i].entries[j].media.coverImage.extraLarge,
                  bannerImage: myQueryManga[i].entries[j].media.bannerImage,
                  startYear: myQueryManga[i].entries[j].media.startDate.year,
                  startMonth: myQueryManga[i].entries[j].media.startDate.month,
                  startDay: myQueryManga[i].entries[j].media.startDate.day,
                  description: myQueryManga[i].entries[j].media.description,
                  genres: myQueryManga[i].entries[j].media.genres,
                  tags: myQueryManga[i].entries[j].media.tags,
                  status: myQueryManga[i].entries[j].media.status,
                  siteUrl: myQueryManga[i].entries[j].media.siteUrl,
                  duration: myQueryManga[i].entries[j].media.duration,
                  averageScore: myQueryManga[i].entries[j].media.averageScore,
                  popularity: myQueryManga[i].entries[j].media.popularity,
                  studios: myQueryManga[i].entries[j].media.studios.edges,
                  mainStudioIndex: myQueryManga[i].entries[
                    j
                  ].media.studios.edges
                    .map((e: any) => {
                      return e.isMain;
                    })
                    .indexOf(true),
                  source: myQueryManga[i].entries[j].media.source,
                  meanScore: myQueryManga[i].entries[j].media.meanScore,
                  mediaListEntry:
                    myQueryManga[i].entries[j].media.mediaListEntry,
                  progress:
                    myQueryManga[i].entries[j].media.mediaListEntry.progress,
                  progressVolumes:
                    myQueryManga[i].entries[j].media.mediaListEntry
                      .progressVolumes,
                  score: myQueryManga[i].entries[j].media.mediaListEntry.score,
                  notes: myQueryManga[i].entries[j].media.mediaListEntry.notes,
                  startedAt:
                    myQueryManga[i].entries[j].media.mediaListEntry.startedAt,
                  completedAt:
                    myQueryManga[i].entries[j].media.mediaListEntry.completedAt,
                  repeat:
                    myQueryManga[i].entries[j].media.mediaListEntry.repeat,
                  trailer: myQueryManga[i].entries[j].media.trailer,
                  nextAiringEpisode:
                    myQueryManga[i].entries[j].media.nextAiringEpisode,
                  location: 'lightNovelsPlanToRead',
                  key:
                    myQueryManga[i].entries[j].media.title.romaji +
                    myQueryManga[i].entries[j].media.id,
                });
            }
          } else if (myQueryManga[i].entries[j].media.type === 'MANGA') {
            // myObject.manga = myObject.manga.concat(myQueryManga[i]);
            if (i === mangaQueryReadingIndex) {
              myObject.manga.mangaReading = myObject.manga.mangaReading.concat({
                id: myQueryManga[i].entries[j].media.id,
                idMal: myQueryManga[i].entries[j].media.idMal,
                private: myQueryManga[i].entries[j].private,
                titleRomaji: myQueryManga[i].entries[j].media.title.romaji,
                titleEnglish: myQueryManga[i].entries[j].media.title.english,
                titleNative: myQueryManga[i].entries[j].media.title.native,
                synonyms: myQueryManga[i].entries[j].media.synonyms,
                season: myQueryManga[i].entries[j].media.season,
                seasonYear: myQueryManga[i].entries[j].media.seasonYear,
                episodes: myQueryManga[i].entries[j].media.episodes,
                chapters: myQueryManga[i].entries[j].media.chapters,
                volumes: myQueryManga[i].entries[j].media.volumes,
                type: myQueryManga[i].entries[j].media.type,
                format: myQueryManga[i].entries[j].media.format,
                image: myQueryManga[i].entries[j].media.coverImage.large,
                imageMedium: myQueryManga[i].entries[j].media.coverImage.medium,
                imageExtraLarge:
                  myQueryManga[i].entries[j].media.coverImage.extraLarge,
                bannerImage: myQueryManga[i].entries[j].media.bannerImage,
                startYear: myQueryManga[i].entries[j].media.startDate.year,
                startMonth: myQueryManga[i].entries[j].media.startDate.month,
                startDay: myQueryManga[i].entries[j].media.startDate.day,
                description: myQueryManga[i].entries[j].media.description,
                genres: myQueryManga[i].entries[j].media.genres,
                tags: myQueryManga[i].entries[j].media.tags,
                status: myQueryManga[i].entries[j].media.status,
                siteUrl: myQueryManga[i].entries[j].media.siteUrl,
                duration: myQueryManga[i].entries[j].media.duration,
                averageScore: myQueryManga[i].entries[j].media.averageScore,
                popularity: myQueryManga[i].entries[j].media.popularity,
                studios: myQueryManga[i].entries[j].media.studios.edges,
                mainStudioIndex: myQueryManga[i].entries[j].media.studios.edges
                  .map((e: any) => {
                    return e.isMain;
                  })
                  .indexOf(true),
                source: myQueryManga[i].entries[j].media.source,
                meanScore: myQueryManga[i].entries[j].media.meanScore,
                mediaListEntry: myQueryManga[i].entries[j].media.mediaListEntry,
                progress:
                  myQueryManga[i].entries[j].media.mediaListEntry.progress,
                progressVolumes:
                  myQueryManga[i].entries[j].media.mediaListEntry
                    .progressVolumes,
                score: myQueryManga[i].entries[j].media.mediaListEntry.score,
                notes: myQueryManga[i].entries[j].media.mediaListEntry.notes,
                startedAt:
                  myQueryManga[i].entries[j].media.mediaListEntry.startedAt,
                completedAt:
                  myQueryManga[i].entries[j].media.mediaListEntry.completedAt,
                repeat: myQueryManga[i].entries[j].media.mediaListEntry.repeat,
                trailer: myQueryManga[i].entries[j].media.trailer,
                nextAiringEpisode:
                  myQueryManga[i].entries[j].media.nextAiringEpisode,
                location: 'mangaReading',
                key:
                  myQueryManga[i].entries[j].media.title.romaji +
                  myQueryManga[i].entries[j].media.id,
              });
            }
            if (i === mangaQueryCompletedIndex) {
              myObject.manga.mangaCompleted =
                myObject.manga.mangaCompleted.concat({
                  id: myQueryManga[i].entries[j].media.id,
                  idMal: myQueryManga[i].entries[j].media.idMal,
                  private: myQueryManga[i].entries[j].private,
                  titleRomaji: myQueryManga[i].entries[j].media.title.romaji,
                  titleEnglish: myQueryManga[i].entries[j].media.title.english,
                  titleNative: myQueryManga[i].entries[j].media.title.native,
                  synonyms: myQueryManga[i].entries[j].media.synonyms,
                  season: myQueryManga[i].entries[j].media.season,
                  seasonYear: myQueryManga[i].entries[j].media.seasonYear,
                  episodes: myQueryManga[i].entries[j].media.episodes,
                  chapters: myQueryManga[i].entries[j].media.chapters,
                  volumes: myQueryManga[i].entries[j].media.volumes,
                  type: myQueryManga[i].entries[j].media.type,
                  format: myQueryManga[i].entries[j].media.format,
                  image: myQueryManga[i].entries[j].media.coverImage.large,
                  imageMedium:
                    myQueryManga[i].entries[j].media.coverImage.medium,
                  imageExtraLarge:
                    myQueryManga[i].entries[j].media.coverImage.extraLarge,
                  bannerImage: myQueryManga[i].entries[j].media.bannerImage,
                  startYear: myQueryManga[i].entries[j].media.startDate.year,
                  startMonth: myQueryManga[i].entries[j].media.startDate.month,
                  startDay: myQueryManga[i].entries[j].media.startDate.day,
                  description: myQueryManga[i].entries[j].media.description,
                  genres: myQueryManga[i].entries[j].media.genres,
                  tags: myQueryManga[i].entries[j].media.tags,
                  status: myQueryManga[i].entries[j].media.status,
                  siteUrl: myQueryManga[i].entries[j].media.siteUrl,
                  duration: myQueryManga[i].entries[j].media.duration,
                  averageScore: myQueryManga[i].entries[j].media.averageScore,
                  popularity: myQueryManga[i].entries[j].media.popularity,
                  studios: myQueryManga[i].entries[j].media.studios.edges,
                  mainStudioIndex: myQueryManga[i].entries[
                    j
                  ].media.studios.edges
                    .map((e: any) => {
                      return e.isMain;
                    })
                    .indexOf(true),
                  source: myQueryManga[i].entries[j].media.source,
                  meanScore: myQueryManga[i].entries[j].media.meanScore,
                  mediaListEntry:
                    myQueryManga[i].entries[j].media.mediaListEntry,
                  progress:
                    myQueryManga[i].entries[j].media.mediaListEntry.progress,
                  progressVolumes:
                    myQueryManga[i].entries[j].media.mediaListEntry
                      .progressVolumes,
                  score: myQueryManga[i].entries[j].media.mediaListEntry.score,
                  notes: myQueryManga[i].entries[j].media.mediaListEntry.notes,
                  startedAt:
                    myQueryManga[i].entries[j].media.mediaListEntry.startedAt,
                  completedAt:
                    myQueryManga[i].entries[j].media.mediaListEntry.completedAt,
                  repeat:
                    myQueryManga[i].entries[j].media.mediaListEntry.repeat,
                  trailer: myQueryManga[i].entries[j].media.trailer,
                  nextAiringEpisode:
                    myQueryManga[i].entries[j].media.nextAiringEpisode,
                  location: 'mangaCompleted',
                  key:
                    myQueryManga[i].entries[j].media.title.romaji +
                    myQueryManga[i].entries[j].media.id,
                });
            }
            if (i === mangaQueryOnHoldIndex) {
              myObject.manga.mangaOnHold = myObject.manga.mangaOnHold.concat({
                id: myQueryManga[i].entries[j].media.id,
                idMal: myQueryManga[i].entries[j].media.idMal,
                private: myQueryManga[i].entries[j].private,
                titleRomaji: myQueryManga[i].entries[j].media.title.romaji,
                titleEnglish: myQueryManga[i].entries[j].media.title.english,
                titleNative: myQueryManga[i].entries[j].media.title.native,
                synonyms: myQueryManga[i].entries[j].media.synonyms,
                season: myQueryManga[i].entries[j].media.season,
                seasonYear: myQueryManga[i].entries[j].media.seasonYear,
                episodes: myQueryManga[i].entries[j].media.episodes,
                chapters: myQueryManga[i].entries[j].media.chapters,
                volumes: myQueryManga[i].entries[j].media.volumes,
                type: myQueryManga[i].entries[j].media.type,
                format: myQueryManga[i].entries[j].media.format,
                image: myQueryManga[i].entries[j].media.coverImage.large,
                imageMedium: myQueryManga[i].entries[j].media.coverImage.medium,
                imageExtraLarge:
                  myQueryManga[i].entries[j].media.coverImage.extraLarge,
                bannerImage: myQueryManga[i].entries[j].media.bannerImage,
                startYear: myQueryManga[i].entries[j].media.startDate.year,
                startMonth: myQueryManga[i].entries[j].media.startDate.month,
                startDay: myQueryManga[i].entries[j].media.startDate.day,
                description: myQueryManga[i].entries[j].media.description,
                genres: myQueryManga[i].entries[j].media.genres,
                tags: myQueryManga[i].entries[j].media.tags,
                status: myQueryManga[i].entries[j].media.status,
                siteUrl: myQueryManga[i].entries[j].media.siteUrl,
                duration: myQueryManga[i].entries[j].media.duration,
                averageScore: myQueryManga[i].entries[j].media.averageScore,
                popularity: myQueryManga[i].entries[j].media.popularity,
                studios: myQueryManga[i].entries[j].media.studios.edges,
                mainStudioIndex: myQueryManga[i].entries[j].media.studios.edges
                  .map((e: any) => {
                    return e.isMain;
                  })
                  .indexOf(true),
                source: myQueryManga[i].entries[j].media.source,
                meanScore: myQueryManga[i].entries[j].media.meanScore,
                mediaListEntry: myQueryManga[i].entries[j].media.mediaListEntry,
                progress:
                  myQueryManga[i].entries[j].media.mediaListEntry.progress,
                progressVolumes:
                  myQueryManga[i].entries[j].media.mediaListEntry
                    .progressVolumes,
                score: myQueryManga[i].entries[j].media.mediaListEntry.score,
                notes: myQueryManga[i].entries[j].media.mediaListEntry.notes,
                startedAt:
                  myQueryManga[i].entries[j].media.mediaListEntry.startedAt,
                completedAt:
                  myQueryManga[i].entries[j].media.mediaListEntry.completedAt,
                repeat: myQueryManga[i].entries[j].media.mediaListEntry.repeat,
                trailer: myQueryManga[i].entries[j].media.trailer,
                nextAiringEpisode:
                  myQueryManga[i].entries[j].media.nextAiringEpisode,
                location: 'mangaOnHold',
                key:
                  myQueryManga[i].entries[j].media.title.romaji +
                  myQueryManga[i].entries[j].media.id,
              });
            }
            if (i === mangaQueryDroppedIndex) {
              myObject.manga.mangaDropped = myObject.manga.mangaDropped.concat({
                id: myQueryManga[i].entries[j].media.id,
                idMal: myQueryManga[i].entries[j].media.idMal,
                private: myQueryManga[i].entries[j].private,
                titleRomaji: myQueryManga[i].entries[j].media.title.romaji,
                titleEnglish: myQueryManga[i].entries[j].media.title.english,
                titleNative: myQueryManga[i].entries[j].media.title.native,
                synonyms: myQueryManga[i].entries[j].media.synonyms,
                season: myQueryManga[i].entries[j].media.season,
                seasonYear: myQueryManga[i].entries[j].media.seasonYear,
                episodes: myQueryManga[i].entries[j].media.episodes,
                chapters: myQueryManga[i].entries[j].media.chapters,
                volumes: myQueryManga[i].entries[j].media.volumes,
                type: myQueryManga[i].entries[j].media.type,
                format: myQueryManga[i].entries[j].media.format,
                image: myQueryManga[i].entries[j].media.coverImage.large,
                imageMedium: myQueryManga[i].entries[j].media.coverImage.medium,
                imageExtraLarge:
                  myQueryManga[i].entries[j].media.coverImage.extraLarge,
                bannerImage: myQueryManga[i].entries[j].media.bannerImage,
                startYear: myQueryManga[i].entries[j].media.startDate.year,
                startMonth: myQueryManga[i].entries[j].media.startDate.month,
                startDay: myQueryManga[i].entries[j].media.startDate.day,
                description: myQueryManga[i].entries[j].media.description,
                genres: myQueryManga[i].entries[j].media.genres,
                tags: myQueryManga[i].entries[j].media.tags,
                status: myQueryManga[i].entries[j].media.status,
                siteUrl: myQueryManga[i].entries[j].media.siteUrl,
                duration: myQueryManga[i].entries[j].media.duration,
                averageScore: myQueryManga[i].entries[j].media.averageScore,
                popularity: myQueryManga[i].entries[j].media.popularity,
                studios: myQueryManga[i].entries[j].media.studios.edges,
                mainStudioIndex: myQueryManga[i].entries[j].media.studios.edges
                  .map((e: any) => {
                    return e.isMain;
                  })
                  .indexOf(true),
                source: myQueryManga[i].entries[j].media.source,
                meanScore: myQueryManga[i].entries[j].media.meanScore,
                mediaListEntry: myQueryManga[i].entries[j].media.mediaListEntry,
                progress:
                  myQueryManga[i].entries[j].media.mediaListEntry.progress,
                progressVolumes:
                  myQueryManga[i].entries[j].media.mediaListEntry
                    .progressVolumes,
                score: myQueryManga[i].entries[j].media.mediaListEntry.score,
                notes: myQueryManga[i].entries[j].media.mediaListEntry.notes,
                startedAt:
                  myQueryManga[i].entries[j].media.mediaListEntry.startedAt,
                completedAt:
                  myQueryManga[i].entries[j].media.mediaListEntry.completedAt,
                repeat: myQueryManga[i].entries[j].media.mediaListEntry.repeat,
                trailer: myQueryManga[i].entries[j].media.trailer,
                nextAiringEpisode:
                  myQueryManga[i].entries[j].media.nextAiringEpisode,
                location: 'mangaDropped',
                key:
                  myQueryManga[i].entries[j].media.title.romaji +
                  myQueryManga[i].entries[j].media.id,
              });
            }
            if (i === mangaQueryPlanToReadIndex) {
              myObject.manga.mangaPlanToRead =
                myObject.manga.mangaPlanToRead.concat({
                  id: myQueryManga[i].entries[j].media.id,
                  idMal: myQueryManga[i].entries[j].media.idMal,
                  private: myQueryManga[i].entries[j].private,
                  titleRomaji: myQueryManga[i].entries[j].media.title.romaji,
                  titleEnglish: myQueryManga[i].entries[j].media.title.english,
                  titleNative: myQueryManga[i].entries[j].media.title.native,
                  synonyms: myQueryManga[i].entries[j].media.synonyms,
                  season: myQueryManga[i].entries[j].media.season,
                  seasonYear: myQueryManga[i].entries[j].media.seasonYear,
                  episodes: myQueryManga[i].entries[j].media.episodes,
                  chapters: myQueryManga[i].entries[j].media.chapters,
                  volumes: myQueryManga[i].entries[j].media.volumes,
                  type: myQueryManga[i].entries[j].media.type,
                  format: myQueryManga[i].entries[j].media.format,
                  image: myQueryManga[i].entries[j].media.coverImage.large,
                  imageMedium:
                    myQueryManga[i].entries[j].media.coverImage.medium,
                  imageExtraLarge:
                    myQueryManga[i].entries[j].media.coverImage.extraLarge,
                  bannerImage: myQueryManga[i].entries[j].media.bannerImage,
                  startYear: myQueryManga[i].entries[j].media.startDate.year,
                  startMonth: myQueryManga[i].entries[j].media.startDate.month,
                  startDay: myQueryManga[i].entries[j].media.startDate.day,
                  description: myQueryManga[i].entries[j].media.description,
                  genres: myQueryManga[i].entries[j].media.genres,
                  tags: myQueryManga[i].entries[j].media.tags,
                  status: myQueryManga[i].entries[j].media.status,
                  siteUrl: myQueryManga[i].entries[j].media.siteUrl,
                  duration: myQueryManga[i].entries[j].media.duration,
                  averageScore: myQueryManga[i].entries[j].media.averageScore,
                  popularity: myQueryManga[i].entries[j].media.popularity,
                  studios: myQueryManga[i].entries[j].media.studios.edges,
                  mainStudioIndex: myQueryManga[i].entries[
                    j
                  ].media.studios.edges
                    .map((e: any) => {
                      return e.isMain;
                    })
                    .indexOf(true),
                  source: myQueryManga[i].entries[j].media.source,
                  meanScore: myQueryManga[i].entries[j].media.meanScore,
                  mediaListEntry:
                    myQueryManga[i].entries[j].media.mediaListEntry,
                  progress:
                    myQueryManga[i].entries[j].media.mediaListEntry.progress,
                  progressVolumes:
                    myQueryManga[i].entries[j].media.mediaListEntry
                      .progressVolumes,
                  score: myQueryManga[i].entries[j].media.mediaListEntry.score,
                  notes: myQueryManga[i].entries[j].media.mediaListEntry.notes,
                  startedAt:
                    myQueryManga[i].entries[j].media.mediaListEntry.startedAt,
                  completedAt:
                    myQueryManga[i].entries[j].media.mediaListEntry.completedAt,
                  repeat:
                    myQueryManga[i].entries[j].media.mediaListEntry.repeat,
                  trailer: myQueryManga[i].entries[j].media.trailer,
                  nextAiringEpisode:
                    myQueryManga[i].entries[j].media.nextAiringEpisode,
                  location: 'mangaPlanToRead',
                  key:
                    myQueryManga[i].entries[j].media.title.romaji +
                    myQueryManga[i].entries[j].media.id,
                });
            }
          }
        }
      }
      myObject.anime.animeAll = myObject.anime.animeWatching
        .concat(myObject.anime.animeCompleted)
        .concat(myObject.anime.animeOnHold)
        .concat(myObject.anime.animeDropped)
        .concat(myObject.anime.animePlanToWatch);
      myObject.manga.mangaAll = myObject.manga.mangaReading
        .concat(myObject.manga.mangaCompleted)
        .concat(myObject.manga.mangaOnHold)
        .concat(myObject.manga.mangaDropped)
        .concat(myObject.manga.mangaPlanToRead);
      myObject.lightNovels.lightNovelsAll =
        myObject.lightNovels.lightNovelsReading
          .concat(myObject.lightNovels.lightNovelsCompleted)
          .concat(myObject.lightNovels.lightNovelsOnHold)
          .concat(myObject.lightNovels.lightNovelsDropped)
          .concat(myObject.lightNovels.lightNovelsPlanToRead);
      console.log(myObject);
      return myObject;
    },
    /*
    initialData: {
      anime: {
        animeWatching: [],
        animeCompleted: [],
        animeOnHold: [],
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
      lightNovels: {
        lightNovelsReading: [],
        lightNovelsCompleted: [],
        lightNovelsOnHold: [],
        lightNovelsDropped: [],
        lightNovelsPlanToRead: [],
        lightNovelsAll: [],
      },
    },
    */
  });

export const convertForList = () => {
  console.log('convert');
};

export const useGetMainMediaList = () => {
  const queryClient = useQueryClient();

  return queryClient.getQueryData(['mainMediaList']);
};

export function mainTest() {
  console.log('test');
}
