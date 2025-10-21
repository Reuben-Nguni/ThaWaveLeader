// YouTube URL parsing utility
export const getYouTubeVideoId = (url) => {
  if (!url) return '';
  
  // Handle different YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i,
    /^[a-zA-Z0-9_-]{11}$/  // Direct video ID
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return '';
};

// Generate embedded URL
export const getYouTubeEmbedUrl = (videoId) => {
  if (!videoId) return '';
  return `https://www.youtube.com/embed/${videoId}`;
};