export const transactions = [
  {name: 'Groceries', category: 'Groceries', amount: 100},
  {name: 'Bike Wheel', category: 'Necessities', amount: 50},
  {name: 'Night out', category: 'Recreation', amount: 100},
  {name: 'Groceries', category: 'Groceries', amount: 50},
  {name: 'Netflix', category: 'Recreation', amount: 10},
  {name: 'Groceries', category: 'Groceries', amount: 36},
  {name: 'Pillow', category: 'Necessities', amount: 10},
  {name: 'Dentist', category: 'Necessities', amount: 60},
  {name: 'Groceries', category: 'Recreation', amount: 20},
];
export const categories = [
  {
    name: 'Groceries',
    transactions: [
      {name: 'Groceries', amount: 36},
      {name: 'Groceries', amount: 50},
      {name: 'Groceries', amount: 100},
    ],
    total: 186,
  },
  {
    name: 'Recreation',
    transactions: [
      {name: 'Night out', amount: 100},
      {name: 'Netflix', amount: 10},
      {name: 'Groceries', amount: 20},
    ],
    total: 130,
  },
  {
    name: 'Necessities',
    transactions: [
      {name: 'Pillow', amount: 10},
      {name: 'Dentist', amount: 60},
      {name: 'Bike Wheel', amount: 50},
    ],
    total: 120,
  },
];
