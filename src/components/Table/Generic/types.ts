import { type ReactNode } from "react";

export interface TableContextValue<T> {
    rows: Array<T>;
}

export interface TableRootProps<T> {
    data: Array<T>;
    children: ReactNode;
}
  
export interface BodyProps<T> {
    children: (row: T, index: number) => ReactNode;
    empty?: ReactNode;
} 