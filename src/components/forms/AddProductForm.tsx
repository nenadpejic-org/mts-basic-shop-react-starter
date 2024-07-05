import { useQueryContext } from '@/hooks/useQueryContext'
import { productCategories, productColors } from '@/services/products'
import { getInputOptions } from '@/utils/arrays'
import { ChangeEvent, FormEvent, useState } from 'react'
import Button from '../ui/Button'
import Checkbox from '../ui/Checkbox'
import NumberInput from '../ui/NumberInput'
import RadioGroup from '../ui/RadioGroup'
import Select from '../ui/Select'
import TextArea from '../ui/TextArea'
import TextInput from '../ui/TextInput'

const categoryOptions = getInputOptions(productCategories)
const colorOptions = getInputOptions(productColors)

const defaultFormValues = {
  availability: false,
  category: '',
  color: '',
  description: '',
  image: '',
  name: '',
  price: 0,
  stockQuantity: 0,
}

const AddProductForm = () => {
  const [formValues, setFormValues] = useState(defaultFormValues)
  const { addProductQuery } = useQueryContext()

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addProductQuery.fetch(
      { payload: formValues },
      {
        onSuccess: () => {
          handleClearForm()
          console.log('Successfully added product')
        },
        onError: () => {
          console.log('Failed to add product')
        },
      },
    )
  }

  const handleClearForm = () => {
    setFormValues(defaultFormValues)
  }

  const handleChangeForm = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target
    setFormValues((pV) => ({
      ...pV,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  return (
    <form className="p-4" onSubmit={handleSubmitForm}>
      <div className="flex flex-col gap-2">
        <TextInput
          label="Name"
          placeholder="Product name"
          required
          name="name"
          onChange={handleChangeForm}
          disabled={addProductQuery.isLoading}
        />
        <TextArea
          label="Description"
          placeholder="Product description"
          name="description"
          onChange={handleChangeForm}
          disabled={addProductQuery.isLoading}
        />
        <TextInput
          label="Image url"
          placeholder="https://example.com"
          required
          name="image"
          onChange={handleChangeForm}
          disabled={addProductQuery.isLoading}
        />
        <div className="gap-4 lg:flex">
          <NumberInput
            className="lg:w-1/2"
            label="Price"
            placeholder="1234"
            iconBefore="attachMoney"
            required
            name="price"
            onChange={handleChangeForm}
            disabled={addProductQuery.isLoading}
          />
          <NumberInput
            className="lg:w-1/2"
            label="Stock Quantity"
            placeholder="1234"
            required
            name="stockQuantity"
            onChange={handleChangeForm}
            disabled={addProductQuery.isLoading}
          />
        </div>
        <RadioGroup
          label="Category"
          options={categoryOptions}
          required
          name="category"
          onChange={handleChangeForm}
          disabled={addProductQuery.isLoading}
        />
        <Select
          label="Color"
          options={colorOptions}
          required
          name="color"
          onChange={handleChangeForm}
          disabled={addProductQuery.isLoading}
        />
        <Checkbox
          label="Is Available"
          name="availability"
          onChange={handleChangeForm}
          disabled={addProductQuery.isLoading}
        />
      </div>

      <div className="mt-4 flex items-center justify-end gap-4">
        <Button type="submit" disabled={addProductQuery.isLoading}>
          Add
        </Button>
        <Button
          variant="ghost"
          type="button"
          onClick={handleClearForm}
          disabled={addProductQuery.isLoading}
        >
          Clear
        </Button>
      </div>
    </form>
  )
}

export default AddProductForm
