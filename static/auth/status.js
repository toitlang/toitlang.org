// Copyright (C) 2026 Toit contributors.
// Preserve the existing authentication callback without exposing its token.
function showResult() {
  const params = new URLSearchParams(location.hash.slice(1))
  const error = params.get('error')
  const success = !error && !!params.get('access_token')
  document.querySelector('h1').textContent = success
    ? 'Authentication successful'
    : 'Authentication failed'
  document.querySelector('#status').textContent = success
    ? 'You may close this window.'
    : params.get('error_description') || error || 'No authentication response was received.'
  history.replaceState(null, '', location.pathname + location.search)
}

window.addEventListener('hashchange', () => {
  if (location.hash) showResult()
})
showResult()
