import React, { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import type { Employee } from '../../types';
import { DELETE_EMPLOYEE } from '../../graphql/mutations';
import { GET_EMPLOYEES } from '../../graphql/queries';

interface EmployeeTileProps {
    employee: Employee;
    onClick?: (employee: Employee) => void;
    viewMode?: 'grid' | 'tile';
    onEdit?: (employee: Employee) => void;
    isAdmin?: boolean;
}

const EmployeeTile: React.FC<EmployeeTileProps> = ({ employee, onClick, viewMode = 'grid', onEdit, isAdmin = false }) => {
    const [showMenu, setShowMenu] = useState(false);

    const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
        refetchQueries: [
            { 
                query: GET_EMPLOYEES,
                variables: {
                    limit: 5,  // Default limit
                    offset: 0,
                    sortBy: 'name',
                    sortOrder: 'asc'
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

    const getInitials = (name: string) => {
        const names = name.split(' ');
        if (names.length >= 2) {
            return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onEdit) {
            onEdit(employee);
        }
    };

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowMenu(false);
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

    const toggleMenu = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    return (
        <div 
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 p-6 cursor-pointer border border-violet-100"
            onClick={() => onClick?.(employee)}
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {getInitials(employee.name)}
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-violet-900">{employee.name}</h3>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase mt-1 ${
                            employee.class === 'Senior' ? 'bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 border border-rose-200' :
                            employee.class === 'Mid-Level' ? 'bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 border border-violet-200' :
                            employee.class === 'Junior' ? 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 border border-emerald-200' :
                            'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 border border-amber-200'
                        }`}>
                            {employee.class}
                        </span>
                    </div>
                </div>
                {isAdmin && (
                    <div className="relative">
                        <button 
                            className="text-slate-500 hover:text-slate-700 p-2 rounded-lg hover:bg-slate-100 transition-colors" 
                            onClick={toggleMenu}
                        >
                            ⋮
                        </button>
                        {showMenu && (
                            <div className="absolute right-0 top-8 bg-white border border-slate-200 rounded-lg shadow-xl z-10 min-w-[120px]">
                                <button 
                                    onClick={handleEdit}
                                    className="w-full px-4 py-2 text-left hover:bg-slate-50 text-sm text-slate-700 rounded-t-lg transition-colors"
                                >
                                    ✏️ Edit
                                </button>
                                <button 
                                    onClick={handleDelete}
                                    className="w-full px-4 py-2 text-left hover:bg-rose-50 text-sm text-rose-600 rounded-b-lg transition-colors"
                                >
                                    🗑️ Delete
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
            
            {viewMode === 'grid' ? (
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <span className="text-violet-600 text-sm font-medium">Age:</span>
                        <span className="text-violet-900 font-medium">{employee.age} years</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-violet-600 text-sm font-medium">Attendance:</span>
                        <span className="text-violet-900 font-medium">{employee.attendance}%</span>
                    </div>
                    <div>
                        <span className="text-violet-600 text-sm font-medium">Subjects:</span>
                        <div className="flex flex-wrap gap-1 mt-2">
                            {employee.subjects.map((subject, idx) => (
                                <span key={idx} className="inline-block px-2 py-1 bg-gradient-to-r from-violet-100 to-cyan-100 text-violet-800 rounded-md text-xs font-medium border border-violet-200">
                                    {subject}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="space-y-2">
                    <div className="text-sm text-violet-700 font-medium">
                        🎂 {employee.age} years old
                    </div>
                    <div className="text-sm text-violet-700 font-medium">
                        📊 {employee.attendance}% attendance
                    </div>
                    <div className="text-sm text-violet-700 font-medium">
                        💼 {employee.subjects.length} subjects
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeTile;