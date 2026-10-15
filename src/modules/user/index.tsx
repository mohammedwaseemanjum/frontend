import { Drawer, DrawerBody, DrawerHeader } from "@/components/Drawer";
import { useMemo, useState } from "react";
import { createTable } from "../dashboard/tableData";
import { useQuery } from "@tanstack/react-query";
import { userOptions } from "./queries/queryOptions";
import type { User } from "./queries/types";
import Form from "./form";
import { SkipBack, SkipForward } from "lucide-react";
import {Dropdown,DropdownItem,DropdownMenu,DropdownTrigger} from "@/components/Dropdown";

const useUsers = (page: string, limit: number) => {
  return useQuery(userOptions.list(page, limit));
};

// const useFilteredUsers = (filters:string) => {
//     return useQuery(userOptions.list(filters))
// }

const StoreTable = createTable<User>()

const UserManagement = () => {
    const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false)
    const [cursor, setCursor] = useState<string>('')
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(2)

    const { data, error, isPlaceholderData } = useUsers(cursor, limit)

    const handleNext = () => {
        setCursor(data?.meta?.nextCursor)
        const pageMultiplier = page + 1

        setPage(page + 1)
    }

    const handlePrev = () => {
        setCursor(data?.meta?.prevCursor)
        //setPage(data?.meta?.limit - 1)
    }

    const handleSetPageLimit = (limit) => {
        setLimit(limit)
    }

    const pageOne = useMemo(() => {
        const totalRecordsShown = limit * page

        if (limit > totalRecordsShown) {
            return limit
        } else {
            return totalRecordsShown
        }
    }, [limit, page])

    const pageTwo = useMemo(() => {
        const totalRecordsShown = limit * page
        const totalLimit = page + limit

        console.log(totalRecordsShown)

        return pageOne - 1

    }, [limit, page])

    return (
        <div>
            <div className="bg-blue-500 rounded-md p-3 text-center cursor-pointer w-[150px]" onClick={() => setDrawerOpen(true)}>
                <span className="font-bold text-white">Add</span>
            </div>

            <Drawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
                <DrawerHeader>
                    <span className="font-bold text-4xl">Create User</span>
                </DrawerHeader>
                <DrawerBody>
                    <Form />
                </DrawerBody>
            </Drawer>

            <div>
              <Dropdown>
                <DropdownTrigger>{limit}</DropdownTrigger>
                <DropdownMenu>
                  {[5,10,15].map((limit, index) => (
                     <DropdownItem onSelect={() => handleSetPageLimit(limit)} key={index}>{limit}</DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>

            <StoreTable data={data?.data ?? []}>
                <StoreTable.Header>
                  <StoreTable.HeaderCell>Full Name</StoreTable.HeaderCell>
                  <StoreTable.HeaderCell>Email</StoreTable.HeaderCell>
                  <StoreTable.HeaderCell>Role</StoreTable.HeaderCell>
                </StoreTable.Header>
                <StoreTable.Body>
                  {(store, index) => (
                    <StoreTable.Row key={index}>
                      <StoreTable.Cell>{store.name}</StoreTable.Cell>
                      <StoreTable.Cell>{store.email}</StoreTable.Cell>
                      <StoreTable.Cell>{store.roles.join('')}</StoreTable.Cell>
                    </StoreTable.Row>
                  )}
                </StoreTable.Body>
            </StoreTable>

            <div className="flex flex-row justify-between">
              <div>
                <p>Showing { pageTwo } to { pageOne } of { data?.meta?.totalCount } entries</p>
              </div>
              <div className="flex flex-row items-center justify-between w-[90px]">
                <button onClick={handlePrev} className="bg-gray-100 rounded-full p-3" disabled={data?.meta?.prevCursor === null}>
                  <SkipBack size={16}/>
                </button>
                <button onClick={handleNext} className="bg-gray-100 rounded-full p-3" disabled={data?.meta?.nextCursor === null}>
                  <SkipForward size={16}/>
                </button>
              </div>
            </div>
        </div>
    )
}

export default UserManagement