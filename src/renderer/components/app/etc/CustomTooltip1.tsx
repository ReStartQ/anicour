import { styled } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#0b0d0e',
    color: '#86b9db', // #86b9db
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #4383ce', // #4383ce
  },
}));

export default HtmlTooltip;
