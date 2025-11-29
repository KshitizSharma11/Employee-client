import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        try {
            await login(username, password);
            navigate('/'); // Redirect to home after login
        } catch (error) {
            console.error("Login failed:", error);
            setError('Invalid username or password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-100 to-cyan-100 px-4">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-xl border border-violet-100">
                <div className="text-center">
                    <div className="text-6xl mb-4">👥</div>
                    <h2 className="text-3xl font-bold text-violet-900">Welcome Back</h2>
                    <p className="mt-2 text-violet-700">Sign in to access the Employee Management System</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
                        ⚠️ {error}
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                            disabled={loading}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            disabled={loading}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                        />
                    </div>

                        <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-md"
                    >
                        {loading ? 'Signing in...' : 'Sign In →'}
                    </button>
                </form>

                <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600">
                        <strong>Demo Credentials:</strong>
                        <div className="mt-2 space-y-1">
                            <p>Admin: <code className="bg-gray-200 px-1 rounded">admin / admin123</code></p>
                            <p>Employee: <code className="bg-gray-200 px-1 rounded">employee / employee123</code></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;