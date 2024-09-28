export type IntFilter ={
    min: number | undefined;
    max: number | undefined;
    isOpen: boolean;
}

export type StringFilter = {
    value: string;
    isChecked: boolean;
}

export type TableFilter = {
    id: IntFilter;
    name: StringFilter[];
    level: IntFilter;
}