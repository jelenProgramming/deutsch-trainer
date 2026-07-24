# Konjugator - German Verb Trainer

A conjugation drill for German, built around how spaced repetition and
error patterns actually work rather than a static flashcard loop. You get
a pronoun and a verb, you type the form, it checks instantly and shows you
exactly which characters were wrong. No accounts, no backend - progress
lives in your browser.

## What it drills

- **Präsens** (present tense) across irregular, modal, regular, and
  separable-prefix verbs (`anrufen`, `aufstehen`, `einkaufen`, ...).
- **Perfekt** (present perfect), specifically the `haben` vs `sein`
  auxiliary choice - the single most common conjugation error for
  intermediate learners, and one that flashcard apps built around English
  speakers routinely skip.

Toggle "Nur Deutsch" in the header to drop the English glosses once you
don't need the crutch anymore.

## Why the drill order isn't random

Earlier versions of this trainer picked the next card with `Math.random()`
across the whole verb pool. That's the wrong model: it means a verb you've
nailed ten times in a row and one you keep botching are equally likely to
show up next, so review time gets wasted on what you already know instead
of what you don't.

The trainer now runs a small Leitner-box scheduler (`src/leitner.js`).
Every verb sits in one of five boxes; a correct answer promotes it one box
up, a wrong answer sends it straight back to box 1. Card selection is a
weighted draw over the current pool, biased hard toward low boxes -
roughly 10x more likely to draw from box 1 than box 5. State persists in
`localStorage`, so a verb you struggled with yesterday still gets
prioritized today. This is the same principle behind SuperMemo/Anki, just
without the interval-scheduling machinery those tools need for long-term
retention - for a drill you might run for ten minutes at a time, box
position is a good enough proxy for "how well do you know this."

## Why haben/sein gets its own mode, not just more Präsens verbs

Grammar references usually explain the auxiliary rule as "verbs of motion
or change of state take sein" and then hand you a list to memorize. In
practice, the rule holds up fine for prototypical cases (`gehen`,
`kommen`, `sterben`) but the pool of exceptions and near-exceptions is
exactly what causes hesitation in speech - `bleiben` isn't motion in any
literal sense, and learners transfer the "did the subject do something to
an object" instinct from French/Spanish `avoir`/`être` splits, which map
onto German only partially.

Rather than bury the auxiliary decision inside full participle recall
(where a wrong answer could mean you don't know the participle, the
auxiliary, or both), the Perfekt mode isolates the auxiliary as its own
question: you're given the participle and asked only to supply the
correctly conjugated `haben` or `sein`. That keeps the feedback loop
narrow enough to actually fix the specific gap instead of vaguely knowing
"I got that one wrong."

## Verb data

All conjugations live in `src/verbs.js`: `VERBS` for Präsens (six forms
each, ich/du/er-sie-es/wir/ihr/sie-Sie), `PERFEKT_VERBS` for the
haben/sein set (infinitive, auxiliary, and participle). Answers are
checked leniently - `ae`/`oe`/`ue`/`ss` are accepted in place of umlauts
and ß, since the point is testing the conjugation, not keyboard layout.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Lint

```bash
npm run lint
```

## Deploy

Static Vite build, no server-side pieces and no environment variables -
deploy the `dist/` output anywhere that serves static files.
