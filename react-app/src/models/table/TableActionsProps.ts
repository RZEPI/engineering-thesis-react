import { TableRowData } from "./TableRowData";
export type ActionFunctions = {
  addNRecords: (n: number) => void;
  deleteNRecords: (n: number) => void;
  deleteEveryNthRecord: (n: number) => void;
  updateNthRow: (n: number) => void;
  replaceAllRows: () => void;
  swapRows: () => void;
  clearRows: () => void;
};

export type TableActionsProps = {
  tableContent: TableRowData[];
  actionFunctions: ActionFunctions;
};
