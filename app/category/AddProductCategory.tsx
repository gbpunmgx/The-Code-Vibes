import React, { useState, useEffect } from "react";
import { ProductRepositoryImpl } from "../product/controller/ProductRepositoryImp";
import { ProductCategory } from "@/app/product/model/ProductCategory";
import { X } from "lucide-react";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import ThemeToggleInDialog from "../components/ThemeToggleInDialog";

export default function ProductCategory() {
    const [categories, setCategories] = useState<ProductCategory[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState<any | null>(null);
    const [isActive, setIsActive] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const productRepository = new ProductRepositoryImpl();
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const fetchedCategories = await productRepository.fetchProductCategories();
                setCategories(fetchedCategories);
            } catch (error) {
                console.error("Failed to load categories", error);
            }
        };

        loadCategories();
    }, []);

    const openModal = (category: any | null = null) => {
        setEditData(category);
        setName(category?.name ?? "");
        setDescription(category?.description ?? "");
        setIsActive(category?.isActive ?? false);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditData(null);
        setName("");
        setDescription("");
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        closeModal();
    };

    return (
        <div>
            <div className="flex justify-end mb-6">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition duration-200" onClick={() => openModal()}>
                    + Add Category
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                    <tr className="bg-gray-200 text-sm md:text-base">
                        <th className="px-4 md:px-6 py-3 text-left font-semibold text-gray-700">Category Name</th>
                        <th className="px-4 md:px-6 py-3 text-left font-semibold text-gray-700">Description</th>
                        <th className="px-4 md:px-6 py-3 text-left font-semibold text-gray-700">Active</th>
                        <th className="px-4 md:px-6 py-3 text-left font-semibold text-gray-700">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {categories.map((category) => (
                        <tr key={category.id} className="border-b text-xs md:text-sm">
                            <td className="px-4 md:px-6 py-3">{category.name}</td>
                            <td className="px-4 md:px-6 py-3">{category.description}</td>
                            <td className="px-4 md:px-6 py-3">{category.isActive ? "Active" : "Inactive"}</td>
                            <td className="px-4 md:px-6 py-3 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg" onClick={() => openModal(category)}>Edit</button>
                                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-lg relative">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">{editData ? "Edit Category" : "Add Category"}</h2>
                            <button className="text-gray-500 hover:text-white p-2 rounded hover:bg-gray-700" onClick={closeModal}>
                                <X className="h-6 w-6"/>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <Input id="name" label="Category Name" placeholder="Enter category name" value={name} onChange={(e) => setName(e.target.value)} />
                            <TextArea id="description" label="Category Description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Category Description" />
                            <ThemeToggleInDialog isActive={isActive} setIsActive={setIsActive} />
                            <div className="mt-6">
                                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg w-full transition duration-200">
                                    {editData ? "Update" : "Add"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
