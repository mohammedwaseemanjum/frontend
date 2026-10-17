import { useMemo, type Context } from "react";
import type { TableContextValue, TableRootProps } from "@component/Table/DataTable/types";
import Pagination from "@component/Table/DataTable/pagination";
import PageLimit from "@component/Table/DataTable/pageLimit";

const createRoot = <T,>(
  TableContext: Context<TableContextValue<T> | null>,
) => {
  return function Root({ children, data, nextCursor, prevCursor, totalCount }: TableRootProps<T>) {
    const value = useMemo<TableContextValue<T>>(
      () => ({ rows: data }),
      [data],
    );

    return (
      <TableContext.Provider value={value}>
        <PageLimit />

        <table className="table-fixed w-full shadow-md border-0 border-separate border-spacing-0 rounded-md">
          {children}
        </table>

        <Pagination 
          nextCursor={nextCursor}
          prevCursor={prevCursor}
          totalCount={totalCount}
        />
      </TableContext.Provider>
    );
  };
};

export { createRoot }