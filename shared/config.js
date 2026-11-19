// Supabase public settings. Both values are safe to publish:
// the publishable key only does what Row Level Security and Auth allow.
// Never put the service role key here — it lives in .env and in Vercel.
window.HF_CONFIG = {
  supabaseUrl: '',       // e.g. https://abcd1234.supabase.co
  supabaseKey: '',       // Project Settings → API Keys → publishable (or anon) key
};
