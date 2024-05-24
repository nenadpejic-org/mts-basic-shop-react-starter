import { useQuery } from '@/hooks/useQuery'
import useScreen from '@/hooks/useScreen'
import { Product } from '@/services/products'
import { useEffect } from 'react'
import Checkbox from '../ui/Checkbox'
import DropdownMenu from '../ui/DropdownMenu'
import Heading from '../ui/Heading'
import Table, { TableConfig } from '../ui/Table'
import Button from '../ui/Button'

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
  const query = useQuery()
  const { isMobile } = useScreen()

  useEffect(() => {
    query.fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="py-8">
      <div className="container">
        <Heading>Your products</Heading>

        <Table
          className="mt-8 w-full"
          tableConfig={isMobile ? tableConfigMobile : tableConfigDesktop}
          data={query.data}
          error={query.error}
          isLoading={query.isLoading}
        />
      </div>
    </section>
  )
}

export default ConsolePage
