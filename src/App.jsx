import { useMemo, useRef, useState } from 'react'
import { animate } from 'motion'
import { Check, ArrowRight } from 'lucide-react'
import { VERBS, PERFEKT_VERBS, pronounFor, expectedFor, isCorrect } from './verbs'
import { cardId, loadLeitnerState, boxOf, promote, demote, pickWeighted, boxDistribution } from './leitner'
import { charDiff } from './diff'
import Stats from './components/Stats'

const GROUPS = [
  { id: 'all',       de: 'Alle Verben',      en: 'All verbs' },
  { id: 'irregular', de: 'Unregelmäßige',    en: 'Irregular' },
  { id: 'modal',     de: 'Modalverben',      en: 'Modal' },
  { id: 'regular',   de: 'Regelmäßig',       en: 'Regular' },
  { id: 'separable', de: 'Trennbare Verben', en: 'Separable' },
]

const TENSES = [
  { id: 'praesens', de: 'Präsens',           en: 'Present' },
  { id: 'perfekt',  de: 'Perfekt (haben/sein)', en: 'Perfect (haben/sein)' },
]

function loadBest() {
  try { return Number(localStorage.getItem('dt_best_streak')) || 0 } catch { return 0 }
}

function poolFor(tense, group) {
  if (tense === 'perfekt') return PERFEKT_VERBS
  return group === 'all' ? VERBS : VERBS.filter((v) => v.group === group)
}

function pickCard(tense, group, boxes) {
  const pool = poolFor(tense, group)
  const idOf = (verb) => cardId(tense, verb.inf)
  const verb = pickWeighted(boxes, pool, idOf)
  const idx = Math.floor(Math.random() * 6)
  return { tense, verb, idx, id: idOf(verb) }
}

// Confetti only fires on a streak milestone or the moment a card gets
// promoted to a new Leitner box - a burst that always means "you actually
// learned something" instead of firing on every single correct tap.
function burst() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const colors = ['#6b4bd6', '#3d2e5c', '#1c6b45', '#b02a4f', '#b35c00', '#d3cfe0']
  const cx = innerWidth / 2, cy = innerHeight * 0.42
  for (let i = 0; i < 26; i++) {
    const el = document.createElement('div')
    el.className = 'dt-confetti'
    el.style.background = colors[i % colors.length]
    document.body.appendChild(el)
    const ang = Math.random() * Math.PI * 2, dist = 120 + Math.random() * 220
    const dx = Math.cos(ang) * dist, dy = Math.sin(ang) * dist - 60
    el.animate(
      [
        { transform: `translate(${cx}px, ${cy}px) rotate(0deg)`, opacity: 1 },
        { transform: `translate(${cx + dx}px, ${cy + dy + 280}px) rotate(${(Math.random() * 720 - 360) | 0}deg)`, opacity: 0 },
      ],
      { duration: 900 + Math.random() * 500, easing: 'cubic-bezier(0.2,0.7,0.2,1)' },
    ).onfinish = () => el.remove()
  }
}

