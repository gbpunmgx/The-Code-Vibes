import React, {useEffect, useState} from "react";
import {ProductRepositoryImpl} from "../controller/ProductRepositoryImp";
import {ProductCategory} from "@/app/product/category/model/ProductCategory";
import {CirclePlus, Sheet, X} from "lucide-react";
import {CategoryRepositoryImpl} from "@/app/product/category/controller/CategoryRepositoryImp";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {Box, IconButton, Tooltip} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {Role} from "@/app/user/model/Role";
import TextArea from "@/app/components/TextArea";
import Input from "@/app/components/Input";
import {exportToExcel} from "@/app/util/ExportToExcel";

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
        loadCategories()
            .then((value) => {
                setCategories(value);
                console.log("Successfully downloaded");
            })
            .catch((error) => {
                console.error("Error downloading categories:", error);
            });
    }, []);

    async function loadCategories() {
        try {
            return await productRepository.fetchProductCategories();
        } catch (error) {
            console.error("Failed to load categories", error);
            alert("Failed to load categories");
        }
    }

    const openModal = (category: ProductCategory | null = null) => {
        setEditData(category);
        setName(category?.name ?? "");
        setId(category?.id ?? "");
        setDescription(category?.description ?? "");
        setIsActive(category?.active ?? false);
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
            closeModal();
            if (editData) {
                await categoryRepository.updateCategory(editData.id, productCategory);
            } else {
                await categoryRepository.postCategory(productCategory);
            }
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
            const updatedCategories = await productRepository.fetchProductCategories();
            setCategories(updatedCategories);
        } catch (error) {
            console.error("Error deleting category:", error);
            alert("Error deleting category");
        }
    };
    const handleExport = () => {
        exportToExcel(categories, 'category.xlsx', 'Category');
    };


    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 220},
        {field: 'name', headerName: 'Name', width: 200, editable: false},
        {field: 'description', headerName: 'Description', width: 400, editable: false},
        {
            field: 'active',
            headerName: 'Status',
            width: 120,
            sortable: false,
            renderCell: (params) => (
                <span style={{
                    color: params.value ? 'green' : 'red',
                    fontWeight: 'bold'
                }}>
            {params.value ? 'Active' : 'Inactive'}
        </span>
            ),
        },

        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            sortable: false,
            renderCell: (params) => (
                <Box sx={{display: 'flex', gap: 1, justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                    <Tooltip title="Edit">
                        <IconButton
                            onClick={() => openModal(params.row)}
                            sx={{
                                color: '#2196f3',
                                backgroundColor: 'rgba(33, 150, 243, 0.08)',
                                '&:hover': {
                                    backgroundColor: 'rgba(33, 150, 243, 0.15)',
                                },
                            }}
                            size="small"
                        >
                            <EditIcon fontSize="small"/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton
                            onClick={() => handleDelete(params.row.id)}
                            sx={{
                                color: '#f44336',
                                backgroundColor: 'rgba(244, 67, 54, 0.08)',
                                '&:hover': {
                                    backgroundColor: 'rgba(244, 67, 54, 0.15)',
                                },
                            }}
                            size="small"
                        >
                            <DeleteIcon fontSize="small"/>
                        </IconButton>
                    </Tooltip>
                </Box>
            ),
        },
    ];
    return (
        <div>
            <div
                className="bg-white/80 backdrop-blur-lg p-6 rounded-xl shadow-sm flex justify-end items-center gap-5 border border-gray-300">
                <button
                    type="button"
                    className="flex items-center gap-2 px-5 py-2.5
               bg-gradient-to-r from-gray-700 to-gray-900 text-white
               rounded-lg shadow-md hover:from-gray-800 hover:to-black
               hover:shadow-xl active:scale-95 transition-all duration-300"
                    onClick={handleExport}
                >
                    <Sheet className="w-5 h-5 text-gray-200"/>
                    <span className="font-semibold text-sm tracking-wide">Export</span>
                </button>

                <button
                    type="button"
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 hover:shadow-lg active:scale-95 transition-all duration-300"
                    onClick={() => openModal()}
                >
                    <CirclePlus className="w-5 h-5 text-white"/>
                    <span className="font-semibold text-sm tracking-wide">Add Role</span>
                </button>
            </div>
            <div className="bg-white p-4 rounded-lg">

                <div style={{height: 512, overflowY: 'auto'}}>
                    <DataGrid
                        rows={categories}
                        columns={columns}
                        pageSize={5}
                        pageSizeOptions={[5, 10, 25, 50, 100]}
                        checkboxSelection
                        sx={{
                            border: 'none',
                            '& .MuiDataGrid-columnHeaders': {
                                position: 'sticky',
                                top: 0,
                                background: '#f5f5f5',
                                color: '#1976d2',
                                fontWeight: 'bold',
                                zIndex: 1,
                            },
                            '& .MuiDataGrid-columnHeaderTitle': {
                                textTransform: 'uppercase',
                            },
                            '& .MuiDataGrid-cell': {
                                padding: '8px',
                            },
                        }}
                    />
                </div>
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
                                <span className="text-sm font-medium text-gray-900 dark:text-gray-300">Category Status</span>
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
