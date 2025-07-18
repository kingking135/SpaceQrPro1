import React, { useState } from 'react';
import { useQuery, useAction, getMenus, createMenu, deleteMenu } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const DashboardPage = () => {
  const { data: menus, isLoading, error } = useQuery(getMenus);
  const createMenuFn = useAction(createMenu);
  const deleteMenuFn = useAction(deleteMenu);
  const [newMenuName, setNewMenuName] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateMenu = () => {
    createMenuFn({ name: newMenuName });
    setNewMenuName('');
  };

  return (
    <div className="p-4">
      <div className="flex gap-x-4 py-5">
        <input
          type="text"
          placeholder="New Menu Name"
          className="px-1 py-2 border rounded text-lg"
          value={newMenuName}
          onChange={(e) => setNewMenuName(e.target.value)}
        />
        <button
          onClick={handleCreateMenu}
          className="bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded"
        >
          Add Menu
        </button>
      </div>
      <div>
        {menus.map((menu) => (
          <div
            key={menu.id}
            className="py-2 px-2 flex items-center justify-between hover:bg-slate-100 gap-x-2 rounded"
          >
            <div>{menu.name}</div>
            <div>
              <button
                onClick={() => deleteMenuFn({ menuId: menu.id })}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
              <Link
                to={`/menu/${menu.name}`}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
              >
                View QR
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
