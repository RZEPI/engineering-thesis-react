import { TableFilter } from "./TableFilter";

export type TableFilterModalProps = {
    filter: TableFilter;
    setFilter: (filter: TableFilter) => void;
};