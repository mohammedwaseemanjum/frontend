import TableHeader from '@/components/Table/TableHeader';
import TableRow from '@/components/Table/TableRow';
import Table from '@component/Table'
import type { ColumnDefinitionType } from '@component/Table/types'
import { useState } from 'react';

interface Person {
    id: number;
    firstName: string;
    lastName: string;
    verified: boolean;
    isSelected?: boolean
}

const data: Array<Person> = [
    {
        id: 1,
        firstName: 'test',
        lastName: 'test123',
        verified: false,
    },
    {
        id: 2,
        firstName: 'test2',
        lastName: 'test1234',
        verified: true,
    }
]

const column: ColumnDefinitionType<Person>[] = [
    {
        key: 'id',
        header: 'Id',
        format: (row) => <span className='text-lg'>{ row.id }</span>
    },
    {
        key: 'firstName',
        header: 'First Name',
        format: (row) => <span className='text-lg'>{ row.firstName }</span>
    },
    {
        key: 'lastName',
        header: 'Last Name',
        format: (row) => <span className='text-lg'>{ row.lastName }</span>
    },
    {
        key: 'verified',
        header: 'Verified',
        format: (row) => row.verified ? 'yes' : 'no'
    },
    {
        header: 'Actions',
        format: (row, handler) => (
            <div>
                <button data-action="edit" data-id={row.id}>Edit</button>
                <button data-action="delete" data-id={row.id}>Delete</button>
                <select 
                    onChange={(event) => {
                        const data = {
                            event, 
                            data: event.target.value
                        }
                        handler(data)
                    }} 
                    data-action="select"
                >
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                </select>
                <input data-action="input" onChange={(e) => {
                        handler({ event: e, data: e.target.value })
                    }} />

                {/* <input type="checkbox" value={row.id + 'test'} data-action="checkbox" onChange={(e) => {
                        handler({ event: e, data: e.target.value })
                    }}/> */}
            </div>
        )
    }
]

const Dashboard = () => {
    const [persons, setPersons] = useState<Array<Person>>([
        {
            id: 1,
            firstName: 'test',
            lastName: 'test123',
            verified: false,
        },
        {
            id: 2,
            firstName: 'test2',
            lastName: 'test1234',
            verified: true,
        }
    ])

    const handleSelectRow = (id: number) => {
        const copyOfPersons = [...persons]
        const personIndex = persons.findIndex(person => person.id === id)

        copyOfPersons[personIndex]['isSelected'] = !Boolean(copyOfPersons[personIndex]['isSelected'])

        setPersons(copyOfPersons)
    }

    const handleCheckAll = () => {
        const newPersons = persons.map(person => {
            return person
        })

        setPersons(newPersons)
    }

    return (
        <div className='p-10'>

        <div className="relative flex items-center">
            <input 
                type="checkbox" 
                className="peer h-50 w-50 cursor-pointer appearance-none rounded-lg border border-slate-300 checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition-all" 
            />
        </div>

        <div className="relative flex items-center">
            <input 
                type="radio"
                className="peer h-15 w-15 cursor-pointer appearance-none rounded-full border border-slate-300 checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition-all" 
            />
        </div>

        

            <Table
                actions={[
                    {
                        name: 'edit',
                        function: (e) => console.log(e)
                    },
                    {
                        name: 'delete',
                        function: (e) => console.log(e)
                    },
                    {
                        name: 'checkbox-all',
                        function: handleCheckAll
                    },
                ]}
            >
                <TableHeader columns={column}/>
                <TableRow 
                    data={persons} 
                    columns={column} 
                    actions={[
                        {
                            name: 'select',
                            function: (e) => console.log(e)
                        },
                        {
                            name: 'checkbox',
                            function: (e) => console.log(e)
                        },
                        {
                            name: 'checkbox-select',
                            function: handleSelectRow
                        }
                    ]}
                />
            </Table>
        </div>
    )
}

export default Dashboard