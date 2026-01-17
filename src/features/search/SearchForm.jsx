import { useState, useEffect, useCallback } from 'react';
import {
  TextField,
  Button,
  Autocomplete,
  Box,
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

  // Fetch airport options
  const fetchOptions = useCallback(async (keyword, type) => {
    setLoading((prev) => ({ ...prev, [type]: true }));
    const results = await getAirports(keyword);
    setOptions((prev) => ({ ...prev, [type]: results }));
    setLoading((prev) => ({ ...prev, [type]: false }));
  }, []);

  // Fetch airports when debounced input changes
  useEffect(() => {
    if (debouncedFromInput && debouncedFromInput.length >= 2) {
      fetchOptions(debouncedFromInput, 'from');
    }
  }, [debouncedFromInput, fetchOptions]);

  useEffect(() => {
    if (debouncedToInput && debouncedToInput.length >= 2) {
      fetchOptions(debouncedToInput, 'to');
    }
  }, [debouncedToInput, fetchOptions]);

  const handleSearch = () => {
    if (!formData.from || !formData.to || !formData.date) {
      return; // Form validation handled by hook
    }
    onSearch(formData.from.code, formData.to.code, formData.date);
  };

  // Get today's date for min date validation
  const today = new Date().toISOString().split('T')[0];

  return (
    <Box
      role="search"
      aria-label="Flight search form"
      sx={{
        p: { xs: 2, sm: 2.5 },
        borderRadius: 3,
        bgcolor: 'transparent',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={{ xs: 1.5, md: 2 }}
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
              label="From"
              variant="filled"
              required
              size="small"
              aria-label="Origin airport"
              aria-describedby="origin-helper-text"
              InputProps={{
                ...params.InputProps,
                disableUnderline: true,
                endAdornment: (
                  <>
                    {loading.from ? <CircularProgress size={18} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
              sx={{
                '& .MuiFilledInput-root': {
                  bgcolor: (theme) =>
                    theme.palette.mode === 'light'
                      ? 'rgba(0, 0, 0, 0.02)'
                      : 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: (theme) =>
                    theme.palette.mode === 'light'
                      ? '1px solid rgba(0, 0, 0, 0.05)'
                      : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: (theme) =>
                      theme.palette.mode === 'light'
                        ? 'rgba(0, 0, 0, 0.03)'
                        : 'rgba(255, 255, 255, 0.07)',
                    borderColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? 'rgba(0, 0, 0, 0.08)'
                        : 'rgba(255, 255, 255, 0.15)',
                  },
                  '&.Mui-focused': {
                    bgcolor: (theme) =>
                      theme.palette.mode === 'light'
                        ? 'rgba(0, 0, 0, 0.04)'
                        : 'rgba(255, 255, 255, 0.08)',
                    borderColor: 'primary.main',
                    boxShadow: (theme) =>
                      theme.palette.mode === 'light'
                        ? '0 0 0 3px rgba(37, 99, 235, 0.1)'
                        : '0 0 0 3px rgba(59, 130, 246, 0.15)',
                  },
                },
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
              label="To"
              variant="filled"
              required
              size="small"
              aria-label="Destination airport"
              aria-describedby="destination-helper-text"
              InputProps={{
                ...params.InputProps,
                disableUnderline: true,
                endAdornment: (
                  <>
                    {loading.to ? <CircularProgress size={18} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
              sx={{
                '& .MuiFilledInput-root': {
                  bgcolor: (theme) =>
                    theme.palette.mode === 'light'
                      ? 'rgba(0, 0, 0, 0.02)'
                      : 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: (theme) =>
                    theme.palette.mode === 'light'
                      ? '1px solid rgba(0, 0, 0, 0.05)'
                      : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: (theme) =>
                      theme.palette.mode === 'light'
                        ? 'rgba(0, 0, 0, 0.03)'
                        : 'rgba(255, 255, 255, 0.07)',
                    borderColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? 'rgba(0, 0, 0, 0.08)'
                        : 'rgba(255, 255, 255, 0.15)',
                  },
                  '&.Mui-focused': {
                    bgcolor: (theme) =>
                      theme.palette.mode === 'light'
                        ? 'rgba(0, 0, 0, 0.04)'
                        : 'rgba(255, 255, 255, 0.08)',
                    borderColor: 'primary.main',
                    boxShadow: (theme) =>
                      theme.palette.mode === 'light'
                        ? '0 0 0 3px rgba(37, 99, 235, 0.1)'
                        : '0 0 0 3px rgba(59, 130, 246, 0.15)',
                  },
                },
              }}
            />
          )}
        />
        <TextField
          fullWidth
          type="date"
          variant="filled"
          label="Date"
          required
          size="small"
          value={formData.date}
          inputProps={{
            min: today,
            'aria-label': 'Departure date',
          }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            disableUnderline: true,
          }}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          sx={{
            '& .MuiFilledInput-root': {
              bgcolor: (theme) =>
                theme.palette.mode === 'light'
                  ? 'rgba(0, 0, 0, 0.02)'
                  : 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: (theme) =>
                theme.palette.mode === 'light'
                  ? '1px solid rgba(0, 0, 0, 0.05)'
                  : '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: (theme) =>
                  theme.palette.mode === 'light'
                    ? 'rgba(0, 0, 0, 0.03)'
                    : 'rgba(255, 255, 255, 0.07)',
                borderColor: (theme) =>
                  theme.palette.mode === 'light'
                    ? 'rgba(0, 0, 0, 0.08)'
                    : 'rgba(255, 255, 255, 0.15)',
              },
              '&.Mui-focused': {
                bgcolor: (theme) =>
                  theme.palette.mode === 'light'
                    ? 'rgba(0, 0, 0, 0.04)'
                    : 'rgba(255, 255, 255, 0.08)',
                borderColor: 'primary.main',
                boxShadow: (theme) =>
                  theme.palette.mode === 'light'
                    ? '0 0 0 3px rgba(37, 99, 235, 0.1)'
                    : '0 0 0 3px rgba(59, 130, 246, 0.15)',
              },
            },
          }}
        />
        <Button
          variant="contained"
          disableElevation
          onClick={handleSearch}
          disabled={!formData.from || !formData.to || !formData.date}
          aria-label="Search flights"
          sx={{
            height: { xs: 44, md: 48 },
            px: { xs: 4, md: 5 },
            minWidth: { xs: '100%', md: 120 },
            fontSize: '0.95rem',
            fontWeight: 700,
            borderRadius: '12px',
            transition: 'all 0.3s ease',
            textTransform: 'none',
            bgcolor: (theme) =>
              theme.palette.mode === 'light' ? '#1E40AF' : '#2563EB',
            color: '#FFFFFF',
            boxShadow: (theme) =>
              theme.palette.mode === 'light'
                ? '0 4px 14px 0 rgba(30, 64, 175, 0.39)'
                : '0 4px 14px 0 rgba(37, 99, 235, 0.39)',
            '&:hover': {
              bgcolor: (theme) =>
                theme.palette.mode === 'light' ? '#1E3A8A' : '#1D4ED8',
              transform: 'translateY(-2px)',
              boxShadow: (theme) =>
                theme.palette.mode === 'light'
                  ? '0 6px 20px 0 rgba(30, 64, 175, 0.5)'
                  : '0 6px 20px 0 rgba(37, 99, 235, 0.5)',
            },
            '&:active': {
              transform: 'translateY(0)',
            },
            '&:disabled': {
              bgcolor: (theme) =>
                theme.palette.mode === 'light'
                  ? 'rgba(0, 0, 0, 0.12)'
                  : 'rgba(255, 255, 255, 0.12)',
              color: (theme) =>
                theme.palette.mode === 'light'
                  ? 'rgba(0, 0, 0, 0.26)'
                  : 'rgba(255, 255, 255, 0.3)',
              boxShadow: 'none',
            },
          }}
        >
          <SearchIcon aria-hidden="true" sx={{ fontSize: 20 }} />
          <span style={{ marginLeft: 6 }}>Search</span>
        </Button>
      </Stack>
    </Box>
  );
};

export default SearchForm;
