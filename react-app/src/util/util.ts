import { CSSProperties } from "react";

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

export function parseCssEntries(entriesObject: CSSProperties) {
  const parsedEntries: { propertyKey: string; propertyValue: string }[] = [];

  for (const [propertyKey, propertyValue] of Object.entries(entriesObject)) {
    let parsedKey = "";

    for (const character of propertyKey) {
      const code = character.charCodeAt(0);

      if (code >= 65 && code <= 90) {
        parsedKey += "-" + character.toLowerCase();
      } else parsedKey += character;
    }

    parsedEntries.unshift({ propertyKey: parsedKey, propertyValue });
  }

  return parsedEntries;
}
