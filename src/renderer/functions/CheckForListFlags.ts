export function getListForCompletedAnime(
  myQuery: any,
  animeCompletedIndex: any,
  animeSplitCompletedListFlag: Boolean,
  animeSplitArray: any,
) {
  console.log(animeCompletedIndex);
  console.log(animeSplitCompletedListFlag);
  console.log(animeSplitArray);
  if (animeCompletedIndex !== null && animeSplitCompletedListFlag === false) {
    return myQuery[animeCompletedIndex].entries.map(
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
    );
  }

  const accumulator: any = [];
  if (animeCompletedIndex !== null && animeSplitCompletedListFlag === true) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < animeSplitArray.length; i++) {
      // eslint-disable-next-line no-plusplus
      for (let j = 0; j < myQuery[animeSplitArray[i]].entries.length; j++) {
        accumulator.push({
          id: myQuery[animeSplitArray[i]].entries[j].media.id,
          idMal: myQuery[animeSplitArray[i]].entries[j].media.idMal,
          private: myQuery[animeSplitArray[i]].entries[j].private,
          titleRomaji:
            myQuery[animeSplitArray[i]].entries[j].media.title.romaji,
          titleEnglish:
            myQuery[animeSplitArray[i]].entries[j].media.title.english,
          titleNative:
            myQuery[animeSplitArray[i]].entries[j].media.title.native,
          synonyms: myQuery[animeSplitArray[i]].entries[j].media.synonyms,
          season: myQuery[animeSplitArray[i]].entries[j].media.season,
          seasonYear: myQuery[animeSplitArray[i]].entries[j].media.seasonYear,
          episodes: myQuery[animeSplitArray[i]].entries[j].media.episodes,
          chapters: myQuery[animeSplitArray[i]].entries[j].media.chapters,
          volumes: myQuery[animeSplitArray[i]].entries[j].media.volumes,
          type: myQuery[animeSplitArray[i]].entries[j].media.type,
          format: myQuery[animeSplitArray[i]].entries[j].media.format,
          image: myQuery[animeSplitArray[i]].entries[j].media.coverImage.large,
          imageMedium:
            myQuery[animeSplitArray[i]].entries[j].media.coverImage.medium,
          imageExtraLarge:
            myQuery[animeSplitArray[i]].entries[j].media.coverImage.extraLarge,
          bannerImage: myQuery[animeSplitArray[i]].entries[j].media.bannerImage,
          startYear:
            myQuery[animeSplitArray[i]].entries[j].media.startDate.year,
          startMonth:
            myQuery[animeSplitArray[i]].entries[j].media.startDate.month,
          startDay: myQuery[animeSplitArray[i]].entries[j].media.startDate.day,
          description: myQuery[animeSplitArray[i]].entries[j].media.description,
          genres: myQuery[animeSplitArray[i]].entries[j].media.genres,
          tags: myQuery[animeSplitArray[i]].entries[j].media.tags,
          status: myQuery[animeSplitArray[i]].entries[j].media.status,
          siteUrl: myQuery[animeSplitArray[i]].entries[j].media.siteUrl,
          duration: myQuery[animeSplitArray[i]].entries[j].media.duration,
          averageScore:
            myQuery[animeSplitArray[i]].entries[j].media.averageScore,
          popularity: myQuery[animeSplitArray[i]].entries[j].media.popularity,
          studios: myQuery[animeSplitArray[i]].entries[j].media.studios.edges,
          mainStudioIndex: myQuery[animeSplitArray[i]].entries[
            j
          ].media.studios.edges
            .map((e: any) => {
              return e.isMain;
            })
            .indexOf(true),
          source: myQuery[animeSplitArray[i]].entries[j].media.source,
          meanScore: myQuery[animeSplitArray[i]].entries[j].media.meanScore,
          mediaListEntry:
            myQuery[animeSplitArray[i]].entries[j].media.mediaListEntry,
          progress:
            myQuery[animeSplitArray[i]].entries[j].media.mediaListEntry
              .progress,
          progressVolumes:
            myQuery[animeSplitArray[i]].entries[j].media.mediaListEntry
              .progressVolumes,
          score:
            myQuery[animeSplitArray[i]].entries[j].media.mediaListEntry.score,
          notes:
            myQuery[animeSplitArray[i]].entries[j].media.mediaListEntry.notes,
          startedAt:
            myQuery[animeSplitArray[i]].entries[j].media.mediaListEntry
              .startedAt,
          completedAt:
            myQuery[animeSplitArray[i]].entries[j].media.mediaListEntry
              .completedAt,
          repeat:
            myQuery[animeSplitArray[i]].entries[j].media.mediaListEntry.repeat,
          trailer: myQuery[animeSplitArray[i]].entries[j].media.trailer,
          nextAiringEpisode:
            myQuery[animeSplitArray[i]].entries[j].media.nextAiringEpisode,
          location: 'animeCompleted',
          key:
            myQuery[animeSplitArray[i]].entries[j].media.title.romaji +
            myQuery[animeSplitArray[i]].entries[j].media.id,
        });
      }
    }
    return accumulator;
  }

  return [];
}

