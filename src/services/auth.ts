import { useUserStore } from "@/stores/user";
import api from "@/utils/api";

export class Auth {
    static async refreshToken () {
        return await api.get('auth/refresh')
    }

    static async logout () {
        useUserStore.persist.clearStorage()
        location.href = '/'
    }
}