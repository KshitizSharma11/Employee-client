import React from 'react';
import { useNavigate } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';
import HorizontalMenu from './HorizontalMenu';
import { useAuth } from '../../hooks/useAuth';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-50 to-cyan-50">
            <header className="bg-white shadow-lg border-b-2 border-violet-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-4">
                            <HamburgerMenu />
                            <HorizontalMenu />
                        </div>
                        {user && (
                            <div className="flex items-center space-x-4">
                                <div className="text-sm text-violet-800 bg-violet-100 px-3 py-2 rounded-full font-medium">
                                    👤 {user.username} ({user.role})
                                </div>
                                <button 
                                    className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200 shadow-md"
                                    onClick={handleLogout}
                                >
                                    🚪 Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
};

export default Layout;