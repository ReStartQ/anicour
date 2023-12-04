import { useQuery } from '@tanstack/react-query';
import Axios from 'axios';

const XMLParser = require('react-xml-parser');

export const useNewsQuery = (newsCards: any) =>
  useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const RSS_URL = 'https://myanimelist.net/rss/news.xml';
      const myVar = await Axios.get(RSS_URL).then((res) => res.data);
      const jsonWithHeader = new XMLParser().parseFromString(myVar).children[0]
        .children;
      const json = jsonWithHeader.slice(3, jsonWithHeader.length);
      const result = await json.map((entry: any, index: any) => ({
        title: entry.children[1].value,
        text: entry.children[2].value,
        image: entry.children[3].value,
        date: entry.children[4].value,
        link: entry.children[5].value,
        key: index,
      }));
      console.log(json);
      console.log(result);
      newsCards.setNews(result);

      return result;
    },
    // initialData: [],
  });

export const useNewsANNQuery = (newsCards: any) =>
  useQuery({
    queryKey: ['newsANN'],
    queryFn: async () => {
      const RSS_URL = 'https://www.animenewsnetwork.com';
      const myVar = await Axios.get(RSS_URL).then((res) => res.data);
      console.log(myVar);
      newsCards.setNewsAnn([]);

      return [];
    },
    // initialData: [],
  });
export function newsTest() {
  console.log('news test');
}
