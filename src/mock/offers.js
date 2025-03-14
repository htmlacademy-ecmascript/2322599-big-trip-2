const mockOffers = [
  {
    type: 'taxi',
    offers: [
      {
        id: 11,
        title: 'Select a driver',
        price: 100,
      },

      {
        id: 12,
        title: 'Pre-book a taxi',
        price: 50,
      },
    ]
  },

  {
    type: 'flight',
    offers: [
      {
        id: 21,
        title: 'Choose a seat on the plane',
        price: 300,
      },

      {
        id: 22,
        title: 'Upgrade',
        price: 1000,
      },

      {
        id: 23,
        title: 'Extra luggage',
        price: 700,
      },
    ]
  },

  {
    type: 'bus',
    offers: [
      {
        id: 31,
        title: 'Choose a seat on the bus',
        price: 300,
      },

      {
        id: 32,
        title: 'Extra luggage',
        price: 500,
      },
    ]
  },

  {
    type: 'train',
    offers: [
      {
        id: 41,
        title: 'Meals included',
        price: 1000,
      },

      {
        id: 42,
        title: 'Wi-Fi',
        price: 100,
      },
    ]
  },

  {
    type: 'check-in',
    offers: [
      {
        id: 51,
        title: 'Breakfast included',
        price: 300,
      },

      {
        id: 52,
        title: 'Parking',
        price: 200,
      },

      {
        id: 53,
        title: 'Room upgrade',
        price: 500,
      },
    ]
  },
];

export { mockOffers };
