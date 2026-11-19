// Session helpers shared by the app and the admin.
// Needs, loaded before it: supabase-js (UMD) and /shared/config.js.
(function () {
  const cfg = window.HF_CONFIG || {};
  const configured = Boolean(cfg.supabaseUrl && cfg.supabaseKey);
  const client = configured
    ? window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseKey, {
        auth: { persistSession: true, detectSessionInUrl: true },
      })
    : null;

  function reveal() { document.documentElement.classList.remove('hf-auth-pending'); }

  // Shows the page if there is a session; otherwise sends to the login page.
  async function requireSession(loginPath) {
    if (!client) {
      console.warn('Supabase is not configured (shared/config.js). Showing the page without login.');
      reveal();
      return null;
    }
    const { data } = await client.auth.getSession();
    if (!data.session) {
      const back = encodeURIComponent(location.pathname + location.search);
      location.replace(`${loginPath}?volver=${back}`);
      return null;
    }
    reveal();
    return data.session;
  }

  async function signOut(loginPath) {
    if (client) await client.auth.signOut();
    location.replace(loginPath);
  }

  async function accessToken() {
    if (!client) return null;
    const { data } = await client.auth.getSession();
    return data.session ? data.session.access_token : null;
  }

  window.hfAuth = { client, configured, requireSession, signOut, accessToken };
})();
