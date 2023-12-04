import { Query, useQueryClient } from '@tanstack/react-query';
import {
  validateMainMediaList,
  validateSearchList,
  validateSeasonsList,
} from '../validation/ValidationFunctions';
import {
  addToMainMediaList,
  deleteFromMainMediaList,
  updateMainMediaList,
} from './mainMediaList';
import { updateDeleteOnSeasonsList, updateSeasonsList } from './seasonsList';
import { updateDeleteOnSearchList, updateSearchList } from './searchList';

export const updateQueryClientListsForUpdateList = (
  type: number,
  data: any,
  queryClient: any,
) => {
  // update main media list (check if on main media list)
  console.log(queryClient.getQueryData(['mainMediaList']));
  console.log(data[0].advancedMedia);
  const validationMain = validateMainMediaList(
    queryClient.getQueryData(['mainMediaList']),
    data[0],
  );
  const validationSeasons = validateSeasonsList(
    queryClient.getQueryData(['seasons']),
    data[0],
  );
  const validationSearch = validateSearchList(
    queryClient.getQueryData(['search']),
    data[0],
  );
  console.log(data[1]);
  console.log(validationMain);
  // if doesnt exist, then add to watching/reading
  if (validationMain[2] === false) {
    if (data[0].advancedMedia.type === 'ANIME') {
      console.log('anime');
      // add to beginning of where index value is
      addToMainMediaList(queryClient, 'anime', data[0], data[1]);
      // update seasons (check if on seasons)
      updateSeasonsList(
        queryClient,
        data[0].advancedMedia.format,
        data[0],
        data[1],
        validationSeasons,
      );
      // update search (check if on search)
      // update search (check if on search) ['search']
      updateSearchList(
        queryClient,
        data[0].advancedMedia.type,
        data[0],
        data[1],
        validationSearch,
      );
    }
    if (data[0].advancedMedia.type === 'MANGA') {
      if (data[0].advancedMedia.format === 'NOVEL') {
        console.log('lightNovels');
        addToMainMediaList(queryClient, 'lightNovels', data[0], data[1]);
        // update seasons (check if on seasons)
        updateSeasonsList(
          queryClient,
          data[0].advancedMedia.format,
          data[0],
          data[1],
          validationSeasons,
        );
        // update search (check if on search)
        // update search (check if on search) ['search']
        updateSearchList(
          queryClient,
          data[0].advancedMedia.type,
          data[0],
          data[1],
          validationSearch,
        );
      } else {
        console.log('manga');
        addToMainMediaList(queryClient, 'manga', data[0], data[1]);
        // update seasons (check if on seasons) ['seasons']
        // validate the two indeces and pass them as data points
        // update seasons (check if on seasons)
        updateSeasonsList(
          queryClient,
          data[0].advancedMedia.format,
          data[0],
          data[1],
          validationSeasons,
        );
        // update search (check if on search) ['search']
        updateSearchList(
          queryClient,
          data[0].advancedMedia.type,
          data[0],
          data[1],
          validationSearch,
        );
        // validate the two indeces and pass them as data points
      }
    } else {
      if (validationSearch[2] !== false) {
        updateSearchList(
          queryClient,
          data[0].advancedMedia.type,
          data[0],
          data[1],
          validationSearch,
        );
      }
      if (validationSeasons[2] !== false) {
        updateSeasonsList(
          queryClient,
          data[0].advancedMedia.format,
          data[0],
          data[1],
          validationSeasons,
        );
      }
    }
  } else {
    // if already exists, then update it from here
    if (data[0].advancedMedia.type === 'ANIME') {
      console.log('anime');
      // add to beginning of where index value is
      updateMainMediaList(queryClient, 'anime', data[0], data[1]);
      // update seasons (check if on seasons)
      updateSeasonsList(
        queryClient,
        data[0].advancedMedia.format,
        data[0],
        data[1],
        validationSeasons,
      );
      // update search (check if on search)
      // update search (check if on search) ['search']
      updateSearchList(
        queryClient,
        data[0].advancedMedia.type,
        data[0],
        data[1],
        validationSearch,
      );
    }
    if (data[0].advancedMedia.type === 'MANGA') {
      if (data[0].advancedMedia.format === 'NOVEL') {
        console.log('lightNovels');
        // update seasons (check if on seasons)
        updateMainMediaList(queryClient, 'lightNovels', data[0], data[1]);
        updateSeasonsList(
          queryClient,
          data[0].advancedMedia.format,
          data[0],
          data[1],
          validationSeasons,
        );
        // update search (check if on search)
        // update search (check if on search) ['search']
        updateSearchList(
          queryClient,
          data[0].advancedMedia.type,
          data[0],
          data[1],
          validationSearch,
        );
      } else {
        console.log('manga');
        updateMainMediaList(queryClient, 'manga', data[0], data[1]);
        // update seasons (check if on seasons) ['seasons']
        // validate the two indeces and pass them as data points
        // update seasons (check if on seasons)
        updateSeasonsList(
          queryClient,
          data[0].advancedMedia.format,
          data[0],
          data[1],
          validationSeasons,
        );
        // update search (check if on search) ['search']
        updateSearchList(
          queryClient,
          data[0].advancedMedia.type,
          data[0],
          data[1],
          validationSearch,
        );
        // validate the two indeces and pass them as data points
      }
    } else {
      if (validationSearch[2] !== false) {
        updateSearchList(
          queryClient,
          data[0].advancedMedia.type,
          data[0],
          data[1],
          validationSearch,
        );
      }
      if (validationSeasons[2] !== false) {
        updateSeasonsList(
          queryClient,
          data[0].advancedMedia.format,
          data[0],
          data[1],
          validationSeasons,
        );
      }
    }
  }
};

