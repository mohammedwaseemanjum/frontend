import api from "@/utils/api";
import type { User } from "../queries/types";

interface ApiResponse<T> {
  data: T[];
  meta: {
    nextCursor: string;
    prevCursor: string;
    totalCount: number
  };
}

export const fetchUsers = async (queryParams?: string) => {
    let url = `users`

    if (queryParams) {
        url += `?${queryParams}`
    }

  const response = await api.get<ApiResponse<User>>(url)

  return response.data
};