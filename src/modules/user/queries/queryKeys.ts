export const userKeys = {
  all: ['users'] as const,
  lists: (page: string, limit: number) => [...userKeys.all, 'lists', page, limit] as const,
  details: () => [...userKeys.all, 'detail'] as const,
};

