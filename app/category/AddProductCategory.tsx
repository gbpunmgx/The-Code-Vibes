import React, {useEffect, useState} from "react";
import {ProductRepositoryImpl} from "../product/controller/ProductRepositoryImp";
import {ProductCategory} from "@/app/category/ProductCategory";
import {X} from "lucide-react";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import {CategoryRepositoryImpl} from "@/app/category/controller/CategoryRepositoryImp";

export default function ProductCategoryView() {
    const [categories, setCategories] = useState<ProductCategory[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState<ProductCategory | null>(null);
    const [isActive, setIsActive] = useState(false);
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [description, setDescription] = useState("");

    const productRepository = new ProductRepositoryImpl();
    const categoryRepository = new CategoryRepositoryImpl();

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const fetchedCategories = await productRepository.fetchProductCategories();
                setCategories(fetchedCategories);
                console.log("Category Data:", fetchedCategories);
            } catch (error) {
                console.error("Failed to load categories", error);
                alert("Failed to load categories");
            }
        };

        loadCategories();
    }, []);

    const openModal = (category: ProductCategory | null = null) => {
        setEditData(category);
        setName(category?.name ?? "");
        setId(category?.id ?? "");
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !description) {
            alert("Please fill out both fields");
            return;
        }

        const productCategory = new ProductCategory(id, name, description, isActive);

        try {
            if (editData) {
                await categoryRepository.updateCategory(editData.id, productCategory);
            } else {
                await categoryRepository.postCategory(productCategory);
            }
            closeModal();
            // Do not re-fetch here unless required. You may want to update `categories` locally.
            const updatedCategories = await productRepository.fetchProductCategories();
            setCategories(updatedCategories);
        } catch (error) {
            console.error("Error submitting category:", error);
            alert("Error submitting category");
        }
    };

    const handleDelete = async (id: String) => {
        try {
            await categoryRepository.deleteCategory(id);
            // Again, avoid re-fetching if unnecessary. Consider using `setCategories` with updated data.
            const updatedCategories = await productRepository.fetchProductCategories();
            setCategories(updatedCategories);
        } catch (error) {
            console.error("Error deleting category:", error);
            alert("Error deleting category");
        }
    };

    return (
        <div>
            <div className="flex justify-end mb-6">
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition duration-200"
                    onClick={() => openModal()}>
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
                        <tr className="border-b text-xs md:text-sm" key={category.id}>
                            <td className="px-4 md:px-6 py-3">{category.name}</td>
                            <td className="px-4 md:px-6 py-3">{category.description}</td>
                            <td className="px-4 md:px-6 py-3">{category.isActive ? "Active" : "Inactive"}</td>
                            <td className="px-4 md:px-6 py-3 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                                        onClick={() => openModal(category)}>Edit
                                </button>
                                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                                        onClick={() => handleDelete(category.id)}>Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div
                        className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl relative">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">{editData ? "Edit Category" : "Add Category"}</h2>
                            <button className="text-gray-500 hover:text-white p-2 rounded hover:bg-gray-700"
                                    onClick={closeModal}>
                                <X className="h-6 w-6"/>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <Input id="name" label="Category Name" placeholder="Enter category name" value={name}
                                   onChange={(e) => setName(e.target.value)}/>
                            <TextArea id="description" label="Category Description" value={description}
                                      onChange={(e) => setDescription(e.target.value)}
                                      placeholder="Category Description"/>
                            <label className="inline-flex items-center cursor-pointer pt-4 w-full justify-between">
                                <span className="text-sm font-medium text-gray-900 dark:text-gray-300">Is Active</span>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={isActive}
                                        onChange={() => setIsActive(!isActive)}
                                    />
                                    <div
                                        className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600 dark:peer-checked:bg-red-600"
                                    />
                                </div>
                            </label>

                            <div className="mt-6">
                                <button type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg w-full transition duration-200">
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
