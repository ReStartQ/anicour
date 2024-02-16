import { useQuery } from '@tanstack/react-query';
import Axios from 'axios';
import { useAtom } from 'jotai';
import { notificationOpenAltSettingsAtom } from 'renderer/store';

export const useTestSettings = (
  myUserName: string,
  myToken: string,
  notifcationAltOpen: any,
  setNotificationAltOpen: any,
  notifcationOpen: any,
  setNotificationOpen: any,
) =>
  useQuery({
    queryKey: ['testSettings'],
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
                          name
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
      return [];
    },
    onSuccess: () => {
      console.log('Success');
      setNotificationOpen(true);
    },
    onError: () => {
      console.log('Failed');
      setNotificationAltOpen(true);
    },
    enabled: false,
  });

export const testSettings = () => {};
