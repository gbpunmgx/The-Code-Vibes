import React, { useState } from 'react';
import {
    Box,
    Button,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Switch,
    Typography
} from '@mui/material';

export default function PaymentSettingsView() {
    const [paymentSettings, setPaymentSettings] = useState({
        currency: 'NPR',
        eSewaEnabled: true,
        khaltiEnabled: false,
        imePayEnabled: true,
        paymentGateway: 'eSewa',
        emailNotifications: true,
        smsNotifications: false,
        cashOnDeliveryEnabled: false,
        shippingMethod: 'Standard',
        freeShippingEnabled: false,
        shippingCharge: 50, // Default shipping charge in NPR
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, checked, value } = e.target;
        setPaymentSettings((prevSettings) => ({
            ...prevSettings,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSaveSettings = () => {
        alert('Payment settings saved successfully!');
    };

    return (
        <div style={{ backgroundColor: '#f4f6f8' }}>
            <Paper sx={{ p: 3, borderRadius: 2 }} elevation={0}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" color="textSecondary" gutterBottom>
                            Payment Gateways
                        </Typography>

                        <FormControlLabel
                            control={<Switch checked={paymentSettings.eSewaEnabled} onChange={handleInputChange}
                                             name="eSewaEnabled" color="primary" />}
                            label={<><img src={'https://upload.wikimedia.org/wikipedia/commons/f/ff/Esewa_logo.webp'}
                                          alt="eSewa" style={{ width: 30, marginRight: 8 }} />eSewa</>}
                        />
                        <FormControlLabel
                            control={<Switch checked={paymentSettings.khaltiEnabled} onChange={handleInputChange}
                                             name="khaltiEnabled" color="secondary" />}
                            label={<><img src={'https://upload.wikimedia.org/wikipedia/commons/f/ff/Esewa_logo.webp'}
                                          alt="Khalti" style={{ width: 30, marginRight: 8 }} />Khalti</>}
                        />
                        <FormControlLabel
                            control={<Switch checked={paymentSettings.imePayEnabled} onChange={handleInputChange}
                                             name="imePayEnabled" color="primary" />}
                            label={<><img src={'https://upload.wikimedia.org/wikipedia/commons/f/ff/Esewa_logo.webp'}
                                          alt="IME Pay" style={{ width: 30, marginRight: 8 }} />IME Pay</>}
                        />
                    </Grid>

                    {/* Currency Selection Section */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" color="textSecondary" gutterBottom>
                            Currency Settings
                        </Typography>
                        <FormControl fullWidth margin="normal" variant="outlined">
                            <InputLabel>Currency</InputLabel>
                            <Select
                                label="Currency"
                                name="currency"
                                value={paymentSettings.currency}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="NPR">Nepalese Rupee (NPR)</MenuItem>
                                <MenuItem value="USD">US Dollar (USD)</MenuItem>
                                <MenuItem value="INR">Indian Rupee (INR)</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Payment Notification Settings */}
                    <Grid item xs={12}>
                        <Typography variant="h6" color="textSecondary" gutterBottom>
                            Payment Notifications
                        </Typography>
                        <FormControlLabel
                            control={<Switch checked={paymentSettings.emailNotifications} onChange={handleInputChange}
                                             name="emailNotifications" />}
                            label="Email Notifications for Transactions"
                        />
                        <FormControlLabel
                            control={<Switch checked={paymentSettings.smsNotifications} onChange={handleInputChange}
                                             name="smsNotifications" />}
                            label="SMS Notifications for Transactions"
                        />
                    </Grid>

                    {/* Payment Gateway Selection */}
                    <Grid item xs={12}>
                        <Typography variant="h6" color="textSecondary" gutterBottom>
                            Preferred Payment Gateway
                        </Typography>
                        <FormControl fullWidth margin="normal" variant="outlined">
                            <InputLabel>Payment Gateway</InputLabel>
                            <Select
                                label="Payment Gateway"
                                name="paymentGateway"
                                value={paymentSettings.paymentGateway}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="eSewa">eSewa</MenuItem>
                                <MenuItem value="Khalti">Khalti</MenuItem>
                                <MenuItem value="IME Pay">IME Pay</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Cash on Delivery Option */}
                    <Grid item xs={12}>
                        <Typography variant="h6" color="textSecondary" gutterBottom>
                            Cash on Delivery
                        </Typography>
                        <FormControlLabel
                            control={<Switch checked={paymentSettings.cashOnDeliveryEnabled} onChange={handleInputChange}
                                             name="cashOnDeliveryEnabled" color="default" />}
                            label="Enable Cash on Delivery"
                        />
                    </Grid>

                    {/* Shipping Settings Section */}
                    <Grid item xs={12}>
                        <Typography variant="h6" color="textSecondary" gutterBottom>
                            Shipping Settings
                        </Typography>

                        <FormControlLabel
                            control={<Switch checked={paymentSettings.freeShippingEnabled} onChange={handleInputChange}
                                             name="freeShippingEnabled" color="default" />}
                            label="Enable Free Shipping"
                        />

                        <FormControl fullWidth margin="normal" variant="outlined">
                            <InputLabel>Shipping Method</InputLabel>
                            <Select
                                label="Shipping Method"
                                name="shippingMethod"
                                value={paymentSettings.shippingMethod}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="Standard">Standard Delivery</MenuItem>
                                <MenuItem value="Express">Express Delivery</MenuItem>
                                <MenuItem value="Same-Day">Same Day Delivery</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth margin="normal" variant="outlined">
                            <InputLabel>Shipping Charge (NPR)</InputLabel>
                            <Select
                                label="Shipping Charge"
                                name="shippingCharge"
                                value={paymentSettings.shippingCharge}
                                onChange={handleInputChange}
                            >
                                <MenuItem value={50}>50 NPR</MenuItem>
                                <MenuItem value={100}>100 NPR</MenuItem>
                                <MenuItem value={200}>200 NPR</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Grid container justifyContent="center">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSaveSettings}
                        sx={{
                            fontWeight: 'bold',
                            padding: '10px 20px',
                            borderRadius: '25px',
                            boxShadow: 3,
                            '&:hover': { boxShadow: 6 },
                        }}
                    >
                        Save Payment Settings
                    </Button>
                </Grid>
            </Paper>
        </div>
    );
}
