import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HamburgerMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleSubmenu = (menu: string) => {
        setOpenSubmenu(openSubmenu === menu ? null : menu);
    };

    return (
        <div className="relative">
            <button 
                className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-blue-600 transition duration-200"
                onClick={toggleMenu}
            >
                <span className="text-lg">☰</span>
                <span className="text-sm font-semibold">Menu</span>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <ul className="py-2">
                        <li>
                            <Link 
                                to="/" 
                                onClick={() => setIsOpen(false)}
                                className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition duration-200"
                            >
                                🏠 Dashboard
                            </Link>
                        </li>
                        <li className="relative">
                            <button 
                                onClick={() => toggleSubmenu('employees')}
                                className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition duration-200"
                            >
                                <span>👥 Employees</span>
                                <span className={`transition-transform duration-200 ${openSubmenu === 'employees' ? 'rotate-180' : ''}`}>▼</span>
                            </button>
                            {openSubmenu === 'employees' && (
                                <ul className="bg-gray-50 border-t border-gray-100">
                                    <li>
                                        <Link 
                                            to="/employees/grid" 
                                            onClick={() => setIsOpen(false)}
                                            className="block px-8 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition duration-200"
                                        >
                                            Grid View
                                        </Link>
                                    </li>
                                    <li>
                                        <Link 
                                            to="/employees/list" 
                                            onClick={() => setIsOpen(false)}
                                            className="block px-8 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition duration-200"
                                        >
                                            List View
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li className="relative">
                            <button 
                                onClick={() => toggleSubmenu('reports')}
                                className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition duration-200"
                            >
                                <span>📊 Reports</span>
                                <span className={`transition-transform duration-200 ${openSubmenu === 'reports' ? 'rotate-180' : ''}`}>▼</span>
                            </button>
                            {openSubmenu === 'reports' && (
                                <ul className="bg-gray-50 border-t border-gray-100">
                                    <li>
                                        <Link 
                                            to="/reports/attendance" 
                                            onClick={() => setIsOpen(false)}
                                            className="block px-8 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition duration-200"
                                        >
                                            Attendance
                                        </Link>
                                    </li>
                                    <li>
                                        <Link 
                                            to="/reports/performance" 
                                            onClick={() => setIsOpen(false)}
                                            className="block px-8 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition duration-200"
                                        >
                                            Performance
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <Link 
                                to="/departments" 
                                onClick={() => setIsOpen(false)}
                                className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition duration-200"
                            >
                                🏢 Departments
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/settings" 
                                onClick={() => setIsOpen(false)}
                                className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition duration-200"
                            >
                                ⚙️ Settings
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default HamburgerMenu;