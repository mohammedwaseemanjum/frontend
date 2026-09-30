import { mergeClass } from "@/utils/tailwind";
import {
    createContext,
    useContext,
    useMemo,
    type ReactNode,
    type ThHTMLAttributes,
    type TdHTMLAttributes,
  } from "react";
  
  interface TableContextValue<T> {
    rows: Array<T>;
  }

  interface TableRootProps<T> {
    data: Array<T>;
    children: ReactNode;
  }
  
  interface BodyProps<T> {
    children: (row: T, index: number) => ReactNode;
    empty?: ReactNode;
  } 

  export const createTable = <T,> () => {
    const TableContext = createContext<TableContextValue<T> | null>(null);

    const useTableContext = (part: string): TableContextValue<T> => {
        const ctx = useContext(TableContext);

        if (!ctx) {
          throw new Error(`<Table.${part}> must be rendered inside <Table>.`);
        }

        return ctx;
    }

    const Root = ({ children, data }: TableRootProps<T>) => {
        const rows = useMemo(() => data, [data]);

        const value = useMemo<TableContextValue<T>>(
            () => ({ rows }),
            [rows],
        );

        return (
            <TableContext.Provider value={value}>
                <table className="table-fixed w-full">
                    { children }
                </table>
            </TableContext.Provider>
        )
    }

    const Header = ({ children }: { children:ReactNode }) => {
        return (
            <thead>
                <tr className="">{children}</tr>
            </thead>
        )
    }

    const HeaderCell = ({ children, className }: ThHTMLAttributes<HTMLTableCellElement>) => {
        return (
            <th className={mergeClass('bg-gray-200 p-3 text-left', className)}>
                { children }
            </th>
        )
    }

    const Body = ({ children }: BodyProps<T>) => {
        const { rows } = useTableContext("Body");

        return (
            <tbody>
                { rows.map((row, index) => children(row, index)) }
            </tbody>
        )
    }

    const Row = ({ children }: TdHTMLAttributes<HTMLTableRowElement>) => {
        return (
            <tr className='border-b border-l border-r border-gray-100 even:bg-gray-50'>
              { children }
            </tr>
        );
    }

    const Cell = ({ children, className }: TdHTMLAttributes<HTMLTableCellElement>) => {
        return (
            <td className={mergeClass('p-3', className)}>
              { children }
            </td>
        );
    }

    return Object.assign(Root, { Body, Header, HeaderCell, Row, Cell });
  }
  