export const updateQueryClientListsForAddToList = (
  type: number,
  data: any,
  queryClient: any,
) => {
  console.log('add to list');
  // update main media list (check if on main media list)
  console.log(queryClient.getQueryData(['mainMediaList']));
  console.log(data[0].advancedMedia);
  const validationMain = validateMainMediaList(
    queryClient.getQueryData(['mainMediaList']),
    data[0],
  );
  const validationSeasons = validateSeasonsList(
    queryClient.getQueryData(['seasons']),
    data[0],
  );
  const validationSearch = validateSearchList(
    queryClient.getQueryData(['search']),
    data[0],
  );
  console.log(data[1]);
  console.log(validationMain);
  // if doesnt exist, then add to watching/reading
  if (validationMain[2] === false) {
    if (data[0].advancedMedia.type === 'ANIME') {
      console.log('anime');
      addToMainMediaList(queryClient, 'anime', data[0], data[1]);
      // update seasons (check if on seasons)
      updateSeasonsList(
        queryClient,
        data[0].advancedMedia.format,
        data[0],
        data[1],
        validationSeasons,
      );
      // update search (check if on search)
      // update search (check if on search) ['search']
      updateSearchList(
        queryClient,
        data[0].advancedMedia.type,
        data[0],
        data[1],
        validationSearch,
      );
    }
    if (data[0].advancedMedia.type === 'MANGA') {
      if (data[0].advancedMedia.format === 'NOVEL') {
        console.log('lightNovels');
        addToMainMediaList(queryClient, 'lightNovels', data[0], data[1]);
        // update seasons (check if on seasons)
        updateSeasonsList(
          queryClient,
          data[0].advancedMedia.format,
          data[0],
          data[1],
          validationSeasons,
        );
        // update search (check if on search)
        // update search (check if on search) ['search']
        updateSearchList(
          queryClient,
          data[0].advancedMedia.type,
          data[0],
          data[1],
          validationSearch,
        );
      } else {
        console.log('manga');
        addToMainMediaList(queryClient, 'manga', data[0], data[1]);
        // update seasons (check if on seasons) ['seasons']
        // validate the two indeces and pass them as data points
        // update seasons (check if on seasons)
        updateSeasonsList(
          queryClient,
          data[0].advancedMedia.format,
          data[0],
          data[1],
          validationSeasons,
        );
        // update search (check if on search) ['search']
        updateSearchList(
          queryClient,
          data[0].advancedMedia.type,
          data[0],
          data[1],
          validationSearch,
        );
        // validate the two indeces and pass them as data points
      }
    } else {
      if (validationSearch[2] !== false) {
        updateSearchList(
          queryClient,
          data[0].advancedMedia.type,
          data[0],
          data[1],
          validationSearch,
        );
      }
      if (validationSeasons[2] !== false) {
        updateSeasonsList(
          queryClient,
          data[0].advancedMedia.format,
          data[0],
          data[1],
          validationSeasons,
        );
      }
    }
  } else {
    // if already exists, then dont do anything
  }
};

