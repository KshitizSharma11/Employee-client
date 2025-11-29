import React from 'react';
import { NavLink } from 'react-router-dom';

const HorizontalMenu: React.FC = () => {
    return (
        <nav className="hidden md:block">
            <ul className="flex space-x-8">
                <li>
                    <NavLink 
                        to="/" 
                        className={({ isActive }) => 
                            `text-sm font-medium transition duration-200 ${
                                isActive 
                                    ? 'text-blue-600 border-b-2 border-blue-600 pb-4' 
                                    : 'text-gray-700 hover:text-blue-600'
                            }`
                        }
                    >
                        🏠 Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/employees" 
                        className={({ isActive }) => 
                            `text-sm font-medium transition duration-200 ${
                                isActive 
                                    ? 'text-blue-600 border-b-2 border-blue-600 pb-4' 
                                    : 'text-gray-700 hover:text-blue-600'
                            }`
                        }
                    >
                        👥 Employees
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/reports" 
                        className={({ isActive }) => 
                            `text-sm font-medium transition duration-200 ${
                                isActive 
                                    ? 'text-blue-600 border-b-2 border-blue-600 pb-4' 
                                    : 'text-gray-700 hover:text-blue-600'
                            }`
                        }
                    >
                        📊 Reports
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/departments" 
                        className={({ isActive }) => 
                            `text-sm font-medium transition duration-200 ${
                                isActive 
                                    ? 'text-blue-600 border-b-2 border-blue-600 pb-4' 
                                    : 'text-gray-700 hover:text-blue-600'
                            }`
                        }
                    >
                        🏢 Departments
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/analytics" 
                        className={({ isActive }) => 
                            `text-sm font-medium transition duration-200 ${
                                isActive 
                                    ? 'text-blue-600 border-b-2 border-blue-600 pb-4' 
                                    : 'text-gray-700 hover:text-blue-600'
                            }`
                        }
                    >
                        📈 Analytics
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/settings" 
                        className={({ isActive }) => 
                            `text-sm font-medium transition duration-200 ${
                                isActive 
                                    ? 'text-blue-600 border-b-2 border-blue-600 pb-4' 
                                    : 'text-gray-700 hover:text-blue-600'
                            }`
                        }
                    >
                        ⚙️ Settings
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default HorizontalMenu;