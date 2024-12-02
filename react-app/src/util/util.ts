export function drawColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

export function subtractWithSaturation8bit(amount: number, value: number) {
  const retVal = value - amount < 0 ? 0 : value - amount;
  return retVal;
}
