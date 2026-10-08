import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useThemeSongs = (myMediaAdvanced: any) => {
  useQuery({
    queryKey: ['themeSongs'],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.tenrai.org/v1/anime/${myMediaAdvanced.advancedMedia.idMal}/themes`,
        /* `https://api.jikan.moe/v4/anime/${myMediaAdvanced.advancedMedia.idMal}/themes`,
            Replacing discontinued jikan.moe with tenrai.org solution
        */
      );
      return data.data;
    },
  });
};

export const testThemeSongs = () => {
  console.log('test');
};
