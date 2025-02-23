import React, { useState } from "react";
import { Box, Card, CardContent, Typography, Button, Grid, Chip, IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ShareIcon from "@mui/icons-material/Share";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const referralData = {
    code: "REF12345",
    link: "https://yourapp.com/referral/REF12345",
    rewards: "Earn $10 per successful referral",
    invites: [
        { name: "John Doe", status: "Completed", reward: "$10" },
        { name: "Jane Smith", status: "Pending", reward: "$0" },
        { name: "David Lee", status: "Completed", reward: "$10" },
    ],
};

const getStatusColor = (status: string) => {
    return status === "Completed" ? "success" : "warning";
};

const ReferralProgramView = () => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(referralData.link).then(r => {

        });
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareMessage = `Join me on this amazing platform and earn rewards! Use my referral link: ${referralData.link}`;

    return (
        <Box sx={{ p: 3, textAlign: "center" }}>
            <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2, mb: 3 }}>
                <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>Your Referral Code:</Typography>
                    <Box sx={{ mt: 1, display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}>
                        <Typography
                            variant="body1"
                            sx={{ bgcolor: "#f5f5f5", p: 1, borderRadius: 1, fontWeight: "bold" }}
                        >
                            {referralData.code}
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={handleCopy}
                            startIcon={<ContentCopyIcon />}
                        >
                            {copied ? "Copied" : "Copy"}
                        </Button>
                    </Box>
                    <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
                        {referralData.rewards}
                    </Typography>
                </CardContent>
            </Card>

            {/* Social Share */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="h6">Share with Friends</Typography>
                <Box sx={{ mt: 1, display: "flex", justifyContent: "center", gap: 2 }}>
                    <IconButton color="primary" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${referralData.link}`, "_blank")}>
                        <FacebookIcon />
                    </IconButton>
                    <IconButton color="primary" onClick={() => window.open(`https://twitter.com/intent/tweet?text=${shareMessage}`, "_blank")}>
                        <TwitterIcon />
                    </IconButton>
                    <IconButton color="success" onClick={() => window.open(`https://api.whatsapp.com/send?text=${shareMessage}`, "_blank")}>
                        <WhatsAppIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={handleCopy}>
                        <ShareIcon />
                    </IconButton>
                </Box>
            </Box>

            <Typography variant="h6" sx={{ mb: 2 }}>Your Invites</Typography>
            <Grid container spacing={2} justifyContent="center">
                {referralData.invites.map((invite, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ p: 2, textAlign: "center", borderRadius: 2, boxShadow: 3 }}>
                            <CardContent>
                                <Typography variant="h6">{invite.name}</Typography>
                                <Chip label={invite.status} color={getStatusColor(invite.status)} sx={{ mt: 1 }} />
                                <Typography variant="body2" sx={{ mt: 1 }}>Reward: {invite.reward}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ReferralProgramView;
