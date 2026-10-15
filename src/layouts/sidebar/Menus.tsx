import SideBarMenu from "@layout/sidebar/SideBarMenu"
import { SideBarContextWrapper } from "@layout/sidebar/context"
import SideBarChildren from "@layout/sidebar/SideBarChildren"
import type { JSX } from "react";

type Menus = {
    parent: JSX.Element
    childrens?: Array<JSX.Element> | undefined
};

interface MenuI {
    menus: Array<Menus>
}

const Menus = ({ menus }: MenuI) => {
    return (
        <>
            { menus?.map((menu, index) => (
                <SideBarContextWrapper key={index}>
                    <div>
                        <SideBarMenu key={index} hasChildren={menu?.childrens && menu.childrens.length > 0}>
                            { menu.parent }
                        </SideBarMenu>
                        { menu?.childrens?.map((child, index) => (
                            <SideBarChildren key={index}>
                                { child }
                            </SideBarChildren>
                        )) }
                    </div>
                </SideBarContextWrapper>
            )) }
        </>
    )
}

export default Menus