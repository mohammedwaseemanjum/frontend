import type { ReactNode } from "react";

const Header = ({ children }: { children: ReactNode }) => {
    return (
        <thead>
            <tr>{ children }</tr>
        </thead>
    )
}

export default Header