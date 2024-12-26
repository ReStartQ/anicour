import { CardContent, styled } from '@mui/material';

const CardContentPaddingAdjusted = styled(CardContent)(`
  &:last-child {
    padding-bottom: 10px;
  }
`);

export default CardContentPaddingAdjusted;
