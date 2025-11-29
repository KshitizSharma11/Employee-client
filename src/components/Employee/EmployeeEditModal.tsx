import React, { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import type { Employee } from '../../types';
import { UPDATE_EMPLOYEE, CREATE_EMPLOYEE } from '../../graphql/mutations';
import { GET_EMPLOYEES } from '../../graphql/queries';

interface EmployeeEditModalProps {
    employee: Employee;
    onClose: () => void;
}

const EmployeeEditModal: React.FC<EmployeeEditModalProps> = ({ employee, onClose }) => {
    const isNewEmployee = !employee.id;
    const [formData, setFormData] = useState({
        name: employee.name || '',
        age: employee.age || 18,
        class: employee.class || 'Junior',
        subjects: employee.subjects || [],
        attendance: employee.attendance || 0
    });
    const [subjectInput, setSubjectInput] = useState('');

    const [updateEmployee, { loading: updateLoading }] = useMutation(UPDATE_EMPLOYEE, {
        refetchQueries: [{ query: GET_EMPLOYEES }],
        onCompleted: () => {
            alert('Employee updated successfully!');
            onClose();
        },
        onError: (error) => {
            alert(`Error updating employee: ${error.message}`);
        }
    });

    const [createEmployee, { loading: createLoading }] = useMutation(CREATE_EMPLOYEE, {
        refetchQueries: [{ query: GET_EMPLOYEES }],
        onCompleted: () => {
            alert('Employee created successfully!');
            onClose();
        },
        onError: (error) => {
            alert(`Error creating employee: ${error.message}`);
        }
    });

    const loading = updateLoading || createLoading;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'age' || name === 'attendance' ? parseFloat(value) : value
        }));
    };

    const addSubject = () => {
        if (subjectInput.trim() && !formData.subjects.includes(subjectInput.trim())) {
            setFormData(prev => ({
                ...prev,
                subjects: [...prev.subjects, subjectInput.trim()]
            }));
            setSubjectInput('');
        }
    };

    const removeSubject = (subject: string) => {
        setFormData(prev => ({
            ...prev,
            subjects: prev.subjects.filter(s => s !== subject)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isNewEmployee) {
                await createEmployee({
                    variables: {
                        input: formData
                    }
                });
            } else {
                await updateEmployee({
                    variables: {
                        id: employee.id,
                        input: formData
                    }
                });
            }
        } catch (err) {
            console.error('Submit error:', err);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-xl">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {isNewEmployee ? '➕ Add Employee' : '✏️ Edit Employee'}
                    </h2>
                    <button 
                        className="text-gray-400 hover:text-gray-600 text-xl"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter full name"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Age
                            </label>
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                min="18"
                                max="100"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Class/Level
                            </label>
                            <select
                                name="class"
                                value={formData.class}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="Junior">Junior</option>
                                <option value="Mid-Level">Mid-Level</option>
                                <option value="Senior">Senior</option>
                                <option value="Principal">Principal</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Attendance %
                        </label>
                        <input
                            type="number"
                            name="attendance"
                            value={formData.attendance}
                            onChange={handleChange}
                            min="0"
                            max="100"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Skills/Subjects
                        </label>
                        <div className="flex gap-2 mb-3">
                            <input
                                type="text"
                                value={subjectInput}
                                onChange={(e) => setSubjectInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSubject())}
                                placeholder="Type a subject and press Enter"
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button 
                                type="button" 
                                onClick={addSubject} 
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition duration-200"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.subjects.map((subject, idx) => (
                                <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm">
                                    {subject}
                                    <button
                                        type="button"
                                        onClick={() => removeSubject(subject)}
                                        className="text-blue-600 hover:text-blue-800 ml-1"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-50 -mx-6 -mb-6 px-6 py-4 flex justify-end space-x-3 rounded-b-xl">
                        <button 
                            type="button" 
                            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition duration-200" 
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition duration-200"
                        >
                            {loading ? 'Saving...' : isNewEmployee ? 'Create Employee' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeEditModal;
