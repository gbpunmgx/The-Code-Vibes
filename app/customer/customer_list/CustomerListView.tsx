import React, { useState } from 'react';
import {
    DataGrid,
    GridColDef
} from '@mui/x-data-grid';
import {
    Box,
    IconButton,
    Tooltip,
    Typography,
    Avatar
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Customer {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    totalOrders: number;
    status: 'Active' | 'Inactive';
}

export default function CustomerListView() {
    const [customers, setCustomers] = useState<Customer[]>([
        { id: 1, name: 'John Doe', email: 'johndoe@example.com', phoneNumber: '+1234567890', totalOrders: 10, status: 'Active' },
        { id: 2, name: 'Alice Smith', email: 'alicesmith@example.com', phoneNumber: '+0987654321', totalOrders: 5, status: 'Inactive' },
        { id: 3, name: 'Michael Brown', email: 'michaelbrown@example.com', phoneNumber: '+1122334455', totalOrders: 20, status: 'Active' },
        { id: 4, name: 'Sarah Wilson', email: 'sarahwilson@example.com', phoneNumber: '+5566778899', totalOrders: 2, status: 'Inactive' }
    ]);

    const getStatusColor = (status: string) => {
        return status === 'Active' ? 'success' : 'error'; // Inactive
    };

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Customer Name',
            width: 180,
            align: 'center'
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 250,
            align: 'center'
        },
        {
            field: 'phoneNumber',
            headerName: 'Phone Number',
            width: 160,
            align: 'center'
        },
        {
            field: 'totalOrders',
            headerName: 'Total Orders',
            width: 130,
            align: 'center'
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 130,
            align: 'center',
            renderCell: (params) => (
                <Typography color={getStatusColor(params.value)}>
                    {params.value}
                </Typography>
            )
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 180,
            sortable: false,
            align: 'center',
            renderCell: (params) => (
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="View Details"><IconButton size="small" sx={{ color: 'primary.main' }}><VisibilityIcon fontSize="small" /></IconButton></Tooltip>
                    <Tooltip title="Edit Customer"><IconButton size="small" sx={{ color: 'info.main' }}><EditIcon fontSize="small" /></IconButton></Tooltip>
                    <Tooltip title="Delete Customer"><IconButton size="small" sx={{ color: 'error.main' }}><DeleteIcon fontSize="small" /></IconButton></Tooltip>
                </Box>
            )
        }
    ];

    return (
        <Box sx={{ height: 650, width: '100%' }}>
            <DataGrid
                rows={customers}
                columns={columns}
                initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                pageSizeOptions={[5, 10, 25, 50]}
                disableRowSelectionOnClick
                sx={{
                    '& .MuiDataGrid-cell': { borderColor: 'divider' },
                    '& .MuiDataGrid-columnHeaders': { backgroundColor: 'background.paper', borderBottom: '2px solid', borderColor: 'divider' },
                    '& .MuiDataGrid-row:hover': { backgroundColor: 'action.hover' },
                    '& .MuiDataGrid-root': { display: 'flex', justifyContent: 'center' }
                }}
            />
        </Box>
    );
}
