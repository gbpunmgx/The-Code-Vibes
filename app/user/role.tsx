import { useState } from "react";
import { X } from 'lucide-react';

type Role = {
    id: number;
    name: string;
};

const RoleDialog = ({ open, closeModal, role, saveRole }: { open: boolean, closeModal: () => void, role: Role | null, saveRole: (role: Role) => void }) => {
    const [roleName, setRoleName] = useState(role ? role.name : '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (roleName.trim() !== "") {
            saveRole({ id: role ? role.id : Date.now(), name: roleName });
            setRoleName('');
            closeModal();
        }
    };

    return (
        open && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4">
                <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-11/12 sm:max-w-lg transition duration-300 relative">
                    <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 p-2 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 transition duration-200"
                    >
                        <X className="h-6 w-6" />
                    </button>

                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">
                        {role ? 'Edit Role' : 'Add Role'}
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="roleName" className="block text-sm font-medium text-gray-700">
                                Role Name
                            </label>
                            <input
                                type="text"
                                id="roleName"
                                value={roleName}
                                onChange={(e) => setRoleName(e.target.value)}
                                className="w-full mt-2 p-2.5 border rounded-lg border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter Role Name"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {role ? 'Update Role' : 'Add Role'}
                        </button>
                    </form>
                </div>
            </div>
        )
    );
};

const RoleList = () => {
    const [roles, setRoles] = useState<Role[]>([
        { id: 1, name: "Admin" },
        { id: 2, name: "Moderator" },
        { id: 3, name: "User" },
    ]);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [editRole, setEditRole] = useState<Role | null>(null);

    const openDialog = (role?: Role) => {
        setEditRole(role || null);
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
        setEditRole(null);
    };

    const saveRole = (role: Role) => {
        if (editRole) {
            setRoles(roles.map((r) => (r.id === role.id ? role : r)));
        } else {
            setRoles([...roles, role]);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Role Management
            </h2>

            <div className="text-right mb-4 sm:mb-6">
                <button
                    onClick={() => openDialog()}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200 w-full sm:w-auto"
                >
                    + Add Role
                </button>
            </div>

            {/* Table for larger screens */}
            <div className="hidden sm:block overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white">
                        <th className="p-3 text-left">ID</th>
                        <th className="p-3 text-left">Role Name</th>
                        <th className="p-3 text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {roles.map((role) => (
                        <tr key={role.id} className="border-b border-gray-300 dark:border-gray-600">
                            <td className="p-3 text-gray-800 dark:text-white">{role.id}</td>
                            <td className="p-3 text-gray-800 dark:text-white">{role.name}</td>
                            <td className="p-3 text-right">
                                <button
                                    onClick={() => openDialog(role)}
                                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200 mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => setRoles(roles.filter((r) => r.id !== role.id))}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Responsive List for small screens */}
            <div className="sm:hidden space-y-4">
                {roles.map((role) => (
                    <div key={role.id} className="p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-md">
                        <p className="text-gray-900 dark:text-white">
                            <strong>ID:</strong> {role.id}
                        </p>
                        <p className="text-gray-900 dark:text-white">
                            <strong>Role Name:</strong> {role.name}
                        </p>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                onClick={() => openDialog(role)}
                                className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition duration-200"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => setRoles(roles.filter((r) => r.id !== role.id))}
                                className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Role Dialog */}
            <RoleDialog open={isDialogOpen} closeModal={closeDialog} role={editRole} saveRole={saveRole} />
        </div>
    );
};

export default RoleList;
