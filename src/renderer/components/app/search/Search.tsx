import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { useFilter } from 'renderer/context/FilterContext';
import { useSearchTerm } from 'renderer/context/SearchTermContext';
import { useSidebarButton } from 'renderer/context/SidebarContext';
import { useTheme } from 'renderer/context/ThemeContext';
import { getFilteredTerm } from 'renderer/functions/view/FilterFunctions';
import * as _ from 'lodash';
import { debounce } from '@mui/material/utils';
import { useAtom } from 'jotai';
import { filterTypeAtom, searchPrevAtom } from 'renderer/store';
import FilterSelect from './FilterSelect';

const Search = () => {
  const myFilter: any = useFilter();
  const myTheme: any = useTheme();
  const mySideBar: any = useSidebarButton();
  const mySearchTerm: any = useSearchTerm();
  const [filter, setFilter] = useState('');
  const [searchPrev, setSearchPrev] = useAtom(searchPrevAtom);
  const [filterType, setFilterType] = useAtom(filterTypeAtom);

  const debounceFunc = debounce((e) => {
    myFilter.setFilter(e.target.value);
  }, 300);

  const handleChange = (e: any) => {
    setFilter(e.target.value);
    debounceFunc(e);
  };

  return (
    <Box display="flex" justifySelf="flex-end" alignSelf="center">
      <Paper sx={{ display: 'flex', width: '220px' }}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Filter or Search"
          inputProps={{ 'aria-label': 'Search/filter', spellCheck: 'false' }}
          onChange={handleChange}
          value={filter}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              mySearchTerm.setSearchTerm(myFilter.filter);
              myFilter.setFilter('');
              setFilter('');
              mySideBar.setSidebar(3);
            }
          }}
        />
        {myFilter.filter !== '' ? (
          <IconButton
            type="button"
            size="small"
            aria-label="search"
            onClick={() => {
              setFilter('');
              myFilter.setFilter('');
              setFilterType('All');
            }}
          >
            <ClearIcon />
          </IconButton>
        ) : undefined}
      </Paper>
      {myTheme.theme ? (
        <IconButton
          type="button"
          size="small"
          aria-label="search"
          sx={{
            borderRadius: 1,
            marginLeft: 1,
            backgroundColor: '#1873CC',
            ':hover': { backgroundColor: 'dodgerblue' },
          }}
          onClick={() => {
            mySearchTerm.setSearchTerm(myFilter.filter);
            myFilter.setFilter('');
            setFilter('');
            mySideBar.setSidebar(3);
          }}
        >
          <SearchIcon />
        </IconButton>
      ) : (
        <IconButton
          type="button"
          size="small"
          aria-label="search"
          sx={{
            borderRadius: 1,
            marginLeft: 1,
            backgroundColor: '#1873CC',
            ':hover': { backgroundColor: 'dodgerblue' },
          }}
          onClick={() => {
            setSearchPrev(mySearchTerm.SearchTerm);
            mySearchTerm.setSearchTerm(myFilter.filter);
            myFilter.setFilter('');
            setFilter('');
            mySideBar.setSidebar(3);
          }}
        >
          <SearchIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default Search;
