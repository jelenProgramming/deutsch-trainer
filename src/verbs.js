// Present-tense (Präsens) conjugations of common German verbs.
// Pronoun order: ich, du, er/sie/es, wir, ihr, sie/Sie
export const PRONOUNS = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie']

export const VERBS = [
  { inf: 'sein', en: 'to be', group: 'irregular', forms: ['bin', 'bist', 'ist', 'sind', 'seid', 'sind'] },
  { inf: 'haben', en: 'to have', group: 'irregular', forms: ['habe', 'hast', 'hat', 'haben', 'habt', 'haben'] },
  { inf: 'werden', en: 'to become', group: 'irregular', forms: ['werde', 'wirst', 'wird', 'werden', 'werdet', 'werden'] },
  { inf: 'gehen', en: 'to go', group: 'regular', forms: ['gehe', 'gehst', 'geht', 'gehen', 'geht', 'gehen'] },
  { inf: 'kommen', en: 'to come', group: 'regular', forms: ['komme', 'kommst', 'kommt', 'kommen', 'kommt', 'kommen'] },
  { inf: 'machen', en: 'to do / make', group: 'regular', forms: ['mache', 'machst', 'macht', 'machen', 'macht', 'machen'] },
  { inf: 'finden', en: 'to find', group: 'regular', forms: ['finde', 'findest', 'findet', 'finden', 'findet', 'finden'] },
  { inf: 'sehen', en: 'to see', group: 'irregular', forms: ['sehe', 'siehst', 'sieht', 'sehen', 'seht', 'sehen'] },
  { inf: 'sprechen', en: 'to speak', group: 'irregular', forms: ['spreche', 'sprichst', 'spricht', 'sprechen', 'sprecht', 'sprechen'] },
  { inf: 'fahren', en: 'to drive', group: 'irregular', forms: ['fahre', 'fährst', 'fährt', 'fahren', 'fahrt', 'fahren'] },
  { inf: 'essen', en: 'to eat', group: 'irregular', forms: ['esse', 'isst', 'isst', 'essen', 'esst', 'essen'] },
  { inf: 'lesen', en: 'to read', group: 'irregular', forms: ['lese', 'liest', 'liest', 'lesen', 'lest', 'lesen'] },
  { inf: 'nehmen', en: 'to take', group: 'irregular', forms: ['nehme', 'nimmst', 'nimmt', 'nehmen', 'nehmt', 'nehmen'] },
  { inf: 'geben', en: 'to give', group: 'irregular', forms: ['gebe', 'gibst', 'gibt', 'geben', 'gebt', 'geben'] },
  { inf: 'wissen', en: 'to know', group: 'irregular', forms: ['weiß', 'weißt', 'weiß', 'wissen', 'wisst', 'wissen'] },
  { inf: 'können', en: 'can / to be able', group: 'modal', forms: ['kann', 'kannst', 'kann', 'können', 'könnt', 'können'] },
  { inf: 'müssen', en: 'must / to have to', group: 'modal', forms: ['muss', 'musst', 'muss', 'müssen', 'müsst', 'müssen'] },
  { inf: 'wollen', en: 'to want', group: 'modal', forms: ['will', 'willst', 'will', 'wollen', 'wollt', 'wollen'] },
  { inf: 'sollen', en: 'should', group: 'modal', forms: ['soll', 'sollst', 'soll', 'sollen', 'sollt', 'sollen'] },
  { inf: 'dürfen', en: 'may / to be allowed', group: 'modal', forms: ['darf', 'darfst', 'darf', 'dürfen', 'dürft', 'dürfen'] },
  { inf: 'mögen', en: 'to like', group: 'modal', forms: ['mag', 'magst', 'mag', 'mögen', 'mögt', 'mögen'] },
  { inf: 'anrufen', en: 'to call (up)', group: 'separable', forms: ['rufe an', 'rufst an', 'ruft an', 'rufen an', 'ruft an', 'rufen an'] },
  { inf: 'aufstehen', en: 'to get up', group: 'separable', forms: ['stehe auf', 'stehst auf', 'steht auf', 'stehen auf', 'steht auf', 'stehen auf'] },
  { inf: 'einkaufen', en: 'to shop', group: 'separable', forms: ['kaufe ein', 'kaufst ein', 'kauft ein', 'kaufen ein', 'kauft ein', 'kaufen ein'] },
  { inf: 'ankommen', en: 'to arrive', group: 'separable', forms: ['komme an', 'kommst an', 'kommt an', 'kommen an', 'kommt an', 'kommen an'] },
  { inf: 'fernsehen', en: 'to watch TV', group: 'separable', forms: ['sehe fern', 'siehst fern', 'sieht fern', 'sehen fern', 'seht fern', 'sehen fern'] },
]

