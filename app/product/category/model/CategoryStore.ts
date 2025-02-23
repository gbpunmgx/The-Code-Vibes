import {create} from "zustand";

interface Category {
    id: string;
    name: string;
    description: string;
    active: boolean;
}

interface CategoryStore {
    categories: Category[];
    addCategory: (category: Category) => void;
    updateCategory: (id: string, name: string, description: string, isActive: boolean) => void;
    deleteCategory: (id: string) => void;
}

export const useCategoryStore =
    create<CategoryStore>((set) => ({
        categories: [],
        addCategory: (category: Category) =>
            set((state) => ({
                categories: [...state.categories, category],
            })),
        updateCategory: (id, name, description, isActive) =>
            set((state) => ({
                categories: state.categories.map((category) =>
                    category.id === id
                        ? {...category, name, description, isActive}
                        : category
                ),
            })),
        deleteCategory: (id: string) =>
            set((state) => ({
                categories: state.categories.filter((category) => category.id !== id),
            })),
    }));
