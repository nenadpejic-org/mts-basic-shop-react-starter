import { useQuery } from '@/hooks/useQuery'
import { Product } from '@/services/products'
import { useEffect, useState } from 'react'

const ShopPage = () => {
  const query = useQuery()
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    query.fetch({
      onSuccess: (products) => {
        const availableProducts = products.filter((p) => p.availability)
        setProducts(availableProducts)
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(products)

  return <></>
}

export default ShopPage
