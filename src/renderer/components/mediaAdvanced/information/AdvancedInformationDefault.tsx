import { useEffect, useState } from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import { Box, Typography } from '@mui/material';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';
import {
  formatReleaseDate,
  formatSeason,
  formatSource,
  formatStartYear,
  formatStatus,
  formatType,
} from 'renderer/functions/edit/formatInfo';
import getStatusColor from 'renderer/functions/StatusFunction';
import { Tooltip } from '@mui/joy';

const AdvancedInformationDefault = () => {
  const myAdvancedMedia: any = useAdvancedMedia();

  const textGenresRef: any = useState(null);

  const [isOverflowedGenres, setIsOverflowGenres] = useState(false);

  useEffect(() => {
    setIsOverflowGenres(
      textGenresRef?.current?.scrollWidth > textGenresRef?.current?.clientWidth,
    );
  }, [textGenresRef, myAdvancedMedia]);

  const textStudioRef: any = useState(null);

  const [isOverflowedStudio, setIsOverflowStudio] = useState(false);

  useEffect(() => {
    setIsOverflowStudio(
      textStudioRef?.current?.scrollWidth > textStudioRef?.current?.clientWidth,
    );
  }, [textStudioRef, myAdvancedMedia]);

  const textTagsRef: any = useState(null);

  const [isOverflowedTags, setIsOverflowTags] = useState(false);

  useEffect(() => {
    setIsOverflowTags(
      textTagsRef?.current?.scrollWidth > textTagsRef?.current?.clientWidth,
    );
  }, [textTagsRef, myAdvancedMedia]);

  return (
    <Box sx={{ overflowY: 'auto', height: '100%', width: '100%' }}>
      <Typography fontSize={12} noWrap>
        <Typography
          fontSize={12}
          fontWeight="bold"
          display="inline"
          className="label-information"
        >
          Type:{' '}
        </Typography>
        <Typography
          fontSize={12}
          display="inline"
          noWrap
          className="information"
        >
          {myAdvancedMedia.advancedMedia.format !== null
            ? formatType(myAdvancedMedia.advancedMedia.format)
            : '?'}
        </Typography>
      </Typography>
      {myAdvancedMedia.advancedMedia.type === 'ANIME' ? (
        <Typography fontSize={12} noWrap>
          <Typography
            fontSize={12}
            fontWeight="bold"
            display="inline"
            className="label-information"
          >
            Episodes:{' '}
          </Typography>
          <Typography
            fontSize={12}
            display="inline"
            noWrap
            className="information"
          >
            {myAdvancedMedia.advancedMedia.episodes !== null
              ? myAdvancedMedia.advancedMedia.episodes
              : '?'}
          </Typography>
        </Typography>
      ) : null}
      {myAdvancedMedia.advancedMedia.type === 'MANGA' ? (
        <Typography fontSize={12} noWrap>
          <Typography
            fontSize={12}
            fontWeight="bold"
            display="inline"
            className="label-information"
          >
            Chapters:{' '}
          </Typography>
          <Typography
            fontSize={12}
            display="inline"
            noWrap
            className="information"
          >
            {myAdvancedMedia.advancedMedia.chapters !== null
              ? myAdvancedMedia.advancedMedia.chapters
              : '?'}
          </Typography>
        </Typography>
      ) : null}
      {myAdvancedMedia.advancedMedia.type === 'ANIME' ? (
        <Typography fontSize={12} noWrap>
          <Typography
            fontSize={12}
            fontWeight="bold"
            display="inline"
            className="label-information"
          >
            Duration:{' '}
          </Typography>
          <Typography fontSize={12} display="inline" className="information">
            {myAdvancedMedia.advancedMedia.duration !== null
              ? `${myAdvancedMedia.advancedMedia.duration} mins/ep`
              : '?'}
          </Typography>
        </Typography>
      ) : null}
      {myAdvancedMedia.advancedMedia.type === 'MANGA' ? (
        <Typography fontSize={12} noWrap>
          <Typography
            fontSize={12}
            fontWeight="bold"
            display="inline"
            className="label-information"
          >
            Volumes:{' '}
          </Typography>
          <Typography
            fontSize={12}
            display="inline"
            noWrap
            className="information"
          >
            {myAdvancedMedia.advancedMedia.volumes !== null
              ? myAdvancedMedia.advancedMedia.volumes
              : '?'}
          </Typography>
        </Typography>
      ) : null}
      <Typography fontSize={12} noWrap>
        <Typography
          fontSize={12}
          fontWeight="bold"
          display="inline"
          className="label-information"
        >
          Status:{' '}
        </Typography>
        <Typography
          fontSize={12}
          display="inline"
          noWrap
          className="information"
        >
          <CircleIcon
            fontSize="inherit"
            sx={{
              color: getStatusColor(myAdvancedMedia.advancedMedia.status),
              pt: '3px',
              mr: '3px',
            }}
          />
          {myAdvancedMedia.advancedMedia.status !== null
            ? formatStatus(myAdvancedMedia.advancedMedia.status)
            : '?'}
        </Typography>
      </Typography>
      <Typography fontSize={12} noWrap>
        <Typography
          fontSize={12}
          fontWeight="bold"
          display="inline"
          className="label-information"
        >
          Avg Score:{' '}
        </Typography>
        <Typography
          fontSize={12}
          display="inline"
          noWrap
          className="information"
        >
          {myAdvancedMedia.advancedMedia.averageScore !== null
            ? `${myAdvancedMedia.advancedMedia.averageScore}%`
            : '?'}
        </Typography>
      </Typography>
      {myAdvancedMedia.advancedMedia.type === 'ANIME' ? (
        <Typography fontSize={12} noWrap>
          <Typography
            fontSize={12}
            fontWeight="bold"
            display="inline"
            className="label-information"
          >
            Season:{' '}
          </Typography>
          <Typography fontSize={12} display="inline" className="information">
            {myAdvancedMedia.advancedMedia.season !== null &&
            myAdvancedMedia.advancedMedia.seasonYear !== null
              ? formatSeason(
                  myAdvancedMedia.advancedMedia.season,
                  myAdvancedMedia.advancedMedia.seasonYear,
                )
              : formatStartYear(myAdvancedMedia.advancedMedia.startYear)}
          </Typography>
        </Typography>
      ) : (
        <Typography fontSize={12} noWrap>
          <Typography
            fontSize={12}
            fontWeight="bold"
            display="inline"
            className="label-information"
          >
            Released:{' '}
          </Typography>
          <Typography fontSize={12} display="inline" className="information">
            {formatReleaseDate(
              myAdvancedMedia.advancedMedia.startDay,
              myAdvancedMedia.advancedMedia.startMonth,
              myAdvancedMedia.advancedMedia.startYear,
            )}
          </Typography>
        </Typography>
      )}
      {myAdvancedMedia.advancedMedia.type === 'MANGA' ? (
        <Typography fontSize={12} noWrap>
          <Typography
            fontSize={12}
            fontWeight="bold"
            display="inline"
            className="label-information"
          >
            Ended:{' '}
          </Typography>
          <Typography fontSize={12} display="inline" className="information">
            {formatReleaseDate(
              myAdvancedMedia.advancedMedia.endDay,
              myAdvancedMedia.advancedMedia.endMonth,
              myAdvancedMedia.advancedMedia.endYear,
            )}
          </Typography>
        </Typography>
      ) : null}
      <Tooltip
        variant="outlined"
        color="primary"
        title={
          myAdvancedMedia.advancedMedia.type === 'ANIME' ? (
            <>
              <Typography fontSize={12}>
                <Typography
                  fontSize={12}
                  fontWeight="bold"
                  display="inline"
                  className="label-information-tooltip"
                >
                  Studio:{' '}
                </Typography>
                <Typography
                  fontSize={12}
                  display="inline"
                  className="information-tooltip"
                >
                  {myAdvancedMedia.advancedMedia.mainStudioIndex !== -1
                    ? myAdvancedMedia.advancedMedia.studios[
                        myAdvancedMedia.advancedMedia.mainStudioIndex
                      ].node.name
                    : '?'}
                </Typography>
              </Typography>
              <Typography
                fontSize={12}
                fontWeight="bold"
                display="inline"
                className="label-information-tooltip"
              >
                Producers:{' '}
              </Typography>
              <Typography
                fontSize={12}
                display="inline"
                className="information-tooltip"
              >
                {myAdvancedMedia.advancedMedia.mainStudioIndex !== -1
                  ? myAdvancedMedia.advancedMedia.studios.map(
                      (e: any, index: any) => {
                        if (
                          index !==
                          myAdvancedMedia.advancedMedia.mainStudioIndex
                        ) {
                          if (
                            index + 1 !==
                            myAdvancedMedia.advancedMedia.studios.length
                          ) {
                            return `${e.node.name}, `;
                          }
                          return `${e.node.name}`;
                        }
                        return '';
                      },
                    )
                  : '?'}
              </Typography>
            </>
          ) : null
        }
        followCursor
        placement="bottom-end"
        disableHoverListener={
          !(
            isOverflowedStudio ||
            myAdvancedMedia.advancedMedia.studios.length > 1
          )
        } // check for if studio is overflowed or studio length is greater than 1
      >
        {myAdvancedMedia.advancedMedia.type === 'ANIME' ? (
          <Typography fontSize={12} noWrap ref={textStudioRef}>
            <Typography
              fontSize={12}
              fontWeight="bold"
              display="inline"
              className="label-information"
            >
              Studio:{' '}
            </Typography>
            <Typography
              fontSize={12}
              display="inline"
              noWrap
              className="information"
            >
              {myAdvancedMedia.advancedMedia.mainStudioIndex !== -1
                ? myAdvancedMedia.advancedMedia.studios[
                    myAdvancedMedia.advancedMedia.mainStudioIndex
                  ].node.name
                : '?'}
            </Typography>
          </Typography>
        ) : (
          <></>
        )}
      </Tooltip>
      <Typography fontSize={12} noWrap>
        <Typography
          fontSize={12}
          fontWeight="bold"
          display="inline"
          className="label-information"
        >
          Source:{' '}
        </Typography>
        <Typography
          fontSize={12}
          display="inline"
          noWrap
          className="information"
        >
          {myAdvancedMedia.advancedMedia.source !== null
            ? formatSource(myAdvancedMedia.advancedMedia.source)
            : '?'}
        </Typography>
      </Typography>
      <Tooltip
        variant="outlined"
        color="primary"
        title={
          <Typography fontSize={12}>
            <Typography
              fontSize={12}
              fontWeight="bold"
              display="inline"
              className="label-information-tooltip"
            >
              Genres:{' '}
            </Typography>
            <Typography
              fontSize={12}
              display="inline"
              className="information-tooltip"
            >
              {myAdvancedMedia.advancedMedia.genres.map(
                (e: any, index: number) => {
                  if (
                    index + 1 !==
                    myAdvancedMedia.advancedMedia.genres.length
                  ) {
                    return `${e}, `;
                  }
                  return `${e}`;
                },
              )}
            </Typography>
          </Typography>
        }
        followCursor
        placement="bottom-end"
        disableHoverListener={!isOverflowedGenres}
      >
        <Typography
          fontSize={12}
          sx={
            {
              /*
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '2',
            WebkitBoxOrient: 'vertical',
            */
            }
          }
          noWrap
          ref={textGenresRef}
        >
          <Typography
            fontSize={12}
            fontWeight="bold"
            display="inline"
            className="label-information"
          >
            Genres:{' '}
          </Typography>
          <Typography fontSize={12} display="inline" className="information">
            {myAdvancedMedia.advancedMedia.genres.map(
              (e: any, index: number) => {
                if (index + 1 !== myAdvancedMedia.advancedMedia.genres.length) {
                  return `${e}, `;
                }
                return `${e}`;
              },
            )}
          </Typography>
        </Typography>
      </Tooltip>
      <Tooltip
        variant="outlined"
        color="primary"
        title={
          <Typography fontSize={12}>
            <Typography
              fontSize={12}
              fontWeight="bold"
              display="inline"
              className="label-information-tooltip"
            >
              Tags:{' '}
            </Typography>
            <Typography
              fontSize={12}
              display="inline"
              className="information-tooltip"
            >
              {myAdvancedMedia.advancedMedia.tags.map(
                (e: any, index: number) => {
                  if (index + 1 !== myAdvancedMedia.advancedMedia.tags.length) {
                    return `${e.name}, `;
                  }
                  return `${e.name}`;
                },
              )}
            </Typography>
          </Typography>
        }
        followCursor
        placement="bottom-end"
        disableHoverListener={!isOverflowedTags}
      >
        <Typography fontSize={12} noWrap ref={textTagsRef}>
          <Typography
            fontSize={12}
            fontWeight="bold"
            display="inline"
            className="label-information"
          >
            Tags:{' '}
          </Typography>
          <Typography fontSize={12} display="inline" className="information">
            {myAdvancedMedia.advancedMedia.tags.map((e: any, index: number) => {
              if (index + 1 !== myAdvancedMedia.advancedMedia.tags.length) {
                return `${e.name}, `;
              }
              return `${e.name}`;
            })}
          </Typography>
        </Typography>
      </Tooltip>
    </Box>
  );
};

export default AdvancedInformationDefault;
