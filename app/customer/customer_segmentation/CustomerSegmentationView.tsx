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
    Chip,
    Avatar
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Customer {
    id: number;
    name: string;
    email: string;
    totalSpend: number;
    totalOrders: number;
    segment: 'High Value' | 'Medium Value' | 'Low Value';
}

export default function CustomerSegmentationView() {
    const [customers, setCustomers] = useState<Customer[]>([
        { id: 1, name: 'John Doe', email: 'johndoe@example.com', totalSpend: 2500, totalOrders: 15, segment: 'High Value' },
        { id: 2, name: 'Alice Smith', email: 'alicesmith@example.com', totalSpend: 800, totalOrders: 5, segment: 'Medium Value' },
        { id: 3, name: 'Michael Brown', email: 'michaelbrown@example.com', totalSpend: 100, totalOrders: 2, segment: 'Low Value' },
        { id: 4, name: 'Sarah Wilson', email: 'sarahwilson@example.com', totalSpend: 5000, totalOrders: 25, segment: 'High Value' }
    ]);

    const getSegmentColor = (segment: string) => {
        return segment === 'High Value' ? 'success' :
            segment === 'Medium Value' ? 'warning' :
                'error'; // Low Value
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
            field: 'totalSpend',
            headerName: 'Total Spend',
            width: 150,
            align: 'right',
            renderCell: (params) => <Typography>${params.value.toFixed(2)}</Typography>
        },
        {
            field: 'totalOrders',
            headerName: 'Total Orders',
            width: 150,
            align: 'center'
        },
        {
            field: 'segment',
            headerName: 'Segment',
            width: 180,
            align: 'center',
            renderCell: (params) => (
                <Chip label={params.value} size="small" color={getSegmentColor(params.value) as any} />
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
        <Box sx={{ height: 650, width: '100%'}}>
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
