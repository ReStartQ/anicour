import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAdvancedInput } from 'renderer/context/advanced/AdvancedInputContext';
import { useAtom } from 'jotai';
import {
  notificationAltOpenAtom,
  notificationMediaNamesAtom,
  notificationOpenAtom,
  notificationTypeAtom,
} from 'renderer/store';
import { getTitle } from 'renderer/functions/view/TitlePreferenceFunctions';
import { useTitle } from 'renderer/context/TitleContext';
import createMediaListEntryData from 'renderer/functions/data/generator/createMediaListEntryData';
import { formatSaveMediaListEntryForAdvanced } from 'renderer/functions/edit/formatInfo';
import { updateAddToList } from '../../data/update/updateQueryClientLists';

export function addEntry() {
  console.log('test');
}

export const addNewEntry = async (entry: any) => {
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
        mutation ($mediaId: Int, $status: MediaListStatus) {
          SaveMediaListEntry (mediaId: $mediaId, status: $status) {
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
        }
      `,
        variables: {
          userName: entry.myUserName,
          mediaId: entry.myMediaId,
          status: entry.myStatus,
        },
      },
      headers,
    )
    .then((res) => res.data.data);

  return [entry, myQuery];
};

export const useAddNewEntryData = () => {
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
    mutationFn: addNewEntry,
    onSuccess: (result) => {
      const today = new Date();
      setNotificationType(1);
      setNotificationMediaNames({
        titleRomaji: result[0].advancedMedia.titleRomaji,
        titleEnglish: result[0].advancedMedia.titleEnglish,
        titleNative: result[0].advancedMedia.titleNative,
      });
      setNotificationOpen(true);
      updateAddToList(result);
      myAdvancedInput.dispatch({
        type: 'getMediaListEntry',
        payload: result[1].SaveMediaListEntry,
      });

      window.electron.ipcRenderer.sendMessage('advancedMediaListEntry', [
        getTitle(titlePreference.title, result[0].advancedMedia),
        result[0].advancedMedia,
        'add',
        result[1].SaveMediaListEntry !== null
          ? formatSaveMediaListEntryForAdvanced(result[1].SaveMediaListEntry)
          : createMediaListEntryData(
              result[0].advancedMedia.id,
              {
                day: result[1].SaveMediaListEntry.startedAt.day,
                month: result[1].SaveMediaListEntry.startedAt.month,
                year: result[1].SaveMediaListEntry.startedAt.year,
              },
              result[1].SaveMediaListEntry.status,
              result[0].advancedMedia.type,
            ),
      ]);
    },
    onError(error, variables, context) {
      setNotificationType(4);
      setNotificationAltOpen(true);
      console.log(error);
    },
  });
};
