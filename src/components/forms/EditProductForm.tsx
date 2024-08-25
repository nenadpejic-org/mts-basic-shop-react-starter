import { useQueryContext } from '@/hooks/useQueryContext'
import {
  Product,
  EditProductOptions,
  productCategories,
  productColors,
} from '@/services/products'
import { getInputOptions } from '@/utils/arrays'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { boolean, number, object, string } from 'yup'
import Button from '../ui/Button'
import Checkbox from '../ui/Checkbox'
import NumberInput from '../ui/NumberInput'
import RadioGroup from '../ui/RadioGroup'
import Select from '../ui/Select'
import TextArea from '../ui/TextArea'
import TextInput from '../ui/TextInput'

const schema = object({
  availability: boolean().required(),
  category: string().required(),
  color: string().required(),
  description: string(),
  image: string().required(),
  name: string().required(),
  price: number().min(1).required(),
  stockQuantity: number().min(1).required(),
})

const categoryOptions = getInputOptions(productCategories)
const colorOptions = getInputOptions(productColors)

const defaultValues = {
  availability: false,
  category: '',
  color: '',
  description: '',
  image: '',
  name: '',
  price: 0,
  stockQuantity: 0,
}

type FormValues = EditProductOptions['payload']

type EditProductFormProps = {
  productToEdit: Product
}

const EditProductForm = ({ productToEdit }: EditProductFormProps) => {
  const { editProductQuery, getConsoleProductsQuery } = useQueryContext()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: productToEdit,
  })

  const onValid = (formValues: FormValues) => {
    editProductQuery.fetch(
      { id: productToEdit.id, payload: formValues },
      {
        onSuccess: (editedProduct) => {
          getConsoleProductsQuery.update((products) =>
            products
              ? products.map((p) =>
                  p.id === productToEdit.id ? editedProduct : p,
                )
              : products,
          )
          reset(defaultValues)
          console.log(`Successfully edited product ${editedProduct.name}`)
        },
        onError: () => {
          console.log('Failed to edit product')
        },
      },
    )
  }

  const handleClear = () => {
    reset(defaultValues)
  }

  return (
    <form className="p-4" onSubmit={handleSubmit(onValid)}>
      <div className="flex flex-col gap-2">
        <TextInput
          label="Name"
          placeholder="Product name"
          required
          {...register('name')}
          error={errors.name?.message}
          disabled={editProductQuery.isLoading}
        />
        <TextArea
          label="Description"
          placeholder="Product description"
          {...register('description')}
          error={errors.description?.message}
          disabled={editProductQuery.isLoading}
        />
        <TextInput
          label="Image url"
          placeholder="https://example.com"
          required
          {...register('image')}
          error={errors.image?.message}
          disabled={editProductQuery.isLoading}
        />
        <div className="gap-4 lg:flex">
          <NumberInput
            className="lg:w-1/2"
            label="Price"
            placeholder="1234"
            iconBefore="attachMoney"
            required
            {...register('price', { valueAsNumber: true })}
            error={errors.price?.message}
            disabled={editProductQuery.isLoading}
          />
          <NumberInput
            className="lg:w-1/2"
            label="Stock Quantity"
            placeholder="1234"
            required
            {...register('stockQuantity', { valueAsNumber: true })}
            error={errors.stockQuantity?.message}
            disabled={editProductQuery.isLoading}
          />
        </div>
        <RadioGroup
          label="Category"
          options={categoryOptions}
          required
          {...register('category')}
          error={errors.category?.message}
          disabled={editProductQuery.isLoading}
        />
        <Select
          label="Color"
          options={colorOptions}
          required
          {...register('color')}
          error={errors.color?.message}
          disabled={editProductQuery.isLoading}
        />
        <Checkbox
          label="Is Available"
          {...register('availability')}
          error={errors.availability?.message}
          disabled={editProductQuery.isLoading}
        />
      </div>

      <div className="mt-4 flex items-center justify-end gap-4">
        <Button type="submit" disabled={editProductQuery.isLoading}>
          Update
        </Button>
        <Button
          variant="ghost"
          type="button"
          onClick={handleClear}
          disabled={editProductQuery.isLoading}
        >
          Clear
        </Button>
      </div>
    </form>
  )
}

export default EditProductForm
