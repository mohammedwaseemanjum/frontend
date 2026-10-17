import { useMemo } from "react";
import { SkipBack, SkipForward } from "lucide-react";
import { useShallow } from "zustand/shallow";
import { useDataTableStore } from "@component/Table/DataTable/store";

interface PaginationI {
    nextCursor?: string;
    prevCursor?: string;
    totalCount?: number;
}

const Pagination = ({ nextCursor, prevCursor, totalCount }: PaginationI) => {
    const {
        page,
        limit,
        setPage,
        setCursor
    } = useDataTableStore(
        useShallow((state) => ({
            limit: state.limit,
            page: state.page,
            setLimit: state.setLimit,
            setPage: state.setPage,
            setCursor: state.setCursor,
        }))
    )

    const handleNext = () => {
        setCursor(nextCursor ?? '')
        setPage(page + 1)
    }

    const handlePrev = () => {
        setCursor(prevCursor ?? '')
        setPage(page - 1)
    }

    const paginationResponse = useMemo(() => {
      let tableRecords = limit
      const totalRecordsShown = limit * page

      if (limit < totalRecordsShown) {
        tableRecords = totalRecordsShown
      } 

      return {
        nextTableRecord: tableRecords,
        currentTableRecord: tableRecords - (limit - 1)
      }
    }, [limit, page])

    return (
        <div className="flex flex-row justify-between mt-4">
            <div>
            <p>Showing { paginationResponse.currentTableRecord } to { paginationResponse.nextTableRecord } of { totalCount } entries</p>
            </div>
            
            <div className="flex flex-row items-center justify-between w-[90px]">
            <button onClick={handlePrev} className="bg-gray-100 rounded-full p-3" disabled={prevCursor === null}>
                <SkipBack size={16}/>
            </button>
            <button onClick={handleNext} className="bg-gray-100 rounded-full p-3" disabled={nextCursor === null}>
                <SkipForward size={16}/>
            </button>
            </div>
        </div>
    )
}

export default Pagination