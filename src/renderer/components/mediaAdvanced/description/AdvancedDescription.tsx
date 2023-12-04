import { Box, Card, CardContent, Typography } from '@mui/material';
import Parser from 'html-react-parser';
import { wrap } from 'module';
import { useTitle } from 'renderer/context/TitleContext';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';
import { getOtherTitles } from 'renderer/functions/view/TitlePreferenceFunctions';

const AdvancedDescription = () => {
  const myAdvancedMedia: any = useAdvancedMedia();
  const titlePreference: any = useTitle();

  return (
    <Card
      elevation={0}
      sx={{
        gridColumn: '2/3',
        gridRow: '2/3',
        border: '1px solid SteelBlue',
        // paddingTop: '4px',
      }}
    >
      <CardContent sx={{ height: '100%', '&:last-child': { pb: '16px' } }}>
        <Box sx={{ height: '100%', overflowY: 'auto', pr: '10px' }}>
          <Typography fontSize={12}>
            {myAdvancedMedia.advancedMedia.description !== null
              ? Parser(myAdvancedMedia.advancedMedia.description)
              : ''}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AdvancedDescription;

/*
      <Typography fontSize={12}>
        {`Synonyms: ${getOtherTitles(
          titlePreference.title,
          myAdvancedMedia.advancedMedia
        ).map((e: any, index: number) => {
          if (
            index + 1 !==
              getOtherTitles(
                titlePreference.title,
                myAdvancedMedia.advancedMedia
              ).length &&
            myAdvancedMedia.advancedMedia.synonyms.length !== 0
          ) {
            return `${e}, `;
          }
          return `${e}`;
        })}`}
        {myAdvancedMedia.advancedMedia.synonyms.map((e: any, index: number) => {
          if (index + 1 !== myAdvancedMedia.advancedMedia.synonyms.length) {
            return `${e}, `;
          }
          return `${e}`;
        })}
      </Typography>
*/
