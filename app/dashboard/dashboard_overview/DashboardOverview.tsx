import React from 'react';
import { Box, Grid, Paper, Typography, Card, CardContent, Button, Divider, Badge, Avatar } from '@mui/material';
import {
    ShoppingCart, People, BarChart, LocalShipping, TrendingUp, TrendingDown,
    Storefront, AttachMoney
} from '@mui/icons-material';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';
import { CreditCard } from "lucide-react";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement);

// Line chart data (Sales Trend)
const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Sales (in NPR)',
            data: [1200000, 1350000, 1300000, 1400000, 1550000, 1600000, 1750000],
            borderColor: '#1e88e5',
            backgroundColor: 'rgba(30, 136, 229, 0.2)',
            fill: true,
            tension: 0.4,
        },
    ],
};

// Bar chart data (Sales by Region)
const barData = {
    labels: ['North', 'South', 'East', 'West'],
    datasets: [
        {
            label: 'Sales by Region',
            data: [3000000, 2500000, 1500000, 1800000],
            backgroundColor: '#42a5f5',
        },
    ],
};

// Chart options
const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                callback: (value) => `${value / 1000}k`,
            },
        },
    },
};

export default function ModernDashboard() {
    return (
        <Box>
            <Grid container spacing={3}>
                {/* Total Sales */}
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ height: '100%', boxShadow: 3, borderRadius: 4, backgroundColor: '#ffffff' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom color="primary">
                                Total Sales
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <ShoppingCart sx={{ fontSize: 40, color: '#ff7043' }} />
                                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                                    1,245,000 NPR
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                                +5% compared to last month
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Total Users */}
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ height: '100%', boxShadow: 3, borderRadius: 4, backgroundColor: '#ffffff' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom color="primary">
                                Total Users
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <People sx={{ fontSize: 40, color: '#81c784' }} />
                                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                                    12,480
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                                +8% growth this month
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Revenue */}
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ height: '100%', boxShadow: 3, borderRadius: 4, backgroundColor: '#ffffff' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom color="primary">
                                Revenue
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <BarChart sx={{ fontSize: 40, color: '#42a5f5' }} />
                                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                                    5,000,000 NPR
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                                +10% compared to last quarter
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Active Orders */}
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ height: '100%', boxShadow: 3, borderRadius: 4, backgroundColor: '#ffffff' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom color="primary">
                                Active Orders
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <LocalShipping sx={{ fontSize: 40, color: '#ab47bc' }} />
                                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                                    450
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                                +12% orders this week
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* Section: Graphs */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card sx={{ boxShadow: 3, borderRadius: 4, backgroundColor: '#ffffff' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom color="primary">
                                Sales Trend Over Time
                            </Typography>
                            <Line data={lineData} options={options} />
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card sx={{ boxShadow: 3, borderRadius: 4, backgroundColor: '#ffffff' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom color="primary">
                                Sales by Region
                            </Typography>
                            <Bar data={barData} options={options} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* Action Buttons */}
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: '#fff', boxShadow: 3, borderRadius: 4 }}>
                        <Button variant="contained" color="primary" sx={{ width: '100%', fontWeight: 600 }}>
                            View Detailed Analytics
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: '#fff', boxShadow: 3, borderRadius: 4 }}>
                        <Button variant="contained" color="secondary" sx={{ width: '100%', fontWeight: 600 }}>
                            Manage Orders
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: '#fff', boxShadow: 3, borderRadius: 4 }}>
                        <Button variant="contained" color="error" sx={{ width: '100%', fontWeight: 600 }}>
                            View Pending Payments
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
