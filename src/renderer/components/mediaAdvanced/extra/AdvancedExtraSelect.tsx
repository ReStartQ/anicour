import { Select, Option, selectClasses } from '@mui/joy';
import { useAtom } from 'jotai';
import React from 'react';
import { getInfoTypeValue, infoTypeAtom } from 'renderer/store';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';
import { useAdvancedInput } from 'renderer/context/advanced/AdvancedInputContext';

const AdvancedExtraSelect = () => {
  const [myInfoType, setMyInfoType] = useAtom(infoTypeAtom);
  const myMediaAdvanced: any = useAdvancedMedia();
  const myAdvancedInput: any = useAdvancedInput();

  const onChange = (event: any, newValue: any) => {
    setMyInfoType(newValue);
    getInfoTypeValue();
  };

  return (
    <Select
      color={myInfoType !== 4 ? 'primary' : 'danger'}
      size="sm"
      variant="soft"
      indicator={<KeyboardArrowDown />}
      placeholder="select a choice"
      slotProps={{
        listbox: {
          // placement: 'bottom-start',
          // sx: { minWidth: 260 },
        },
      }}
      value={myInfoType}
      sx={{
        height: '28px',
        // '--ListItemDecorator-size': '44px',
        width: '100%',
        // marginLeft: '10px',
        mx: '10px',
        alignSelf: 'center',
        [`& .${selectClasses.indicator}`]: {
          transition: '0.2s',
          [`&.${selectClasses.expanded}`]: {
            transform: 'rotate(-180deg)',
          },
        },
      }}
      onChange={onChange}
    >
      <Option value={0} color="primary">
        Information
      </Option>
      <Option value={3} color="primary">
        Title Variations
      </Option>
      {myMediaAdvanced.advancedMedia.idMal !== null &&
      myMediaAdvanced.advancedMedia.type === 'ANIME' ? (
        <Option value={2} color="primary">
          OP/ED Themes
        </Option>
      ) : null}
      {myMediaAdvanced.advancedMedia.trailer !== null ? (
        <Option value={1} color="primary">
          Trailer
        </Option>
      ) : null}
      {/*
      myAdvancedInput.advancedInput !== null ? (
        <Option value={4} color="danger">
          Remove from List
        </Option>
      ) : null
      */}
    </Select>
  );
};
// can add two more options in the future
export default AdvancedExtraSelect;
