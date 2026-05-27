const baseUrl = process.env.SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY;

if (!baseUrl || !secretKey) {
  throw new Error(
    "Missing Supabase env vars: SUPABASE_URL and SUPABASE_SECRET_KEY are required"
  );
}

export const SUPABASE_REST_URL = `${baseUrl}/rest/v1`;
export const SUPABASE_AUTH_URL = `${baseUrl}/auth/v1`;
export const SUPABASE_STORAGE_URL = `${baseUrl}/storage/v1`;
export const SUPABASE_FUNCTIONS_URL = `${baseUrl}/functions/v1`;
export const SUPABASE_SECRET_KEY = secretKey;
