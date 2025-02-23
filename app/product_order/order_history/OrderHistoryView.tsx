import React, {useState} from 'react';
import {
    DataGrid,
    GridColDef
} from '@mui/x-data-grid';
import {
    Box,
    IconButton,
    Tooltip,
    Typography,
    Chip,
    Avatar
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Order {
    id: number;
    orderId: string;
    customerName: string;
    product: string;
    productImage: string;
    quantity: number;
    totalPrice: number;
    orderStatus: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
    orderDate: string;
}

export default function OrderHistoryView() {
    const [orders] = useState<Order[]>([
        {
            id: 1,
            orderId: 'ORD-1001',
            customerName: 'John Doe',
            product: 'Nike Air Max',
            productImage: '/shoes1.jpg',
            quantity: 2,
            totalPrice: 259.98,
            orderStatus: 'Pending',
            orderDate: '2024-02-22'
        },
        {
            id: 2,
            orderId: 'ORD-1002',
            customerName: 'Alice Smith',
            product: 'Samsung Galaxy S24',
            productImage: '/phone1.jpg',
            quantity: 1,
            totalPrice: 999.99,
            orderStatus: 'Shipped',
            orderDate: '2024-02-21'
        },
        {
            id: 3,
            orderId: 'ORD-1003',
            customerName: 'Michael Brown',
            product: 'Apple MacBook Pro',
            productImage: '/laptop1.jpg',
            quantity: 1,
            totalPrice: 1299.99,
            orderStatus: 'Delivered',
            orderDate: '2024-02-20'
        },
        {
            id: 4,
            orderId: 'ORD-1004',
            customerName: 'Sarah Wilson',
            product: 'Sony Headphones',
            productImage: '/headphones1.jpg',
            quantity: 3,
            totalPrice: 299.97,
            orderStatus: 'Cancelled',
            orderDate: '2024-02-19'
        }
    ]);

    const getStatusColor = (status: string) => {
        return status === 'Pending' ? 'warning' :
            status === 'Shipped' ? 'info' :
                status === 'Delivered' ? 'success' :
                    'error'; // Cancelled
    };

    const columns: GridColDef[] = [
        {
            field: 'orderId',
            headerName: 'Order ID',
            width: 130,
            align: 'center'
        },
        {
            field: 'customerName',
            headerName: 'Customer',
            width: 180,
            align: 'center'
        },
        {
            field: 'product',
            headerName: 'Product',
            width: 280,
            renderCell: (params) => (
                <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                    <Avatar alt={params.row.product} src={params.row.productImage} variant="rounded"
                            sx={{width: 40, height: 40}}/>
                    <Typography variant="body2" fontWeight="bold">{params.row.product}</Typography>
                </Box>
            )
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            width: 120,
            align: 'center'
        },
        {
            field: 'totalPrice',
            headerName: 'Total Price',
            width: 150,
            align: 'right',
            renderCell: (params) => <Typography>${params.value.toFixed(2)}</Typography>
        },
        {
            field: 'orderStatus',
            headerName: 'Status',
            width: 130,
            align: 'center',
            renderCell: (params) => <Chip label={params.value} size="small"
                                          color={getStatusColor(params.value) as any}/>
        },
        {
            field: 'orderDate',
            headerName: 'Order Date',
            width: 150,
            align: 'center'
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 180,
            sortable: false,
            align: 'center',
            renderCell: (params) => (
                <Box sx={{display: 'flex', gap: 1}}>
                    <Tooltip title="View Details"><IconButton size="small" sx={{color: 'primary.main'}}><VisibilityIcon
                        fontSize="small"/></IconButton></Tooltip>
                    <Tooltip title="Edit Order"><IconButton size="small" sx={{color: 'info.main'}}><EditIcon
                        fontSize="small"/></IconButton></Tooltip>
                    <Tooltip title="Cancel Order"><IconButton size="small" sx={{color: 'error.main'}}><DeleteIcon
                        fontSize="small"/></IconButton></Tooltip>
                </Box>
            )
        }
    ];

    return (
        <Box sx={{height: 650, width: '100%'}}>
            <DataGrid
                rows={orders}
                columns={columns}
                initialState={{pagination: {paginationModel: {pageSize: 10}}}}
                pageSizeOptions={[5, 10, 25, 50]}
                disableRowSelectionOnClick
                sx={{
                    '& .MuiDataGrid-cell': {borderColor: 'divider'},
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: 'background.paper',
                        borderBottom: '2px solid',
                        borderColor: 'divider'
                    },
                    '& .MuiDataGrid-row:hover': {backgroundColor: 'action.hover'},
                    '& .MuiDataGrid-root': {display: 'flex', justifyContent: 'center'}
                }}
            />
        </Box>
    );
}
