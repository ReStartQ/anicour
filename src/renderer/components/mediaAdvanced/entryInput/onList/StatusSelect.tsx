import { KeyboardArrowDown } from '@mui/icons-material';
import { FormControl, FormLabel, Option, Select } from '@mui/joy';
import { useAdvancedInput } from 'renderer/context/advanced/AdvancedInputContext';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';

export default function StatusSelect() {
  const myAdvancedMedia: any = useAdvancedMedia();
  const myAdvancedInput: any = useAdvancedInput();

  const onChange = (e: any, value: any) => {
    console.log(value);
    myAdvancedInput.dispatch({
      type: 'updateStatus',
      payload: value,
    });
  };

  return (
    <FormControl sx={{ gridColumn: '2/3', gridRow: '2/3' }}>
      <FormLabel
        id="select-field-demo-label"
        htmlFor="select-field-demo-button"
        sx={{ marginLeft: '10px' }}
      >
        Status:
      </FormLabel>
      <Select
        value={myAdvancedInput.advancedInput.status}
        slotProps={{
          button: {
            id: 'select-field-demo-button',
            // TODO: Material UI set aria-labelledby correctly & automatically
            // but Base UI and Joy UI don't yet.
            'aria-labelledby':
              'select-field-demo-label select-field-demo-button',
          },
          listbox: {
            sx: {
              py: 0,
            },
          },
        }}
        indicator={<KeyboardArrowDown />}
        onChange={onChange}
        size="sm"
        sx={{ marginLeft: '10px' }}
      >
        {myAdvancedMedia.advancedMedia.type === 'ANIME' ? (
          <Option value="CURRENT">Watching</Option>
        ) : (
          <Option value="CURRENT">Reading</Option>
        )}
        <Option value="COMPLETED">Completed</Option>
        <Option value="PAUSED">On Hold</Option>
        <Option value="DROPPED">Dropped</Option>
        {myAdvancedMedia.advancedMedia.type === 'ANIME' ? (
          <Option value="PLANNING">Planning</Option>
        ) : (
          <Option value="PLANNING">Planning</Option>
        )}
      </Select>
    </FormControl>
  );
}
