import { TableRowData } from "./TableRowData";

export type TableContentProps = {
  tableContent: TableRowData[];
  openFilterDialog: () => void;
  tableFields: string[];
};
