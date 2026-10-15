import api from "@/utils/api";
import type { User } from "../queries/types";
import type { AxiosResponse } from "axios";

export const fetchUsers = async (queryParams?: string): Promise<AxiosResponse<User[]>> => {
    let url = `users`

    if (queryParams) {
        url += `?${queryParams}`
    }

  const response = await api.get(url)

  return response.data
};