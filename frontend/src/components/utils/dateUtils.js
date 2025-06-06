export const formatDate = (dateString) => {
  if (!dateString) return 'TBA';
  
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export const formatTime = (timeString) => {
  if (!timeString) return 'TBA';
  
  // Handle different time formats
  // This is a simple implementation and might need to be adjusted based on your actual time format
  try {
    // If timeString is in HH:MM format
    if (timeString.includes(':')) {
      const [hours, minutes] = timeString.split(':');
      const date = new Date();
      date.setHours(parseInt(hours));
      date.setMinutes(parseInt(minutes));
      
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    }
    
    // If timeString is a timestamp or date string
    return new Date(timeString).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return timeString; // Return as is if parsing fails
  }
};