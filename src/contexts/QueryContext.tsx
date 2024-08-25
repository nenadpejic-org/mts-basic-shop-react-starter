import useQuery, { QueryResult } from '@/hooks/useQuery'
import {
  AddProductOptions,
  DeleteProductOptions,
  EditProductOptions,
  GetProductsOptions,
  PatchProductOptions,
  Product,
  addProduct,
  deleteProduct,
  editProduct,
  getProducts,
  patchProduct,
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
  patchProductQuery: QueryResult<PatchProductOptions, Product>
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
  const patchProductQuery = useQuery({ fn: patchProduct })

  const value = {
    getShopProductsQuery,
    getConsoleProductsQuery,
    addProductQuery,
    editProductQuery,
    deleteProductQuery,
    patchProductQuery,
  }

  return <QueryContext.Provider value={value}>{children}</QueryContext.Provider>
}
