import { IPaginationOptions } from 'utils/types/pagination-options'

interface IData<T> {
  data: T[]
  count: number
}

export const infinityPagination = <T>(data: IData<T>, options: IPaginationOptions) => {
  return {
    data: data.data,
    currentPage: options.page,
    limit: options.limit,
    totalItems: data.count,
    totalPages: Math.ceil(data.count / options.limit),
    hasNextPage: data.data.length === options.limit,
  }
}
