export type IntFilter = {
  min: number | undefined;
  max: number | undefined;
  isOpen: boolean;
};

export type StringFilter = {
  value: string;
  isChecked: boolean;
};

export type TableFilter = {
  id: IntFilter;
  name: StringFilter[];
  level: IntFilter;
};

export type FieldType<K extends keyof TableFilter> = TableFilter[K];

export type IdType = FieldType<"id">;
export type NameType = FieldType<"name">;
export type LevelType = FieldType<"level">;

export function getFieldByType<K extends keyof TableFilter>(
  filter: TableFilter,
  field: K,
): FieldType<K> {
  return filter[field];
}
