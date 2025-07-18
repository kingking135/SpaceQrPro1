import { HttpError } from 'wasp/server'

export const getMenus = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }
  return context.entities.Menu.findMany({
    where: { userId: context.user.id },
    select: {
      id: true,
      name: true,
      qrCode: true
    }
  });
}

export const getMenuDetails = async ({ id }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const menu = await context.entities.Menu.findUnique({
    where: { id },
    include: {
      dishes: true
    }
  });

  if (!menu || menu.userId !== context.user.id) throw new HttpError(404, 'Menu not found or access denied.');

  return menu;
}

export const getAllUsers = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }
  return context.entities.User.findMany({
    select: {
      id: true,
      email: true,
      isActive: true
    }
  });
}
