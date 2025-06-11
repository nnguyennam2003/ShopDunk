import { TableManageAdmin } from '@/components/common/TableManageAdmin/TableManageAdmin'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import DeleteBtn from '@/components/common/BtnDialogAdmin/DeleteBtn'
import { DialogFooter } from '@/components/ui/dialog'
import CreateBtn from '@/components/common/BtnDialogAdmin/CreateBtn'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { createColor, deleteColor, getListColors } from '@/store/slices/colorSlice'

export default function ColorManage() {
    const columns = [
        {
            label: "NO.",
            key: "no",
            render: (_row, rowIndex) => rowIndex + 1
        },
        { label: "ID", key: "id" },
        { label: "Tên màu", key: "name" },
        { label: "Mã màu", key: "css_code" },
        {
            label: "Mã màu hiển thị",
            render: (row) => (
                <div className="w-10 h-10 rounded-full border" style={{ backgroundColor: row.css_code }}></div>
            ),
        },
        {
            label: "Actions",
            render: (row) => (
                <DeleteBtn title={`Delete Color: ${row.name}`} description="Are you sure you want to delete this color?">
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
            ),
        },
    ]

    const [name, setName] = useState("")
    const [cssCode, setCssCode] = useState("")
    const [openCreate, setOpenCreate] = useState(false)
    const dispatch = useDispatch()
    const { colors, isLoading } = useSelector((state) => state.color)

    useEffect(() => {
        dispatch(getListColors())
    }, [dispatch])

    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            await dispatch(createColor({ name, css_code: cssCode })).unwrap()
            toast.success("Color created successfully!")
            setName("")
            setOpenCreate(false)
        } catch (error) {
            toast.error(error.message || "Failed to create color")
        }
    }

    const handleDelete = async (colorId) => {
        try {
            await dispatch(deleteColor(colorId)).unwrap()
            toast.success("Color deleted successfully!")
        } catch (error) {
            toast.error(error.message || "Failed to delete color")
        }
    }

    return (
        <div>
            <h1 className='text-2xl font-bold mb-3'>Color Management</h1>
            <div className='flex items-center justify-between mt-7 mb-3'>
                <Input className="w-1/3" placeholder="Search..." />
                <CreateBtn
                    title="Create color"
                    variant="outline"
                    open={openCreate}
                    onOpenChange={setOpenCreate}
                    size="icon"
                    children={
                        <form className="space-y-3" onSubmit={handleCreate}>
                            <div>
                                <Label className="text-sm">Tên màu</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    className="w-full border px-2 py-1 rounded"
                                    required
                                />
                            </div>
                            <div>
                                <Label className="text-sm">Mã màu</Label>
                                <Input
                                    type="text"
                                    name="css_code"
                                    value={cssCode}
                                    onChange={e => setCssCode(e.target.value)}
                                    className="w-full border px-2 py-1 rounded"
                                    required
                                />
                            </div>
                            <Button type="submit" disabled={!name || !cssCode}>Save</Button>
                        </form>
                    }
                />
            </div>
            <TableManageAdmin columns={columns} data={colors} isLoading={isLoading} />
        </div>
    )
}
