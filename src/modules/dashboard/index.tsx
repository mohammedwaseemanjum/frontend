import { useUserStore } from "@/stores/user";
import api from "@/utils/api";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

const Dashboard:React.FC = () => {
    const { setUser } = useUserStore(
      useShallow((state) => ({
        setUser: state.setUser,
      }))
    )

    const fetchUser = () => {
      api.get('me').then((res) => {
        setUser(res.data)
      })
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <div>
          DashBoard
        </div>
    )
}

export default Dashboard