import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllUsers, createUser, updateUser, deleteUser } from './store/usersSlice';

const UserManagement = () => {
    const dispatch = useDispatch();
    const { users: reduxUsers, loading, error } = useSelector((state) => state.users);
    
    const [users, setUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'data_outlet',
        outlet: '',
        zone: '',
        password: ''
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(2);
    const [successMessage, setSuccessMessage] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    // Fetch users from Redux on component mount
    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    // Update local users state when Redux users change
    useEffect(() => {
        if (reduxUsers && reduxUsers.length > 0) {
            console.log('🔄 Updating local users from Redux:', reduxUsers);
            
            // Transform API users to match your frontend structure
            const transformedUsers = reduxUsers.map(user => ({
                id: user._id || user.id,
                name: user.name || 'Unknown User',
                email: user.email || 'No email',
                role: user.role || 'data_outlet',
                outlet: user.outlet || null,
                zone: user.zone || null,
                isActive: user.isActive !== undefined ? user.isActive : true,
                createdAt: user.createdAt ? new Date(user.createdAt).toISOString().split('T')[0] : '2024-01-01'
            }));
            
            setUsers(transformedUsers);
        } else {
            console.log('❌ No users in Redux store');
            setUsers([]);
        }
    }, [reduxUsers]);

    // Reset form data
    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            role: 'data_outlet',
            outlet: '',
            zone: '',
            password: ''
        });
        setEditingUser(null);
    };

    // Show success message
    const showSuccessMessage = (message) => {
        setSuccessMessage(message);
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            setSuccessMessage('');
        }, 3000);
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingUser) {
                // Update existing user via Redux
                await dispatch(updateUser({
                    id: editingUser.id,
                    userData: {
                        name: formData.name,
                        email: formData.email,
                        role: formData.role,
                        outlet: formData.outlet || null,
                        zone: formData.zone || null
                    }
                })).unwrap();
                
                showSuccessMessage('User updated successfully!');
            } else {
                // Add new user via Redux
                await dispatch(createUser({
                    name: formData.name,
                    email: formData.email,
                    role: formData.role,
                    outlet: formData.outlet || null,
                    zone: formData.zone || null,
                    password: formData.password,
                    isActive: true
                })).unwrap();
                
                showSuccessMessage('User added successfully!');
            }

            setShowForm(false);
            resetForm();
            
            // Refresh users list
            dispatch(fetchAllUsers());
            
        } catch (error) {
            console.error('Error saving user:', error);
            showSuccessMessage(`Error: ${error.message || 'Failed to save user'}`);
        }
    };

    // Edit user
    const handleEdit = (user) => {
        setEditingUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            role: user.role,
            outlet: user.outlet || '',
            zone: user.zone || '',
            password: '' // Don't pre-fill password for security
        });
        setShowForm(true);
    };

    // Delete user
    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const userName = users.find(user => user.id === userId)?.name;
                await dispatch(deleteUser(userId)).unwrap();
                showSuccessMessage(`User "${userName}" deleted successfully!`);
                
                // Refresh users list
                dispatch(fetchAllUsers());
                
                // Reset to first page if current page becomes empty
                if (filteredUsers.length <= 1 && currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                }
            } catch (error) {
                console.error('Error deleting user:', error);
                showSuccessMessage(`Error: ${error.message || 'Failed to delete user'}`);
            }
        }
    };

    // Toggle user status
    const handleToggleStatus = async (userId) => {
        try {
            const user = users.find(u => u.id === userId);
            await dispatch(updateUser({
                id: userId,
                userData: {
                    isActive: !user.isActive
                }
            })).unwrap();
            
            showSuccessMessage(`User ${user.isActive ? 'deactivated' : 'activated'} successfully!`);
            
            // Refresh users list
            dispatch(fetchAllUsers());
            
        } catch (error) {
            console.error('Error updating user status:', error);
            showSuccessMessage(`Error: ${error.message || 'Failed to update user status'}`);
        }
    };

    // Cancel form
    const handleCancel = () => {
        setShowForm(false);
        resetForm();
    };

    // Close form with cross button
    const handleCloseForm = () => {
        setShowForm(false);
        resetForm();
    };

    // Filter users based on search and role filter
    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === 'all' || user.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    // Pagination logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, roleFilter]);

    // Get role display name
    const getRoleDisplayName = (role) => {
        const roleNames = {
            admin: 'Administrator',
            data_outlet: 'Data Outlet',
            report: 'Report Viewer',
            data_report: 'Data & Report'
        };
        return roleNames[role] || role;
    };

    // Get role description
    const getRoleDescription = (role) => {
        const descriptions = {
            admin: 'Full system access with user management',
            data_outlet: 'Can enter/edit data for specific outlet',
            report: 'Can view reports for outlets and zones',
            data_report: 'Can enter/edit data and view all reports'
        };
        return descriptions[role];
    };

    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5;

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            const startPage = Math.max(1, currentPage - 2);
            const endPage = Math.min(totalPages, currentPage + 2);

            if (startPage > 1) {
                pageNumbers.push(1);
                if (startPage > 2) pageNumbers.push('...');
            }

            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }

            if (endPage < totalPages) {
                if (endPage < totalPages - 1) pageNumbers.push('...');
                pageNumbers.push(totalPages);
            }
        }

        return pageNumbers;
    };

    // Show loading state
    if (loading && users.length === 0) {
        return (
            <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen px-4 py-6 sm:p-6 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading users...</p>
                </div>
            </div>
        );
    }

    // Show error state
    if (error && users.length === 0) {
        return (
            <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen px-4 py-6 sm:p-6 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-lg mb-4">Error loading users</div>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={() => dispatch(fetchAllUsers())}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen px-4 py-6 sm:p-6">
            <div className="w-full mx-auto">
                {/* Success Message */}
                {showSuccess && (
                    <div className="fixed top-4 right-4 z-50 animate-slide-in">
                        <div className="bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 max-w-sm">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="flex-1">{successMessage}</span>
                            <button
                                onClick={() => setShowSuccess(false)}
                                className="text-white hover:text-green-100 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}

                {/* Header */}
                <div className="mb-6 sm:mb-8 text-center">
                    <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        User Management
                    </h1>
                    <p className="text-gray-600 mt-2 sm:mt-3 text-sm sm:text-lg">
                        {loading ? 'Loading users...' : `Managing ${users.length} system users`}
                    </p>
                </div>

                {/* Mobile Filter Toggle */}
                <div className="sm:hidden mb-4">
                    <button
                        onClick={() => setShowMobileFilters(!showMobileFilters)}
                        className="w-full bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/60 p-4 flex items-center justify-between"
                    >
                        <span className="font-medium text-gray-700">Filters & Search</span>
                        <svg
                            className={`w-5 h-5 text-gray-500 transition-transform ${showMobileFilters ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>

                {/* Controls */}
                <div className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/60 p-4 sm:p-6 mb-6 sm:mb-8 transition-all duration-300 ${showMobileFilters ? 'block' : 'hidden sm:block'}`}>
                    <div className="flex flex-col gap-4">
                        {/* Search */}
                        <div className="w-full">
                            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                                Search Users
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg
                                        className="h-4 w-4 sm:h-5 sm:w-5 text-black"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="search"
                                    placeholder="Search by name or email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 backdrop-blur-sm text-sm sm:text-base"
                                />
                            </div>
                        </div>

                        {/* Role Filter */}
                        <div className="w-full">
                            <label htmlFor="roleFilter" className="block text-sm font-medium text-gray-700 mb-2">
                                Filter by Role
                            </label>
                            <select
                                id="roleFilter"
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 backdrop-blur-sm text-sm sm:text-base"
                            >
                                <option value="all">All Roles</option>
                                <option value="admin">Administrator</option>
                                <option value="data_outlet">Data Outlet</option>
                                <option value="report">Report Viewer</option>
                                <option value="data_report">Data & Report</option>
                            </select>
                        </div>

                        {/* Add User Button */}
                        <button
                            onClick={() => setShowForm(true)}
                            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
                        >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add New User
                        </button>
                    </div>
                </div>

                {/* User Form Modal with Enhanced Background */}
                {showForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
                        {/* Enhanced Gradient Background with Animation */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm">
                            <div className="absolute inset-0 bg-black/20"></div>
                        </div>

                        {/* Form Container */}
                        <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-md max-h-[95vh] sm:max-h-[90vh] overflow-y-auto border border-white/20 transform animate-scale-in mx-2">
                            {/* Form Header with Gradient and Close Button */}
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl sm:rounded-t-3xl p-4 sm:p-6 text-white relative">
                                <button
                                    onClick={handleCloseForm}
                                    className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white hover:text-blue-100 transition-colors p-1 rounded-full hover:bg-white/10"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                <div className="pr-8">
                                    <h2 className="text-xl sm:text-2xl font-bold">
                                        {editingUser ? 'Edit User' : 'Add New User'}
                                    </h2>
                                    <p className="text-blue-100 mt-1 sm:mt-2 text-sm">
                                        {editingUser ? 'Update user information' : 'Create a new user account'}
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                                {/* Name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name *
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 backdrop-blur-sm transition-all duration-200 text-sm sm:text-base"
                                            placeholder="Enter full name"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 backdrop-blur-sm transition-all duration-200 text-sm sm:text-base"
                                            placeholder="Enter email address"
                                        />
                                    </div>
                                </div>

                                {/* Password (only for new users) */}
                                {!editingUser && (
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                            Password *
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 backdrop-blur-sm transition-all duration-200 text-sm sm:text-base"
                                                placeholder="Enter password"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Role Selection */}
                                <div>
                                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                                        Role *
                                    </label>
                                    <select
                                        id="role"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 backdrop-blur-sm transition-all duration-200 text-sm sm:text-base"
                                    >
                                        <option value="data_outlet">Data Outlet</option>
                                        <option value="report">Report Viewer</option>
                                        <option value="data_report">Data & Report</option>
                                        <option value="admin">Administrator</option>
                                    </select>
                                    <p className="text-xs sm:text-sm text-gray-600 mt-2 px-1">
                                        {getRoleDescription(formData.role)}
                                    </p>
                                </div>

                                {/* Outlet (for data_outlet role) */}
                                {formData.role === 'data_outlet' && (
                                    <div>
                                        <label htmlFor="outlet" className="block text-sm font-medium text-gray-700 mb-2">
                                            Assigned Outlet *
                                        </label>
                                        <select
                                            id="outlet"
                                            name="outlet"
                                            value={formData.outlet}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 backdrop-blur-sm transition-all duration-200 text-sm sm:text-base"
                                        >
                                            <option value="">Select Outlet</option>
                                            <option value="Outlet A">Outlet A</option>
                                            <option value="Outlet B">Outlet B</option>
                                            <option value="Outlet C">Outlet C</option>
                                            <option value="Outlet D">Outlet D</option>
                                        </select>
                                    </div>
                                )}

                                {/* Zone (for report role) */}
                                {formData.role === 'report' && (
                                    <div>
                                        <label htmlFor="zone" className="block text-sm font-medium text-gray-700 mb-2">
                                            Assigned Zone *
                                        </label>
                                        <select
                                            id="zone"
                                            name="zone"
                                            value={formData.zone}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 backdrop-blur-sm transition-all duration-200 text-sm sm:text-base"
                                        >
                                            <option value="">Select Zone</option>
                                            <option value="Zone 1">Zone 1</option>
                                            <option value="Zone 2">Zone 2</option>
                                            <option value="Zone 3">Zone 3</option>
                                            <option value="Overall">Overall</option>
                                        </select>
                                    </div>
                                )}

                                {/* Form Actions */}
                                <div className="flex flex-col sm:flex-row gap-3 pt-4 sm:pt-6">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
                                    >
                                        {editingUser ? 'Update User' : 'Create User'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-200 transition-all duration-300 font-medium border border-gray-200 text-sm sm:text-base"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Users Count and Pagination Info */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                    <p className="text-sm text-gray-600">
                        Showing {Math.min(filteredUsers.length, usersPerPage)} of {filteredUsers.length} total users
                    </p>
                    {totalPages > 1 && (
                        <p className="text-sm text-gray-600">
                            Page {currentPage} of {totalPages}
                        </p>
                    )}
                </div>

                {/* Users Table */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl lg:rounded-2xl shadow-lg border border-white/60 overflow-hidden mb-6">
                    {/* Table Header (Visible on Desktop Only) */}
                    <div className="hidden lg:grid lg:grid-cols-12 bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-gray-200 font-semibold text-gray-700 text-sm">
                        <div className="col-span-3">USER</div>
                        <div className="col-span-3">ROLE</div>
                        <div className="col-span-3">ASSIGNMENT</div>
                        <div className="col-span-1">STATUS</div>
                        <div className="col-span-1">JOINED</div>
                        <div className="col-span-1">ACTIONS</div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-gray-200">
                        {currentUsers.map((user) => (
                            <div
                                key={user.id}
                                className="px-4 lg:px-6 py-4 hover:bg-gray-50/50 transition-colors duration-200"
                            >
                                {/* Desktop Layout (1000px and above) */}
                                <div className="hidden lg:grid lg:grid-cols-12">
                                    {/* USER */}
                                    <div className="col-span-3">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                                                {user.name.split(" ").map((n) => n[0]).join("")}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h3 className="text-base font-semibold text-gray-900 truncate">
                                                    {user.name}
                                                </h3>
                                                <p className="text-sm text-gray-600 truncate">{user.email}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ROLE */}
                                    <div className="col-span-3">
                                        <div className="text-sm font-medium text-gray-900">
                                            {getRoleDisplayName(user.role)}
                                        </div>
                                        <div className="text-xs text-gray-600 mt-1">
                                            {getRoleDescription(user.role)}
                                        </div>
                                    </div>

                                    {/* ASSIGNMENT */}
                                    <div className="col-span-3">
                                        <div className="space-y-1">
                                            {user.outlet && (
                                                <div className="text-sm text-gray-900">
                                                    <span className="font-medium">Outlet:</span> {user.outlet}
                                                </div>
                                            )}
                                            {user.zone && (
                                                <div className="text-sm text-gray-900">
                                                    <span className="font-medium">Zone:</span> {user.zone}
                                                </div>
                                            )}
                                            {!user.outlet && !user.zone && (
                                                <div className="text-sm text-gray-500">-</div>
                                            )}
                                        </div>
                                    </div>

                                    {/* STATUS */}
                                    <div className="col-span-1 flex items-center">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.isActive
                                                ? "bg-green-100 text-green-800 border border-green-200"
                                                : "bg-red-100 text-red-800 border border-red-200"
                                                }`}
                                        >
                                            {user.isActive ? "Active" : "Inactive"}
                                        </span>
                                    </div>

                                    {/* JOINED */}
                                    <div className="col-span-1 flex items-center text-sm text-gray-900">
                                        {user.createdAt}
                                    </div>

                                    {/* ACTIONS */}
                                    <div className="col-span-1 flex items-center space-x-2">
                                        <button
                                            onClick={() => handleEdit(user)}
                                            className="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-1 rounded-lg hover:bg-blue-50"
                                            title="Edit User"
                                        >
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => handleToggleStatus(user.id)}
                                            className={`p-1 rounded-lg transition-colors duration-200 hover:bg-gray-50 ${user.isActive
                                                ? "text-orange-600 hover:text-orange-800"
                                                : "text-green-600 hover:text-green-800"
                                                }`}
                                            title={user.isActive ? "Deactivate User" : "Activate User"}
                                        >
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d={
                                                        user.isActive
                                                            ? "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                                                            : "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    }
                                                />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="text-red-600 hover:text-red-800 transition-colors duration-200 p-1 rounded-lg hover:bg-red-50"
                                            title="Delete User"
                                        >
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Enhanced Mobile Layout (Below 1000px) */}
                                <div className="lg:hidden">
                                    {/* User Card Header */}
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 p-4 rounded-lg shadow-sm border border-gray-200 bg-white">
                                        <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-4 w-full">
                                            {/* Avatar */}
                                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-md mb-3 sm:mb-0">
                                                {user.name.split(" ").map((n) => n[0]).join("")}
                                            </div>

                                            {/* User Info */}
                                            <div className="text-center sm:text-left w-full sm:w-auto">
                                                <h3 className="text-lg font-bold text-gray-900 truncate">{user.name}</h3>
                                                <p className="text-sm text-gray-600 truncate mt-1">{user.email}</p>

                                                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 mt-2">
                                                    <span
                                                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${user.isActive
                                                                ? "bg-green-100 text-green-800 border border-green-200"
                                                                : "bg-red-100 text-red-800 border border-red-200"
                                                            }`}
                                                    >
                                                        {user.isActive ? "Active" : "Inactive"}
                                                    </span>
                                                    <span className="text-xs text-gray-500">Joined {user.createdAt}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Role & Assignment Details */}
                                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 mb-4 border border-gray-200">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                                                <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2 flex items-center">
                                                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    Role
                                                </h4>
                                                <p className="text-lg font-semibold text-gray-900 mb-1">
                                                    {getRoleDisplayName(user.role)}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {getRoleDescription(user.role)}
                                                </p>
                                            </div>

                                            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                                                <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2 flex items-center">
                                                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    Assignment
                                                </h4>
                                                <div className="space-y-2">
                                                    {user.outlet && (
                                                        <div className="flex items-center text-base text-gray-900">
                                                            <span className="font-medium mr-2">Outlet:</span>
                                                            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-sm">{user.outlet}</span>
                                                        </div>
                                                    )}
                                                    {user.zone && (
                                                        <div className="flex items-center text-base text-gray-900">
                                                            <span className="font-medium mr-2">Zone:</span>
                                                            <span className="bg-green-50 text-green-700 px-2 py-1 rounded-md text-sm">{user.zone}</span>
                                                        </div>
                                                    )}
                                                    {!user.outlet && !user.zone && (
                                                        <div className="text-base text-gray-500 italic">No assignments</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0">
                                        <button
                                            onClick={() => handleEdit(user)}
                                            className="flex items-center justify-center space-x-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-md flex-1 sm:mr-3"
                                        >
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                />
                                            </svg>
                                            <span className="text-base font-semibold">Edit User</span>
                                        </button>

                                        <button
                                            onClick={() => handleToggleStatus(user.id)}
                                            className={`flex items-center justify-center space-x-3 px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-md flex-1 sm:mx-3 border ${user.isActive
                                                ? "bg-orange-50 hover:bg-orange-100 border-orange-200 text-orange-700"
                                                : "bg-green-50 hover:bg-green-100 border-green-200 text-green-700"
                                                }`}
                                        >
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d={
                                                        user.isActive
                                                            ? "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                                                            : "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    }
                                                />
                                            </svg>
                                            <span className="text-base font-semibold">
                                                {user.isActive ? "Deactivate" : "Activate"}
                                            </span>
                                        </button>

                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="flex items-center justify-center space-x-3 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-md flex-1 sm:ml-3"
                                        >
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                />
                                            </svg>
                                            <span className="text-base font-semibold">Delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex flex-wrap justify-center items-center gap-2 mb-6 px-2 sm:px-0">
                        {/* Previous Button */}
                        <button
                            onClick={() => paginate(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-xs sm:text-sm"
                        >
                            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="hidden xs:inline">Previous</span>
                        </button>

                        {/* Page Numbers */}
                        <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                            {getPageNumbers().map((pageNumber, index) =>
                                pageNumber === "..." ? (
                                    <span
                                        key={`ellipsis-${index}`}
                                        className="px-2 py-1 text-gray-500 text-sm sm:text-sm"
                                    >
                                        ...
                                    </span>
                                ) : (
                                    <button
                                        key={pageNumber}
                                        onClick={() => paginate(pageNumber)}
                                        className={`px-3 sm:px-4 py-2 sm:py-2 rounded-lg transition-all duration-200 text-sm sm:text-xs font-medium ${currentPage === pageNumber
                                                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                                                : "bg-white border border-gray-200 text-red-600 hover:bg-gray-50"
                                            }`}
                                    >
                                        {pageNumber}
                                    </button>
                                )
                            )}
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-xs sm:text-sm"
                        >
                            <span className="hidden xs:inline">Next</span>
                            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {filteredUsers.length === 0 && (
                    <div className="text-center py-12 sm:py-16">
                        <div className="bg-gradient-to-r from-blue-100 to-purple-100 w-16 h-16 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                            <svg className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No users found</h3>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm sm:text-base px-4">
                            {searchTerm || roleFilter !== 'all'
                                ? 'Try adjusting your search or filter criteria'
                                : 'Get started by adding your first user to the system'
                            }
                        </p>
                        {!searchTerm && roleFilter === 'all' && (
                            <button
                                onClick={() => setShowForm(true)}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
                            >
                                Add New User
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Add custom animations */}
            <style jsx='true'>{`
                @keyframes scale-in {
                    from {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                @keyframes slide-in {
                    from {
                        opacity: 0;
                        transform: translateX(100%);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                .animate-scale-in {
                    animation: scale-in 0.2s ease-out;
                }
                .animate-slide-in {
                    animation: slide-in 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default UserManagement;