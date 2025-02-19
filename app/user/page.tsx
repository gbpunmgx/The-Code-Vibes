import {useState} from "react";
import {create} from "zustand";
import {CirclePlus, X} from "lucide-react";
import * as React from "react";

interface User {
    id: number;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    role: string;
}
const useUserStore = create<{
    users: User[];
    addUser: (user: User) => void;
    updateUser: (updatedUser: User) => void;
    deleteUser: (id: number) => void;
}>((set) => ({
    users: [
        {
            id: 1,
            email: "john.doe@example.com",
            username: "johndoe",
            firstName: "John",
            lastName: "Doe",
            role: "admin",
        },
        {
            id: 2,
            email: "jane.smith@example.com",
            username: "janesmith",
            firstName: "Jane",
            lastName: "Smith",
            role: "user",
        },
    ],
    addUser: (user) => set((state) => ({users: [...state.users, user]})),
    updateUser: (updatedUser) =>
        set((state) => ({
            users: state.users.map((user) =>
                user.id === updatedUser.id ? updatedUser : user
            ),
        })),
    deleteUser: (id) =>
        set((state) => ({users: state.users.filter((user) => user.id !== id)})),
}));

const UserProfile = () => {
    const {users, addUser, updateUser, deleteUser} = useUserStore();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editData, setEditData] = useState<User | null>(null);

    const openModal = (user: User | null = null) => {
        console.log("Opening Modal with:", user);
        setEditData(user);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditData(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;

        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const username = (
            form.elements.namedItem("username") as HTMLInputElement
        ).value;
        const firstName = (
            form.elements.namedItem("first-name") as HTMLInputElement
        ).value;
        const lastName = (
            form.elements.namedItem("last-name") as HTMLInputElement
        ).value;
        const role = (form.elements.namedItem("role") as HTMLSelectElement).value;

        const user = {id: editData ? editData.id : Date.now(), email, username, firstName, lastName, role};

        console.log("Form data submitted:", user);

        if (editData) {
            // Update existing user
            console.log("Updating user:", editData);
            updateUser(user);
        } else {
            // Add new user
            console.log("Adding new user:", user);
            addUser(user);
        }

        closeModal();
    };

    const handleDelete = (id: number) => {
        deleteUser(id);
        console.log("Deleted user with ID:", id);
    };
    console.log("Fetching roles..."); // Debug log

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-semibold">User Profiles</h1>
                <div className="flex justify-end mb-4">
                    <button
                        type="button"
                        className="p-8 text-white bg-gray-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => openModal()}
                    >
                        <CirclePlus className="pr-1"/>
                        Add Role
                    </button>
                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 transform hover:scale-105 transition duration-300"
                    >
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-900">{user.username}</h3>
                            <p className="text-sm text-gray-500">{user.email}</p>
                            <p className="text-sm text-gray-500">Role: {user.role}</p>

                            <div className="mt-4 flex justify-end space-x-4">
                                {/* Edit Button */}
                                <button
                                    className="text-blue-600 hover:text-blue-800 px-4 py-2 rounded-lg border border-blue-600 hover:bg-blue-100 transition duration-300 transform hover:scale-105"
                                    onClick={() => openModal(user)}
                                >
                                    Edit
                                </button>
                                {/* Delete Button */}
                                <button
                                    className="text-red-600 hover:text-red-800 px-4 py-2 rounded-lg border border-red-600 hover:bg-red-100 transition duration-300 transform hover:scale-105"
                                    onClick={() => handleDelete(user.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Code */}
            {isModalOpen && (
                <div
                    className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-500 ${isModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                    <div
                        className="bg-white p-8 rounded-lg shadow-lg w-[700px] max-w-full transform scale-95 transition-all duration-300 animate-modal-enter">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold">
                                {editData ? "Edit User" : "Add User"}
                            </h2>
                            <button
                                className="text-gray-500 hover:text-white p-2 rounded hover:bg-gray-700"
                                onClick={closeModal}
                            >
                                <X className="h-6 w-6"/>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    defaultValue={editData ? editData.email : ""}
                                    required
                                    className="w-full mt-2 p-2.5 border rounded-lg"
                                    placeholder="name@domain.com"
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="username"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    defaultValue={editData ? editData.username : ""}
                                    required
                                    className="w-full mt-2 p-2.5 border rounded-lg"
                                    placeholder="johndoe"
                                />
                            </div>

                            <div className="mb-4 flex space-x-4">
                                <div className="flex-1">
                                    <label
                                        htmlFor="first-name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="first-name"
                                        name="first-name"
                                        defaultValue={editData ? editData.firstName : ""}
                                        required
                                        className="w-full mt-2 p-2.5 border rounded-lg"
                                        placeholder="John"
                                    />
                                </div>

                                <div className="flex-1">
                                    <label
                                        htmlFor="last-name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="last-name"
                                        name="last-name"
                                        defaultValue={editData ? editData.lastName : ""}
                                        required
                                        className="w-full mt-2 p-2.5 border rounded-lg"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="role"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Role
                                </label>
                                <select
                                    id="role"
                                    name="role"
                                    defaultValue={editData ? editData.role : "user"}
                                    required
                                    className="w-full mt-2 p-2.5 border rounded-lg"
                                >
                                    <option value="admin">Admin</option>
                                    <option value="moderator">Moderator</option>
                                    <option value="user">User</option>
                                    <option value="guest">Guest</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="w-full mt-6 py-2.5 bg-blue-600 text-white rounded-lg transform hover:scale-105 transition duration-300"
                            >
                                {editData ? "Update User" : "Add User"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
