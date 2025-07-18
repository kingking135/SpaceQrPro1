import React from 'react';
import { useParams } from 'wasp/client/router';
import { useQuery } from 'wasp/client/operations';
import { getMenuDetails } from 'wasp/client/operations';

const MenuPublicPage = () => {
  const { menuName } = useParams();
  const { data: menu, isLoading, error } = useQuery(getMenuDetails, { id: menuName });

  if (isLoading) return 'Chargement...';
  if (error) return 'Erreur : ' + error;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">{menu.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menu.dishes.map((dish) => (
          <div key={dish.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {dish.photo && <img src={dish.photo} alt={dish.name} className="w-full h-48 object-cover" />}
            <div className="p-4">
              <h2 className="text-xl font-semibold">{dish.name}</h2>
              <p className="text-gray-600">{dish.description}</p>
              <p className="text-lg font-bold text-blue-800">{dish.price.toFixed(2)} ?</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPublicPage;