export const updateQueryClientListsForDeleteFromList = (
  type: number,
  data: any,
  queryClient: any,
) => {
  console.log('delete from list');
  // if on main media list, delete from main media list
  // set mediaListEntry to null, for matching media id on search and seasons list [all index, specific index]
  const validationMain = validateMainMediaList(
    queryClient.getQueryData(['mainMediaList']),
    data[0],
  );
  const validationSearch = validateSearchList(
    queryClient.getQueryData(['search']),
    data[0],
  );
  const validationSeasons = validateSeasonsList(
    queryClient.getQueryData(['seasons']),
    data[0],
  );
  console.log(validationMain);
  console.log(validationSearch);
  console.log(validationSeasons);
  console.log(data);
  if (validationMain[2] !== false) {
    console.log('deleting on main');
  }
  if (validationSearch[2] !== false) {
    console.log('removing mediaListEntry on search');
  }
  if (validationSeasons[2] !== false) {
    console.log('removing mediaListEntry on seasons');
  }
  // if on main, then delete
  if (validationMain[2] !== false) {
    if (data[0].advancedMedia.type === 'ANIME') {
      console.log('anime');
      deleteFromMainMediaList(
        queryClient,
        'anime',
        data[0],
        data[1],
        validationMain,
      );
      // update seasons (check if on seasons)
      updateDeleteOnSeasonsList(
        queryClient,
        data[0].advancedMedia.format,
        data[0],
        data[1],
        validationSeasons,
      );
      // update search (check if on search)
      // update search (check if on search) ['search']

      updateDeleteOnSearchList(
        queryClient,
        data[0].advancedMedia.type,
        data[0],
        data[1],
        validationSearch,
      );
    }
    if (data[0].advancedMedia.type === 'MANGA') {
      // if manga
      if (data[0].advancedMedia.format === 'NOVEL') {
        console.log('lightNovels');
        deleteFromMainMediaList(
          queryClient,
          'lightNovels',
          data[0],
          data[1],
          validationMain,
        );
        // update seasons (check if on seasons)
        updateDeleteOnSeasonsList(
          queryClient,
          data[0].advancedMedia.format,
          data[0],
          data[1],
          validationSeasons,
        );
        // update search (check if on search)
        // update search (check if on search) ['search']

        updateDeleteOnSearchList(
          queryClient,
          data[0].advancedMedia.type,
          data[0],
          data[1],
          validationSearch,
        );
      } else {
        console.log('manga');
        deleteFromMainMediaList(
          queryClient,
          'manga',
          data[0],
          data[1],
          validationMain,
        );
        // update seasons (check if on seasons) ['seasons']
        // validate the two indeces and pass them as data points
        // update seasons (check if on seasons)
        updateDeleteOnSeasonsList(
          queryClient,
          data[0].advancedMedia.format,
          data[0],
          data[1],
          validationSeasons,
        );
        // update search (check if on search) ['search']

        updateDeleteOnSearchList(
          queryClient,
          data[0].advancedMedia.type,
          data[0],
          data[1],
          validationSearch,
        );
        // validate the two indeces and pass them as data points
      }
    } else {
      if (validationSearch[2] !== false) {
        updateDeleteOnSearchList(
          queryClient,
          data[0].advancedMedia.type,
          data[0],
          data[1],
          validationSearch,
        );
      }
      if (validationSeasons[2] !== false) {
        updateDeleteOnSeasonsList(
          queryClient,
          data[0].advancedMedia.format,
          data[0],
          data[1],
          validationSeasons,
        );
      }
    }
  } else {
    // if already exists, then dont do anything
    if (validationSearch[2] !== false) {
      updateDeleteOnSearchList(
        queryClient,
        data[0].advancedMedia.type,
        data[0],
        data[1],
        validationSearch,
      );
    }
    if (validationSeasons[2] !== false) {
      updateDeleteOnSeasonsList(
        queryClient,
        data[0].advancedMedia.format,
        data[0],
        data[1],
        validationSeasons,
      );
    }
  }
};

export const updateQueryClientLists = (
  type: number,
  data: any,
  queryClient: any,
) => {
  if (type === 0) {
    console.log('update an entry');
    console.log(type);
    console.log(data);
    // fixing add update case
    if (data[0].advancedMedia.mediaListEntry !== null) {
      console.log('1st');
      // if status has not changed
      if (
        data[0].advancedMedia.mediaListEntry.status ===
        data[1].SaveMediaListEntry.status
      ) {
        updateQueryClientListsForUpdateList(type, data, queryClient);
      } else {
        // method of deleting and then adding to list
        updateQueryClientListsForDeleteFromList(type, data, queryClient);
        updateQueryClientListsForAddToList(type, data, queryClient);
      }
    } else {
      // method of deleting and then adding to list
      console.log('2nd');
      updateQueryClientListsForDeleteFromList(type, data, queryClient);
      updateQueryClientListsForAddToList(type, data, queryClient);
    }
  } else if (type === 1) {
    // for adding to list
    updateQueryClientListsForAddToList(type, data, queryClient);
  } else {
    updateQueryClientListsForDeleteFromList(type, data, queryClient);
  }
};

export const updateAddToList = (entry: any) => {
  console.log('test');
  window.electron.ipcRenderer.sendMessage('updateMainFromAdvanced', [
    entry[0],
    entry[1],
  ]);
};

export const updateDeleteFromList = (entry: any, queryClient: any) => {
  // part of mainWindow so you dont need to send message
  console.log('test');
  updateQueryClientLists(2, entry, queryClient);
};

export const updateToMediaList = (entry: any) => {
  // part of mainWindow so you dont need to send message
  console.log('test');
  window.electron.ipcRenderer.sendMessage('updateMainFromAdvanced', [
    entry[0],
    entry[1],
    'update',
  ]);
};
