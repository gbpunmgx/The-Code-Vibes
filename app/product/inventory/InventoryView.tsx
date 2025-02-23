import React, {useState} from 'react';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {
    Avatar,
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from '@mui/icons-material/Visibility';

interface Product {
    id: number;
    name: string;
    sku: string;
    category: string;
    price: number;
    stock: number;
    status: 'In Stock' | 'Low Stock' | 'Out of Stock';
    thumbnail: string;
    lastUpdated: string;
}

export default function InventoryView() {
    const [products, setProducts] = useState<Product[]>([
        {
            id: 1,
            name: 'Nike Air Max',
            sku: 'NKE-AM-001',
            category: 'Shoes',
            price: 129.99,
            stock: 45,
            status: 'In Stock',
            thumbnail: '/shoes1.jpg',
            lastUpdated: '2024-02-23'
        },
        {
            id: 2,
            name: 'Samsung Galaxy S24',
            sku: 'SMS-S24-001',
            category: 'Electronics',
            price: 999.99,
            stock: 5,
            status: 'Low Stock',
            thumbnail: '/phone1.jpg',
            lastUpdated: '2024-02-23'
        },
        {
            id: 3,
            name: 'Apple MacBook Pro',
            sku: 'APL-MBP-001',
            category: 'Electronics',
            price: 1299.99,
            stock: 0,
            status: 'Out of Stock',
            thumbnail: '/laptop1.jpg',
            lastUpdated: '2024-02-23'
        }
    ]);

    const [openDialog, setOpenDialog] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
    const [newStock, setNewStock] = useState<number | ''>('');

    const handleDialogOpen = (product: Product) => {
        setCurrentProduct(product);
        setNewStock(product.stock);
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleStockChange = () => {
        if (currentProduct && newStock !== '') {
            const updatedProduct = {
                ...currentProduct,
                stock: newStock,
                status: getStockStatus(newStock)
            };
            setProducts(products.map(product =>
                product.id === currentProduct.id ? updatedProduct : product
            ));
            setOpenDialog(false);
        }
    };

    const getStockStatus = (stock: number): 'In Stock' | 'Low Stock' | 'Out of Stock' => {
        if (stock === 0) return 'Out of Stock';
        if (stock <= 5) return 'Low Stock';
        return 'In Stock';
    };

    const getStatusColor = (status: string): "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" => {
        switch (status) {
            case 'In Stock':
                return 'success'; // Valid value
            case 'Low Stock':
                return 'warning'; // Valid value
            case 'Out of Stock':
                return 'error';   // Valid value
            default:
                return 'default'; // Valid value
        }
    };


    const columns: GridColDef[] = [
        {
            field: 'thumbnail',
            headerName: 'Product',
            width: 280,
            align: 'left',
            renderCell: (params) => (
                <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                    <Avatar
                        alt={params.row.name}
                        src={params.row.thumbnail}
                        variant="rounded"
                        sx={{width: 40, height: 40}}
                    />
                    <Box>
                        <Typography variant="body2" fontWeight="bold">
                            {params.row.name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                            SKU: {params.row.sku}
                        </Typography>
                    </Box>
                </Box>
            )
        },
        {
            field: 'category',
            headerName: 'Category',
            width: 130,
            align: 'center'
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 120,
            align: 'right',
            renderCell: (params) => (
                <Typography>${params.value.toFixed(2)}</Typography>
            )
        },
        {
            field: 'stock',
            headerName: 'Stock',
            width: 150,
            align: 'center',
            renderCell: (params) => (
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1,}}>
                    <Typography>{params.value}</Typography>
                    <IconButton
                        size="small"
                        onClick={() => handleDialogOpen(params.row)}
                    >
                        <EditIcon fontSize="small"/>
                    </IconButton>
                </Box>
            )
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 130,
            align: 'center',
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    size="small"
                    color={getStatusColor(params.value)}
                />
            )
        },
        {
            field: 'lastUpdated',
            headerName: 'Last Updated',
            width: 150,
            align: 'center'
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            sortable: false,
            align: 'center',
            renderCell: (params) => (
                <Box sx={{display: 'flex', gap: 1}}>
                    <Tooltip title="View Details">
                        <IconButton size="small" sx={{color: 'primary.main'}}>
                            <VisibilityIcon fontSize="small"/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                        <IconButton size="small" sx={{color: 'info.main'}}>
                            <EditIcon fontSize="small"/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton size="small" sx={{color: 'error.main'}}>
                            <DeleteIcon fontSize="small"/>
                        </IconButton>
                    </Tooltip>
                </Box>
            )
        }
    ];

    return (
        <Box sx={{height: 650, width: '100%', p: 3}}>
            <DataGrid
                rows={products}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {pageSize: 10},
                    },
                }}
                pageSizeOptions={[5, 10, 25, 50]}
                disableRowSelectionOnClick
                sx={{
                    '& .MuiDataGrid-cell': {
                        borderColor: 'divider',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: 'background.paper',
                        borderBottom: '2px solid',
                        borderColor: 'divider',
                    },
                    '& .MuiDataGrid-row:hover': {
                        backgroundColor: 'action.hover',
                    }
                }}
            />

            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>Edit Stock</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">Current Stock: {currentProduct?.stock}</Typography>
                    <TextField
                        label="New Stock"
                        value={newStock}
                        onChange={(e) => setNewStock(Number(e.target.value))}
                        type="number"
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleStockChange} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
