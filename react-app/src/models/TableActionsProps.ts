import { TableRowData } from "./TableRowData";
export type TableActionsProps = {
  tableContent: TableRowData[];
  setContent: (data: TableRowData[]) => void;
};
