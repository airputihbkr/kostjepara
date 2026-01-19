/**
 * Convert Google Drive sharing link to direct image link
 * @param {string} link - The sharing link
 * @returns {string} - Direct image URL
 */
export function getDriveImage(link) {
  if (!link) return '';
  // Handle Google Drive links
  // Typical: https://drive.google.com/file/d/VIDEO_ID/view?usp=sharing
  try {
    const idMatch = link.match(/\/d\/([^/]+)/);
    if (idMatch && idMatch[1]) {
      return `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
    }
  } catch (e) {
    console.warn("Failed to parse drive link", e);
  }
  return link;
}

/**
 * Convert Google Maps link to Embed URL
 * @param {string} link - Share link or browser link
 * @returns {string} - Iframe Src URL
 */
export function getMapsEmbed(link) {
  if (!link) return '';

  // Case 1: Already an embed link
  if (link.includes('maps.google.com/maps?q=') && link.includes('output=embed')) {
    return link;
  }

  // Case 2: Standard Share Link or Browser Link -> Best Effort Search Embed
  // We can't easily extract CID/PlaceID without API or complex scraping from short links.
  // Best fallacy-safe approach for an MVP: Use the Maps Embed Search API with the link or extracted query.
  // Note: Embedding a direct URL in 'q' sometimes works if it's a searchable address.
  
  // Strategy: If it looks like a coordinate or address, use it.
  // If it's a short link (goo.gl, maps.app.goo.gl), we can't unshorten it client-side without a request.
  // We will assume the user inputs a searchable name or we use the raw link in a way that might work.
  // 'https://maps.google.com/maps?q=' + LINK is a robust fallback for "Search this on maps".
  
  // Refinement: Extract coordinates if present
  const coords = link.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (coords) {
    return `https://maps.google.com/maps?q=${coords[1]},${coords[2]}&hl=es;z=14&output=embed`;
  }
  
  // Fallback: Embed the search query of the link itself
  return `https://maps.google.com/maps?q=${encodeURIComponent(link)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
