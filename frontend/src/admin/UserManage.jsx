import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { createUser, deleteUser, getUsers } from '@/store/slices/userSlice'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'

import CreateBtn from '@/components/common/BtnDialogAdmin/CreateBtn'
import DeleteBtn from '@/components/common/BtnDialogAdmin/DeleteBtn'
import EditBtn from '@/components/common/BtnDialogAdmin/EditBtn'
import { TableManageAdmin } from '@/components/common/TableManageAdmin/TableManageAdmin'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { formatDateToDMY } from '@/helpers/FormatDataNumber'
import { toast } from 'sonner'


export default function UserManage() {
  const columns = [
    {
      label: "NO.",
      key: "no",
      render: (_row, rowIndex) => rowIndex + 1
    },
    { label: "ID", key: "id" },
    { label: "Email", key: "email" },
    { label: "Full Name", key: "full_name" },
    { label: "Phone", key: "phone" },
    { label: "Gender", key: "gender" },
    { label: "Birthday", key: "birthday", render: (row) => formatDateToDMY(row.birthday) },
    { label: "Role", key: "role" },
    {
      label: "Actions",
      render: (row) => (
        <div className="flex gap-2">
          <EditBtn
            title={`Edit User: ${row.full_name}`}
            description="Update user information below"
          >
            <form className="space-y-3" onSubmit={(e) => handleEdit(e, row)}>
              <div>
                <Label className="text-sm">Full Name</Label>
                <Input
                  name="full_name"
                  type="text"
                  defaultValue={row.full_name}
                  className="w-full border px-2 py-1 rounded"
                />
              </div>
              <div>
                <Label className="text-sm">Email</Label>
                <Input
                  name="email"
                  type="email"
                  defaultValue={row.email}
                  className="w-full border px-2 py-1 rounded"
                />
              </div>
              <div>
                <Label className="text-sm">Phone</Label>
                <Input
                  name="phone"
                  type="number"
                  defaultValue={row.phone}
                  className="w-full border px-2 py-1 rounded"
                />
              </div>
              <div>
                <Label className="text-sm">Gender</Label>
                <Select defaultValue={row.gender}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm">Birthday</Label>
                <Input
                  name="birthday"
                  type="date"
                  defaultValue={row.birthday}
                  className="w-full border px-2 py-1 rounded"
                />
              </div>
              <div>
                <Label className="text-sm">Role</Label>
                <Select defaultValue={row.role}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit">Save</Button>
            </form>
          </EditBtn>
          <DeleteBtn title={`Delete User: ${row.full_name}`} description="Are you sure you want to delete this user?">
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

  const [email, setEmail] = useState("")
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [gender, setGender] = useState("male")
  const [birthday, setBirthday] = useState("")
  const [role, setRole] = useState("user")

  const [openCreate, setOpenCreate] = useState(false)
  const dispatch = useDispatch()

  const { users, isLoading } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const handleCreate = async (e) => {
    e.preventDefault()

    const newUser = {
      fullName: fullName,
      email: email,
      phone: phone,
      password: password,
      gender: gender,
      birthday: birthday,
      role: role,
    }

    try {
      await dispatch(createUser(newUser)).unwrap()
      toast.success("User created successfully!")

      setFullName("")
      setEmail("")
      setPhone("")
      setPassword("")
      setGender("male")
      setBirthday("")
      setRole("user")

      setOpenCreate(false)
    } catch (error) {
      toast.error(error.message || "Failed to create user")
    }
  }
  const handleEdit = (e) => {
    e.preventDefault()
  }
  
  const handleDelete = async (userId) => {
    try {
      await dispatch(deleteUser(userId)).unwrap()
      toast.success("User deleted successfully!")
    } catch (error) {
      toast.error(error.message || "Failed to delete user")
    }
  }

  return (
    <div>
      <h1 className='text-2xl font-bold mb-3'>User Management</h1>
      <div className='flex items-center justify-between mt-7 mb-3'>
        <Input className="w-1/3" placeholder="Search..." />
        <CreateBtn title="Create User" variant="outline" open={openCreate} onOpenChange={setOpenCreate} size="icon" children={
          <>
            <form className="space-y-3" onSubmit={handleCreate}>
              <div>
                <Label className="text-sm">Full Name</Label>
                <Input
                  type="text"
                  name="full_name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                />
              </div>
              <div>
                <Label className="text-sm">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                />
              </div>
              <div>
                <Label className="text-sm">Phone</Label>
                <Input
                  type="number"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                />
              </div>
              <div>
                <Label className="text-sm">Password</Label>
                <Input
                  type="password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                />
              </div>
              <div>
                <Label className="text-sm">Gender</Label>
                <Select defaultValue="male" onValueChange={setGender}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
                <input type="hidden" name="gender" value={gender} />
              </div>
              <div>
                <Label className="text-sm">Birthday</Label>
                <Input
                  type="date"
                  value={birthday}
                  name="birthday"
                  onChange={(e) => setBirthday(e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                />
              </div>
              <div>
                <Label className="text-sm">Role</Label>
                <Select defaultValue="user" onValueChange={setRole}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                <input type="hidden" name="role" value={role} />
              </div>
              <Button type="submit">Save</Button>
            </form>
          </>
        } />

      </div>
      <TableManageAdmin columns={columns} data={users} isLoading={isLoading} />
    </div>
  )
}
