import React from 'react';
import type { Employee } from '../../types';

interface EmployeeDetailModalProps {
    employee: Employee;
    onClose: () => void;
}

const EmployeeDetailModal: React.FC<EmployeeDetailModalProps> = ({ employee, onClose }) => {
    const getInitials = (name: string) => {
        const names = name.split(' ');
        if (names.length >= 2) {
            return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-violet-100" onClick={(e) => e.stopPropagation()}>
                <div className="sticky top-0 bg-gradient-to-r from-violet-500 to-cyan-500 text-white px-6 py-4 flex justify-between items-center rounded-t-xl">
                    <h2 className="text-xl font-semibold">Employee Details</h2>
                    <button 
                        className="text-white hover:text-violet-200 text-xl"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>
                
                <div className="p-6">
                    <div className="flex items-center space-x-6 mb-8">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                            {getInitials(employee.name)}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-violet-900">{employee.name}</h2>
                            <p className="text-violet-700 text-lg">{employee.class}</p>
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase mt-2 ${
                                employee.class === 'Senior' ? 'bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 border border-rose-200' :
                                employee.class === 'Mid-Level' ? 'bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 border border-violet-200' :
                                employee.class === 'Junior' ? 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 border border-emerald-200' :
                                'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 border border-amber-200'
                            }`}>
                                Level: {employee.class}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h3 className="text-lg font-semibold text-violet-900 mb-4">👤 Basic Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-4 rounded-lg border border-violet-200">
                                    <span className="block text-sm font-medium text-violet-600 mb-1">Employee ID</span>
                                    <span className="text-lg font-semibold text-violet-900">#{employee.id}</span>
                                </div>
                                <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-4 rounded-lg border border-violet-200">
                                    <span className="block text-sm font-medium text-violet-600 mb-1">Age</span>
                                    <span className="text-lg font-semibold text-violet-900">{employee.age} years</span>
                                </div>
                                <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-4 rounded-lg border border-violet-200">
                                    <span className="block text-sm font-medium text-violet-600 mb-1">Class/Level</span>
                                    <span className="text-lg font-semibold text-violet-900">{employee.class}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-violet-900 mb-4">📊 Performance</h3>
                            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-lg border border-emerald-200">
                                <span className="block text-sm font-medium text-emerald-600 mb-3">Attendance</span>
                                <div className="flex items-center space-x-3">
                                    <div className="flex-1 h-4 bg-emerald-200 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                                            style={{width: `${employee.attendance}%`}}
                                        />
                                    </div>
                                    <span className="text-lg font-semibold text-emerald-900">{employee.attendance}%</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-violet-900 mb-4">💼 Skills & Expertise</h3>
                            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-4 rounded-lg border border-cyan-200">
                                <div className="flex flex-wrap gap-2">
                                    {employee.subjects.map((subject, idx) => (
                                        <span key={idx} className="inline-block px-3 py-2 bg-gradient-to-r from-violet-500 to-cyan-500 text-white rounded-lg text-sm font-medium shadow-md">
                                            {subject}
                                        </span>
                                    ))}
                                    {employee.subjects.length === 0 && (
                                        <span className="text-cyan-600 italic">No subjects assigned</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-violet-100 to-cyan-100 px-6 py-4 rounded-b-xl border-t border-violet-200">
                    <button 
                        className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white px-6 py-3 rounded-lg font-medium transition duration-200 shadow-md"
                        onClick={onClose}
                    >
                        ← Back to List
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetailModal;
