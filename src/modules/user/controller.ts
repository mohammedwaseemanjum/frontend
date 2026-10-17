import type { User } from "@modules/user/queries/types";
import { useState } from "react";
import { userForm, type FormFields } from "@modules/user/schema";
import { type Path } from "react-hook-form";

const useUserController = () => {
    const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false)

    const handleEdit = (user: User) => {
      (Object.keys(user) as Array<keyof User>).map((key) => {
        const userKey = user[key] as keyof User
        const formFieldKey = key as Path<FormFields>

        if (formFieldKey === 'roles') {
          user.roles = user.roles.map(role => role)
        }

        userForm.setValue(formFieldKey, userKey)
      })
      
      setDrawerOpen(true)
    }

    return {
        handleEdit,
        isDrawerOpen,
        setDrawerOpen
    }
}

export default useUserController