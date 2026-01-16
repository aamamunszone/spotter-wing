import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Autocomplete,
  Paper,
  Stack,
  CircularProgress,
} from '@mui/material';
import { getAirports } from '../../api/amadeus';
import SearchIcon from '@mui/icons-material/Search';
import { useDebounce } from '../../hooks/useDebounce';

const SearchForm = ({ onSearch }) => {
  const [options, setOptions] = useState({ from: [], to: [] });
  const [loading, setLoading] = useState({ from: false, to: false });
  const [formData, setFormData] = useState({ from: null, to: null, date: '' });
  const [inputValues, setInputValues] = useState({ from: '', to: '' });

  // Debounce the input values to reduce API calls
  const debouncedFromInput = useDebounce(inputValues.from, 400);
  const debouncedToInput = useDebounce(inputValues.to, 400);

  // Fetch airports when debounced input changes
  useEffect(() => {
    if (debouncedFromInput && debouncedFromInput.length >= 2) {
      fetchOptions(debouncedFromInput, 'from');
    }
  }, [debouncedFromInput]);

  useEffect(() => {
    if (debouncedToInput && debouncedToInput.length >= 2) {
      fetchOptions(debouncedToInput, 'to');
    }
  }, [debouncedToInput]);

  const fetchOptions = async (keyword, type) => {
    setLoading((prev) => ({ ...prev, [type]: true }));
    const results = await getAirports(keyword);
    setOptions((prev) => ({ ...prev, [type]: results }));
    setLoading((prev) => ({ ...prev, [type]: false }));
  };

  const handleSearch = () => {
    if (!formData.from || !formData.to || !formData.date) {
      return; // Form validation handled by hook
    }
    onSearch(formData.from.code, formData.to.code, formData.date);
  };

  // Get today's date for min date validation
  const today = new Date().toISOString().split('T')[0];

  return (
    <Paper
      elevation={0}
      className="p-4 md:p-8 rounded-4xl border border-neutral-200 bg-white/50 backdrop-blur-xl shadow-2xl shadow-blue-500/10"
      role="search"
      aria-label="Flight search form"
    >
      <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2}>
        <Autocomplete
          fullWidth
          options={options.from}
          loading={loading.from}
          value={formData.from}
          onInputChange={(e, val) =>
            setInputValues((prev) => ({ ...prev, from: val }))
          }
          onChange={(e, val) => setFormData({ ...formData, from: val })}
          getOptionLabel={(option) => option.label || ''}
          isOptionEqualToValue={(option, value) => option.code === value.code}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Origin Airport"
              variant="filled"
              required
              aria-label="Origin airport"
              aria-describedby="origin-helper-text"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading.from ? <CircularProgress size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
        <Autocomplete
          fullWidth
          options={options.to}
          loading={loading.to}
          value={formData.to}
          onInputChange={(e, val) =>
            setInputValues((prev) => ({ ...prev, to: val }))
          }
          onChange={(e, val) => setFormData({ ...formData, to: val })}
          getOptionLabel={(option) => option.label || ''}
          isOptionEqualToValue={(option, value) => option.code === value.code}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Destination Airport"
              variant="filled"
              required
              aria-label="Destination airport"
              aria-describedby="destination-helper-text"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading.to ? <CircularProgress size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
        <TextField
          fullWidth
          type="date"
          variant="filled"
          label="Departure Date"
          required
          value={formData.date}
          inputProps={{
            min: today,
            'aria-label': 'Departure date',
          }}
          InputLabelProps={{ shrink: true }}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
        <Button
          variant="contained"
          disableElevation
          onClick={handleSearch}
          disabled={!formData.from || !formData.to || !formData.date}
          aria-label="Search flights"
          className="h-14 px-12 bg-blue-600 hover:bg-black rounded-xl transition-all duration-500 font-bold text-lg disabled:bg-neutral-300"
        >
          <SearchIcon aria-hidden="true" />
          <span className="ml-2 hidden sm:inline">Search</span>
        </Button>
      </Stack>
    </Paper>
  );
};

export default SearchForm;
