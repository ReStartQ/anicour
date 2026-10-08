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
            query {
              Viewer {
                id
                name
              }
            }
          `,
        },
        headers,
      ).then((res) => res.data.data.Viewer.name);
      console.log(myQuery);
      return [myQuery];
    },
    onSuccess: (data: any) => {
      if (data[0].trim().toLowerCase() === myUserName.trim().toLowerCase()) {
        console.log('Success');
        setNotificationOpen(true);
      } else {
        console.log('Failed, this token belongs to another username');
        setNotificationAltOpen(true);
      }
    },
    onError: () => {
      console.log('Failed');
      setNotificationAltOpen(true);
    },
    enabled: false,
  });

export const testSettings = () => {};
