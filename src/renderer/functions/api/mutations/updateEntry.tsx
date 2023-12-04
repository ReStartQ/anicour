import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAdvancedInput } from 'renderer/context/advanced/AdvancedInputContext';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';
import { useAtom } from 'jotai';
import {
  notificationAltOpenAtom,
  notificationMediaNamesAtom,
  notificationOpenAtom,
  notificationTypeAtom,
} from 'renderer/store';
import {
  updateAddToList,
  updateToMediaList,
} from '../../data/update/updateQueryClientLists';

export const updateEntry = async (entry: any) => {
  const url = 'https://graphql.anilist.co';
  const headers = {
    headers: {
      Authorization: `Bearer ${entry.myToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  console.log(entry);
  const myQuery = await axios
    .post(
      url,
      {
        query: `
        mutation ($mediaId: Int, $status: MediaListStatus, $progress: Int, $progressVolumes: Int, $score: Float, $notes: String, $startedAt: FuzzyDateInput, $completedAt: FuzzyDateInput, $repeat: Int, $private: Boolean) {
          SaveMediaListEntry (mediaId: $mediaId, status: $status, progress: $progress, progressVolumes: $progressVolumes, score: $score, notes: $notes, startedAt: $startedAt, completedAt: $completedAt, repeat: $repeat, private: $private) {
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
          progress: entry.advancedInput.progress, // mediaListEntry -> advancedInput
          progressVolumes:
            entry.advancedInput.progressVolumes !== null
              ? entry.advancedInput.progressVolumes
              : 0,
          score: entry.advancedInput.score,
          notes:
            entry.advancedInput.notes !== null ? entry.advancedInput.notes : '',
          startedAt: entry.advancedInput.startedAt,
          completedAt: entry.advancedInput.completedAt,
          repeat: entry.advancedInput.repeat,
          private: entry.advancedInput.private,
        },
      },
      headers,
    )
    .then((res) => res.data.data);

  return [entry, myQuery];
};

export const useUpdateEntryData = () => {
  const queryClient = useQueryClient();
  const myAdvancedInput: any = useAdvancedInput();
  const myAdvancedMedia: any = useAdvancedMedia();
  const [notifcationType, setNotificationType] = useAtom(notificationTypeAtom);
  const [notifcationOpen, setNotificationOpen] = useAtom(notificationOpenAtom);
  const [notifcationMediaNames, setNotificationMediaNames] = useAtom(
    notificationMediaNamesAtom,
  );
  const [notifcationAltOpen, setNotificationAltOpen] = useAtom(
    notificationAltOpenAtom,
  );

  return useMutation({
    mutationFn: updateEntry,
    onSuccess: (result) => {
      updateToMediaList(result);
      console.log(result);
      myAdvancedMedia.dispatch({
        type: 'updateMediaListEntry',
        payload: result[1].SaveMediaListEntry,
      });
      myAdvancedInput.dispatch({
        type: 'getMediaListEntry',
        payload: result[1].SaveMediaListEntry,
      });
      setNotificationType(0);
      setNotificationMediaNames({
        titleRomaji: result[0].advancedMedia.titleRomaji,
        titleEnglish: result[0].advancedMedia.titleEnglish,
        titleNative: result[0].advancedMedia.titleNative,
      });
      setNotificationOpen(true);
    },
    onError(error, variables, context) {
      setNotificationType(4);
      setNotificationAltOpen(true);
      console.log(error);
    },
  });
};
