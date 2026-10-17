import { type ReactNode } from "react";

export interface TableContextValue<T> {
    rows: Array<T>;
}

export interface TableRootProps<T> {
    data: Array<T>;
    children: ReactNode;
    nextCursor?: string;
    prevCursor?: string;
    totalCount?: number;
}
  
export interface BodyProps<T> {
    children: (row: T, index: number) => ReactNode;
    empty?: ReactNode;
}

export interface DataTableI {
    page: number;
    setPage: (page:number) => void;
    limit: number;
    setLimit: (page:number) => void;
    cursor: string;
    setCursor: (cursor:string) => void;
}