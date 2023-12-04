import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useThemeSongs = (myMediaAdvanced: any) => {
  useQuery({
    queryKey: ['themeSongs'],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.jikan.moe/v4/anime/${myMediaAdvanced.advancedMedia.idMal}/themes`,
      );
      return data.data;
    },
  });
};

export const testThemeSongs = () => {
  console.log('test');
};
