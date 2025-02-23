import React, { useState } from "react";
import { Box, Card, CardContent, Typography, Button, Grid, Chip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const coupons = [
    { id: 1, code: "SAVE20", discount: "20% OFF", expiry: "Feb 28, 2025", status: "Active" },
    { id: 2, code: "FREESHIP", discount: "Free Shipping", expiry: "Mar 15, 2025", status: "Active" },
    { id: 3, code: "DISCOUNT10", discount: "10% OFF", expiry: "Jan 10, 2025", status: "Expired" },
];

const getStatusColor = (status: string) => {
    switch (status) {
        case "Active":
            return "success";
        case "Expired":
            return "error";
        default:
            return "default";
    }
};

const DiscountCouponsView = () => {
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000); // Reset after 2 sec
    };

    return (
        <Box sx={{ p: 3 }}>
            <Grid container spacing={2}>
                {coupons.map((coupon) => (
                    <Grid item xs={12} sm={6} md={4} key={coupon.id}>
                        <Card sx={{ p: 2, textAlign: "center", borderRadius: 2, boxShadow: 3 }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: "bold" }}>{coupon.discount}</Typography>
                                <Typography variant="body2" color="text.secondary">Expires on {coupon.expiry}</Typography>

                                <Chip
                                    label={coupon.status}
                                    color={getStatusColor(coupon.status)}
                                    sx={{ mt: 1 }}
                                />

                                <Box sx={{ mt: 2, display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}>
                                    <Typography
                                        variant="body1"
                                        sx={{ bgcolor: "#f5f5f5", p: 1, borderRadius: 1, fontWeight: "bold" }}
                                    >
                                        {coupon.code}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={() => handleCopy(coupon.code)}
                                        startIcon={<ContentCopyIcon />}
                                    >
                                        {copiedCode === coupon.code ? "Copied" : "Copy"}
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default DiscountCouponsView;
