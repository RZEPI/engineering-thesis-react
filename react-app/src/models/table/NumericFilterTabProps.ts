import { IntFilter } from "./TableFilter";

export type NumericFilterTabProps = {
    currentFilter: IntFilter;
    activeTab: string;
    handleIsOpenChange: (e:  React.ChangeEvent<HTMLInputElement>) => void;
    handleNumericInputChange: (e:  React.ChangeEvent<HTMLInputElement>) => void;
};