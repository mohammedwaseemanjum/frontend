import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@/components/Dropdown";
import { useDataTableStore } from "./store";
import { useShallow } from "zustand/shallow";

const PageLimit = () => {
    const {
      limit,
      setLimit,
    } = useDataTableStore(
      useShallow((state) => ({
        setLimit: state.setLimit,
        limit: state.limit,
      }))
    )

    return (
        <div className="w-[60px] mr-auto my-4">
          <Dropdown>
            <DropdownTrigger className="p-0! w-[60px]! h-[40px]! justify-center!">{ limit }</DropdownTrigger>
            <DropdownMenu>
              {[5,10,15,20].map((limit, index) => (
                  <DropdownItem onSelect={() => setLimit(limit)} key={index}>{limit}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
    )
}

export default PageLimit