// Lightweight character-level diff for showing exactly where a wrong
// answer went astray. Not a full LCS/Myers diff - just aligns from the
// left and from the right and marks the mismatched middle, which is
// enough for single-word verb forms (no reordering to worry about).
export function charDiff(input, expected) {
  const a = input, b = expected
  let start = 0
  while (start < a.length && start < b.length && a[start] === b[start]) start++

  let endA = a.length, endB = b.length
  while (endA > start && endB > start && a[endA - 1] === b[endB - 1]) {
    endA--
    endB--
  }

  return {
    prefix: b.slice(0, start),
    typedMiddle: a.slice(start, endA),
    expectedMiddle: b.slice(start, endB),
    suffix: b.slice(endB),
  }
}
