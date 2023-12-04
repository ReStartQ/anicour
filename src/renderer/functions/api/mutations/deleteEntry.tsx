import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAtom } from 'jotai';
import { useTitle } from 'renderer/context/TitleContext';
import { useAdvancedInput } from 'renderer/context/advanced/AdvancedInputContext';
import { updateDeleteFromList } from 'renderer/functions/data/update/updateQueryClientLists';
import { getTitle } from 'renderer/functions/view/TitlePreferenceFunctions';
import {
  notificationAltOpenAtom,
  notificationMediaNamesAtom,
  notificationOpenAtom,
  notificationTypeAtom,
} from 'renderer/store';

export const deleteEntry = async (entry: any) => {
  console.log(entry);
  const url = 'https://graphql.anilist.co';
  const headers = {
    headers: {
      Authorization: `Bearer ${entry.myToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  const myQuery = await axios
    .post(
      url,
      {
        query: `
        mutation ($id: Int) {
          DeleteMediaListEntry (id: $id) {
            deleted
          }
        }
      `,
        variables: {
          userName: entry.myUserName,
          id: entry.mediaListEntry.id,
        },
      },
      headers,
    )
    .then((res) => res.data);

  return [entry, myQuery];
};

export const useDeleteEntryData = () => {
  const queryClient = useQueryClient();
  const myAdvancedInput: any = useAdvancedInput();
  const titlePreference: any = useTitle();
  const [notifcationType, setNotificationType] = useAtom(notificationTypeAtom);
  const [notifcationOpen, setNotificationOpen] = useAtom(notificationOpenAtom);
  const [notifcationMediaNames, setNotificationMediaNames] = useAtom(
    notificationMediaNamesAtom,
  );
  const [notifcationAltOpen, setNotificationAltOpen] = useAtom(
    notificationAltOpenAtom,
  );

  return useMutation({
    mutationFn: deleteEntry,
    onSuccess: (result) => {
      console.log(result);
      if (myAdvancedInput.advancedInput !== null) {
        console.log('in main');
      } else {
        console.log('in advanced');
      }
      /*
      // Only needed if going to make the mutation in advanced
      myAdvancedInput.dispatch({
        type: 'getMediaListEntry',
        payload: null,
      });
      */
      /*
      updateAddToList(result);
      myAdvancedInput.dispatch({
        type: 'getMediaListEntry',
        payload: result[1].SaveMediaListEntry,
      });
      */
      updateDeleteFromList(result, queryClient);
      setNotificationType(2);
      setNotificationMediaNames({
        titleRomaji: result[0].advancedMedia.titleRomaji,
        titleEnglish: result[0].advancedMedia.titleEnglish,
        titleNative: result[0].advancedMedia.titleNative,
      });
      setNotificationOpen(true);

      window.electron.ipcRenderer.sendMessage('advancedMediaListEntry', [
        getTitle(titlePreference.title, result[0].advancedMedia),
        result[0].advancedMedia,
        'delete',
        null,
      ]);
    },
    onError(error, variables, context) {
      setNotificationType(4);
      setNotificationAltOpen(true);
      console.log(error);
    },
  });
};
