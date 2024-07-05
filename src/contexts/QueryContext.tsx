import useQuery, { QueryResult } from '@/hooks/useQuery'
import {
  AddProductOptions,
  GetProductsOptions,
  Product,
  addProduct,
  getProducts,
} from '@/services/products'
import { ReactNode, createContext } from 'react'

type QueryContextValue = {
  getShopProductsQuery: QueryResult<GetProductsOptions | undefined, Product[]>
  getConsoleProductsQuery: QueryResult<
    GetProductsOptions | undefined,
    Product[]
  >
  addProductQuery: QueryResult<AddProductOptions, Product>
}

export const QueryContext = createContext<QueryContextValue>(
  {} as QueryContextValue,
)

type Props = {
  children?: ReactNode
}

export const QueryContextProvider = ({ children }: Props) => {
  const getShopProductsQuery = useQuery({
    fn: getProducts,
  })
  const getConsoleProductsQuery = useQuery({ fn: getProducts })
  const addProductQuery = useQuery({ fn: addProduct })

  const value = {
    getShopProductsQuery,
    getConsoleProductsQuery,
    addProductQuery,
  }

  return <QueryContext.Provider value={value}>{children}</QueryContext.Provider>
}