export function getListForCompletedManga(
  myQuery: any,
  mangaCompletedIndex: any,
  mangaSplitCompletedListFlag: Boolean,
  mangaSplitArray: any,
) {
  console.log(mangaCompletedIndex);
  console.log(mangaSplitCompletedListFlag);
  console.log(mangaSplitArray);
  if (mangaCompletedIndex !== null && mangaSplitCompletedListFlag === false) {
    return myQuery[mangaCompletedIndex].entries.map(
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
        location: 'mangaCompleted',
        key: entry.media.title.romaji + entry.media.id,
      }),
    );
  }

  const accumulator: any = [];
  if (mangaCompletedIndex !== null && mangaSplitCompletedListFlag === true) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < mangaSplitArray.length; i++) {
      // eslint-disable-next-line no-plusplus
      for (let j = 0; j < myQuery[mangaSplitArray[i]].entries.length; j++) {
        accumulator.push({
          id: myQuery[mangaSplitArray[i]].entries[j].media.id,
          idMal: myQuery[mangaSplitArray[i]].entries[j].media.idMal,
          private: myQuery[mangaSplitArray[i]].entries[j].private,
          titleRomaji:
            myQuery[mangaSplitArray[i]].entries[j].media.title.romaji,
          titleEnglish:
            myQuery[mangaSplitArray[i]].entries[j].media.title.english,
          titleNative:
            myQuery[mangaSplitArray[i]].entries[j].media.title.native,
          synonyms: myQuery[mangaSplitArray[i]].entries[j].media.synonyms,
          season: myQuery[mangaSplitArray[i]].entries[j].media.season,
          seasonYear: myQuery[mangaSplitArray[i]].entries[j].media.seasonYear,
          episodes: myQuery[mangaSplitArray[i]].entries[j].media.episodes,
          chapters: myQuery[mangaSplitArray[i]].entries[j].media.chapters,
          volumes: myQuery[mangaSplitArray[i]].entries[j].media.volumes,
          type: myQuery[mangaSplitArray[i]].entries[j].media.type,
          format: myQuery[mangaSplitArray[i]].entries[j].media.format,
          image: myQuery[mangaSplitArray[i]].entries[j].media.coverImage.large,
          imageMedium:
            myQuery[mangaSplitArray[i]].entries[j].media.coverImage.medium,
          imageExtraLarge:
            myQuery[mangaSplitArray[i]].entries[j].media.coverImage.extraLarge,
          bannerImage: myQuery[mangaSplitArray[i]].entries[j].media.bannerImage,
          startYear:
            myQuery[mangaSplitArray[i]].entries[j].media.startDate.year,
          startMonth:
            myQuery[mangaSplitArray[i]].entries[j].media.startDate.month,
          startDay: myQuery[mangaSplitArray[i]].entries[j].media.startDate.day,
          description: myQuery[mangaSplitArray[i]].entries[j].media.description,
          genres: myQuery[mangaSplitArray[i]].entries[j].media.genres,
          tags: myQuery[mangaSplitArray[i]].entries[j].media.tags,
          status: myQuery[mangaSplitArray[i]].entries[j].media.status,
          siteUrl: myQuery[mangaSplitArray[i]].entries[j].media.siteUrl,
          duration: myQuery[mangaSplitArray[i]].entries[j].media.duration,
          averageScore:
            myQuery[mangaSplitArray[i]].entries[j].media.averageScore,
          popularity: myQuery[mangaSplitArray[i]].entries[j].media.popularity,
          studios: myQuery[mangaSplitArray[i]].entries[j].media.studios.edges,
          mainStudioIndex: myQuery[mangaSplitArray[i]].entries[
            j
          ].media.studios.edges
            .map((e: any) => {
              return e.isMain;
            })
            .indexOf(true),
          source: myQuery[mangaSplitArray[i]].entries[j].media.source,
          meanScore: myQuery[mangaSplitArray[i]].entries[j].media.meanScore,
          mediaListEntry:
            myQuery[mangaSplitArray[i]].entries[j].media.mediaListEntry,
          progress:
            myQuery[mangaSplitArray[i]].entries[j].media.mediaListEntry
              .progress,
          progressVolumes:
            myQuery[mangaSplitArray[i]].entries[j].media.mediaListEntry
              .progressVolumes,
          score:
            myQuery[mangaSplitArray[i]].entries[j].media.mediaListEntry.score,
          notes:
            myQuery[mangaSplitArray[i]].entries[j].media.mediaListEntry.notes,
          startedAt:
            myQuery[mangaSplitArray[i]].entries[j].media.mediaListEntry
              .startedAt,
          completedAt:
            myQuery[mangaSplitArray[i]].entries[j].media.mediaListEntry
              .completedAt,
          repeat:
            myQuery[mangaSplitArray[i]].entries[j].media.mediaListEntry.repeat,
          trailer: myQuery[mangaSplitArray[i]].entries[j].media.trailer,
          nextAiringEpisode:
            myQuery[mangaSplitArray[i]].entries[j].media.nextAiringEpisode,
          location: 'mangaCompleted',
          key:
            myQuery[mangaSplitArray[i]].entries[j].media.title.romaji +
            myQuery[mangaSplitArray[i]].entries[j].media.id,
        });
      }
    }
    return accumulator;
  }

  return [];
}

