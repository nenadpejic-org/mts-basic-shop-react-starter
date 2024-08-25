import useQuery, { QueryResult } from '@/hooks/useQuery'
import {
  AddProductOptions,
  EditProductOptions,
  GetProductsOptions,
  Product,
  addProduct,
  editProduct,
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
  editProductQuery: QueryResult<EditProductOptions, Product>
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
  const editProductQuery = useQuery({ fn: editProduct })

  const value = {
    getShopProductsQuery,
    getConsoleProductsQuery,
    addProductQuery,
    editProductQuery,
  }

  return <QueryContext.Provider value={value}>{children}</QueryContext.Provider>
}
