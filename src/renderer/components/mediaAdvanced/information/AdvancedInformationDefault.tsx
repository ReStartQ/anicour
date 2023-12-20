import React, { useEffect, useState } from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Box,
  Button,
  CardContent,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
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
import AdvancedExtraSelect from '../extra/AdvancedExtraSelect';

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
        <Typography fontSize={12} fontWeight="bold" display="inline">
          Type:{' '}
        </Typography>
        <Typography fontSize={12} display="inline" noWrap>
          {myAdvancedMedia.advancedMedia.format !== null
            ? formatType(myAdvancedMedia.advancedMedia.format)
            : '?'}
        </Typography>
      </Typography>
      {myAdvancedMedia.advancedMedia.type === 'ANIME' ? (
        <Typography fontSize={12} noWrap>
          <Typography fontSize={12} fontWeight="bold" display="inline">
            Episodes:{' '}
          </Typography>
          <Typography fontSize={12} display="inline" noWrap>
            {myAdvancedMedia.advancedMedia.episodes !== null
              ? myAdvancedMedia.advancedMedia.episodes
              : '?'}
          </Typography>
        </Typography>
      ) : null}
      {myAdvancedMedia.advancedMedia.type === 'MANGA' ? (
        <Typography fontSize={12} noWrap>
          <Typography fontSize={12} fontWeight="bold" display="inline">
            Chapters:{' '}
          </Typography>
          <Typography fontSize={12} display="inline" noWrap>
            {myAdvancedMedia.advancedMedia.chapters !== null
              ? myAdvancedMedia.advancedMedia.chapters
              : '?'}
          </Typography>
        </Typography>
      ) : null}
      {myAdvancedMedia.advancedMedia.type === 'ANIME' ? (
        <Typography fontSize={12} noWrap>
          <Typography fontSize={12} fontWeight="bold" display="inline">
            Duration:{' '}
          </Typography>
          <Typography fontSize={12} display="inline">
            {myAdvancedMedia.advancedMedia.duration !== null
              ? `${myAdvancedMedia.advancedMedia.duration} mins / ep`
              : '?'}
          </Typography>
        </Typography>
      ) : null}
      {myAdvancedMedia.advancedMedia.type === 'MANGA' ? (
        <Typography fontSize={12} noWrap>
          <Typography fontSize={12} fontWeight="bold" display="inline">
            Volumes:{' '}
          </Typography>
          <Typography fontSize={12} display="inline" noWrap>
            {myAdvancedMedia.advancedMedia.volumes !== null
              ? myAdvancedMedia.advancedMedia.volumes
              : '?'}
          </Typography>
        </Typography>
      ) : null}
      <Typography fontSize={12} noWrap>
        <Typography fontSize={12} fontWeight="bold" display="inline">
          Status:{' '}
        </Typography>
        <Typography fontSize={12} display="inline" noWrap>
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
        <Typography fontSize={12} fontWeight="bold" display="inline">
          Source:{' '}
        </Typography>
        <Typography fontSize={12} display="inline" noWrap>
          {myAdvancedMedia.advancedMedia.source !== null
            ? formatSource(myAdvancedMedia.advancedMedia.source)
            : '?'}
        </Typography>
      </Typography>
      <Typography fontSize={12} noWrap>
        <Typography fontSize={12} fontWeight="bold" display="inline">
          Avg Score:{' '}
        </Typography>
        <Typography fontSize={12} display="inline" noWrap>
          {myAdvancedMedia.advancedMedia.averageScore !== null
            ? `${myAdvancedMedia.advancedMedia.averageScore}%`
            : '?'}
        </Typography>
      </Typography>
      {myAdvancedMedia.advancedMedia.type === 'ANIME' ? (
        <Typography fontSize={12} noWrap>
          <Typography fontSize={12} fontWeight="bold" display="inline">
            Season:{' '}
          </Typography>
          <Typography fontSize={12} display="inline">
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
          <Typography fontSize={12} fontWeight="bold" display="inline">
            Released:{' '}
          </Typography>
          <Typography fontSize={12} display="inline">
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
          <Typography fontSize={12} fontWeight="bold" display="inline">
            Ended:{' '}
          </Typography>
          <Typography fontSize={12} display="inline">
            {formatReleaseDate(
              myAdvancedMedia.advancedMedia.endDay,
              myAdvancedMedia.advancedMedia.endMonth,
              myAdvancedMedia.advancedMedia.endYear,
            )}
          </Typography>
        </Typography>
      ) : null}
      <Tooltip
        title={
          myAdvancedMedia.advancedMedia.type === 'ANIME' ? (
            <>
              <Typography fontSize={12}>
                <Typography fontSize={12} fontWeight="bold" display="inline">
                  Studio:{' '}
                </Typography>
                <Typography fontSize={12} display="inline">
                  {myAdvancedMedia.advancedMedia.mainStudioIndex !== -1
                    ? myAdvancedMedia.advancedMedia.studios[
                        myAdvancedMedia.advancedMedia.mainStudioIndex
                      ].node.name
                    : '?'}
                </Typography>
              </Typography>
              <Typography fontSize={12} fontWeight="bold" display="inline">
                Producers:{' '}
              </Typography>
              <Typography fontSize={12} display="inline">
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
            <Typography fontSize={12} fontWeight="bold" display="inline">
              Studio:{' '}
            </Typography>
            <Typography fontSize={12} display="inline" noWrap>
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
      <Tooltip
        title={
          <Typography fontSize={12}>
            <Typography fontSize={12} fontWeight="bold" display="inline">
              Genres:{' '}
            </Typography>
            <Typography fontSize={12} display="inline">
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
          <Typography fontSize={12} fontWeight="bold" display="inline">
            Genres:{' '}
          </Typography>
          <Typography fontSize={12} display="inline">
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
        title={
          <Typography fontSize={12}>
            <Typography fontSize={12} fontWeight="bold" display="inline">
              Tags:{' '}
            </Typography>
            <Typography fontSize={12} display="inline">
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
          <Typography fontSize={12} fontWeight="bold" display="inline">
            Tags:{' '}
          </Typography>
          <Typography fontSize={12} display="inline">
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
