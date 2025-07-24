import { PrismaClient } from '../src/generated/prisma/index.js';
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hashedAdminPassword = await bcrypt.hash('AdminPass123', 10);
  const hashedUserPassword = await bcrypt.hash('UserPass123', 10);

  // Users
  await prisma.users.createMany({
    data: [
      {
        name: 'Admin',
        email: 'admin@example.com',
        pwd: hashedAdminPassword,
        role: 'admin',
        phone: '1234567890',
        photo: '/images/users/admin.jpg',
      },
      {
        name: 'John Wick',
        email: 'john@example.com',
        pwd: hashedUserPassword,
        role: 'user',
        photo: '/images/users/john-wick.jpg',
      },
    ],
    skipDuplicates: true,
  });

  // Categories
  await prisma.category.createMany({
    data: [
      { category_title: 'Pizza', category_description: 'Delicious cheesy pizzas' },
      { category_title: 'Burgers', category_description: 'Juicy gourmet burgers' },
      { category_title: 'Drinks', category_description: 'Refreshing beverages' },
    ],
    skipDuplicates: true,
  });

  const pizza = await prisma.category.findUnique({ where: { category_title: 'Pizza' } });
  const burgers = await prisma.category.findUnique({ where: { category_title: 'Burgers' } });
  const drinks = await prisma.category.findUnique({ where: { category_title: 'Drinks' } });

  if (pizza && burgers && drinks) {
    // Pizza items
    await prisma.menu.createMany({
      data: [
        { category_id: pizza.category_id, food_name: 'Margherita Pizza', description: 'Classic mozzarella and basil', price: 9.99, ingredients: ['dough', 'mozzarella', 'basil'], availability: true, image: '/images/menu/margherita-pizza.jpg' },
        { category_id: pizza.category_id, food_name: 'Pepperoni Pizza', description: 'Loaded with spicy pepperoni', price: 11.99, ingredients: ['dough', 'mozzarella', 'pepperoni'], availability: true, image: '/images/menu/pepperoni-pizza.jpg' },
        { category_id: pizza.category_id, food_name: 'Veggie Delight', description: 'Topped with fresh veggies', price: 10.49, ingredients: ['dough', 'bell pepper', 'olives', 'onions'], availability: true, image: '/images/menu/veggie-delight.jpg' },
        { category_id: pizza.category_id, food_name: 'BBQ Chicken Pizza', description: 'BBQ sauce and grilled chicken', price: 12.49, ingredients: ['dough', 'BBQ sauce', 'chicken'], availability: true, image: '/images/menu/bbq-chicken-pizza.jpg' },
        { category_id: pizza.category_id, food_name: 'Four Cheese Pizza', description: 'A cheese lover’s dream', price: 11.49, ingredients: ['mozzarella', 'cheddar', 'parmesan', 'gorgonzola'], availability: true, image: '/images/menu/four-cheese-pizza.jpg' },
        { category_id: pizza.category_id, food_name: 'Hawaiian Pizza', description: 'Ham and pineapple combo', price: 11.29, ingredients: ['dough', 'ham', 'pineapple'], availability: true, image: '/images/menu/hawaiian-pizza.jpg' },
        { category_id: pizza.category_id, food_name: 'Buffalo Chicken Pizza', description: 'Spicy buffalo sauce', price: 12.99, ingredients: ['dough', 'buffalo sauce', 'chicken'], availability: true, image: '/images/menu/buffalo-chicken-pizza.jpg' },
        { category_id: pizza.category_id, food_name: 'Mushroom Truffle Pizza', description: 'Earthy mushrooms and truffle oil', price: 13.49, ingredients: ['dough', 'mushrooms', 'truffle oil'], availability: true, image: '/images/menu/mushroom-truffle-pizza.jpg' },
      ],
      skipDuplicates: true,
    });

    // Burger items
    await prisma.menu.createMany({
      data: [
        { category_id: burgers.category_id, food_name: 'Classic Cheeseburger', description: 'Beef patty with cheddar', price: 8.49, ingredients: ['bun', 'beef', 'cheddar'], availability: true, image: '/images/menu/classic-cheeseburger.jpg' },
        { category_id: burgers.category_id, food_name: 'Bacon Burger', description: 'Crispy bacon on top', price: 9.49, ingredients: ['bun', 'beef', 'bacon'], availability: true, image: '/images/menu/bacon-burger.jpg' },
        { category_id: burgers.category_id, food_name: 'Veggie Burger', description: 'Plant-based patty', price: 8.99, ingredients: ['bun', 'veggie patty', 'lettuce'], availability: true, image: '/images/menu/veggie-burger.jpg' },
        { category_id: burgers.category_id, food_name: 'BBQ Burger', description: 'BBQ sauce and crispy onion', price: 9.29, ingredients: ['bun', 'beef', 'BBQ sauce'], availability: true, image: '/images/menu/bbq-burger.jpg' },
        { category_id: burgers.category_id, food_name: 'Double Patty Burger', description: 'Two beef patties', price: 10.99, ingredients: ['bun', 'double beef', 'cheese'], availability: true, image: '/images/menu/double-patty-burger.jpg' },
        { category_id: burgers.category_id, food_name: 'Mushroom Swiss Burger', description: 'Swiss cheese and mushrooms', price: 9.79, ingredients: ['bun', 'beef', 'mushrooms', 'swiss cheese'], availability: true, image: '/images/menu/mushroom-swiss-burger.jpg' },
        { category_id: burgers.category_id, food_name: 'Spicy Jalapeño Burger', description: 'Hot jalapeños for a kick', price: 9.59, ingredients: ['bun', 'beef', 'jalapeños'], availability: true, image: '/images/menu/spicy-jalapeno-burger.jpg' },
        { category_id: burgers.category_id, food_name: 'Chicken Burger', description: 'Grilled chicken breast', price: 8.99, ingredients: ['bun', 'chicken', 'lettuce'], availability: true, image: '/images/menu/chicken-burger.jpg' },
      ],
      skipDuplicates: true,
    });

    // Drinks
    await prisma.menu.createMany({
      data: [
        { category_id: drinks.category_id, food_name: 'Cola', description: 'Chilled fizzy drink', price: 1.99, ingredients: ['water', 'sugar', 'carbonation'], availability: true, image: '/images/menu/cola.jpg' },
        { category_id: drinks.category_id, food_name: 'Lemonade', description: 'Fresh lemon drink', price: 2.49, ingredients: ['lemon', 'sugar', 'water'], availability: true, image: '/images/menu/lemonade.jpg' },
        { category_id: drinks.category_id, food_name: 'Iced Tea', description: 'Cold refreshing tea', price: 2.29, ingredients: ['tea', 'lemon', 'ice'], availability: true, image: '/images/menu/iced-tea.jpg' },
        { category_id: drinks.category_id, food_name: 'Orange Juice', description: 'Freshly squeezed oranges', price: 2.99, ingredients: ['oranges'], availability: true, image: '/images/menu/orange-juice.jpg' },
        { category_id: drinks.category_id, food_name: 'Milkshake', description: 'Creamy vanilla shake', price: 3.49, ingredients: ['milk', 'vanilla', 'sugar'], availability: true, image: '/images/menu/milkshake.jpg' },
        { category_id: drinks.category_id, food_name: 'Espresso', description: 'Strong coffee shot', price: 1.79, ingredients: ['coffee beans', 'water'], availability: true, image: '/images/menu/espresso.jpg' },
        { category_id: drinks.category_id, food_name: 'Cappuccino', description: 'Foamy espresso drink', price: 2.99, ingredients: ['coffee', 'milk', 'foam'], availability: true, image: '/images/menu/cappuccino.jpg' },
        { category_id: drinks.category_id, food_name: 'Smoothie', description: 'Fruit blend smoothie', price: 4.49, ingredients: ['banana', 'strawberry', 'yogurt'], availability: true, image: '/images/menu/smoothie.jpg' },
      ],
      skipDuplicates: true,
    });
  }

  // Tags
  await prisma.tags.createMany({
    data: [
      { tag_name: 'Spicy' },
      { tag_name: 'Vegetarian' },
      { tag_name: 'Gluten-Free' },
    ],
    skipDuplicates: true,
  });

  console.log('Database seeded with 24 products!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });