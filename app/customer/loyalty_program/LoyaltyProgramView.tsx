import React, { useState } from 'react';
import {
    DataGrid,
    GridColDef
} from '@mui/x-data-grid';
import {
    Box,
    Typography,
    Chip,
    Button,
    Tooltip
} from '@mui/material';

interface LoyaltyProgramView {
    id: number;
    name: string;
    email: string;
    points: number;
    tier: 'Bronze' | 'Silver' | 'Gold';
    rewards: string[];
}

export default function LoyaltyProgramView() {
    const [customers, setCustomers] = useState<LoyaltyProgramView[]>([
        { id: 1, name: 'John Doe', email: 'johndoe@example.com', points: 1500, tier: 'Gold', rewards: ['$50 Off', 'Free Shipping'] },
        { id: 2, name: 'Alice Smith', email: 'alicesmith@example.com', points: 800, tier: 'Silver', rewards: ['$20 Off', 'Exclusive Offers'] },
        { id: 3, name: 'Michael Brown', email: 'michaelbrown@example.com', points: 200, tier: 'Bronze', rewards: ['10% Discount'] }
    ]);

    const getTierColor = (tier: string) => {
        return tier === 'Gold' ? 'success' :
            tier === 'Silver' ? 'warning' :
                'error'; // Bronze
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
            field: 'points',
            headerName: 'Points',
            width: 150,
            align: 'center'
        },
        {
            field: 'tier',
            headerName: 'Tier',
            width: 150,
            align: 'center',
            renderCell: (params) => (
                <Chip label={params.value} size="small" color={getTierColor(params.value) as any} />
            )
        },
        {
            field: 'rewards',
            headerName: 'Rewards',
            width: 250,
            renderCell: (params) => (
                <Box>
                    {params.value.map((reward, index) => (
                        <Chip key={index} label={reward} size="small" sx={{ marginRight: 1 }} />
                    ))}
                </Box>
            ),
            align: 'center'
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 180,
            sortable: false,
            align: 'center',
            renderCell: (params) => (
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Redeem Rewards">
                        <Button variant="contained" color="primary" size="small">Redeem</Button>
                    </Tooltip>
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