export function getListForCompletedNovels(
  myQuery: any,
  mangaCompletedIndex: any,
  mangaSplitCompletedListFlag: Boolean,
  mangaSplitArray: any,
) {
  console.log(mangaCompletedIndex);
  console.log(mangaSplitCompletedListFlag);
  console.log(mangaSplitArray);
  if (mangaCompletedIndex !== null && mangaSplitCompletedListFlag === false) {
    return myQuery[mangaCompletedIndex].entries.map(
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
        location: 'mangaCompleted',
        key: entry.media.title.romaji + entry.media.id,
      }),
    );
  }

  const accumulator: any = [];
  if (mangaCompletedIndex !== null && mangaSplitCompletedListFlag === true) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < mangaSplitArray.length; i++) {
      // eslint-disable-next-line no-plusplus
      for (let j = 0; j < myQuery[mangaSplitArray[i]].entries.length; j++) {
        accumulator.push({
          id: myQuery[mangaSplitArray[i]].entries[j].media.id,
          idMal: myQuery[mangaSplitArray[i]].entries[j].media.idMal,
          private: myQuery[mangaSplitArray[i]].entries[j].private,
          titleRomaji:
            myQuery[mangaSplitArray[i]].entries[j].media.title.romaji,
          titleEnglish:
            myQuery[mangaSplitArray[i]].entries[j].media.title.english,
          titleNative:
            myQuery[mangaSplitArray[i]].entries[j].media.title.native,
          synonyms: myQuery[mangaSplitArray[i]].entries[j].media.synonyms,
          season: myQuery[mangaSplitArray[i]].entries[j].media.season,
          seasonYear: myQuery[mangaSplitArray[i]].entries[j].media.seasonYear,
          episodes: myQuery[mangaSplitArray[i]].entries[j].media.episodes,
          chapters: myQuery[mangaSplitArray[i]].entries[j].media.chapters,
          volumes: myQuery[mangaSplitArray[i]].entries[j].media.volumes,
          type: myQuery[mangaSplitArray[i]].entries[j].media.type,
          format: myQuery[mangaSplitArray[i]].entries[j].media.format,
          image: myQuery[mangaSplitArray[i]].entries[j].media.coverImage.large,
          imageMedium:
            myQuery[mangaSplitArray[i]].entries[j].media.coverImage.medium,
          imageExtraLarge:
            myQuery[mangaSplitArray[i]].entries[j].media.coverImage.extraLarge,
          bannerImage: myQuery[mangaSplitArray[i]].entries[j].media.bannerImage,
          startYear:
            myQuery[mangaSplitArray[i]].entries[j].media.startDate.year,
          startMonth:
            myQuery[mangaSplitArray[i]].entries[j].media.startDate.month,
          startDay: myQuery[mangaSplitArray[i]].entries[j].media.startDate.day,
          description: myQuery[mangaSplitArray[i]].entries[j].media.description,
          genres: myQuery[mangaSplitArray[i]].entries[j].media.genres,
          tags: myQuery[mangaSplitArray[i]].entries[j].media.tags,
          status: myQuery[mangaSplitArray[i]].entries[j].media.status,
          siteUrl: myQuery[mangaSplitArray[i]].entries[j].media.siteUrl,
          duration: myQuery[mangaSplitArray[i]].entries[j].media.duration,
          averageScore:
            myQuery[mangaSplitArray[i]].entries[j].media.averageScore,
          popularity: myQuery[mangaSplitArray[i]].entries[j].media.popularity,
          studios: myQuery[mangaSplitArray[i]].entries[j].media.studios.edges,
          mainStudioIndex: myQuery[mangaSplitArray[i]].entries[
            j
          ].media.studios.edges
            .map((e: any) => {
              return e.isMain;
            })
            .indexOf(true),
          source: myQuery[mangaSplitArray[i]].entries[j].media.source,
          meanScore: myQuery[mangaSplitArray[i]].entries[j].media.meanScore,
          mediaListEntry:
            myQuery[mangaSplitArray[i]].entries[j].media.mediaListEntry,
          progress:
            myQuery[mangaSplitArray[i]].entries[j].media.mediaListEntry
              .progress,
          progressVolumes:
            myQuery[mangaSplitArray[i]].entries[j].media.mediaListEntry
              .progressVolumes,
          score:
            myQuery[mangaSplitArray[i]].entries[j].media.mediaListEntry.score,
          notes:
            myQuery[mangaSplitArray[i]].entries[j].media.mediaListEntry.notes,
          startedAt:
            myQuery[mangaSplitArray[i]].entries[j].media.mediaListEntry
              .startedAt,
          completedAt:
            myQuery[mangaSplitArray[i]].entries[j].media.mediaListEntry
              .completedAt,
          repeat:
            myQuery[mangaSplitArray[i]].entries[j].media.mediaListEntry.repeat,
          trailer: myQuery[mangaSplitArray[i]].entries[j].media.trailer,
          nextAiringEpisode:
            myQuery[mangaSplitArray[i]].entries[j].media.nextAiringEpisode,
          location: 'mangaCompleted',
          key:
            myQuery[mangaSplitArray[i]].entries[j].media.title.romaji +
            myQuery[mangaSplitArray[i]].entries[j].media.id,
        });
      }
    }
    return accumulator;
  }

  return [];
}
