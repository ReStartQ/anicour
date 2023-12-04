import { IconButtonProps } from '@mui/material/IconButton';

interface MediaProps {
  titleRomaji: string;
  image: string;
  key: number;
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

export default function MediaCardCompact({ props }: any) {
  return <>dog</>;
}
