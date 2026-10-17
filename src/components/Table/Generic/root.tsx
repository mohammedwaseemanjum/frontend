import { useMemo, type Context } from "react";
import type { TableContextValue, TableRootProps } from "@component/Table/Generic/types";

const createRoot = <T,>(
  TableContext: Context<TableContextValue<T> | null>,
) => {
  return function Root({ children, data }: TableRootProps<T>) {
    const value = useMemo<TableContextValue<T>>(
      () => ({ rows: data }),
      [data],
    );

    return (
      <TableContext.Provider value={value}>
        <table className="table-fixed w-full">
          {children}
        </table>
      </TableContext.Provider>
    );
  };
};

export { createRoot }