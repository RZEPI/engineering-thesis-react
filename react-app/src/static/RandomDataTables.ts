import { StringFilter, TableFilter } from "../models/table/TableFilter";
import { TableRowData } from "../models/table/TableRowData";

export const numberTable: number[] = [
  21, 2, 43, 54, 65, 476, 37, 83, 109, 1610, 211, 312, 413, 514, 615,
];

export const namesTable: string[] = [
  "Marcel",
  "Tomek",
  "Agata",
  "Miłosz",
  "Damian",
  "Krzysiek",
  "Ola",
  "Ala",
  "Łukasz",
  "Paweł"
];

export function makeDefaultFilter():TableFilter {
  const nameFilters: StringFilter[] =  namesTable.map((name) => ({ value: name, isChecked: true }));
  return {
    id: { min: undefined, max: undefined, isOpen: false },
    name: nameFilters,
    level: { min: undefined, max: undefined, isOpen: false },
  };
};

const tableDummyRow: TableRowData = {
  id: 0,
  name: "Name",
  level: 0,
};

export const tableFields = Object.keys(tableDummyRow).map((key) =>
  key.toUpperCase(),
);