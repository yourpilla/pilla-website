import { NextRequest } from 'next/server';

export function getCountryFromRequest(request: NextRequest): string | null {
  // Try Vercel's geo headers first (available in production)
  const vercelCountry = request.headers.get('x-vercel-ip-country');
  if (vercelCountry && vercelCountry !== 'unknown') {
    return vercelCountry.toUpperCase();
  }

  // Try Cloudflare's CF-IPCountry header
  const cloudflareCountry = request.headers.get('cf-ipcountry');
  if (cloudflareCountry && cloudflareCountry !== 'XX') {
    return cloudflareCountry.toUpperCase();
  }

  // Try other common geo headers
  const geoCountry = request.headers.get('x-country-code') || 
                    request.headers.get('x-forwarded-country') ||
                    request.headers.get('x-geo-country');
  
  if (geoCountry && geoCountry !== 'unknown') {
    return geoCountry.toUpperCase();
  }

  // Fallback to detecting from Accept-Language header (very rough)
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const languageCountry = extractCountryFromLanguage(acceptLanguage);
    if (languageCountry) {
      return languageCountry;
    }
  }

  // Default fallback - could be set to null or a default country
  return 'UNKNOWN';
}

function extractCountryFromLanguage(acceptLanguage: string): string | null {
  // Extract country codes from Accept-Language header
  // Format: en-US,en;q=0.9,fr-FR;q=0.8
  const countryMatch = acceptLanguage.match(/[a-z]{2}-([A-Z]{2})/);
  return countryMatch ? countryMatch[1] : null;
}

export function normalizeCountryCode(country: string): string {
  // Ensure consistent country code format
  return country.toUpperCase().trim();
}