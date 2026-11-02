const ROOMS = [
  {
    id: 1, name: 'Sunny Room near RUPP', area: 'Toul Kork', city: 'phnom-penh',
    type: 'Room', size: 20, price: 150, image: 'image/pic1.jpg',
    bedrooms: 1, bathrooms: 1, floor: 2, furnishing: 'Fully Furnished',
    availability: 'Available Now', utilities: 'Electricity Included',
    lease: ['Short Term', '3 - 6 Months', '6 - 12 Months'],
    payment: ['Monthly Payment'],
    amenities: ['Air Conditioning', 'Wi-Fi / Internet', 'Wardrobe', 'Balcony', 'Water Heater'],
    parking: ['Motorbike Parking'],
    rules: { smoking: 'No Smoking', pets: 'No Pets Allowed', guests: 'Limited Guests', noise: 'Quiet After 10 PM' }
  },
  {
    id: 2, name: 'Garden Room', area: 'Toul Kork', city: 'phnom-penh',
    type: 'Room', size: 18, price: 130, image: 'image/pic2.jpg',
    bedrooms: 1, bathrooms: 1, floor: 0, furnishing: 'Semi-Furnished',
    availability: 'Available This Week', utilities: 'Water Included',
    lease: ['3 - 6 Months', '6 - 12 Months'],
    payment: ['Monthly Payment', 'Quarterly Payment'],
    amenities: ['Wi-Fi / Internet', 'Wardrobe', 'Garden', 'CCTV'],
    parking: ['Motorbike Parking', 'Private Parking'],
    rules: { smoking: 'Outdoor Smoking Only', pets: 'Small Pets Only', guests: 'Guests Allowed', noise: 'Quiet Environment' }
  },
  {
    id: 3, name: 'Blue door studio', area: 'Toul Kork', city: 'phnom-penh',
    type: 'Studio', size: 28, price: 220, image: 'image/pic3.jpg',
    bedrooms: 0, bathrooms: 1, floor: 4, furnishing: 'Fully Furnished',
    availability: 'Available Now', utilities: 'Utilities Included',
    lease: ['Short Term', '3 - 6 Months', '6 - 12 Months', '12+ Months'],
    payment: ['Monthly Payment', 'Quarterly Payment'],
    amenities: ['Air Conditioning', 'Wi-Fi / Internet', 'Refrigerator', 'Kitchen', 'TV', 'Wardrobe', 'Elevator', 'CCTV'],
    parking: ['Motorbike Parking', 'Covered Parking'],
    rules: { smoking: 'No Smoking', pets: 'Pets Allowed', guests: 'Guests Allowed', noise: 'Quiet After 10 PM' }
  },
  {
    id: 4, name: 'City View Condo', area: 'BKK1', city: 'phnom-penh',
    type: 'Condo', size: 45, price: 450, image: 'image/pic4.jpg',
    bedrooms: 2, bathrooms: 2, floor: 12, furnishing: 'Fully Furnished',
    availability: 'Available This Month', utilities: 'All Utilities Excluded',
    lease: ['6 - 12 Months', '12+ Months'],
    payment: ['Monthly Payment', 'Quarterly Payment', 'Yearly Payment'],
    amenities: ['Air Conditioning', 'Wi-Fi / Internet', 'Refrigerator', 'Washing Machine', 'Water Heater', 'Kitchen', 'TV', 'Wardrobe', 'Swimming Pool', 'Fitness Center', 'Elevator', 'Balcony', 'CCTV', '24/7 Security', 'Fire Safety'],
    parking: ['Car Parking', 'Motorbike Parking', 'Covered Parking'],
    rules: { smoking: 'No Smoking', pets: 'Small Pets Only', guests: 'Guests Allowed', noise: 'Quiet After 10 PM' }
  },
  {
    id: 5, name: 'Small Studio BKK1', area: 'BKK1', city: 'phnom-penh',
    type: 'Studio', size: 25, price: 280, image: 'image/pic5.jpg',
    bedrooms: 0, bathrooms: 1, floor: 6, furnishing: 'Fully Furnished',
    availability: 'Available Now', utilities: 'Utilities Included',
    lease: ['Short Term', '3 - 6 Months', '6 - 12 Months'],
    payment: ['Monthly Payment'],
    amenities: ['Air Conditioning', 'Wi-Fi / Internet', 'Refrigerator', 'Kitchen', 'TV', 'Elevator', '24/7 Security'],
    parking: ['Motorbike Parking'],
    rules: { smoking: 'No Smoking', pets: 'No Pets Allowed', guests: 'Limited Guests', noise: 'Quiet Environment' }
  },
  {
    id: 6, name: 'Shared Room for 2', area: 'BKK1', city: 'phnom-penh',
    type: 'Studio', size: 25, price: 320, image: 'image/pic6.jpg',
    bedrooms: 1, bathrooms: 1, floor: 5, furnishing: 'Semi-Furnished',
    availability: 'Available This Month', utilities: 'Water Included',
    lease: ['3 - 6 Months', '6 - 12 Months'],
    payment: ['Monthly Payment'],
    amenities: ['Air Conditioning', 'Wi-Fi / Internet', 'Washing Machine', 'Wardrobe', 'Elevator'],
    parking: ['Motorbike Parking'],
    rules: { smoking: 'Outdoor Smoking Only', pets: 'No Pets Allowed', guests: 'No Overnight Guests', noise: 'Quiet After 10 PM' }
  },
  {
    id: 7, name: 'Family Condo', area: 'Sen Sok', city: 'phnom-penh',
    type: 'Condo', size: 80, price: 380, image: 'image/pic7.jpg',
    bedrooms: 3, bathrooms: 2, floor: 8, furnishing: 'Fully Furnished',
    availability: 'Available This Week', utilities: 'All Utilities Excluded',
    lease: ['6 - 12 Months', '12+ Months'],
    payment: ['Monthly Payment', 'Quarterly Payment', 'Yearly Payment'],
    amenities: ['Air Conditioning', 'Wi-Fi / Internet', 'Refrigerator', 'Washing Machine', 'Water Heater', 'Kitchen', 'TV', 'Wardrobe', 'Swimming Pool', 'Elevator', 'Balcony', 'CCTV', '24/7 Security', 'Fire Safety'],
    parking: ['Car Parking', 'Motorbike Parking', 'Private Parking'],
    rules: { smoking: 'No Smoking', pets: 'Pets Allowed', guests: 'Guests Allowed', noise: 'Quiet Environment' }
  },
  {
    id: 8, name: 'Quiet Room Sen Sok', area: 'Sen Sok', city: 'phnom-penh',
    type: 'Room', size: 16, price: 110, image: 'image/pic8.jpg',
    bedrooms: 1, bathrooms: 1, floor: 1, furnishing: 'Unfurnished',
    availability: 'Available Now', utilities: 'Electricity Included',
    lease: ['Short Term', '3 - 6 Months'],
    payment: ['Monthly Payment'],
    amenities: ['Wi-Fi / Internet', 'Wardrobe'],
    parking: ['Motorbike Parking'],
    rules: { smoking: 'No Smoking', pets: 'No Pets Allowed', guests: 'No Overnight Guests', noise: 'Quiet Environment' }
  },
  {
    id: 9, name: 'Student Room near AEON2', area: 'Sen Sok', city: 'phnom-penh',
    type: 'Room', size: 20, price: 140, image: 'image/pic9.jpg',
    bedrooms: 1, bathrooms: 1, floor: 3, furnishing: 'Semi-Furnished',
    availability: 'Available Now', utilities: 'Water Included',
    lease: ['Short Term', '3 - 6 Months', '6 - 12 Months'],
    payment: ['Monthly Payment'],
    amenities: ['Air Conditioning', 'Wi-Fi / Internet', 'Wardrobe', 'Water Heater'],
    parking: ['Motorbike Parking'],
    rules: { smoking: 'No Smoking', pets: 'No Pets Allowed', guests: 'Limited Guests', noise: 'Quiet After 10 PM' }
  },
  {
    id: 10, name: 'Bright Studio', area: 'Sen Sok', city: 'phnom-penh',
    type: 'Studio', size: 30, price: 240, image: 'image/pic10.jpg',
    bedrooms: 0, bathrooms: 1, floor: 7, furnishing: 'Fully Furnished',
    availability: 'Coming Soon', utilities: 'Utilities Included',
    lease: ['3 - 6 Months', '6 - 12 Months', '12+ Months'],
    payment: ['Monthly Payment', 'Quarterly Payment'],
    amenities: ['Air Conditioning', 'Wi-Fi / Internet', 'Refrigerator', 'Kitchen', 'TV', 'Wardrobe', 'Elevator', 'Balcony', 'CCTV'],
    parking: ['Motorbike Parking', 'Covered Parking'],
    rules: { smoking: 'Outdoor Smoking Only', pets: 'Small Pets Only', guests: 'Guests Allowed', noise: 'Flexible Rules' }
  }
];