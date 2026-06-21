export interface Business {
  id: string;
  name: string;
  slug: string;
  category: string;
  subcategory?: string;
  description: string;
  phone: string;
  email: string;
  website?: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  hours: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  };
  services: string[];
  rating: number;
  reviewCount: number;
  established?: number;
  logo?: string;
  images?: string[];
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  featured: boolean;
  verified: boolean;
}

export const businesses: Business[] = [
  {
    id: "1",
    slug: "sunrise-plumbing-services",
    name: "Sunrise Plumbing Services",
    category: "Home Services",
    subcategory: "Plumbing",
    description:
      "Professional plumbing services for residential and commercial properties. We offer 24/7 emergency services, pipe repair, drain cleaning, water heater installation, and complete bathroom renovations. With over 15 years of experience, our licensed plumbers deliver quality workmanship at competitive prices.",
    phone: "+1 (555) 123-4567",
    email: "info@sunriseplumbing.com",
    website: "https://sunriseplumbing.com",
    address: "123 Main Street",
    city: "Springfield",
    state: "IL",
    zipCode: "62701",
    hours: {
      monday: "7:00 AM - 6:00 PM",
      tuesday: "7:00 AM - 6:00 PM",
      wednesday: "7:00 AM - 6:00 PM",
      thursday: "7:00 AM - 6:00 PM",
      friday: "7:00 AM - 6:00 PM",
      saturday: "8:00 AM - 4:00 PM",
      sunday: "Emergency Only",
    },
    services: [
      "Pipe Repair & Replacement",
      "Drain Cleaning",
      "Water Heater Installation",
      "Bathroom Renovation",
      "Leak Detection",
      "Sewer Line Services",
      "24/7 Emergency Service",
    ],
    rating: 4.8,
    reviewCount: 342,
    established: 2008,
    featured: true,
    verified: true,
    socialMedia: {
      facebook: "https://facebook.com/sunriseplumbing",
      instagram: "https://instagram.com/sunriseplumbing",
    },
  },
  {
    id: "2",
    slug: "green-leaf-restaurant",
    name: "Green Leaf Restaurant",
    category: "Food & Dining",
    subcategory: "Restaurants",
    description:
      "A farm-to-table dining experience featuring seasonal menus crafted from locally sourced ingredients. Our chef creates innovative dishes inspired by Mediterranean and Asian cuisines. Private dining room available for events up to 40 guests.",
    phone: "+1 (555) 234-5678",
    email: "reservations@greenleafrestaurant.com",
    website: "https://greenleafrestaurant.com",
    address: "456 Oak Avenue",
    city: "Springfield",
    state: "IL",
    zipCode: "62702",
    hours: {
      monday: "Closed",
      tuesday: "11:00 AM - 10:00 PM",
      wednesday: "11:00 AM - 10:00 PM",
      thursday: "11:00 AM - 10:00 PM",
      friday: "11:00 AM - 11:00 PM",
      saturday: "10:00 AM - 11:00 PM",
      sunday: "10:00 AM - 9:00 PM",
    },
    services: [
      "Dine-In",
      "Takeout",
      "Catering",
      "Private Dining",
      "Wine Pairing",
      "Vegetarian & Vegan Options",
    ],
    rating: 4.6,
    reviewCount: 218,
    established: 2015,
    featured: true,
    verified: true,
    socialMedia: {
      facebook: "https://facebook.com/greenleafrestaurant",
      instagram: "https://instagram.com/greenleafrestaurant",
    },
  },
  {
    id: "3",
    slug: "tech-solutions-pro",
    name: "Tech Solutions Pro",
    category: "Technology",
    subcategory: "IT Services",
    description:
      "Comprehensive IT support and technology solutions for small and medium businesses. We provide managed IT services, cybersecurity, cloud migration, network setup, and 24/7 helpdesk support. Our certified technicians ensure your business runs smoothly.",
    phone: "+1 (555) 345-6789",
    email: "support@techsolutionspro.com",
    website: "https://techsolutionspro.com",
    address: "789 Tech Park Drive",
    city: "Springfield",
    state: "IL",
    zipCode: "62703",
    hours: {
      monday: "8:00 AM - 8:00 PM",
      tuesday: "8:00 AM - 8:00 PM",
      wednesday: "8:00 AM - 8:00 PM",
      thursday: "8:00 AM - 8:00 PM",
      friday: "8:00 AM - 6:00 PM",
      saturday: "9:00 AM - 5:00 PM",
      sunday: "Closed",
    },
    services: [
      "Managed IT Services",
      "Cybersecurity",
      "Cloud Migration",
      "Network Setup",
      "Data Backup & Recovery",
      "Software Development",
      "24/7 Helpdesk",
    ],
    rating: 4.9,
    reviewCount: 156,
    established: 2012,
    featured: false,
    verified: true,
    socialMedia: {
      linkedin: "https://linkedin.com/company/techsolutionspro",
      twitter: "https://twitter.com/techsolutionspro",
    },
  },
  {
    id: "4",
    slug: "bright-smile-dental",
    name: "Bright Smile Dental",
    category: "Healthcare",
    subcategory: "Dentistry",
    description:
      "Family dental practice offering comprehensive dental care in a comfortable and welcoming environment. From routine cleanings to cosmetic dentistry, implants, and orthodontics — we have your complete dental health covered. We accept most insurance plans.",
    phone: "+1 (555) 456-7890",
    email: "appointments@brightsmileddental.com",
    address: "321 Health Boulevard",
    city: "Springfield",
    state: "IL",
    zipCode: "62704",
    hours: {
      monday: "8:00 AM - 5:00 PM",
      tuesday: "8:00 AM - 5:00 PM",
      wednesday: "8:00 AM - 7:00 PM",
      thursday: "8:00 AM - 5:00 PM",
      friday: "8:00 AM - 3:00 PM",
      saturday: "9:00 AM - 2:00 PM",
      sunday: "Closed",
    },
    services: [
      "General Dentistry",
      "Teeth Whitening",
      "Dental Implants",
      "Orthodontics",
      "Emergency Dental Care",
      "Pediatric Dentistry",
      "Cosmetic Dentistry",
    ],
    rating: 4.7,
    reviewCount: 289,
    established: 2005,
    featured: true,
    verified: true,
  },
  {
    id: "5",
    slug: "elite-fitness-gym",
    name: "Elite Fitness Gym",
    category: "Health & Fitness",
    subcategory: "Gyms",
    description:
      "State-of-the-art fitness facility with over 10,000 sq ft of equipment, group fitness classes, personal training, and nutrition counseling. We offer flexible membership plans to fit every budget and fitness goal. Free childcare available during gym hours.",
    phone: "+1 (555) 567-8901",
    email: "membership@elitefitnessgym.com",
    website: "https://elitefitnessgym.com",
    address: "654 Fitness Way",
    city: "Springfield",
    state: "IL",
    zipCode: "62705",
    hours: {
      monday: "5:00 AM - 11:00 PM",
      tuesday: "5:00 AM - 11:00 PM",
      wednesday: "5:00 AM - 11:00 PM",
      thursday: "5:00 AM - 11:00 PM",
      friday: "5:00 AM - 10:00 PM",
      saturday: "6:00 AM - 9:00 PM",
      sunday: "7:00 AM - 8:00 PM",
    },
    services: [
      "Weight Training",
      "Cardio Equipment",
      "Group Fitness Classes",
      "Personal Training",
      "Nutrition Counseling",
      "Swimming Pool",
      "Sauna & Steam Room",
    ],
    rating: 4.5,
    reviewCount: 412,
    established: 2018,
    featured: false,
    verified: true,
    socialMedia: {
      instagram: "https://instagram.com/elitefitnessgym",
      facebook: "https://facebook.com/elitefitnessgym",
    },
  },
  {
    id: "6",
    slug: "golden-paws-pet-salon",
    name: "Golden Paws Pet Salon",
    category: "Pet Services",
    subcategory: "Pet Grooming",
    description:
      "Professional pet grooming services for dogs and cats of all breeds and sizes. Our experienced groomers provide bathing, haircuts, nail trimming, teeth brushing, and full spa treatments. We use only natural, pet-safe products.",
    phone: "+1 (555) 678-9012",
    email: "book@goldenpawssalon.com",
    address: "987 Pet Lane",
    city: "Springfield",
    state: "IL",
    zipCode: "62706",
    hours: {
      monday: "9:00 AM - 6:00 PM",
      tuesday: "9:00 AM - 6:00 PM",
      wednesday: "9:00 AM - 6:00 PM",
      thursday: "9:00 AM - 6:00 PM",
      friday: "9:00 AM - 6:00 PM",
      saturday: "8:00 AM - 5:00 PM",
      sunday: "10:00 AM - 3:00 PM",
    },
    services: [
      "Dog Grooming",
      "Cat Grooming",
      "Bath & Brush",
      "Haircuts & Styling",
      "Nail Trimming",
      "Teeth Brushing",
      "Flea Treatment",
    ],
    rating: 4.8,
    reviewCount: 187,
    established: 2019,
    featured: false,
    verified: true,
    socialMedia: {
      instagram: "https://instagram.com/goldenpawssalon",
      facebook: "https://facebook.com/goldenpawssalon",
    },
  },
];

export const categories = [
  "All",
  "Home Services",
  "Food & Dining",
  "Technology",
  "Healthcare",
  "Health & Fitness",
  "Pet Services",
];

export function getBusinessBySlug(slug: string): Business | undefined {
  return businesses.find((b) => b.slug === slug);
}

export function getBusinessesByCategory(category: string): Business[] {
  if (category === "All") return businesses;
  return businesses.filter((b) => b.category === category);
}
