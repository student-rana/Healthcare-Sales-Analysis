const getDashboardStats = () => {
  return [
    { title: 'Total Revenue', value: '$245,600', trend: '+12.5%', isPositive: true },
    { title: 'New Contracts', value: '45', trend: '+8.2%', isPositive: true },
    { title: 'Active Hospitals', value: '1,240', trend: '+2.4%', isPositive: true },
    { title: 'Churn Rate', value: '1.2%', trend: '-0.4%', isPositive: false }
  ];
};

const getRecentOrders = () => {
  return [
    { id: 'ORD-001', hospital: 'General Hospital', product: 'MRI Machine', date: '2026-04-20', status: 'Delivered', amount: '$150,000' },
    { id: 'ORD-002', hospital: 'City Clinic', product: 'Defibrillator Kit', date: '2026-04-21', status: 'Processing', amount: '$12,500' },
    { id: 'ORD-003', hospital: 'St. Jude Medical', product: 'X-Ray System', date: '2026-04-22', status: 'Pending', amount: '$85,000' },
    { id: 'ORD-004', hospital: 'Mercy Care', product: 'Ultrasound Scanner', date: '2026-04-22', status: 'Processing', amount: '$45,000' }
  ];
};

let clients = [
  { 
    id: 1, 
    name: 'General Hospital', 
    location: 'New York, NY', 
    contact: 'Dr. Smith',
    email: 'admin@generalhospital.ny',
    established: 1985,
    totalOrders: 142,
    revenue: '$2.4M',
    status: 'Active Partner',
    description: 'A leading tertiary care hospital in downtown New York, specializing in cardiology and neurology. They have been a partner since 2018.'
  },
  { 
    id: 2, 
    name: 'City Clinic', 
    location: 'Chicago, IL', 
    contact: 'Jane Doe',
    email: 'purchasing@cityclinic.il',
    established: 2002,
    totalOrders: 56,
    revenue: '$850K',
    status: 'Active Partner',
    description: 'A growing network of outpatient clinics providing primary care and specialized diagnostics across the Chicago metropolitan area.'
  },
  { 
    id: 3, 
    name: 'St. Jude Medical', 
    location: 'Los Angeles, CA', 
    contact: 'Dr. Brown',
    email: 'procurement@stjude.ca',
    established: 1990,
    totalOrders: 89,
    revenue: '$1.2M',
    status: 'Active Partner',
    description: 'A premium healthcare facility renowned for its advanced surgical units and pediatric care centers in Southern California.'
  }
];

const getClients = () => clients;

const updateClient = (id, updatedData) => {
  const index = clients.findIndex(c => c.id === parseInt(id));
  if (index !== -1) {
    clients[index] = { ...clients[index], ...updatedData };
    return clients[index];
  }
  return null;
};

module.exports = {
  getDashboardStats,
  getRecentOrders,
  getClients,
  updateClient
};
