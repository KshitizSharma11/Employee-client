import React, { useState } from 'react';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client/react';
import { GET_EMPLOYEES, SEARCH_EMPLOYEES } from '../../graphql/queries';
import { DELETE_EMPLOYEE } from '../../graphql/mutations';
import EmployeeTile from './EmployeeTile';
import EmployeeDetailModal from './EmployeeDetailModal';
import EmployeeEditModal from './EmployeeEditModal';
import { useAuth } from '../../hooks/useAuth';
import type { Employee, EmployeesResponse, SearchEmployeesResponse } from '../../types';

const EmployeeGrid: React.FC = () => {
    const { user } = useAuth();
    const [viewMode, setViewMode] = useState<'grid' | 'tile'>('grid');
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const itemsPerPage = 5;

    const { loading, error, data } = useQuery<EmployeesResponse>(GET_EMPLOYEES, {
        variables: {
            limit: itemsPerPage,
            offset: (currentPage - 1) * itemsPerPage,
            sortBy,
            sortOrder
        },
        skip: isSearching
    });

    const [searchEmployees, { loading: searchLoading, data: searchData }] = useLazyQuery<SearchEmployeesResponse>(SEARCH_EMPLOYEES);

    const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
        refetchQueries: [
            {
                query: GET_EMPLOYEES,
                variables: {
                    limit: itemsPerPage,
                    offset: (currentPage - 1) * itemsPerPage,
                    sortBy,
                    sortOrder
                }
            }
        ],
        onCompleted: () => {
            alert('Employee deleted successfully!');
        },
        onError: (error) => {
            alert(`Error deleting employee: ${error.message}`);
        }
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setIsSearching(true);
            searchEmployees({
                variables: {
                    query: searchQuery,
                    limit: itemsPerPage,
                    offset: 0
                }
            });
        } else {
            setIsSearching(false);
        }
    };

    const clearSearch = () => {
        setSearchQuery('');
        setIsSearching(false);
    };

    if (loading || searchLoading) return <div className="flex justify-center items-center h-64">Loading employees...</div>;
    if (error) return <div className="text-red-600 text-center">Error: {error.message}</div>;

    const displayData = isSearching ? searchData?.searchEmployees?.employees : data?.employees;
    const totalResults = isSearching ? searchData?.searchEmployees?.total : data?.employees?.length;

    const handleEmployeeClick = (employee: Employee) => {
        setSelectedEmployee(employee);
    };

    const handleEditEmployee = (employee: Employee) => {
        setEditingEmployee(employee);
    };

    const closeModal = () => {
        setSelectedEmployee(null);
    };

    const closeEditModal = () => {
        setEditingEmployee(null);
        setShowAddModal(false);
    };

    const handleDeleteEmployee = async (employee: Employee, e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm(`Are you sure you want to delete ${employee.name}?`)) {
            try {
                await deleteEmployee({
                    variables: { id: employee.id }
                });
            } catch (err) {
                console.error('Delete error:', err);
            }
        }
    };

    const isAdmin = user?.role === 'admin';

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-violet-100">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
                    <h1 className="text-3xl font-bold text-violet-900 mb-4 sm:mb-0">👥 Employee Directory</h1>
                    {isAdmin && (
                        <button 
                            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-3 rounded-lg font-medium transition duration-200 shadow-md"
                            onClick={() => setShowAddModal(true)}
                        >
                            ➕ Add Employee
                        </button>
                    )}
                </div>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="mb-6">
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="🔍 Search by name, class, or subjects..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button 
                            type="submit" 
                            className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium transition duration-200 shadow-md"
                        >
                            Search
                        </button>
                        {isSearching && (
                            <button 
                                type="button" 
                                onClick={clearSearch} 
                                className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-4 py-2 rounded-lg font-medium transition duration-200 shadow-md"
                            >
                                ✕ Clear
                            </button>
                        )}
                    </div>
                    {isSearching && totalResults !== undefined && (
                        <div className="mt-2 text-sm text-gray-600">
                            Found {totalResults} result{totalResults !== 1 ? 's' : ''} for "{searchQuery}"
                        </div>
                    )}
                </form>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div className="flex gap-3">
                        <select 
                            value={sortBy} 
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isSearching}
                        >
                            <option value="name">📋 Sort by Name</option>
                            <option value="age">🎂 Sort by Age</option>
                            <option value="class">🎯 Sort by Class</option>
                            <option value="attendance">📊 Sort by Attendance</option>
                        </select>

                        <select 
                            value={sortOrder} 
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isSearching}
                        >
                            <option value="asc">⬆️ Ascending</option>
                            <option value="desc">⬇️ Descending</option>
                        </select>
                    </div>

                    <div className="flex bg-gradient-to-r from-slate-100 to-gray-100 rounded-lg p-1 border border-slate-200">
                        <button 
                            className={`px-4 py-2 rounded-md font-medium transition duration-200 ${
                                viewMode === 'grid' 
                                    ? 'bg-gradient-to-r from-slate-600 to-gray-600 text-white shadow-md' 
                                    : 'text-slate-600 hover:bg-white hover:text-slate-700 hover:shadow-sm'
                            }`}
                            onClick={() => setViewMode('grid')}
                        >
                            <span>⊞</span> Grid
                        </button>
                        <button 
                            className={`px-4 py-2 rounded-md font-medium transition duration-200 ${
                                viewMode === 'tile' 
                                    ? 'bg-gradient-to-r from-slate-600 to-gray-600 text-white shadow-md' 
                                    : 'text-slate-600 hover:bg-white hover:text-slate-700 hover:shadow-sm'
                            }`}
                            onClick={() => setViewMode('tile')}
                        >
                            <span>▦</span> Tile
                        </button>
                    </div>
                </div>
            </div>

            {viewMode === 'grid' ? (
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-violet-100">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead className="bg-gradient-to-r from-violet-600 to-cyan-600">
                                <tr>
                                    <th className="px-3 py-4 text-center text-white text-xs font-semibold uppercase tracking-wide w-[60px]">Avatar</th>
                                    <th className="px-3 py-4 text-left text-white text-xs font-semibold uppercase tracking-wide w-[70px]">ID</th>
                                    <th className="px-3 py-4 text-left text-white text-xs font-semibold uppercase tracking-wide w-[140px]">Name</th>
                                    <th className="px-3 py-4 text-center text-white text-xs font-semibold uppercase tracking-wide w-[60px]">Age</th>
                                    <th className="px-3 py-4 text-left text-white text-xs font-semibold uppercase tracking-wide w-[100px]">Class</th>
                                    <th className="px-3 py-4 text-left text-white text-xs font-semibold uppercase tracking-wide w-[200px]">Subjects</th>
                                    <th className="px-3 py-4 text-center text-white text-xs font-semibold uppercase tracking-wide w-[80px]">Count</th>
                                    <th className="px-3 py-4 text-left text-white text-xs font-semibold uppercase tracking-wide w-[130px]">Attendance</th>
                                    {isAdmin && <th className="px-3 py-4 text-center text-white text-xs font-semibold uppercase tracking-wide w-[90px]">Actions</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {displayData && displayData.map((employee: Employee) => (
                                    <tr 
                                        key={employee.id} 
                                        onClick={() => handleEmployeeClick(employee)} 
                                        className="border-b border-gray-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 cursor-pointer transition-all"
                                    >
                                        <td className="px-3 py-4 text-center w-[60px]">
                                            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm mx-auto">
                                                {employee.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
                                            </div>
                                        </td>
                                        <td className="px-3 py-4 text-sm text-violet-700 w-[70px]">#{employee.id}</td>
                                        <td className="px-3 py-4 text-sm font-bold text-violet-700 w-[140px]">{employee.name}</td>
                                        <td className="px-3 py-4 text-center text-sm text-gray-700 w-[60px]">{employee.age}</td>
                                        <td className="px-3 py-4 w-[100px]">
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                                                employee.class === 'Senior' ? 'bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 border border-rose-200' :
                                                employee.class === 'Mid-Level' ? 'bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 border border-violet-200' :
                                                employee.class === 'Junior' ? 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 border border-emerald-200' :
                                                'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 border border-amber-200'
                                            }`}>
                                                {employee.class}
                                            </span>
                                        </td>
                                        <td className="px-3 py-4 w-[200px]">
                                            <div className="flex gap-1 overflow-x-auto">
                                                {employee.subjects.map((subject, idx) => (
                                                    <span key={idx} className="inline-block px-2 py-1 bg-gradient-to-r from-violet-500 to-cyan-500 text-white rounded-lg text-[10px] font-semibold whitespace-nowrap flex-shrink-0 shadow-sm">
                                                        {subject}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-3 py-4 text-center text-sm text-gray-700 w-[80px]">{employee.subjects.length}</td>
                                        <td className="px-3 py-4 w-[130px]">
                                            <div className="flex items-center gap-2">
                                                <div className="w-16 h-2 bg-violet-100 rounded-full overflow-hidden">
                                                    <div 
                                                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all"
                                                        style={{width: `${employee.attendance}%`}}
                                                    />
                                                </div>
                                                <span className="text-sm text-gray-700">{employee.attendance}%</span>
                                            </div>
                                        </td>
                                        {isAdmin && (
                                            <td className="px-3 py-4 text-center w-[90px]" onClick={(e) => e.stopPropagation()}>
                                                <div className="flex gap-1 justify-center">
                                                    <button 
                                                        className="w-7 h-7 rounded-lg bg-blue-100 hover:bg-blue-500 hover:scale-110 transition-all flex items-center justify-center text-xs"
                                                        onClick={() => handleEditEmployee(employee)}
                                                    >
                                                        ✏️
                                                    </button>
                                                    <button 
                                                        className="w-7 h-7 rounded-lg bg-rose-100 hover:bg-rose-500 hover:text-white hover:scale-110 transition-all flex items-center justify-center text-xs"
                                                        onClick={(e) => handleDeleteEmployee(employee, e)}
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayData && displayData.map((employee: Employee) => (
                        <EmployeeTile 
                            key={employee.id} 
                            employee={employee}
                            onClick={() => handleEmployeeClick(employee)}
                            onEdit={handleEditEmployee}
                            viewMode={viewMode}
                            isAdmin={isAdmin}
                        />
                    ))}
                </div>
            )}

            {displayData && displayData.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-4 border border-violet-100">
                    <div className="flex justify-between items-center">
                        <button 
                            className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition duration-200 shadow-md" 
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                        >
                            ← Previous
                        </button>
                        <div className="text-center">
                            <div className="font-semibold text-violet-900">Page {currentPage}</div>
                            <div className="text-sm text-violet-600">
                                Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, totalResults || 0)} of {totalResults || 0}
                            </div>
                        </div>
                        <button 
                            className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition duration-200 shadow-md" 
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            disabled={!displayData || displayData.length < itemsPerPage}
                        >
                            Next →
                        </button>
                    </div>
                </div>
            )}

            {selectedEmployee && (
                <EmployeeDetailModal 
                    employee={selectedEmployee}
                    onClose={closeModal}
                />
            )}

            {editingEmployee && (
                <EmployeeEditModal 
                    employee={editingEmployee}
                    onClose={closeEditModal}
                />
            )}

            {showAddModal && (
                <EmployeeEditModal 
                    employee={{
                        id: '',
                        name: '',
                        age: 25,
                        class: 'Junior',
                        subjects: [],
                        attendance: 100
                    }}
                    onClose={closeEditModal}
                />
            )}
        </div>
    );
};

export default EmployeeGrid;