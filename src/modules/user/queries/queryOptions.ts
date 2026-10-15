import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { userKeys } from "@modules/user/queries/queryKeys";
import { fetchUsers } from "../apis/users";

export const userOptions = {
  all: () => queryOptions({
    queryKey: userKeys.all,
    queryFn: () => fetchUsers(),
    placeholderData: keepPreviousData
  }),
  list: (page:string, limit: number) => 
    queryOptions({
      queryKey: userKeys.lists(page,limit),
      queryFn: () => fetchUsers(`limit=${limit}&cursor=${page}`),
      placeholderData: keepPreviousData,
    }),
  // list: (filters: string) => 
  //   queryOptions({
  //     queryKey: userKeys.list(filters),
  //     queryFn: () => fetchUsers(filters),
  //   }),
};