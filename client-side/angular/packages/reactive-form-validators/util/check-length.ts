export function checkLength(length: number, checks: number[]): boolean {
  let isPassed = false;
  for (let check of checks) {
    isPassed = (check == length)
    if (isPassed)
      break;
  }
  return isPassed;
}
