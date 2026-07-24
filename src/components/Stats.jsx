import { Flame, Target, Layers } from 'lucide-react'

// Accuracy is the one number that actually tells you how you're doing;
// streak rewards sustained focus in a session. Both are shown at full
// size. Box distribution is a compact bar showing how many cards have
// been promoted out of box 1, since that's the real measure of progress
// under a spaced-repetition scheme (raw "questions answered" isn't).
export default function Stats({ streak, accuracy, boxCounts }) {
  const totalCards = boxCounts.reduce((a, b) => a + b, 0)

  return (
    <div className="stats">
      <div className="statbox statbox--big">
        <Target className="statbox__ico" aria-hidden="true" />
        <div className="statbox__value">{accuracy}%</div>
        <div className="statbox__label">Accuracy</div>
      </div>
      <div className="statbox statbox--big">
        <Flame className="statbox__ico statbox__ico--flame" aria-hidden="true" />
        <div className="statbox__value">{streak}</div>
        <div className="statbox__label">Streak</div>
      </div>
      <div className="statbox statbox--wide">
        <div className="statbox__head">
          <Layers className="statbox__ico" aria-hidden="true" />
          <span className="statbox__label">Leitner boxes</span>
        </div>
        <div className="boxbar" title="Box 1 (drilled often) through box 5 (mastered)">
          {boxCounts.map((count, i) => (
            <div className="boxbar__seg" key={i} style={{ flexGrow: totalCards ? count : 1 }}>
              <span className="boxbar__count">{count}</span>
              <span className="boxbar__num">{i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
