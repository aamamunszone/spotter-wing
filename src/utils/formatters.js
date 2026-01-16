/**
 * Utility functions for formatting flight data
 */

/**
 * Format ISO date string to readable time
 * @param {string} isoString - ISO date string
 * @returns {string} Formatted time (e.g., "2:30 PM")
 */
export const formatTime = (isoString) => {
  return new Date(isoString).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Parse ISO 8601 duration to human-readable format
 * @param {string} duration - ISO duration (e.g., "PT15H30M")
 * @returns {string} Formatted duration (e.g., "15h 30m")
 */
export const formatDuration = (duration) => {
  if (!duration) return 'N/A';

  const hours = duration.match(/(\d+)H/);
  const minutes = duration.match(/(\d+)M/);

  const h = hours ? `${hours[1]}h` : '';
  const m = minutes ? `${minutes[1]}m` : '';

  return `${h} ${m}`.trim() || duration;
};

/**
 * Format price with currency symbol
 * @param {string|number} amount - Price amount
 * @param {string} currency - Currency code
 * @returns {string} Formatted price (e.g., "$1,234.56")
 */
export const formatPrice = (amount, currency = 'USD') => {
  const numAmount = parseFloat(amount);

  if (isNaN(numAmount)) return 'N/A';

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(numAmount);
};

/**
 * Get number of stops from segments
 * @param {Array} segments - Flight segments
 * @returns {string} Stop description (e.g., "Direct", "1 Stop")
 */
export const getStopsText = (segments) => {
  if (!segments || segments.length === 0) return 'Unknown';

  const stops = segments.length - 1;

  if (stops === 0) return 'Direct';
  if (stops === 1) return '1 Stop';
  return `${stops} Stops`;
};
