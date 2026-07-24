// Leitner-box spaced repetition: 5 boxes, box 1 = drilled most often, box 5
// = drilled least. A card is identified by tense + infinitive (the pronoun
// shown alongside it is randomised separately and doesn't affect scheduling
// - "kennst du fahren" is one fact, not six). Correct answers promote a card
// one box up; wrong answers send it straight back to box 1. Picking a card
// is a weighted draw favouring low boxes, so weak verbs resurface far more
// often than ones already mastered.
const STORAGE_KEY = 'dt_leitner_v1'
const BOX_COUNT = 5
const BOX_WEIGHTS = [10, 6, 3, 2, 1] // index 0 = box 1 ... index 4 = box 5

export function cardId(tense, verbInf) {
  return `${tense}:${verbInf}`
}

export function loadLeitnerState() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return raw && typeof raw === 'object' ? raw : {}
  } catch {
    return {}
  }
}

function save(boxes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(boxes))
  } catch {
    // private mode / quota exceeded - keep going with in-memory state
  }
}

export function boxOf(boxes, id) {
  return boxes[id] || 1
}

export function promote(boxes, id) {
  const next = { ...boxes, [id]: Math.min(BOX_COUNT, boxOf(boxes, id) + 1) }
  save(next)
  return next
}

export function demote(boxes, id) {
  const next = { ...boxes, [id]: 1 }
  save(next)
  return next
}

// Weighted random pick: each candidate's weight comes from its current box,
// so cards in low boxes (new or recently missed) come up far more often.
export function pickWeighted(boxes, candidates, idOf) {
  const weights = candidates.map((c) => BOX_WEIGHTS[boxOf(boxes, idOf(c)) - 1])
  const total = weights.reduce((a, b) => a + b, 0)
  let roll = Math.random() * total
  for (let i = 0; i < candidates.length; i++) {
    roll -= weights[i]
    if (roll <= 0) return candidates[i]
  }
  return candidates[candidates.length - 1]
}

export function boxDistribution(boxes, candidates, idOf) {
  const counts = [0, 0, 0, 0, 0]
  for (const c of candidates) counts[boxOf(boxes, idOf(c)) - 1]++
  return counts
}
