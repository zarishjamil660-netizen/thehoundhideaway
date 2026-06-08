import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BOOKING_DOG_COUNTS, BOOKING_SUITES } from '../data/bookingServices'
import './BookNowPage.css'

const STEP_COUNT = 3

const INITIAL_FORM = {
  suiteId: '',
  dogCount: 1,
  checkIn: '',
  checkOut: '',
  name: '',
  email: '',
  phone: '',
  dogNames: '',
  notes: '',
}

function suiteLabel(suiteId) {
  return BOOKING_SUITES.find(s => s.id === suiteId)?.label ?? ''
}

export function BookNowPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState(INITIAL_FORM)

  const selectedSuite = useMemo(
    () => BOOKING_SUITES.find(s => s.id === form.suiteId),
    [form.suiteId],
  )

  const update = (patch) => setForm(prev => ({ ...prev, ...patch }))

  const canAdvance = useMemo(() => {
    if (step === 1) return Boolean(form.suiteId) && form.dogCount >= 1
    if (step === 2) return Boolean(form.checkIn && form.checkOut)
    if (step === 3) return Boolean(form.name.trim() && form.email.trim() && form.phone.trim())
    return false
  }, [step, form])

  const handleBack = () => {
    if (submitted) {
      navigate('/')
      return
    }
    if (step > 1) {
      setStep(s => s - 1)
      return
    }
    navigate(-1)
  }

  const handleNext = (e) => {
    e.preventDefault()
    if (!canAdvance) return
    if (step < STEP_COUNT) {
      setStep(s => s + 1)
      return
    }
    setSubmitted(true)
  }

  return (
    <main className="book-now thh-page--book-now">
      <div className="book-now__shell">
        <header className="book-now__top">
          <button type="button" className="book-now__back" onClick={handleBack}>
            back
          </button>
          {!submitted ? (
            <p className="book-now__progress" aria-live="polite">
              {step} / {STEP_COUNT}
            </p>
          ) : null}
        </header>

        <div className="book-now__panel">
          {submitted ? (
            <div className="book-now__done">
              <h1 className="book-now__title">Request received</h1>
              <p className="book-now__lede">
                We&apos;ll be in touch soon to confirm{' '}
                {form.dogCount > 1 ? 'their stays' : 'their stay'} in{' '}
                <strong>{suiteLabel(form.suiteId)}</strong>.
              </p>
              <Link to="/" className="book-now__next book-now__next--primary">
                Back to home
              </Link>
            </div>
          ) : null}

          {!submitted && step === 1 ? (
            <form className="book-now__form" onSubmit={handleNext} noValidate>
              <h1 className="book-now__title">Choose a suite for their stay</h1>

              <label className="book-now__field">
                <span className="book-now__label">Select suite</span>
                <span className="book-now__select-wrap">
                  <select
                    className="book-now__select"
                    value={form.suiteId}
                    onChange={e => update({ suiteId: e.target.value })}
                    required
                  >
                    <option value="" disabled>
                      select option
                    </option>
                    {BOOKING_SUITES.map(suite => (
                      <option key={suite.id} value={suite.id}>
                        {suite.label} — {suite.price} {suite.priceNote}
                      </option>
                    ))}
                  </select>
                </span>
              </label>

              {selectedSuite ? (
                <p className="book-now__hint">
                  {selectedSuite.price} {selectedSuite.priceNote}
                </p>
              ) : null}

              <fieldset className="book-now__fieldset">
                <legend className="book-now__label">How many dogs?</legend>
                <div className="book-now__count-row" role="group" aria-label="Number of dogs">
                  {BOOKING_DOG_COUNTS.map(count => (
                    <button
                      key={count}
                      type="button"
                      className={`book-now__count${form.dogCount === count ? ' book-now__count--active' : ''}`}
                      aria-pressed={form.dogCount === count}
                      onClick={() => update({ dogCount: count })}
                    >
                      {count}
                    </button>
                  ))}
                </div>
              </fieldset>

              <button type="submit" className="book-now__next" disabled={!canAdvance}>
                next
              </button>
            </form>
          ) : null}

          {!submitted && step === 2 ? (
            <form className="book-now__form" onSubmit={handleNext} noValidate>
              <h1 className="book-now__title">When would they like to stay?</h1>

              <label className="book-now__field">
                <span className="book-now__label">Check-in</span>
                <input
                  type="date"
                  className="book-now__input"
                  value={form.checkIn}
                  min={new Date().toISOString().slice(0, 10)}
                  onChange={e => update({ checkIn: e.target.value })}
                  required
                />
              </label>

              <label className="book-now__field">
                <span className="book-now__label">Check-out</span>
                <input
                  type="date"
                  className="book-now__input"
                  value={form.checkOut}
                  min={form.checkIn || new Date().toISOString().slice(0, 10)}
                  onChange={e => update({ checkOut: e.target.value })}
                  required
                />
              </label>

              <button type="submit" className="book-now__next" disabled={!canAdvance}>
                next
              </button>
            </form>
          ) : null}

          {!submitted && step === 3 ? (
            <form className="book-now__form" onSubmit={handleNext} noValidate>
              <h1 className="book-now__title">Your details</h1>

              <label className="book-now__field">
                <span className="book-now__label">Your name</span>
                <input
                  type="text"
                  className="book-now__input"
                  value={form.name}
                  onChange={e => update({ name: e.target.value })}
                  autoComplete="name"
                  required
                />
              </label>

              <label className="book-now__field">
                <span className="book-now__label">Email</span>
                <input
                  type="email"
                  className="book-now__input"
                  value={form.email}
                  onChange={e => update({ email: e.target.value })}
                  autoComplete="email"
                  required
                />
              </label>

              <label className="book-now__field">
                <span className="book-now__label">Phone</span>
                <input
                  type="tel"
                  className="book-now__input"
                  value={form.phone}
                  onChange={e => update({ phone: e.target.value })}
                  autoComplete="tel"
                  required
                />
              </label>

              <label className="book-now__field">
                <span className="book-now__label">Dog name{form.dogCount > 1 ? 's' : ''}</span>
                <input
                  type="text"
                  className="book-now__input"
                  value={form.dogNames}
                  onChange={e => update({ dogNames: e.target.value })}
                  placeholder={form.dogCount > 1 ? 'e.g. Max, Bella' : 'e.g. Max'}
                />
              </label>

              <label className="book-now__field">
                <span className="book-now__label">Notes (optional)</span>
                <textarea
                  className="book-now__textarea"
                  value={form.notes}
                  onChange={e => update({ notes: e.target.value })}
                  rows={3}
                />
              </label>

              <button type="submit" className="book-now__next book-now__next--primary" disabled={!canAdvance}>
                request booking
              </button>
            </form>
          ) : null}
        </div>
      </div>
    </main>
  )
}
