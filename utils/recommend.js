export const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return parseFloat((total / reviews.length).toFixed(1));
  };
  
  export const cosineSimilarity = (vecA, vecB) => {
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    const normA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const normB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    return normA && normB ? dotProduct / (normA * normB) : 0;
  };
  
  export const hotelToVector = (hotel) => {
    const avgRating = calculateAverageRating(hotel.reviews);
    return [
      avgRating,
      hotel.starRating || 0,
      hotel.priceRange.min || 0,
      hotel.priceRange.max || 0,
      hotel.amenities?.length || 0
    ];
  };