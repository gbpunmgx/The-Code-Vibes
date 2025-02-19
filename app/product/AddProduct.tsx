import {useState, Fragment, useEffect} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {X} from "lucide-react";
import Input from "../components/Input";
import TextArea from "@/app/components/TextArea";
import DropDown from "@/app/components/DropDown";
import {ProductRepositoryImpl} from "@/app/product/controller/ProductRepositoryImp";
import {ProductCategory} from "@/app/category/ProductCategory";

const productRepository = new ProductRepositoryImpl();

export default function AddProductDialog() {
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
    console.log("Rendering ui")
    const handleImagesChange = async (event) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        for (let i = 0; i < files.length; i++) {
            if (!files[i].type.startsWith("image/")) {
                return;
            }
        }

        const formData = new FormData();
        Array.from(files).forEach((file) => {
            formData.append("image", file);
        });

        formData.append("category", category);

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
                headers: {} as Headers,
            } as RequestInit);

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Server Error Response:", errorText);
            }

            const data = await response.json();
            console.log("Response Data:", data);
            setImageUrls((prevUrls) => [...prevUrls, ...(Array.isArray(data.filePaths) ? data.filePaths : [])]);
        } catch (error) {
            console.error("Error uploading files:", error);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await productRepository.fetchProductCategories();
            setCategories(data);
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

    return (
        <div className="relative">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Product List</h3>
                <button
                    onClick={() => setIsOpen(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                >
                    Add Product
                </button>
            </div>

            <div className="product-list-container">
                {productList.length === 0 ? (
                    <p className="text-gray-500">No products added yet.</p>
                ) : (
                    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                        <table className="min-w-full table-auto">
                            <thead>
                            <tr className="bg-gray-100 text-gray-600 sticky top-0">
                                <th className="px-6 py-3 text-left text-sm font-medium">
                                    Images
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium">
                                    Product Name
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium">
                                    Description
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium">
                                    Price
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium">
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {productList.map((product, index) => (
                                <tr
                                    key={index}
                                    className={`${
                                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                    } hover:bg-gray-100 transition duration-200`}
                                >
                                    <td className="px-6 py-4 text-sm">
                                        <div className="relative w-24 h-24">
                                            {product.images.slice(0, 4).map((image, imgIndex) => (
                                                <div
                                                    key={imgIndex}
                                                    className="absolute w-20 h-20 bg-white border-4 border-white shadow-lg"
                                                    style={{
                                                        transform: `rotate(${(imgIndex - 1) * 8}deg)`,
                                                        top: `${imgIndex * 6}px`,
                                                        left: `${imgIndex * 6}px`,
                                                        zIndex: imgIndex,
                                                    }}
                                                >
                                                    <img
                                                        src={URL.createObjectURL(image)}
                                                        alt={`product-image-${imgIndex}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 text-sm">{product.name}</td>
                                    <td className="px-6 py-4 text-sm">{product.description}</td>
                                    <td className="px-6 py-4 text-sm">${product.price}</td>
                                    <td className="px-6 py-4 text-sm">{product.category}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <button
                                            onClick={() => handleEditProduct(index)}
                                            className="text-blue-600 hover:text-blue-800 mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteProduct(index)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
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
