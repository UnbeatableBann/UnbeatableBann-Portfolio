// Declare dataLayer for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
  }
}

/**
 * Pushes an event to the Google Tag Manager dataLayer.
 * Standardizes common contextual parameters automatically.
 */
export const trackEvent = (eventName: string, params: Record<string, any> = {}) => {
  if (typeof window === 'undefined') return;
  
  window.dataLayer = window.dataLayer || [];
  
  // Base parameters that should accompany most events
  const baseParams = {
    page_name: window.location.pathname,
    device_type: /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
    screen_resolution: `${window.screen.width}x${window.screen.height}`,
  };

  window.dataLayer.push({
    event: eventName,
    ...baseParams,
    ...params,
  });
};

/**
 * Convenience methods for recommended GA4 events
 */
export const trackLead = (method: string, source: string) => {
  trackEvent('generate_lead', {
    method, // e.g., 'contact_form'
    source, // e.g., 'footer', 'hero'
  });
};

export const trackSearch = (searchTerm: string) => {
  trackEvent('search', {
    search_term: searchTerm,
  });
};

export const trackShare = (method: string, contentType: string, itemId: string) => {
  trackEvent('share', {
    method,
    content_type: contentType,
    item_id: itemId,
  });
};

