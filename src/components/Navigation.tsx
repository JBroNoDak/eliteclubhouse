import React from 'react';
import { Menu, X, Plane, Ship, Car, Home, Globe, Users, Search, BookOpen, Building2 } from 'lucide-react';

interface NavigationProps {
  categories: string[];
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  subItems?: { id: string; label: string }[];
}

export default function Navigation({ categories }: NavigationProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);

  const menuItems: MenuItem[] = [
    {
      id: 'transport',
      label: 'Transport',
      icon: <Plane className="w-4 h-4" />,
      subItems: [
        { id: 'jets', label: 'Private Jets' },
        { id: 'yachts', label: 'Yachts' },
        { id: 'carrentals', label: 'Car Rentals' },
        { id: 'carsales', label: 'Car Sales' },
      ]
    },
    {
      id: 'realestate',
      label: 'Real Estate',
      icon: <Home className="w-4 h-4" />
    },
    {
      id: 'lifestyle',
      label: 'Lifestyle',
      icon: <Globe className="w-4 h-4" />,
      subItems: [
        { id: 'experiences', label: 'Experiences' },
        { id: 'events', label: 'Events' },
      ]
    },
    {
      id: 'insights',
      label: 'Insights',
      icon: <BookOpen className="w-4 h-4" />,
      href: '#insights'
    },
    {
      id: 'list-business',
      label: 'List Your Business',
      icon: <Building2 className="w-4 h-4" />,
      href: '#list-business'
    }
  ];

  const handleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleItemClick = (item: MenuItem, e: React.MouseEvent) => {
    e.preventDefault();
    if (item.href) {
      document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
      setOpenDropdown(null);
    } else if (item.subItems) {
      handleDropdown(item.id);
    }
  };

  return (
    <nav className="fixed w-full bg-black/95 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <a href="#" className="text-2xl font-serif text-white">The Elite Clubhouse</a>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div key={item.id} className="relative group">
                <button
                  onClick={(e) => handleItemClick(item, e)}
                  className="text-gray-300 hover:text-white flex items-center space-x-1 transition duration-150"
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.subItems && (
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>

                {item.subItems && openDropdown === item.id && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-black/95 backdrop-blur-md ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu">
                      {item.subItems.map((subItem) => (
                        <a
                          key={subItem.id}
                          href={`#${subItem.id}`}
                          className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10"
                          onClick={(e) => {
                            e.preventDefault();
                            document.querySelector(`#${subItem.id}`)?.scrollIntoView({ behavior: 'smooth' });
                            setOpenDropdown(null);
                          }}
                        >
                          {subItem.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-white"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <div key={item.id}>
                <button
                  onClick={(e) => handleItemClick(item, e)}
                  className="w-full text-left text-gray-300 hover:text-white px-3 py-2 text-base font-medium flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.subItems && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>

                {item.subItems && openDropdown === item.id && (
                  <div className="pl-6 space-y-1">
                    {item.subItems.map((subItem) => (
                      <a
                        key={subItem.id}
                        href={`#${subItem.id}`}
                        className="block px-3 py-2 text-base text-gray-300 hover:text-white"
                        onClick={(e) => {
                          e.preventDefault();
                          document.querySelector(`#${subItem.id}`)?.scrollIntoView({ behavior: 'smooth' });
                          setIsOpen(false);
                          setOpenDropdown(null);
                        }}
                      >
                        {subItem.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}