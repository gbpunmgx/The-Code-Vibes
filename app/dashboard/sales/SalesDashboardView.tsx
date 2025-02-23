import React, { useState } from 'react';
import {
    Box,
    Grid,
    Card,
    Typography,
    Divider,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    IconButton,
    TextField, CardContent
} from '@mui/material';
import { AddCircle, TrendingUp, ShoppingCart, Star, Schedule } from '@mui/icons-material';
import { Line } from 'react-chartjs-2';

// Sample chart data
const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
        {
            label: 'Sales Performance',
            data: [120000, 140000, 130000, 160000, 150000, 170000],
            borderColor: '#00BFAE',
            backgroundColor: 'rgba(0, 191, 174, 0.1)',
            fill: true,
            tension: 0.4,
        },
    ],
};

const Dashboard = () => {
    const [newSaleModal, setNewSaleModal] = useState(false);
    const [timePeriod, setTimePeriod] = useState('today'); // Default to 'today'

    const handleTimePeriodChange = (event) => {
        setTimePeriod(event.target.value);
    };

    // Mocked data based on selected time period
    const salesData = {
        today: 50000,
        'last-7-days': 350000,
        'last-30-days': 1200000,
        allTime: 2500000,
    };

    const ordersData = {
        today: 20,
        'last-7-days': 150,
        'last-30-days': 600,
        allTime: 12000,
    };

    const bestSellingProduct = 'Laptop'; // Static for demo
    const bestSellingQuantity = 120;    // Static for demo

    const getSalesData = () => {
        switch (timePeriod) {
            case 'today':
                return salesData.today;
            case 'last-7-days':
                return salesData['last-7-days'];
            case 'last-30-days':
                return salesData['last-30-days'];
            case 'allTime':
                return salesData.allTime;
            default:
                return 0;
        }
    };

    const getOrdersData = () => {
        switch (timePeriod) {
            case 'today':
                return ordersData.today;
            case 'last-7-days':
                return ordersData['last-7-days'];
            case 'last-30-days':
                return ordersData['last-30-days'];
            case 'allTime':
                return ordersData.allTime;
            default:
                return 0;
        }
    };

    return (
        <Box sx={{ minHeight: '100vh'}}>
            <Grid container spacing={3}>
                {/* Total Sales Card */}
                <Grid item xs={12} md={6} lg={3}>
                    <Card sx={{ borderRadius: 4, backgroundColor: '#fff', boxShadow: 3, textAlign: 'center', padding: 2, position: 'relative' }}>
                        <Typography variant="h6" color="textSecondary">Total Sales</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#00BFAE' }}>₨ {getSalesData()}</Typography>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="body2" color="textSecondary">+5% vs last month</Typography>
                        <IconButton sx={{ position: 'absolute', top: 10, right: 10, color: '#00BFAE' }}>
                            <TrendingUp />
                        </IconButton>
                    </Card>
                </Grid>

                {/* Total Orders Card */}
                <Grid item xs={12} md={6} lg={3}>
                    <Card sx={{ borderRadius: 4, backgroundColor: '#fff', boxShadow: 3, textAlign: 'center', padding: 2, position: 'relative' }}>
                        <Typography variant="h6" color="textSecondary">Total Orders</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{getOrdersData()} Orders</Typography>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="body2" color="textSecondary">+12% vs last month</Typography>
                        <IconButton sx={{ position: 'absolute', top: 10, right: 10, color: '#00BFAE' }}>
                            <ShoppingCart />
                        </IconButton>
                    </Card>
                </Grid>

                {/* Best Selling Product Card */}
                <Grid item xs={12} md={6} lg={3}>
                    <Card sx={{ borderRadius: 4, backgroundColor: '#fff', boxShadow: 3, textAlign: 'center', padding: 2, position: 'relative' }}>
                        <Typography variant="h6" color="textSecondary">Best Selling Product</Typography>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{bestSellingProduct}</Typography>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="body2" color="textSecondary">{bestSellingQuantity} Units Sold</Typography>
                        <IconButton sx={{ position: 'absolute', top: 10, right: 10, color: '#FFD700' }}>
                            <Star />
                        </IconButton>
                    </Card>
                </Grid>

                {/* Time Period Selector Card */}
                <Grid item xs={12} md={6} lg={3}>
                    <Card sx={{ borderRadius: 4, backgroundColor: '#fff', boxShadow: 3, textAlign: 'center', padding: 2, position: 'relative' }}>
                        <FormControl fullWidth>
                            <InputLabel>Time Period</InputLabel>
                            <Select
                                value={timePeriod}
                                label="Time Period"
                                onChange={handleTimePeriodChange}
                            >
                                <MenuItem value="today">Today</MenuItem>
                                <MenuItem value="last-7-days">Last 7 Days</MenuItem>
                                <MenuItem value="last-30-days">Last 30 Days</MenuItem>
                                <MenuItem value="allTime">All Time</MenuItem>
                            </Select>
                        </FormControl>
                        <IconButton sx={{ position: 'absolute', top: 10, right: 10, color: '#00BFAE' }}>
                            <Schedule />
                        </IconButton>
                    </Card>
                </Grid>

                {/* Sales Performance Chart */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ borderRadius: 4, backgroundColor: '#fff', boxShadow: 3 }}>
                        <CardContent>
                            <Typography variant="h6" color="textPrimary">Sales Performance (NPR)</Typography>
                            <Line data={chartData} />
                        </CardContent>
                    </Card>
                </Grid>

                {/* Add New Sale Action */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ borderRadius: 4, backgroundColor: '#fff', boxShadow: 3, textAlign: 'center', padding: 2 }}>
                        <Button
                            sx={{
                                width: '100%',
                                backgroundColor: '#00BFAE',
                                color: '#fff',
                                fontWeight: 'bold',
                                borderRadius: '50px',
                                '&:hover': {
                                    backgroundColor: '#00a68f',
                                },
                            }}
                            onClick={() => setNewSaleModal(true)}
                            startIcon={<AddCircle />}
                        >
                            Add New Sale
                        </Button>
                    </Card>
                </Grid>

                {/* Recent Orders */}
                <Grid item xs={12}>
                    <Card sx={{ borderRadius: 4, backgroundColor: '#fff', boxShadow: 3 }}>
                        <CardContent>
                            <Typography variant="h6" color="textPrimary">Recent Orders</Typography>
                            <Box sx={{ mt: 2 }}>
                                {/* Mock Orders List */}
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="body1" color="textSecondary">Order ID: ORD001 - Laptop</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="body1" color="textSecondary">Order ID: ORD002 - Smartphone</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Modal for Adding New Sale */}
            {newSaleModal && (
                <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
                    <Box sx={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fff', padding: 4, borderRadius: 2, width: 400 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>Add New Sale</Typography>
                        <TextField fullWidth label="Product" sx={{ mb: 2 }} />
                        <TextField fullWidth label="Quantity" sx={{ mb: 2 }} />
                        <TextField fullWidth label="Price" sx={{ mb: 2 }} />
                        <Box sx={{ textAlign: 'right' }}>
                            <Button variant="contained" color="primary" onClick={() => setNewSaleModal(false)}>Save</Button>
                        </Box>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default Dashboard;
