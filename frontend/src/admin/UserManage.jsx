import { TableManageAdmin } from '@/components/common/TableManageAdmin/TableManageAdmin'
import { getUsers } from '@/store/slices/userSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import EditBtn from '@/components/common/BtnDialogAdmin/EditBtn';
import DeleteBtn from '@/components/common/BtnDialogAdmin/DeleteBtn';
import { DialogFooter } from '@/components/ui/dialog';
import CreateBtn from '@/components/common/BtnDialogAdmin/CreateBtn';

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
    { label: "Birthday", key: "birthday" },
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
                <label className="text-sm">Full Name</label>
                <input
                  type="text"
                  defaultValue={row.full_name}
                  className="w-full border px-2 py-1 rounded"
                />
              </div>
              <div>
                <label className="text-sm">Email</label>
                <input
                  type="email"
                  defaultValue={row.email}
                  className="w-full border px-2 py-1 rounded"
                />
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
                  onClick={() => {
                    handleDelete(row.id);
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

  const dispatch = useDispatch()

  const { users, isLoading } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const handleEdit = (e, user) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const updatedData = {
      ...user,
      full_name: formData.get("full_name"),
      email: formData.get("email"),
    };

    console.log("Updated user data:", updatedData);
  }
  const handleDelete = (userId) => {
    // Logic to handle deleting a user
    console.log("Delete user with ID:", userId);
  }

  return (
    <div>
      <h1 className='text-2xl font-bold mb-3'>User Management</h1>
      <div className='flex items-center justify-between mt-7 mb-3'>
        <Input className="w-1/3" placeholder="Search..." />
        <CreateBtn variant="outline" size="icon" />
        
      </div>
      <TableManageAdmin columns={columns} data={users} isLoading={isLoading} />
    </div>
  )
}
