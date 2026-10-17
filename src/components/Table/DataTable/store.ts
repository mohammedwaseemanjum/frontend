import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer';
import type { DataTableI } from '@component/Table/DataTable/types';

export const useDataTableStore = create<DataTableI>()(
    immer((set) => ({
        page: 1,
        limit: 5,
        cursor: '',
        setPage:(page: number) => {
            set((state) => {
                state.page = page
            })
        },
        setLimit:(limit: number) => {
            set((state) => {
                state.limit = limit
            })
        },
        setCursor:(cursor: string) => {
            set((state) => {
                state.cursor = cursor
            })
        },
    })),
)