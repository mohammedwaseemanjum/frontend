import { createContext, useContext } from "react";

import type { TableContextValue } from "./types";

import { createRoot } from "@component/Table/Generic/root";
import { createBody } from "@component/Table/Generic/body";

import Header from "@component/Table/Generic/header";
import HeaderCell from "@component/Table/Generic/header/cell";
import Row from "@component/Table/Generic/row/";
import RowCell from "@component/Table/Generic/row/cell";

export const createTable = <T,> () => {
    const TableContext = createContext<TableContextValue<T> | null>(null);

    const useTableContext = (part: string): TableContextValue<T> => {
        const ctx = useContext(TableContext);

        if (!ctx) {
          throw new Error(`<Table.${part}> must be rendered inside <Table>.`);
        }

        return ctx;
    }

    const Root = createRoot<T>(TableContext);
    const Body = createBody<T>(useTableContext);

    return Object.assign(Root, { Body, Header, HeaderCell, Row, Cell: RowCell });
}
  