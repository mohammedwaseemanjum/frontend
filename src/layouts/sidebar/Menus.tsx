import SideBarMenu from "@layout/sidebar/SideBarMenu"
import { SideBarContextWrapper } from "@layout/sidebar/context"
import SideBarChildren from "@layout/sidebar/SideBarChildren"
import type { JSX } from "react";
import dashboardMenus from '@modules/dashboard/sidebar'

type Menus = {
    parent: JSX.Element
    childrens?: Array<JSX.Element> | undefined
};

const menus:Array<Menus> = [
    dashboardMenus
]

const Menus = () => {
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