import { TableManageAdmin } from '@/components/common/TableManageAdmin/TableManageAdmin'
import { getAllCategories, createCategory, deleteCategory } from '@/store/slices/categorySlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import EditBtn from '@/components/common/BtnDialogAdmin/EditBtn'
import DeleteBtn from '@/components/common/BtnDialogAdmin/DeleteBtn'
import { DialogFooter } from '@/components/ui/dialog'
import CreateBtn from '@/components/common/BtnDialogAdmin/CreateBtn'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

export default function CategoryManage() {
  const columns = [
    {
      label: "NO.",
      key: "no",
      render: (_row, rowIndex) => rowIndex + 1
    },
    { label: "ID", key: "id" },
    { label: "Tên danh mục", key: "name" },
    {
      label: "Actions",
      render: (row) => (
        <div className="flex gap-2">
          <EditBtn
            title={`Edit Category: ${row.name}`}
            description="Update category name below"
          >
            <form className="space-y-3">
              <div>
                <Label className="text-sm">Tên danh mục</Label>
                <Input
                  name="name"
                  type="text"
                  defaultValue={row.name}
                  className="w-full border px-2 py-1 rounded"
                  required
                />
              </div>
              <Button type="submit">Save</Button>
            </form>
          </EditBtn>
          <DeleteBtn title={`Delete Category: ${row.name}`} description="Are you sure you want to delete this category?">
            {({ close }) => (
              <DialogFooter>
                <Button variant="outline" onClick={close}>Cancel</Button>
                <Button
                  variant="destructive"
                  onClick={async () => {
                    await handleDelete(row.id)
                    close()
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
  ]

  const [name, setName] = useState("")
  const [openCreate, setOpenCreate] = useState(false)
  const dispatch = useDispatch()
  const { categories, isLoading } = useSelector((state) => state.category)

  useEffect(() => {
    dispatch(getAllCategories())
  }, [dispatch])

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      await dispatch(createCategory({ name })).unwrap()
      toast.success("Category created successfully!")
      setName("")
      setOpenCreate(false)
    } catch (error) {
      toast.error(error.message || "Failed to create category")
    }
  }

  const handleDelete = async (categoryId) => {
    try {
      await dispatch(deleteCategory(categoryId)).unwrap()
      toast.success("Category deleted successfully!")
    } catch (error) {
      toast.error(error.message || "Failed to delete category")
    }
  }

  return (
    <div>
      <h1 className='text-2xl font-bold mb-3'>Category Management</h1>
      <div className='flex items-center justify-between mt-7 mb-3'>
        <Input className="w-1/3" placeholder="Search..." />
        <CreateBtn
          title="Create Category"
          variant="outline"
          open={openCreate}
          onOpenChange={setOpenCreate}
          size="icon"
          children={
            <form className="space-y-3" onSubmit={handleCreate}>
              <div>
                <Label className="text-sm">Tên danh mục</Label>
                <Input
                  type="text"
                  name="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                  required
                />
              </div>
              <Button type="submit">Save</Button>
            </form>
          }
        />
      </div>
      <TableManageAdmin columns={columns} data={categories} isLoading={isLoading} />
    </div>
  )
}
