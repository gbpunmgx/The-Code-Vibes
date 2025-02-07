import { useState } from 'react';
import { Switch } from '@headlessui/react';

type Permission = {
    id: string;
    name: string;
    description: string;
};

type User = {
    id: string;
    name: string;
    role: string;
    permissions: string[];
};

const permissionsList: Permission[] = [
    { id: '1', name: 'view_dashboard', description: 'View Dashboard' },
    { id: '2', name: 'edit_profile', description: 'Edit Profile' },
    { id: '3', name: 'manage_users', description: 'Manage Users' },
    { id: '4', name: 'delete_data', description: 'Delete Data' },
];

const usersList: User[] = [
    { id: 'user1', name: 'John Doe', role: 'Admin', permissions: ['1', '3'] },
    { id: 'user2', name: 'Jane Smith', role: 'Editor', permissions: ['2'] },
];

const UserPermissions = () => {
    const [users, setUsers] = useState(usersList);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const handlePermissionChange = (permissionId: string, enabled: boolean) => {
        if (selectedUser) {
            const updatedPermissions = enabled
                ? [...selectedUser.permissions, permissionId]
                : selectedUser.permissions.filter((id) => id !== permissionId);

            const updatedUser = { ...selectedUser, permissions: updatedPermissions };

            const updatedUsers = users.map((user) =>
                user.id === selectedUser.id ? updatedUser : user
            );
            setUsers(updatedUsers);
            setSelectedUser(updatedUser);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="w-full bg-white flex px-4 py-2 rounded-full border border-blue-500 overflow-hidden max-w-md mx-auto font-[sans-serif]">
                <input
                    type="text"
                    placeholder="Search User"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="flex-1 outline-none bg-white pl-4 text-sm"
                />
                <button
                    type="button"
                    className="bg-blue-600 hover:bg-blue-700 transition-all text-white text-sm rounded-full px-5 py-2.5"
                >
                    Search
                </button>
            </div>

            {/* Table to display users */}
            <div className="overflow-x-auto mt-6">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-200">
                    <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">ID</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Role</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredUsers.map((user, index) => (
                        <tr key={user.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-4 py-3 text-sm text-gray-800">{user.id}</td>
                            <td className="px-4 py-3 text-sm text-gray-800">{user.name}</td>
                            <td className="px-4 py-3 text-sm text-gray-800">{user.role}</td>
                            <td className="px-4 py-3 text-right">
                                <button
                                    onClick={() => setSelectedUser(user)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                                >
                                    Manage Permissions
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-[500px] max-w-full transition duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-semibold text-gray-900">{selectedUser.name} Permissions</h3>
                            <button
                                onClick={() => setSelectedUser(null)}
                                className="text-gray-600 hover:text-gray-900"
                            >
                                X
                            </button>
                        </div>

                        <div className="space-y-4">
                            {permissionsList.map((permission) => (
                                <div key={permission.id} className="flex justify-between items-center">
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">{permission.description}</p>
                                    </div>
                                    <Switch
                                        checked={selectedUser.permissions.includes(permission.id)}
                                        onChange={(enabled) => handlePermissionChange(permission.id, enabled)}
                                        className={`${
                                            selectedUser.permissions.includes(permission.id)
                                                ? 'bg-blue-600'
                                                : 'bg-gray-300'
                                        } relative inline-flex h-6 w-11 items-center rounded-full`}
                                    >
                                        <span className="sr-only">Enable {permission.name}</span>
                                        <span
                                            className={`${
                                                selectedUser.permissions.includes(permission.id)
                                                    ? 'translate-x-5'
                                                    : 'translate-x-0'
                                            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                                        />
                                    </Switch>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 text-right">
                            <button
                                onClick={() => {
                                    setSelectedUser(null);
                                }}
                                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                            >
                                Save Permissions
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserPermissions;
