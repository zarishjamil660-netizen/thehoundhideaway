import './AnimatedText.css'

function splitText(text, mode) {
  if (mode === 'chars') return Array.from(text)
  return text.split(/(\s+)/).filter(Boolean)
}

export function AnimatedText({
  children,
  as: Tag = 'span',
  effect = 'ascend',
  split = 'words',
  delay = 0,
  stagger = 55,
  duration = 900,
  className = '',
  ...rest
}) {
  const text = typeof children === 'string' ? children : String(children ?? '')
  const units = splitText(text, split)

  return (
    <Tag
      className={['text-motion', `text-motion--${effect}`, `text-motion--${split}`, className]
        .filter(Boolean)
        .join(' ')}
      aria-label={text}
      {...rest}
    >
      {units.map((unit, index) => {
        const isSpace = /^\s+$/.test(unit)
        return (
          <span
            key={`${unit}-${index}`}
            className={`text-motion__unit${isSpace ? ' text-motion__unit--space' : ''}`}
            style={{
              '--tm-delay': `${delay + index * stagger}ms`,
              '--tm-duration': `${duration}ms`,
            }}
            aria-hidden="true"
          >
            {isSpace ? '\u00A0' : unit}
          </span>
        )
      })}
    </Tag>
  )
}
