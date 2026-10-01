export const FORM_SUBMIT_EMAIL = 'jonreed1978@gmail.com'
export const FORM_SUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${FORM_SUBMIT_EMAIL}`

/**
 * Send a form payload through FormSubmit (AJAX).
 * @param {Record<string, string | number | boolean | undefined | null>} fields
 */
export async function sendFormSubmit(fields) {
  const body = new FormData()
  Object.entries(fields).forEach(([key, value]) => {
    if (value === undefined || value === null) return
    body.append(key, String(value))
  })

  const res = await fetch(FORM_SUBMIT_ENDPOINT, {
    method: 'POST',
    body,
    headers: { Accept: 'application/json' },
  })

  if (!res.ok) {
    throw new Error(`FormSubmit failed (${res.status})`)
  }

  return res.json().catch(() => ({}))
}
