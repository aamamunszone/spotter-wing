import React, { useState } from 'react';
import { TextField, Button, Autocomplete, Paper, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const airPorts = [
  { label: 'New York (JFK)', code: 'JFK' },
  { label: 'London (LHR)', code: 'LHR' },
  { label: 'Dubai (DXB)', code: 'DXB' },
  { label: 'Paris (CDG)', code: 'CDG' },
  { label: 'Singapore (SIN)', code: 'SIN' },
  { label: 'Dhaka (DAC)', code: 'DAC' },
];

const SearchForm = ({ onSearch }) => {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [date, setDate] = useState('');

  const handleSearch = () => {
    if (from && to && date) {
      onSearch(from.code, to.code, date);
    } else {
      alert('Please fill all fields!');
    }
  };

  return (
    <Paper
      elevation={0}
      className="p-6 rounded-3xl border border-neutral-200 bg-white shadow-xl shadow-blue-500/5"
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={3}
        alignItems="center"
      >
        {/* Origin */}
        <Autocomplete
          fullWidth
          options={airPorts}
          onChange={(e, val) => setFrom(val)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="From"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <FlightTakeoffIcon className="mr-2 text-blue-500" />
                ),
              }}
            />
          )}
        />

        {/* Destination */}
        <Autocomplete
          fullWidth
          options={airPorts}
          onChange={(e, val) => setTo(val)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="To"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <FlightLandIcon className="mr-2 text-blue-500" />
                ),
              }}
            />
          )}
        />

        {/* Date Picker */}
        <TextField
          fullWidth
          type="date"
          label="Departure"
          InputLabelProps={{ shrink: true }}
          onChange={(e) => setDate(e.target.value)}
          InputProps={{
            startAdornment: (
              <CalendarMonthIcon className="mr-2 text-blue-500" />
            ),
          }}
        />

        {/* Search Button */}
        <Button
          variant="contained"
          size="large"
          onClick={handleSearch}
          className="h-14 px-10 bg-blue-600 hover:bg-blue-700 rounded-xl normal-case text-lg font-bold shadow-lg shadow-blue-600/30"
          startIcon={<SearchIcon />}
        >
          Search
        </Button>
      </Stack>
    </Paper>
  );
};

export default SearchForm;
