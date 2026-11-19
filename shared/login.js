// Login by emailed link (no password). Only people who were already
// invited can get a link: shouldCreateUser is false.
(function () {
  const form = document.getElementById('login-form');
  const email = document.getElementById('login-email');
  const field = email.closest('.field-group');
  const fieldError = document.getElementById('login-email-error');
  const submit = form.querySelector('button[type="submit"]');
  const formError = document.getElementById('login-error');
  const sentState = document.getElementById('login-sent');
  const sentTo = document.getElementById('login-sent-to');
  const retry = document.getElementById('login-retry');
  const label = submit.textContent;

  const back = new URLSearchParams(location.search).get('volver');
  const fallback = form.dataset.redirect || './';
  const target = back && back.startsWith('/') ? back : fallback;

  function setBusy(busy) {
    submit.disabled = busy;
    submit.setAttribute('aria-busy', String(busy));
    submit.textContent = busy ? 'Mandando el link…' : label;
  }
  function showError(msg) {
    formError.querySelector('.alert-description').textContent = msg;
    formError.hidden = false;
  }
  function humanError(err) {
    const m = (err && err.message || '').toLowerCase();
    if (m.includes('signups not allowed') || m.includes('not found')) {
      return form.dataset.notInvited || 'Ese mail no tiene una invitación. Revisá que esté bien escrito.';
    }
    if (err && err.status === 429 || m.includes('rate limit') || m.includes('security purposes')) {
      return 'Ya te mandamos un link hace un momento. Esperá un minuto y probá de nuevo.';
    }
    return 'No pudimos mandar el link. Revisá tu conexión y probá de nuevo.';
  }

  // Already logged in: skip the form.
  if (window.hfAuth.client) {
    window.hfAuth.client.auth.getSession().then(({ data }) => {
      if (data.session) location.replace(target);
    });
  }

  email.addEventListener('input', () => { field.classList.remove('is-error'); email.removeAttribute('aria-invalid'); fieldError.hidden = true; formError.hidden = true; });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    formError.hidden = true;
    const value = email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      field.classList.add('is-error'); email.setAttribute('aria-invalid', 'true'); fieldError.hidden = false; email.focus();
      return;
    }
    if (!window.hfAuth.client) {
      showError('Falta conectar Supabase: completá shared/config.js.');
      return;
    }
    setBusy(true);
    const { error } = await window.hfAuth.client.auth.signInWithOtp({
      email: value,
      options: { shouldCreateUser: false, emailRedirectTo: new URL(target, location.origin).href },
    });
    setBusy(false);
    if (error) return showError(humanError(error));
    sentTo.textContent = value;
    form.hidden = true;
    sentState.hidden = false;
    sentState.querySelector('h2').focus();
  });

  retry.addEventListener('click', () => {
    sentState.hidden = true;
    form.hidden = false;
    email.focus();
  });
})();