// Perfekt (present perfect) drill set, focused on the haben/sein auxiliary
// choice: verbs of motion or change of state take sein, nearly everything
// else takes haben. Each card asks only for the finite auxiliary that goes
// with the participle - that's the part learners actually get wrong, not
// the participle itself.
export const PERFEKT_PRONOUNS = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie']

const HABEN_FORMS = ['habe', 'hast', 'hat', 'haben', 'habt', 'haben']
const SEIN_FORMS = ['bin', 'bist', 'ist', 'sind', 'seid', 'sind']

export const PERFEKT_VERBS = [
  { inf: 'gehen', en: 'to go', aux: 'sein', partizip: 'gegangen' },
  { inf: 'kommen', en: 'to come', aux: 'sein', partizip: 'gekommen' },
  { inf: 'fahren', en: 'to drive', aux: 'sein', partizip: 'gefahren' },
  { inf: 'laufen', en: 'to run / walk', aux: 'sein', partizip: 'gelaufen' },
  { inf: 'fliegen', en: 'to fly', aux: 'sein', partizip: 'geflogen' },
  { inf: 'schwimmen', en: 'to swim', aux: 'sein', partizip: 'geschwommen' },
  { inf: 'aufstehen', en: 'to get up', aux: 'sein', partizip: 'aufgestanden' },
  { inf: 'werden', en: 'to become', aux: 'sein', partizip: 'geworden' },
  { inf: 'bleiben', en: 'to stay', aux: 'sein', partizip: 'geblieben' },
  { inf: 'sterben', en: 'to die', aux: 'sein', partizip: 'gestorben' },
  { inf: 'machen', en: 'to do / make', aux: 'haben', partizip: 'gemacht' },
  { inf: 'sehen', en: 'to see', aux: 'haben', partizip: 'gesehen' },
  { inf: 'essen', en: 'to eat', aux: 'haben', partizip: 'gegessen' },
  { inf: 'trinken', en: 'to drink', aux: 'haben', partizip: 'getrunken' },
  { inf: 'lesen', en: 'to read', aux: 'haben', partizip: 'gelesen' },
  { inf: 'kaufen', en: 'to buy', aux: 'haben', partizip: 'gekauft' },
  { inf: 'schreiben', en: 'to write', aux: 'haben', partizip: 'geschrieben' },
  { inf: 'sprechen', en: 'to speak', aux: 'haben', partizip: 'gesprochen' },
  { inf: 'haben', en: 'to have', aux: 'haben', partizip: 'gehabt' },
  { inf: 'spielen', en: 'to play', aux: 'haben', partizip: 'gespielt' },
]

export function pronounFor(card) {
  return card.tense === 'perfekt' ? PERFEKT_PRONOUNS[card.idx] : PRONOUNS[card.idx]
}

export function expectedFor(card) {
  if (card.tense === 'perfekt') {
    const forms = card.verb.aux === 'sein' ? SEIN_FORMS : HABEN_FORMS
    return forms[card.idx]
  }
  return card.verb.forms[card.idx]
}

// Lenient compare: case-insensitive, accepts ae/oe/ue for umlauts and ss for ß.
export function normalize(s) {
  return s
    .trim()
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
}

export function isCorrect(answer, expected) {
  return normalize(answer) === normalize(expected)
}
