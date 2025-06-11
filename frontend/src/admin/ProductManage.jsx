import React, { useEffect, useState } from 'react'
import { TableManageAdmin } from '@/components/common/TableManageAdmin/TableManageAdmin'
import EditBtn from '@/components/common/BtnDialogAdmin/EditBtn'
import DeleteBtn from '@/components/common/BtnDialogAdmin/DeleteBtn'
import { DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct, deleteProduct, getListProducts } from '@/store/slices/productSlice'
import { Input } from '@/components/ui/input'
import CreateBtn from '@/components/common/BtnDialogAdmin/CreateBtn'
import { Label } from '@/components/ui/label'
import Select from 'react-select'
import {
  Select as ShadSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getAllCategories } from '@/store/slices/categorySlice'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { getListColors } from '@/store/slices/colorSlice'

export default function ProductManage() {
  const { products } = useSelector((state) => state.product)
  const { categories } = useSelector((state) => state.category)
  const { colors } = useSelector((state) => state.color)
  const dispatch = useDispatch()


  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [priceSale, setPriceSale] = useState("")
  const [storage, setStorage] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [images, setImages] = useState([])
  const [selectedColors, setSelectedColors] = useState([])

  const [openCreate, setOpenCreate] = useState(false)

  const colorOptions = colors.map(c => ({
    value: c.id,
    label: c.name,
    color: c.css_code
  }))

  useEffect(() => {
    dispatch(getListProducts())
  }, [dispatch]);

  useEffect(() => {
    if (openCreate) {
      dispatch(getAllCategories())
    }
  }, [openCreate, dispatch])

  useEffect(() => {
    if (openCreate) {
      dispatch(getListColors())
    }
  }, [openCreate, dispatch])

  useEffect(() => {
    if (!openCreate) {
      setName("")
      setDescription("")
      setPrice("")
      setPriceSale("")
      setSelectedColors([])
      setStorage("")
      setCategoryId("")
      setImages([])
    }
  }, [openCreate]);

  const columns = [
    { label: "NO.", key: "no", render: (_row, rowIndex) => rowIndex + 1 },
    { label: "ID", key: "id" },
    {
      label: "Ảnh",
      key: "images",
      render: (row) => {
        // Ưu tiên lấy ảnh đầu tiên từ mảng images nếu có, fallback sang image_url nếu có
        const imgSrc = Array.isArray(row.images) && row.images.length > 0
          ? row.images[0]
          : row.image_url
        return (
          imgSrc
            ? <img src={imgSrc} alt={row.name} className="w-14 h-14 object-contain rounded" />
            : <span className="text-gray-400">No image</span>
        );
      }
    },
    { label: "Name", key: "name" },
    { label: "Price", key: "price" },
    { label: "Discount price", key: "price_sale" },
    { label: "Danh mục", key: "category_name" },
    { label: "Color",
      render: (row) => (
        row.colors.map((color, index) => (
          <div key={index} className="inline-block mr-1 px-2 py-1 rounded bg-gray-100">
            {color.name}
          </div>
        ))
      )
     },
    { label: "Storage",
      render: (row) => (
        row.storage.map((s, index) => (
          <span key={index} className="inline-block mr-1 px-2 py-1 bg-gray-100 rounded">{s}GB</span>
      )))
    },
    {
      label: "Actions",
      render: (row) => (
        <div className="flex gap-2">
          <EditBtn
            title={`Edit Product: ${row.name}`}
            description="Update product information below"
          >
            {/* Form chỉnh sửa sản phẩm bạn tự làm ở đây */}
            <form className="space-y-3">
              {/* ... */}
              <Button type="submit">Save</Button>
            </form>
          </EditBtn>
          <DeleteBtn title={`Delete Product: ${row.name}`} description="Are you sure you want to delete this product?">
            {({ close }) => (
              <DialogFooter>
                <Button variant="outline" onClick={close}>Cancel</Button>
                <Button
                  variant="destructive"
                  onClick={async () => {
                    await handleDelete(row.id);
                    close();
                  }}
                >
                  Delete
                </Button>
              </DialogFooter>
            )}
          </DeleteBtn>
        </div>
      ),
    },
  ];

  // Hàm handleCreate
  const handleCreate = async (e) => {
    e.preventDefault()
    const formData = new FormData()

    formData.append('name', name)
    formData.append('description', description)
    formData.append('price', price)
    formData.append('price_sale', priceSale)
    const storageArray = storage.split(',').map(s => s.trim())
    formData.append('storage', JSON.stringify(storageArray))
    formData.append('category_id', categoryId)

    selectedColors.forEach(id => formData.append('colors', id))

    for (let i = 0; i < images.length; i++) {
      formData.append('files', images[i])
    }

    // Chờ dispatch xong
    const resultAction = dispatch(createProduct(formData))
    if (createProduct.fulfilled.match(resultAction)) {
      setOpenCreate(false)
      toast.success("Product created successfully!")
    }
  };

  const handleDelete = async (productId) => {
    try {
      await dispatch(deleteProduct(productId)).unwrap()
      toast.success("Product deleted successfully!")
    } catch (error) {
      toast.error(error.message || "Failed to delete product")
    }
  };

  return (
    <div>
      <h1 className='text-2xl font-bold mb-3'>Product Management</h1>
      <div className='flex items-center justify-between mt-7 mb-3'>
        <Input className="w-1/3" placeholder="Search..." />
        <CreateBtn
          title="Create Product"
          open={openCreate}
          onOpenChange={setOpenCreate}
          description="Create a new product below"
          children={
            <form className="space-y-3" onSubmit={handleCreate}>
              <div>
                <Label className="text-sm">Tên sản phẩm</Label>
                <Input
                  type="text"
                  name="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                  required
                />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Label className="text-sm">Giá</Label>
                  <Input
                    type="number"
                    name="price"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    className="w-full border px-2 py-1 rounded"
                    required
                  />
                </div>
                <div className="flex-1">
                  <Label className="text-sm">Giá sale</Label>
                  <Input
                    type="number"
                    name="priceSale"
                    value={priceSale}
                    onChange={e => setPriceSale(e.target.value)}
                    className="w-full border px-2 py-1 rounded"
                  />
                </div>
              </div>
              <div>
                <Label className="text-sm">Màu</Label>
                <Select
                  isMulti
                  options={colorOptions}
                  value={colorOptions.filter(opt => selectedColors.includes(opt.value))}
                  onChange={opts => setSelectedColors(opts.map(opt => opt.value))}
                  placeholder="Chọn màu..."
                  closeMenuOnSelect={false}
                />
              </div>
              <div>
                <Label className="text-sm">Dung lượng (cách nhau bởi dấu phẩy)</Label>
                <Input
                  type="text"
                  name="storage"
                  value={storage}
                  onChange={e => setStorage(e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                  placeholder="128GB, 256GB, 512GB"
                />
              </div>
              <div>
                <Label className="text-sm">Category</Label>
                <ShadSelect value={categoryId} onValueChange={setCategoryId}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id.toString()}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </ShadSelect>
              </div>
              <div>
                <Label className="text-sm">Ảnh (upload nhiều ảnh)</Label>
                <Input
                  type="file"
                  name="images"
                  multiple
                  accept="image/*"
                  onChange={e => setImages(Array.from(e.target.files))}
                  className="w-full border px-2 py-1 rounded"
                  required
                />
              </div>
              <div>
                <Label className="text-sm">Mô tả</Label>
                <Textarea
                  name="description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                  required
                />
              </div>
              <Button type="submit">Save</Button>
            </form>
          }
        />
      </div>
      <TableManageAdmin columns={columns} data={products} isLoading={false} />
    </div>
  );
}
