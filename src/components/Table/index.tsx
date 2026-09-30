import type { JSX } from "react";
import type { ActionsT } from '@component/Table/types'

type TableType = {
    actions?: Array<ActionsT>,
    children?: React.ReactNode
  }

const Table = ({ children, actions }: TableType): JSX.Element => {
    const handleOnClick = (event: React.MouseEvent<HTMLTableElement>) => {
        event.stopPropagation()
        const target = event.target as HTMLElement
        const action = actions?.find(action => action.name === target.dataset.action)

        if (action && target instanceof HTMLElement) { 
            const id = Number(target.dataset.id)
            action.function(id)
        }
    }

    return (
        <table onClick={handleOnClick}>
            { children }
        </table>
    )
}

export default Table