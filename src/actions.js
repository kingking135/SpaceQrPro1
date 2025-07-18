import { HttpError } from 'wasp/server';
import { generateUniqueQrCode } from '@src/utils/qrCode';

export const createMenu = async ({ name }, context) => {
  if (!context.user) { throw new HttpError(401) };
  const qrCode = generateUniqueQrCode();
  const newMenu = await context.entities.Menu.create({
    data: {
      name,
      userId: context.user.id,
      qrCode
    }
  });
  return newMenu;
}

export const updateMenu = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const menu = await context.entities.Menu.findUnique({
    where: { id: args.id }
  });
  if (menu.userId !== context.user.id) { throw new HttpError(403) };

  return context.entities.Menu.update({
    where: { id: args.id },
    data: args.updatedFields
  });
}

export const deleteMenu = async ({ menuId }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const menu = await context.entities.Menu.findUnique({
    where: { id: menuId }
  });
  if (menu.userId !== context.user.id) { throw new HttpError(403) };

  await context.entities.Dish.deleteMany({
    where: { menuId }
  });

  await context.entities.Menu.delete({
    where: { id: menuId }
  });

  return { success: true };
}

export const createDish = async ({ menuId, name, description, price, photo }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const menu = await context.entities.Menu.findUnique({
    where: { id: menuId }
  });
  if (!menu || menu.userId !== context.user.id) { throw new HttpError(403) };

  const newDish = await context.entities.Dish.create({
    data: {
      name,
      description,
      price,
      photo,
      menuId
    }
  });

  return newDish;
}

export const updateDish = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const dish = await context.entities.Dish.findUnique({
    where: { id: args.id }
  });
  if (!dish) { throw new HttpError(404, 'Dish not found') };

  const menu = await context.entities.Menu.findUnique({
    where: { id: dish.menuId }
  });
  if (menu.userId !== context.user.id) { throw new HttpError(403) };

  return context.entities.Dish.update({
    where: { id: args.id },
    data: args.updatedFields
  });
}

export const deleteDish = async ({ dishId }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const dish = await context.entities.Dish.findUnique({
    where: { id: dishId }
  });
  if (!dish) { throw new HttpError(404, 'Dish not found') };

  const menu = await context.entities.Menu.findUnique({
    where: { id: dish.menuId }
  });
  if (menu.userId !== context.user.id) { throw new HttpError(403) };

  await context.entities.Dish.delete({
    where: { id: dishId }
  });

  return { success: true };
}
