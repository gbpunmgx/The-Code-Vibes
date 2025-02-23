import React, {Fragment, useEffect, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {CirclePlus, Sheet, X} from "lucide-react";
import Input from "../../components/Input";
import TextArea from "@/app/components/TextArea";
import DropDown from "@/app/components/DropDown";
import {ProductRepositoryImpl} from "@/app/product/controller/ProductRepositoryImp";
import {ProductCategory} from "@/app/product/category/model/ProductCategory";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {Alert, Box, IconButton, Snackbar, Tooltip} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {ProductModel} from "@/app/product/model/ProductModel";
import ConfirmationDialog from "@/app/components/ConfirmationDialog";
import {SnackbarCloseReason} from "@mui/material/Snackbar/useSnackbar.types";
import FileService from "@/app/services/FileService";

const productRepository = new ProductRepositoryImpl();

export default function ProductView() {
    const [isOpen, setIsOpen] = useState(false);
    const [productId, setProductId] = useState("");
    const [message, setMessage] = useState("");
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [productName, setProductName] = useState<string>("");
    const [productDescription, setProductDescription] = useState<string>("");
    const [productPrice, setProductPrice] = useState<string>("");
    const [status, setStatus] = useState<boolean>(false);
    const [categories, setCategories] = useState<ProductCategory[]>([]);
    const [product, setProduct] = useState<ProductModel[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        fetchData().then(() => {

        });
        fetchProductData().then(() => {

        });
    }, []);
    const fetchData = async () => {
        try {
            const data = await productRepository.fetchProductCategories();
            setCategories(data);
        } catch (err) {
        } finally {
        }
    };
    const fetchProductData = async () => {
        try {
            const data = await productRepository.fetchProduct();
            setProduct(data);
        } catch (err) {
        } finally {
        }
    };
    const handleImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;

        const files: File[] = Array.from(event.target.files);
        const urls: string[] = files.map((file) => URL.createObjectURL(file));

        setImageUrls((prevUrls) => [...prevUrls, ...urls]);
    };
    const urlToFile = async (url: string, fileName: string) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return new File([blob], fileName, { type: blob.type });
    };
    const convertUrlsToFiles = async (imageUrls: string[]) => {
        const filePromises = imageUrls.map((url, index) => urlToFile(url, `image_${index}.jpg`));
        return await Promise.all(filePromises);
    };


    const handleAddProduct = async () => {
        try {
            if (!imageUrls || imageUrls.length === 0) {
                console.error("No files selected.");
                return;
            }
            const uploadResponse = await FileService.uploadFiles(convertUrlsToFiles(imageUrls), "profile_pictures");
            console.log("Upload successful:", uploadResponse);

        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    const handleOpenDialog = (product: ProductModel) => {
        setIsDialogOpen(true);
        setProductId(product.id ?? "");
    };


    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await productRepository.deleteProduct(productId);
            setMessage("Product deleted successfully");
            setProduct((prevProducts) => prevProducts.filter(p => p.id !== productId));
            handleCloseDialog();
            setOpen(true);
        } catch (error) {
            console.error('Error deleting product:', error);
            handleCloseDialog();
        }
    };

    const openModal = (productToEdit: ProductModel | null = null) => {
        setIsOpen(true);
        setProductName(productToEdit?.name ?? "");
        setProductDescription(productToEdit?.description ?? "");
        setStatus(productToEdit?.active ?? false);
        setProductPrice(productToEdit?.price ? productToEdit.price.toString() : '');
        setProductId(productToEdit?.id ?? "");

        if (productToEdit?.images) {
            const urls: string[] = productToEdit.images.map((file) =>
                file instanceof File ? URL.createObjectURL(file) : file
            );
            setImageUrls(urls);
        } else {
            setImageUrls([]);
        }
    };
    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 220, align: 'center'},
        {field: 'name', headerName: 'Name', width: 200, editable: false, align: 'center'},
        {field: 'category', headerName: 'Category', width: 100, editable: false, align: 'center'},
        {field: 'description', headerName: 'Description', width: 200, editable: false, align: 'center'},
        {
            field: 'active',
            headerName: 'Status',
            width: 120,
            sortable: false,
            align: 'center',
            renderCell: (params) => (
                <span style={{
                    color: params.value ? 'green' : 'red',
                    fontWeight: 'bold',
                }}>
                {params.value ? 'Active' : 'Inactive'}
            </span>
            ),
        },
        {
            field: 'images',
            headerName: 'Images',
            width: 200,
            sortable: false,
            align: 'center',
            renderCell: (params) => (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    width: '100%',
                }}>
                    <div className="relative w-24 h-24">
                        {(Array.isArray(params.value) ? params.value : []).slice(0, 4).map((image: string, imgIndex: number) => (
                            <div
                                key={imgIndex}
                                className="absolute w-20 h-20 bg-white border-4 border-white shadow-lg"
                                style={{
                                    transform: `rotate(${(imgIndex - 2) * 30}deg)`,
                                    top: `${imgIndex * 15}px`,
                                    left: `${imgIndex * 50}px`,
                                    zIndex: imgIndex,
                                }}
                            >
                                <img
                                    src={image}
                                    alt={`product-image-${imgIndex}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </Box>
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            sortable: false,
            align: 'center',
            renderCell: (params) => (
                <Box sx={{
                    display: 'flex',
                    gap: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    width: '100%',
                }}>
                    <Tooltip title="Edit">
                        <IconButton onClick={() => openModal(params.row)}
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
                        <IconButton onClick={() => handleOpenDialog(params.row)}
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
    const handleDeleteImage = (indexToRemove: number) => {
        setImageUrls((prevUrls) => prevUrls.filter((_, index) => index !== indexToRemove));
    }
    return (
        <div className="relative">
            <div
                className="bg-white/80 backdrop-blur-lg pb-5 rounded-xl shadow-sm flex justify-end items-center gap-5 ">
                <button
                    type="button"
                    className="flex items-center gap-2 px-5 py-2.5
               bg-gradient-to-r from-gray-700 to-gray-900 text-white
               rounded-lg shadow-md hover:from-gray-800 hover:to-black
               hover:shadow-xl active:scale-95 transition-all duration-300"
                    // onClick={handleExport}
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
                <div style={{height: 518, overflowY: 'auto'}}>
                    <DataGrid
                        rows={product}
                        columns={columns}
                        pageSize={5}
                        pageSizeOptions={[5, 10, 25, 50, 100]}
                        checkboxSelection
                        rowHeight={75}
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
                            '& .MuiDataGrid-checkboxInput': {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            },
                        }}
                    />

                </div>
            </div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                    onClose={() => setIsOpen(false)}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="transition duration-200 ease-out"
                        enterFrom="opacity-0 scale-90"
                        enterTo="opacity-100 scale-100"
                        leave="transition duration-150 ease-in"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-90"
                    >
                        <div
                            className="bg-white rounded-lg shadow-xl w-full max-w-screen-md relative flex flex-col max-h-[90vh]">
                            <div className="p-4 border-gray-200 sticky top-0 z-10 rounded-t-lg">
                                <div className="flex justify-between items-center">
                                    <p className="text-xl font-semibold p-4 text-gray-700">Add Product</p>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="text-gray-500 hover:text-red-600 p-2 rounded-xl focus:outline-none"
                                    >
                                        <X className="w-6 h-6"/>
                                    </button>
                                </div>
                            </div>

                            <div className="p-6 space-y-8 overflow-auto flex-grow rounded-b-lg scrollbar-custom">
                                <form className="space-y-6">
                                    <Input
                                        id="product-name"
                                        name="product-name"
                                        onChange={(e) => setProductName(e.target.value)}
                                        label="Product Name"
                                        value={productName}
                                        placeholder="Enter product name"
                                    />
                                    <TextArea
                                        id="product-description"
                                        label="Product Description"
                                        value={productDescription}
                                        onChange={(e) => setProductDescription(e.target.value)}
                                        placeholder="Enter product description"
                                    />
                                    <Input
                                        id="product-price"
                                        name="product-price"
                                        label="Product Price ($)"
                                        value={productPrice}
                                        onChange={(e) => setProductPrice(e.target.value)}
                                        placeholder="Enter product price"
                                        type="number"
                                    />
                                    <DropDown
                                        id="category"
                                        value={categories.length > 0 ? categories[0].id : ''}
                                        label="Product Category"
                                        options={categories.map((cat) => ({id: cat.id, name: cat.name}))}
                                    />

                                    {/* Checkbox */}
                                    <label className="inline-flex items-center cursor-pointer w-full justify-between">
                                        <span className="text-sm font-medium text-gray-900">Product Status</span>
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={status}
                                                onChange={() => setStatus(!status)}
                                            />
                                            <div
                                                className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600 dark:peer-checked:bg-red-600"
                                            />
                                        </div>
                                    </label>

                                    {/* Image Input */}
                                        <div>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                                {imageUrls.length > 0 &&
                                                    imageUrls.map((url, index) => (
                                                        <div key={index} className="relative group">
                                                            {/* Image Preview */}
                                                            <img
                                                                src={url}
                                                                alt={`Uploaded ${index}`}
                                                                className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg object-cover shadow-md"
                                                            />
                                                            <button
                                                                onClick={() => handleDeleteImage(index)}
                                                                className="absolute -top-2 -right-2 bg-red-600 text-white w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shadow-md border border-white
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                            >
                                                                ✕
                                                            </button>
                                                        </div>
                                                    ))
                                                }
                                            </div>

                                            <input
                                                type="file"
                                                id="product-images"
                                                onChange={handleImagesChange}
                                                multiple
                                                required
                                                className="mt-3 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-3"
                                                accept="image/*"
                                            />
                                        </div>
                                </form>
                            </div>

                            <div className="sticky bg-white p-6 rounded-b-lg">
                                <button
                                    type="button"
                                    onClick={handleAddProduct}
                                    className="w-full py-3 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                                >
                                    {"Add"}
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </Dialog>
            </Transition>
            <ConfirmationDialog
                isOpen={isDialogOpen}
                onClose={handleCloseDialog}
                onConfirm={handleConfirmDelete}
                message={`Are you sure you want to delete? This action cannot be undone.`}
            />
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{width: '100%'}}
                >
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}
