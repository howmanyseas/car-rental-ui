export interface NavItem {
    name: string;
    url?: string;
    icon: string; // Material icon name
    children?: NavItem[]; // Nested items for dropdowns
  }
  
  export const navItems: NavItem[] = [
    { name: 'Home', url: '/dashboard', icon: 'dashboard' }, // Home → Dashboard
    { name: 'Cars', url: '/cars', icon: 'directions_car' }, // Cars
    { name: 'Rentals', url: '/rentals', icon: 'event_note' }, // Rentals
    { name: 'Checkout', url: '/checkout', icon: 'shopping_cart' }, // Checkout
    { name: 'Check-in', url: '/checkin', icon: 'assignment_turned_in' }, // Check-in
    { name: 'Car Contract', url: '/car-contract', icon: 'description' }, // Car Contract
    { name: 'Manifest', url: '/manifest', icon: 'fact_check' }, // Manifest
    { name: 'Users', url: '/users', icon: 'group' }, // Users
    { name: 'Help', url: '/help', icon: 'help_outline' } // Help
  ];
  