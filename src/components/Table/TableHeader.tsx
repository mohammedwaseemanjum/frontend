import type { ColumnDefinitionType} from '@component/Table/types'

type TableHeaderType<T> = {
    columns: Array<ColumnDefinitionType<T>>;
}

const TableHeader = <T extends Record<string, any>> ({ columns }: TableHeaderType<T>) => {
    return (
        <thead>
            <tr className='bg-gray-100'>
                <th>
                    <div className="relative flex items-center">
                        <input 
                            type="checkbox" 
                            className="peer h-6 w-6 cursor-pointer appearance-none rounded-lg border border-slate-300 checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition-all" 
                            data-action="checkbox-all"
                        />
                    </div>
                </th>
                {
                    columns.map((column, index) => (
                        <th key={`headCell-${index}`} className='p-5 text-left'>
                            { column.header }
                        </th>
                    ))
                }
            </tr>
        </thead>
    )
}

export default TableHeader