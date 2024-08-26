import { useQueryContext } from '@/hooks/useQueryContext'
import useScreen from '@/hooks/useScreen'
import { useToastContext } from '@/hooks/useToastContext'
import { Product } from '@/services/products'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import AddProductForm from '../forms/AddProductForm'
import UpdateProductForm from '../forms/EditProductForm'
import Button from '../ui/Button'
import Checkbox from '../ui/Checkbox'
import Dialog from '../ui/Dialog'
import DropdownMenu from '../ui/DropdownMenu'
import Heading from '../ui/Heading'
import Table, { TableConfig } from '../ui/Table'
import TextInput from '../ui/TextInput'

const ConsolePage = () => {
  const { getConsoleProductsQuery, deleteProductQuery, patchProductQuery } =
    useQueryContext()
  const { isMobile } = useScreen()
  const [searchedProduct, setSearchedProduct] = useState('')
  const [productToEdit, setProductToEdit] = useState<Product | null>(null)
  const { toast } = useToastContext()

  const tableConfigDesktop: TableConfig<Product> = useMemo(
    () => [
      { label: 'Product Name', field: 'name' },
      { label: 'Category', field: 'category' },
      { label: 'Color', field: 'color' },
      { label: 'Price', field: 'price' },
      { label: 'Quantity', field: 'stockQuantity' },
      {
        label: 'Availability',
        align: 'center',
        component: ({ data }) => (
          <Checkbox
            defaultChecked={data.availability}
            onChange={(e) => {
              const { checked } = e.target
              handlePatchProduct({ ...data, availability: checked })
            }}
          />
        ),
      },
      {
        label: 'Actions',
        align: 'center',
        component: ({ data }) => (
          <DropdownMenu
            trigger={<Button variant="icon" icon="moreVert" />}
            menuItems={[
              {
                label: 'Edit',
                onClick: () => {
                  handleEditProduct(data)
                },
              },
              {
                label: 'Delete',
                onClick: () => handleDeleteProduct(data),
              },
            ]}
          />
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const tableConfigMobile = useMemo(() => {
    const conf = [...tableConfigDesktop]
    conf.splice(1, 4)
    return conf
  }, [tableConfigDesktop])

  useEffect(() => {
    getConsoleProductsQuery.fetch({
      query: { name_like: searchedProduct },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedProduct])

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchedProduct(e.target.value)
  }

  const handleEditProduct = (data: Product) => {
    setProductToEdit(data)
  }

  const handleDeleteProduct = (data: Product) =>
    deleteProductQuery.fetch(
      { id: data.id },
      {
        onSuccess: () => {
          getConsoleProductsQuery.update(
            (products) => products?.filter((p) => p.id !== data.id) || products,
          )
          toast(`Successfully deleted product "${data.name}"`, 'success')
        },
        onError: () => {
          toast(`Failed to delete product "${data.name}"`, 'error')
        },
      },
    )

  const handlePatchProduct = (data: Product) =>
    patchProductQuery.fetch(
      { id: data.id, payload: { availability: data.availability } },
      {
        onSuccess: () => {
          getConsoleProductsQuery.update(
            (products) =>
              products?.map((p) => (p.id === data.id ? data : p)) || products,
          )
          toast(`Successfully patched product "${data.name}"`, 'success')
        },
        onError: () => {
          toast(`Failed to patch product "${data.name}"`, 'error')
        },
      },
    )

  return (
    <>
      <section className="py-8">
        <div className="container">
          <Heading>Your products</Heading>

          <div className="mt-8 flex items-center gap-2">
            <TextInput
              className="w-full lg:w-auto"
              placeholder="Search products"
              iconBefore="search"
              onChange={handleSearch}
            />

            <Dialog
              trigger={<Button>Add</Button>}
              header={<Heading as="h2">Add Product</Heading>}
            >
              <AddProductForm />
            </Dialog>
          </div>

          <Table
            className="mt-8 w-full"
            tableConfig={isMobile ? tableConfigMobile : tableConfigDesktop}
            data={getConsoleProductsQuery.data}
            error={getConsoleProductsQuery.error}
            isLoading={getConsoleProductsQuery.isLoading}
          />
        </div>
      </section>

      <Dialog
        header={<Heading as="h2">Edit Product</Heading>}
        open={!!productToEdit}
        onClose={() => setProductToEdit(null)}
      >
        {productToEdit && <UpdateProductForm productToEdit={productToEdit} />}
      </Dialog>
    </>
  )
}

export default ConsolePage
