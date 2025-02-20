import React, {useState, Fragment, useEffect} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {CirclePlus, Sheet, X} from "lucide-react";
import Input from "../components/Input";
import TextArea from "@/app/components/TextArea";
import DropDown from "@/app/components/DropDown";
import {ProductRepositoryImpl} from "@/app/product/controller/ProductRepositoryImp";
import {ProductCategory} from "@/app/category/model/ProductCategory";
import FileService from "@/app/services/FileService";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {Box, IconButton, Tooltip} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {ProductModel} from "@/app/product/model/ProductModel";

const productRepository = new ProductRepositoryImpl();

export default function ProductView() {
    const [isOpen, setIsOpen] = useState(false);
    const [imageUrls, setImageUrls] = useState([]);
    const [productName, setProductName] = useState<string>("");
    const [productDescription, setProductDescription] = useState<string>("");
    const [productPrice, setProductPrice] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [productImages, setProductImages] = useState<File[]>([]);
    const [productList, setProductList] = useState<
        Array<{
            name: string;
            description: string;
            price: string;
            category: string;
            images: File[];
        }>
    >([]);

    const [categories, setCategories] = useState<ProductCategory[]>([]);
    const [product, setProduct] = useState<ProductModel[]>([]);
    console.log("Rendering ui")
    const handleImagesChange = async (event) => {
        const files = Array.from(event.target.files);
        const result = await FileService.uploadFiles(files, "electronics");
        alert(result);
    };


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
    const handleAddProduct = async () => {
        const newProduct = {
            name: productName,
            description: productDescription,
            price: productPrice,
            category,
            images: productImages,
        };
        try {
            setProductList([...productList, newProduct]);
            setProductName("");
            setProductDescription("");
            setProductPrice("");
            setCategory("");
            setProductImages(productImages);
            setIsOpen(false);
        } catch (error) {
        } finally {
        }
    };
    useEffect(() => {
        console.log(productImages);
    }, [productImages]);

    const handleDeleteProduct = (index: number) => {
        const updatedList = productList.filter((_, i) => i !== index);
        setProductList(updatedList);
    };

    const handleEditProduct = (index: number) => {
        const productToEdit = productList[index];
        setProductName(productToEdit.name);
        setProductDescription(productToEdit.description);
        setProductPrice(productToEdit.price);
        setCategory(productToEdit.category);
        setProductImages(productToEdit.images);
        setIsOpen(true);
    };

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 220, align: 'center'},
        {field: 'name', headerName: 'Name', width: 200, editable: false, align: 'center'},
        {field: 'description', headerName: 'Description', width: 400, editable: false, align: 'center'},
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
                        <IconButton
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
        <div className="relative">
            <div
                className="bg-white/80 backdrop-blur-lg p-6 rounded-xl shadow-sm flex justify-end items-center gap-5 border border-gray-300">
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
                    // onClick={() => openModal()}
                >
                    <CirclePlus className="w-5 h-5 text-white"/>
                    <span className="font-semibold text-sm tracking-wide">Add Role</span>
                </button>
            </div>
            <div className="bg-white p-4 rounded-lg">

                <div style={{height: 512, overflowY: 'auto'}}>
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
                                alignItems: 'center',  // Centers the checkbox vertically
                                justifyContent: 'center',  // Centers the checkbox horizontally
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
                            className="bg-white rounded-lg p-8 shadow-xl w-full max-w-screen-md relative overflow-y-auto max-h-[90vh]">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold text-gray-800">Add Product</h3>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-600 hover:text-red-600 p-2 rounded-full focus:outline-none"
                                >
                                    <X className="w-6 h-6"/>
                                </button>
                            </div>
                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <Input
                                    id="product-name"
                                    name="product-name"
                                    label="Product Name"
                                    placeholder="Enter product name"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                />
                                <TextArea
                                    id="product-description"
                                    label="Product Description"
                                    value={productDescription}
                                    onChange={(e) => setProductDescription(e.target.value)}
                                    placeholder="Enter product description"
                                    required
                                />
                                <Input
                                    id="product-price"
                                    name="product-price"
                                    label="Product Price ($)"
                                    placeholder="Enter product price"
                                    value={productPrice}
                                    onChange={(e) => setProductPrice(e.target.value)}
                                    type="number"
                                />
                                <DropDown
                                    id="category"
                                    label="Product Category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    options={categories.map((cat) => ({id: cat.id, name: cat.name}))}
                                />
                                <div>
                                    <label
                                        htmlFor="product-images"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Product Images
                                    </label>
                                    <input
                                        type="file"
                                        id="product-images"
                                        onChange={handleImagesChange}
                                        multiple
                                        required
                                        className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-blue-500 focus:border-blue-500 p-3"
                                        accept="image/*"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={handleAddProduct}
                                    className="w-full py-3 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                                >
                                    Add Product
                                </button>
                            </form>
                        </div>
                    </Transition.Child>
                </Dialog>
            </Transition>
        </div>
    );
}
