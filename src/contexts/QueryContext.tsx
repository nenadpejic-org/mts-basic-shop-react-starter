import useQuery, { QueryResult } from '@/hooks/useQuery'
import {
  AddProductOptions,
  DeleteProductOptions,
  EditProductOptions,
  GetProductsOptions,
  Product,
  addProduct,
  deleteProduct,
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
  deleteProductQuery: QueryResult<DeleteProductOptions, Record<string, never>>
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
  const deleteProductQuery = useQuery({ fn: deleteProduct })

  const value = {
    getShopProductsQuery,
    getConsoleProductsQuery,
    addProductQuery,
    editProductQuery,
    deleteProductQuery,
  }

  return <QueryContext.Provider value={value}>{children}</QueryContext.Provider>
}
