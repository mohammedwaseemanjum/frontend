import { Drawer, DrawerBody, DrawerHeader } from "@/components/Drawer";
import { createTable } from "@component/Table/DataTable"
import { useQuery } from "@tanstack/react-query";
import { userOptions } from "./queries/queryOptions";
import type { User } from "./queries/types";
import Form from "./form";

import useUserController from "./controller";
import { useShallow } from "zustand/shallow";
import { useDataTableStore } from "@/components/Table/DataTable/store";
import { Plus } from 'lucide-react';
import { userForm } from "./schema";

const useUsers = (page: string, limit: number) => {
  return useQuery(userOptions.list(page, limit));
};

const StoreTable = createTable<User>()

const UserManagement = () => {
    const {
      limit,
      cursor
    } = useDataTableStore(
      useShallow((state) => ({
        setLimit: state.setLimit,
        limit: state.limit,
        cursor: state.cursor
      }))
    )

    const { 
      handleEdit,
      isDrawerOpen,
      setDrawerOpen
    } = useUserController()

    const { data } = useUsers(cursor, limit)

    return (
        <div>
            <div>
              <span className="text-4xl font-bold">User Management</span>
            </div>
            <div className="bg-blue-500 rounded-md text-center cursor-pointer ml-auto w-[100px] px-4 py-3" onClick={() => {
              userForm.reset()
              userForm.clearErrors()
              setDrawerOpen(true)
            }}>
                <div className="flex flex-row items-center justify-center">
                  <Plus size={18} color="#ffff"/>
                  <span className="font-bold text-white ml-1">Create</span>
                </div>
            </div>

            <Drawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
                <DrawerHeader>
                    <span className="font-bold text-4xl">Create User</span>
                </DrawerHeader>
                <DrawerBody>
                    <Form />
                </DrawerBody>
            </Drawer>

            <StoreTable 
              data={data?.data ?? []} 
              nextCursor={data?.meta.nextCursor} 
              prevCursor={data?.meta.prevCursor} 
              totalCount={data?.meta.totalCount}
            >
                <StoreTable.Header>
                  <StoreTable.HeaderCell>Full Name</StoreTable.HeaderCell>
                  <StoreTable.HeaderCell>Email</StoreTable.HeaderCell>
                  <StoreTable.HeaderCell>Role</StoreTable.HeaderCell>
                  <StoreTable.HeaderCell>Actions</StoreTable.HeaderCell>
                </StoreTable.Header>
                <StoreTable.Body>
                  {(user, index) => (
                    <StoreTable.Row key={index}>
                      <StoreTable.Cell>{user.name}</StoreTable.Cell>
                      <StoreTable.Cell>{user.email}</StoreTable.Cell>
                      <StoreTable.Cell>{user.roles.join('')}</StoreTable.Cell>
                      <StoreTable.Cell>
                        <button onClick={() => handleEdit(user)}>Edit</button>
                        <button>Delete</button>
                      </StoreTable.Cell>
                    </StoreTable.Row>
                  )}
                </StoreTable.Body>
            </StoreTable>
        </div>
    )
}

export default UserManagement