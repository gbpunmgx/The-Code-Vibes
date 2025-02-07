import { useState } from "react";
import { create } from "zustand";
import { X } from "lucide-react";

interface Category {
  id: string;
  name: string;
  description: string;
}

// Zustand store typing
interface CategoryStore {
  categories: Category[];
  addCategory: (category: Category) => void;
  updateCategory: (id: string, name: string, description: string) => void;
  deleteCategory: (id: string) => void;
}

const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [
    { id: "11", name: "Electronics", description: "Devices and gadgets" },
    { id: "222", name: "Clothing", description: "Apparel and accessories" },
  ],
  addCategory: (category) =>
    set((state) => ({ categories: [...state.categories, category] })),
  updateCategory: (id, name, description) =>
    set((state) => ({
      categories: state.categories.map((cat) =>
        cat.id === id ? { id, name, description } : cat
      ),
    })),
  deleteCategory: (id) =>
    set((state) => ({
      categories: state.categories.filter((cat) => cat.id !== id),
    })),
}));

export default function ProductCategory() {
  const { categories, addCategory, updateCategory, deleteCategory } =
    useCategoryStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<Category | null>(null);

  const openModal = (category: Category | null = null) => {
    setEditData(category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditData(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const name =
      (form.elements.namedItem("name") as HTMLInputElement)?.value ?? "";
    const description =
      (form.elements.namedItem("description") as HTMLTextAreaElement)?.value ??
      "";

    if (editData) {
      updateCategory(editData.id, name, description);
    } else {
      addCategory({ id: "", name, description });
    }
    closeModal();
  };

  return (
    <div className="">
      <div className="flex justify-end items-center mb-6">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition duration-200"
          onClick={() => openModal()}
        >
          + Add Category
        </button>
      </div>
      <div className="overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {categories.map((category) => (
            <li
              key={category.id}
              className="flex justify-between items-center p-4 hover:bg-gray-100 transition duration-200"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">{category.description}</p>
              </div>
              <div>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mr-2 transition duration-200"
                  onClick={() => openModal(category)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200"
                  onClick={() => deleteCategory(category.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[700px] max-w-full transition duration-300 relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                {editData ? "Edit Category" : "Add Category"}
              </h2>
              <button
                className="text-gray-500 hover:text-white p-2 rounded hover:bg-gray-700 transition duration-200"
                onClick={closeModal}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                defaultValue={editData ? editData.name : ""}
                required
                className="border border-gray-300 p-4 rounded w-full mb-6 focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Category Name"
              />
              <textarea
                name="description"
                defaultValue={editData ? editData.description : ""}
                required
                className="border border-gray-300 p-4 rounded w-full mb-6 focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Category Description"
              />
              <div className="flex flex-col space-y-4">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg w-full transition duration-200"
                >
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
