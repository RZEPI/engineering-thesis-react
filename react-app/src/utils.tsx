export function subtractWithSaturation8bit(amount: number, value: number) {
  const retVal = value - amount < 0 ? 0 : value - amount;
  return retVal;
}
