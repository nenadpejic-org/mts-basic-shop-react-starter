import { useQuery } from '@/hooks/useQuery'
import useScreen from '@/hooks/useScreen'
import { Product } from '@/services/products'
import { ChangeEvent, useEffect, useState } from 'react'
import Button from '../ui/Button'
import Checkbox from '../ui/Checkbox'
import Dialog from '../ui/Dialog'
import DropdownMenu from '../ui/DropdownMenu'
import Heading from '../ui/Heading'
import Table, { TableConfig } from '../ui/Table'
import TextInput from '../ui/TextInput'

const tableConfigDesktop: TableConfig<Product> = [
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
        onChange={() => {
          // TODO: Implement handlePatchProduct
        }}
      />
    ),
  },
  {
    label: 'Actions',
    align: 'center',
    component: () => (
      <DropdownMenu
        trigger={<Button variant="icon" icon="moreVert" />}
        menuItems={[
          {
            label: 'Edit',
            onClick: () => {
              // TODO: Implement setEditProductOpen
            },
          },
          {
            label: 'Delete',
            onClick: () => {
              // TODO: Implement handleDeleteProduct
            },
          },
        ]}
      />
    ),
  },
]

const tableConfigMobile = [...tableConfigDesktop]
tableConfigMobile.splice(1, 4)

const ConsolePage = () => {
  const { getConsoleProducts } = useQuery()
  const { isMobile } = useScreen()
  const [searchedProduct, setSearchedProduct] = useState('')

  useEffect(() => {
    getConsoleProducts.fetch({
      options: { query: { name_like: searchedProduct } },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedProduct])

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchedProduct(e.target.value)
  }

  return (
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
            {/* // TODO: Add content */}
          </Dialog>
        </div>

        <Table
          className="mt-8 w-full"
          tableConfig={isMobile ? tableConfigMobile : tableConfigDesktop}
          data={getConsoleProducts.data}
          error={getConsoleProducts.error}
          isLoading={getConsoleProducts.isLoading}
        />
      </div>
    </section>
  )
}

export default ConsolePage
