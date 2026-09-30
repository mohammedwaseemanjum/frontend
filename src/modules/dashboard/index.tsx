import Input from "@/components/Input"
import { useController, useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputForm from "@/components/Input/InputForm";
import {Dropdown,DropdownItem,DropdownMenu,DropdownTrigger} from "@/components/Dropdown";
import { useEffect, useRef, useState } from "react";
import {DrawerHeader,Drawer,DrawerBody} from "@/components/Drawer";
import api from "@/utils/api";

import { useUserStore } from "@/stores/user";
import { useShallow } from 'zustand/react/shallow';
import { Popup } from "@/components/Popup";
import { Auth } from "@/services/auth";
import { useAuth } from '@contexts/auth.context';


// import TableHeader from '@/components/Table/TableHeader';
// import TableRow from '@/components/Table/TableRow';
// import Table from '@component/Table'
import type { ColumnDefinitionType } from '@component/Table/types'

interface StoreI {
  id: number;
  name: string;
  fullName: string;
}

const column: ColumnDefinitionType<StoreI>[] = [
  {
      key: 'id',
      header: 'Id',
      format: (row) => <span className='text-lg'>{ row.id }</span>
  },
  {
      key: 'name',
      header: 'Name',
      format: (row) => <span className='text-lg'>{ row.name }</span>
  },
]

import { createTable } from '@modules/dashboard/tableData'
import { SkipBack, SkipForward } from "lucide-react";
import Merchant from '@modules/merchant';

const StoreTable = createTable<StoreI>()

const Dashboard:React.FC = () => {
    const { logout } = useAuth();

    const { user, setUser } = useUserStore(
      useShallow((state) => ({
        user: state.user,
        setUser: state.setUser,
      }))
    )

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [limit, setLimit] = useState<any>(5)
    const [pagination, setPagination] = useState<any>(undefined)
    const [data, setData] = useState<StoreI[]>([])
    const currenCursor = useRef<number>(0)
    const [page,setPage] = useState(1)

    const fetchUser = () => {
      api.get('me').then((res) => {
        setUser(res.data)
      }).catch(() => setIsPopupOpen(!isPopupOpen))
    }

    const fetchStores = (cursor:number,limit:number) => {
      // api.get(`stores?cursor=${cursor}&limit=${limit}`).then((res) => {
      //   setData(res.data.data)
      //   setPagination(res.data.meta)
      // })
    }

    useEffect(() => {
      //fetchStores(currenCursor.current, limit)
      console.log(user)
    }, [])

    const handleNextPage = () => {
      currenCursor.current = pagination?.nextCursor
      setPage(page + 1)
      fetchStores(currenCursor.current, limit)
    }

    const handlePreviosPage = () => {
      currenCursor.current = pagination?.previousCursor
      setPage(page - 1)
      fetchStores(currenCursor.current - limit, limit)
    }

    const handleSetPageLimit = (limitD: number) => {
      fetchStores(currenCursor.current, limitD)
      setLimit(limitD)
    }

    return (
        <div className="m-10">
          { JSON.stringify(user ?? '') }
          <button onClick={() => {
            api.post('logout').then(() => {
              useUserStore.persist.clearStorage()
              logout()
          }).catch(() => {
            useUserStore.persist.clearStorage()
              logout()
          })
          }}>Logout</button>
          <button onClick={fetchUser}>Fetch yuser</button>

          <div>
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

            <div className="py-4">
              <StoreTable data={data}>
                <StoreTable.Header>
                  <StoreTable.HeaderCell>Full Name</StoreTable.HeaderCell>
                  <StoreTable.HeaderCell>Name</StoreTable.HeaderCell>
                </StoreTable.Header>
                <StoreTable.Body>
                  {(store, index) => (
                    <StoreTable.Row key={index}>
                      <StoreTable.Cell>{store.fullName}</StoreTable.Cell>
                      <StoreTable.Cell>{store.name}</StoreTable.Cell>
                    </StoreTable.Row>
                  )}
                </StoreTable.Body>
              </StoreTable>
            </div>

            <div className="flex flex-row justify-between">
              <div>
                <p>Showing { page } to {limit} of { pagination?.totalCount } entries</p>
              </div>
              <div className="flex flex-row items-center justify-between w-[90px]">
                <div onClick={handlePreviosPage} className="bg-gray-100 rounded-full p-3">
                  <SkipBack size={16}/>
                </div>
                <div onClick={handleNextPage} className="bg-gray-100 rounded-full p-3">
                  <SkipForward size={16}/>
                </div>
              </div>
            </div>
          </div>

          {/* <Dropdown>
            <DropdownLabel>{selectedUser}</DropdownLabel>
            <DropdownTrigger> Options </DropdownTrigger>
            <DropdownMenu>
              {users.map((user, index) => (
                <DropdownItem onSelect={() => field.onChange(user.name)} key={index}>{user.name}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          <div className="flex flex-col mt-4">
            <div>
              <InputForm id="email" type="email" control={control} name={'email'} label="Email"/>
            </div>

            <div>
              <InputForm id="password" type="password" control={control} name={'password'} label="Password"/>
            </div>
          </div> 

          <button onClick={handleSubmit(onSubmit)}>submit</button>
          <button onClick={() => setDrawer(!drawer)}>open drawer</button>

          <Drawer isOpen={drawer} onClose={()=>setDrawer(!drawer)}>
            <DrawerHeader>
              <h2 className="text-lg font-semibold">Menu Panel</h2>
            </DrawerHeader>
            <DrawerBody>test</DrawerBody>
          </Drawer> */}
        </div>
    )
}

export default Dashboard