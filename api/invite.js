// POST /api/invite — the studio admin registers a member and Supabase
// emails them an invitation to the app.
// Runs on Vercel as a Node function and locally through scripts/dev.mjs.
//
// Env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ADMIN_EMAILS (comma separated),
//      APP_URL (where the invitation link lands, e.g. https://…vercel.app/).

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(body));
}

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') return JSON.parse(req.body || '{}');
  let raw = '';
  for await (const chunk of req) raw += chunk;
  return raw ? JSON.parse(raw) : {};
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'Usá POST.' });

  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ADMIN_EMAILS = '', APP_URL } = process.env;
  const missing = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'APP_URL'].filter((k) => !process.env[k]);
  if (missing.length) return send(res, 500, { error: `Falta configurar ${missing.join(', ')} en el servidor.` });

  const base = SUPABASE_URL.replace(/\/$/, '');
  const service = { apikey: SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`, 'Content-Type': 'application/json' };

  // 1. Only logged-in admins can invite.
  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!token) return send(res, 401, { error: 'Tu sesión venció. Volvé a ingresar.' });
  const who = await fetch(`${base}/auth/v1/user`, { headers: { apikey: SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${token}` } });
  if (!who.ok) return send(res, 401, { error: 'Tu sesión venció. Volvé a ingresar.' });
  const admin = await who.json();
  const admins = ADMIN_EMAILS.split(',').map((e) => e.trim().toLowerCase()).filter(Boolean);
  if (!admins.includes((admin.email || '').toLowerCase())) {
    return send(res, 403, { error: 'Tu cuenta no tiene permiso para dar de alta socios.' });
  }

  // 2. Validate the member.
  let m;
  try { m = await readBody(req); } catch { return send(res, 400, { error: 'Los datos llegaron mal. Probá de nuevo.' }); }
  const email = String(m.email || '').trim().toLowerCase();
  const name = String(m.name || '').trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return send(res, 400, { error: 'Revisá el email.' });
  if (name.length < 2) return send(res, 400, { error: 'Falta el nombre.' });

  // 3. Create the account and send the invitation email.
  const invite = await fetch(`${base}/auth/v1/invite?redirect_to=${encodeURIComponent(APP_URL)}`, {
    method: 'POST', headers: service, body: JSON.stringify({ email, data: { name } }),
  });
  const invited = await invite.json().catch(() => ({}));
  if (!invite.ok) {
    const msg = String(invited.msg || invited.message || invited.error_description || '').toLowerCase();
    if (invite.status === 422 || msg.includes('already')) return send(res, 409, { error: `${email} ya tiene cuenta en la app.` });
    if (invite.status === 429 || msg.includes('rate limit')) return send(res, 429, { error: 'Se mandaron muchos mails seguidos. Esperá unos minutos y probá de nuevo.' });
    return send(res, 502, { error: 'Supabase no pudo mandar la invitación. Probá de nuevo en un rato.' });
  }

  // 4. Membership data goes in app_metadata: the member can read it but not change it.
  const membership = {
    role: 'socio',
    dni: String(m.dni || '').replace(/\D/g, ''),
    birth: m.birth || null,
    paid_from: m.paidFrom || null,
    paid_to: m.paidTo || null,
    plan: Number(m.plan) || null,
    invited_by: admin.email,
  };
  const update = await fetch(`${base}/auth/v1/admin/users/${invited.id}`, {
    method: 'PUT', headers: service, body: JSON.stringify({ app_metadata: membership }),
  });
  if (!update.ok) {
    return send(res, 207, { id: invited.id, email, warning: 'La invitación salió, pero no se guardaron los datos de la membresía.' });
  }

  return send(res, 200, { id: invited.id, email });
}
