/**
 * Base URL for the backend API.
 *
 * When empty, the frontend calls same-origin `/api/*` paths (used during local
 * development with the Next.js proxy, or when Firebase Hosting rewrites /api to
 * a Cloud Function). When hosting the API separately, set NEXT_PUBLIC_API_BASE
 * at build time to the absolute backend URL (e.g. https://api.example.com).
 */
const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? '';

/** Build an absolute API URL from a path such as "/api/matrix/calculate". */
export function apiUrl(path: string): string {
  return `${API_BASE}${path}`;
}