export default function App() {
  const [tense, setTense] = useState('praesens')
  const [group, setGroup] = useState('all')
  const [boxes, setBoxes] = useState(loadLeitnerState)
  const [card, setCard] = useState(() => pickCard('praesens', 'all', loadLeitnerState()))
  const [answer, setAnswer] = useState('')
  const [checked, setChecked] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [streak, setStreak] = useState(0)
  const [best, setBest] = useState(loadBest)
  const [seen, setSeen] = useState(0)
  const [right, setRight] = useState(0)
  const [immersive, setImmersive] = useState(() => {
    try { return localStorage.getItem('dt_immersive') === '1' } catch { return false }
  })

  const expected = expectedFor(card)
  const pronoun = pronounFor(card)
  const accuracy = useMemo(() => (seen ? Math.round((right / seen) * 100) : 0), [seen, right])
  const boxCounts = useMemo(
    () => boxDistribution(boxes, poolFor(tense, group), (verb) => cardId(tense, verb.inf)),
    [boxes, tense, group],
  )

  function next(t = tense, g = group, b = boxes) {
    setCard(pickCard(t, g, b))
    setAnswer('')
    setChecked(false)
    setCorrect(false)
  }

  const cardRef = useRef(null)

  function feedbackMotion(ok) {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !cardRef.current) return
    if (ok) animate(cardRef.current, { scale: [1, 1.035, 1] }, { duration: 0.45, type: 'spring', bounce: 0.55 })
    else animate(cardRef.current, { x: [0, -11, 9, -6, 4, 0] }, { duration: 0.45 })
  }

  function check() {
    if (!answer.trim()) return
    const ok = isCorrect(answer, expected)
    setChecked(true)
    setCorrect(ok)
    feedbackMotion(ok)
    setSeen((s) => s + 1)

    const prevBox = boxOf(boxes, card.id)
    const nextBoxes = ok ? promote(boxes, card.id) : demote(boxes, card.id)
    setBoxes(nextBoxes)
    const promoted = ok && boxOf(nextBoxes, card.id) > prevBox

    if (ok) {
      setRight((r) => r + 1)
      const ns = streak + 1
      setStreak(ns)
      const milestone = ns > 0 && ns % 5 === 0
      if (milestone || promoted) burst()
      if (ns > best) {
        setBest(ns)
        try { localStorage.setItem('dt_best_streak', String(ns)) } catch { /* storage blocked, the streak just won't survive a reload */ }
      }
    } else {
      setStreak(0)
    }
  }

  function onSubmit(e) {
    e.preventDefault()
    if (checked) next(tense, group, boxes)
    else check()
  }

  function changeGroup(g) {
    setGroup(g)
    next(tense, g, boxes)
  }

  function changeTense(t) {
    setTense(t)
    next(t, group, boxes)
  }

  // Both language modes are rendered as separate buttons rather than one
  // flipping toggle, so a learner can see what the alternative is before
  // committing to it. Same state, same storage key as before.
  function setImmersion(next) {
    setImmersive(next)
    try { localStorage.setItem('dt_immersive', next ? '1' : '0') } catch { /* storage blocked, the choice just won't survive a reload */ }
  }

  const diff = checked && !correct ? charDiff(answer.trim(), expected) : null

  return (
    <div className="app">
      <header className="head">
        <div className="head__row">
          <h1 className="title">Konjugationstrainer</h1>
          <div className="lang" role="group" aria-label="Sprache der Hinweise / gloss language">
            <button
              type="button"
              className={`lang__opt ${!immersive ? 'lang__opt--on' : ''}`}
              onClick={() => setImmersion(false)}
              aria-pressed={!immersive}
              title="Show English glosses alongside the German"
            >
              DE + EN
            </button>
            <button
              type="button"
              className={`lang__opt ${immersive ? 'lang__opt--on' : ''}`}
              onClick={() => setImmersion(true)}
              aria-pressed={immersive}
              title="Hide English glosses for a harder drill"
            >
              Nur Deutsch
            </button>
          </div>
        </div>
        <p className="sub-de">Auf dieser Seite können Sie deutsche Verben üben. Wählen Sie eine Zeitform und eine Verbgruppe, lesen Sie den Satz und schreiben Sie die richtige Form des Verbs.</p>
        {!immersive && (
          <p className="sub-en">On this page you can practise German verbs. Choose a tense and a verb group, read the sentence and write the correct form of the verb.</p>
        )}
      </header>

      <div className="groups">
        {TENSES.map((t) => (
          <button
            key={t.id}
            className={`chip ${tense === t.id ? 'chip--on' : ''}`}
            onClick={() => changeTense(t.id)}
          >
            <span className="chip-de">{t.de}</span>
            {!immersive && <span className="chip-en">{t.en}</span>}
          </button>
        ))}
      </div>

      {tense === 'praesens' && (
        <div className="groups">
          {GROUPS.map((g) => (
            <button
              key={g.id}
              className={`chip ${group === g.id ? 'chip--on' : ''}`}
              onClick={() => changeGroup(g.id)}
            >
              <span className="chip-de">{g.de}</span>
              {!immersive && <span className="chip-en">{g.en}</span>}
            </button>
          ))}
        </div>
      )}

      <main ref={cardRef} className={`card ${checked ? (correct ? 'card--ok' : 'card--no') : ''}`}>
        <div className="prompt">
          <span className="prompt__pron">{pronoun}</span>
          <span className="prompt__blank">{'_'.repeat(Math.max(6, expected.length + 2))}</span>
        </div>

        <div className="prompt__verb">
          {tense === 'perfekt' ? (
            <>
              <span className="verb-de">{card.verb.partizip}</span>
              <span className="verb-rule" aria-hidden="true" />
              <span className="verb-de">{card.verb.inf}</span>
              {!immersive && (
                <>
                  <span className="verb-sep">(</span>
                  <span className="verb-en">{card.verb.en}</span>
                  <span className="verb-sep">)</span>
                </>
              )}
            </>
          ) : (
            <>
              <span className="verb-de">{card.verb.inf}</span>
              {!immersive && (
                <>
                  <span className="verb-sep">(</span>
                  <span className="verb-en">{card.verb.en}</span>
                  <span className="verb-sep">)</span>
                </>
              )}
            </>
          )}
        </div>

        <form onSubmit={onSubmit} className="answer">
          <input
            className="answer__input"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder={
              tense === 'perfekt'
                ? 'Schreiben Sie das Hilfsverb hier ... (write haben/sein here)'
                : 'Schreiben Sie das konjugierte Verb hier ... (write the conjugated verb here)'
            }
            autoFocus
            spellCheck={false}
            autoComplete="off"
            disabled={checked}
          />
          <button className="answer__btn" type="submit">
            {checked
              ? <><ArrowRight className="btn-ico" aria-hidden="true" /><span className="btn-de">Weiter</span>{!immersive && <span className="btn-en">Next</span>}</>
              : <><Check className="btn-ico" aria-hidden="true" /><span className="btn-de">Prüfen</span>{!immersive && <span className="btn-en">Check</span>}</>
            }
          </button>
        </form>

        {checked && (
          <div className={`feedback ${correct ? 'feedback--ok' : 'feedback--no'}`}>
            {correct ? (
              <span>Richtig!{!immersive && ' (Correct!)'}</span>
            ) : (
              <>
                <span>
                  Falsch. Die richtige Antwort ist: <strong>{pronoun} {expected}</strong>
                  {!immersive && <> (Wrong. The correct answer is: <strong>{pronoun} {expected}</strong>)</>}
                </span>
                {diff && (diff.typedMiddle || diff.expectedMiddle) && (
                  <div className="diff" aria-label="Character comparison">
                    <div className="diff__row">
                      <span className="diff__tag">You</span>
                      <span className="diff__word">
                        {diff.prefix}<span className="diff__bad">{diff.typedMiddle || '(nichts)'}</span>
                      </span>
                    </div>
                    <div className="diff__row">
                      <span className="diff__tag">Correct</span>
                      <span className="diff__word">
                        {diff.prefix}<span className="diff__good">{diff.expectedMiddle}</span>{diff.suffix}
                      </span>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </main>

      <Stats streak={streak} accuracy={accuracy} boxCounts={boxCounts} />
      <p className="best-streak">Best streak: <strong>{best}</strong></p>
      <footer className="site-foot">© 2026 David Jelen | <a href="https://github.com/jelenProgramming" target="_blank" rel="noopener noreferrer">jelenProgramming</a></footer>
    </div>
  )
}
