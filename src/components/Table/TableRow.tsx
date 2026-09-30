import type { ColumnDefinitionType, handlerType, ActionsT } from '@component/Table/types'
import type { ReactNode } from 'react';

export type TableRowType<T extends Record<string, any>> = {
    data: Array<T>;
    columns: Array<ColumnDefinitionType<T>>;
    actions?: Array<ActionsT>,
  }

const renderCell = <T extends Record<string, any>>(
    row: T,
    column: ColumnDefinitionType<T>,
    handler: (data: handlerType) => void
  ): ReactNode => {
    const { key, format } = column;
    const cellValue = row[key as keyof T];

    return format?.(row, handler) ?? cellValue;
  };

const TableRow = <T extends Record<string, any>> ({ data, columns, actions }: TableRowType<T>) => {
    const handleRowChange = (handlerData: handlerType) => {
        const { event, data } = handlerData

        event.stopPropagation()
        const target = event.target
        const action = actions?.find(action => action.name === target.dataset.action)

        if (action) {
            const dataValue = data ?? target.value
            action.function(dataValue)
        }
    }

    return (
        <tbody>
            {
                data?.map((row, index) => (
                    <tr key={`row-${index}`} className='border-b border-l border-r border-gray-200'>
                        <td>
                            <div className="relative flex items-center">
                                <input 
                                    type="checkbox" 
                                    className="peer h-6 w-6 cursor-pointer appearance-none rounded-lg border border-slate-300 checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition-all" 
                                    data-action="checkbox-select"
                                    checked={Boolean(row.isSelected)}
                                    onChange={(e) => {
                                        handleRowChange({ event: e, data: row.id })
                                    }}
                                />
                            </div>
                        </td>
                        { columns?.map((column, columnCellIndex) => 
                            <td key={`cell-${columnCellIndex}`} className='p-5 text-left'>
                                { renderCell<T>(row, column, (data) => handleRowChange(data)) }
                            </td>
                        ) }
                    </tr>
                ))
            }
        </tbody>
    )
}

export default TableRow