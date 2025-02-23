import React, { useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    TextField,
    Grid,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Chip,
    LinearProgress
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ScheduleIcon from "@mui/icons-material/Schedule";

const campaigns = [
    { name: "New Year Offer", status: "Sent", deliveryRate: 85, clickRate: 30 },
    { name: "Flash Sale", status: "Scheduled", deliveryRate: 0, clickRate: 0 },
    { name: "Membership Reminder", status: "Failed", deliveryRate: 0, clickRate: 0 },
];

const getStatusColor = (status: string) => {
    if (status === "Sent") return "success";
    if (status === "Scheduled") return "warning";
    if (status === "Failed") return "error";
    return "default";
};

const SmsCampaignView = () => {
    const [message, setMessage] = useState("");
    const [schedule, setSchedule] = useState("Now");

    return (
        <Box sx={{ maxWidth: '100%', margin: '0 auto' }}>
            <Card sx={{ p: 3, boxShadow: 3, borderRadius: 6, mb: 3 }}>
                <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>Create SMS Campaign</Typography>

                    <TextField
                        fullWidth
                        label="Message"
                        variant="outlined"
                        multiline
                        rows={3}
                        sx={{ mt: 2 }}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        helperText={`${message.length}/160 characters`}
                    />

                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel>Schedule</InputLabel>
                        <Select value={schedule} onChange={(e) => setSchedule(e.target.value)}>
                            <MenuItem value="Now">Send Now</MenuItem>
                            <MenuItem value="Later">Schedule for Later</MenuItem>
                        </Select>
                    </FormControl>

                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                        startIcon={schedule === "Now" ? <SendIcon /> : <ScheduleIcon />}
                    >
                        {schedule === "Now" ? "Send Now" : "Schedule"}
                    </Button>
                </CardContent>
            </Card>

            {/* Campaign Status */}
            <Typography variant="h6" sx={{ mb: 2 }}>Campaign Status</Typography>
            <Grid container spacing={2}>
                {campaigns.map((campaign, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ p: 2, textAlign: "center", borderRadius: 2, boxShadow: 3 }}>
                            <CardContent>
                                <Typography variant="h6">{campaign.name}</Typography>
                                <Chip label={campaign.status} color={getStatusColor(campaign.status)} sx={{ mt: 1 }} />
                                {campaign.status === "Sent" && (
                                    <>
                                        <Typography variant="body2" sx={{ mt: 2 }}>Delivery Rate</Typography>
                                        <LinearProgress variant="determinate" value={campaign.deliveryRate} sx={{ mt: 1, mb: 1 }} />
                                        <Typography variant="body2">Click Rate</Typography>
                                        <LinearProgress variant="determinate" value={campaign.clickRate} sx={{ mt: 1 }} />
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default SmsCampaignView;
