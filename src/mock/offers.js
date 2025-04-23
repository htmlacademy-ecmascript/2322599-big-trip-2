const mockOffers = [
  {
    type: 'taxi',
    offers: []
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

  {
    type: 'ship',
    offers: [
      {
        id: 61,
        title: 'Cabin upgrade',
        price: 800,
      },
      {
        id: 62,
        title: 'All inclusive',
        price: 1200,
      }
    ]
  },

  {
    type: 'drive',
    offers: [
      {
        id: 71,
        title: 'Car insurance',
        price: 400,
      },
      {
        id: 72,
        title: 'Child seat',
        price: 200,
      }
    ]
  },

  {
    type: 'sightseeing',
    offers: [
      {
        id: 81,
        title: 'Guide service',
        price: 300,
      },
      {
        id: 82,
        title: 'Audio guide',
        price: 100,
      },
      {
        id: 83,
        title: 'VIP access',
        price: 500,
      }
    ]
  },

  {
    type: 'restaurant',
    offers: [
      {
        id: 91,
        title: 'Special menu',
        price: 600,
      },
      {
        id: 92,
        title: 'Wine tasting',
        price: 400,
      }
    ]
  }
];

export { mockOffers };
