import React from 'react';
import { useQuery, useAction } from 'wasp/client/operations';
import { getAllUsers, deleteUser } from 'wasp/client/operations';

const AdminPage = () => {
  const { data: users, isLoading, error } = useQuery(getAllUsers);
  const deleteUserFn = useAction(deleteUser);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Interface</h1>
      {users.map((user) => (
        <div
          key={user.id}
          className="flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg"
        >
          <div>{user.email}</div>
          <div>{user.isActive ? 'Active' : 'Suspended'}</div>
          <div>
            <button
              onClick={() => {/* Implement suspension logic here */}}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
            >
              Suspend
            </button>
            <button
              onClick={() => deleteUserFn({ userId: user.id })}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminPage;
