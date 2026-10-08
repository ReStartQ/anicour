import { ContentCopy, CopyAll } from '@mui/icons-material';
import { Button } from '@mui/joy';

interface CopyButtonProps {
  type: number;
  text: String;
  height: number;
  width: number;
  show: boolean;
}

const CopyButton = ({ type, text, height, width, show }: CopyButtonProps) => {
  return (
    <Button
      size="sm"
      sx={{
        height: `${height}px`,
        minHeight: `${height}px`,
        width: `${width}px`,
        minWidth: 0,
        paddingInline: 1,
        marginLeft: 'auto',
        display: show ? 'inherit' : 'none',
      }}
      variant="outlined"
      onClick={() => {
        window.electron.ipcRenderer.sendMessage('copyToClipboard', [
          type,
          text,
        ]);
      }}
    >
      <ContentCopy fontSize="inherit" />
    </Button>
  );
};

export default CopyButton;
