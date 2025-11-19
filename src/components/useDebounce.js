// src/components/useDebounce.js
import { useState, useEffect } from 'react';

// Custom hook to implement Debounce logic
function useDebounce(value, delay) {
  // State to store the debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  // This useEffect runs when 'value' or 'delay' changes
  useEffect(() => {
    // Set a timer to set 'value' as 'debouncedValue' after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function: clears the old timer every time a new value comes in
    // (i.e., if another keypress occurs within 500ms)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // useEffect re-runs if these dependencies change

  // Returns the value that has stabilized after the delay (e.g., 500ms)
  return debouncedValue;
}

export default useDebounce;