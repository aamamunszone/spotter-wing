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
      role="search"
      aria-label="Flight search form"
      sx={{
        p: { xs: 3, sm: 4, md: 6 },
        borderRadius: 4,
        border: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        backdropFilter: 'blur(12px)',
        boxShadow: (theme) =>
          theme.palette.mode === 'light'
            ? '0 20px 25px -5px rgb(37 99 235 / 0.1), 0 8px 10px -6px rgb(37 99 235 / 0.1)'
            : '0 20px 25px -5px rgb(59 130 246 / 0.2), 0 8px 10px -6px rgb(59 130 246 / 0.2)',
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={{ xs: 2, md: 2 }}
        sx={{ alignItems: { md: 'flex-end' } }}
      >
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
          sx={{
            height: { xs: 48, md: 56 },
            px: { xs: 4, md: 6 },
            minWidth: { xs: '100%', md: 'auto' },
            fontSize: { xs: '1rem', md: '1.125rem' },
            fontWeight: 700,
            borderRadius: 3,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: (theme) =>
                `0 12px 24px ${theme.palette.primary.main}40`,
            },
            '&:disabled': {
              bgcolor: 'action.disabledBackground',
              color: 'action.disabled',
            },
          }}
        >
          <SearchIcon aria-hidden="true" />
          <span style={{ marginLeft: 8 }}>Search</span>
        </Button>
      </Stack>
    </Paper>
  );
};

export default SearchForm;
