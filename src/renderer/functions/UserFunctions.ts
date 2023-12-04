import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Axios from 'axios';

export const getUser = async (user: any) => {
  const url = 'https://graphql.anilist.co';
  const headers = {
    headers: {
      Authorization: `Bearer ${user.myToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
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
      variables: {
        name: user.username,
      },
    },
    headers,
  ).then((res) => res.data.data);

  return [user, myQuery];
};

// not working for some reason
export const changeUserAdult = async (user: any) => {
  const url = 'https://graphql.anilist.co';
  const headers = {
    headers: {
      Authorization: `Bearer ${user.myToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  const myQuery = await Axios.post(
    url,
    {
      query: `
        mutation ($name: String, $displayAdultContent: Boolean) {
          UpdateUser (name: $name, displayAdultContent: $displayAdultContent) {
              displayAdultContent
          }
        }
      `,
      variables: {
        name: user.username,
        displayAdultContent: user.adult,
      },
    },
    headers,
  ).then((res) => res.data.data);

  return [user, myQuery];
};

export const otherUser = () => {
  console.log('test');
};
