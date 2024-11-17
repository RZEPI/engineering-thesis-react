import { TableFilter } from "./TableFilter";
import { Dispatch, SetStateAction } from "react";

export type TableFilterModalProps = {
    filter: TableFilter;
    setFilter: Dispatch<SetStateAction<TableFilter>>;
};