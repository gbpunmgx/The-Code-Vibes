import React, { useState } from 'react';
import {
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Switch,
    FormControlLabel,
    TextField,
    Button,
    Divider,
    Grid,
    Paper,
    Snackbar,
    Alert,
    IconButton,
    Checkbox,
    FormGroup
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SaveIcon from '@mui/icons-material/Save';
import LanguageIcon from '@mui/icons-material/Language';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';

export default function SiteSettingsView() {
    const [settings, setSettings] = useState({
        siteTitle: 'My Website',
        siteDescription: 'This is a sample website description.',
        theme: 'light',
        notificationsEnabled: true,
        language: 'en',
        privacyPolicyAccepted: false,
        enableTwoFactorAuth: false,
        seoTitle: '',
        seoDescription: ''
    });

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setSettings(prevSettings => ({
            ...prevSettings,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSaveSettings = () => {
        // Simulate saving settings (you can replace this with API call)
        setSnackbarMessage('Settings saved successfully!');
        setOpenSnackbar(true);
    };

    return (
        <Box sx={{ maxWidth: '100%', margin: '0 auto' }}>
            <Paper sx={{ p: 3, borderRadius: 6, boxShadow: 3 }}>
                <Grid container spacing={3}>
                    {/* Site Information Section */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" color="textSecondary" gutterBottom>
                            Site Information
                        </Typography>
                        <TextField
                            label="Site Title"
                            name="siteTitle"
                            value={settings.siteTitle}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                            margin="normal"
                        />
                        <TextField
                            label="Site Description"
                            name="siteDescription"
                            value={settings.siteDescription}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                            margin="normal"
                        />
                    </Grid>

                    {/* Theme and Preferences Section */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" color="textSecondary" gutterBottom>
                            Theme and Preferences
                        </Typography>
                        <FormControl fullWidth margin="normal" variant="outlined">
                            <InputLabel>Theme</InputLabel>
                            <Select
                                label="Theme"
                                name="theme"
                                value={settings.theme}
                                onChange={handleInputChange}
                                IconComponent={Brightness4Icon}
                            >
                                <MenuItem value="light">Light</MenuItem>
                                <MenuItem value="dark">Dark</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={settings.notificationsEnabled}
                                    onChange={handleInputChange}
                                    name="notificationsEnabled"
                                    color="primary"
                                />
                            }
                            label={
                                <>
                                    <NotificationsIcon sx={{ marginRight: 1 }} />
                                    Enable Notifications
                                </>
                            }
                        />
                    </Grid>

                    {/* Language Section */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" color="textSecondary" gutterBottom>
                            Language Settings
                        </Typography>
                        <FormControl fullWidth margin="normal" variant="outlined">
                            <InputLabel>Language</InputLabel>
                            <Select
                                label="Language"
                                name="language"
                                value={settings.language}
                                onChange={handleInputChange}
                                IconComponent={LanguageIcon}
                            >
                                <MenuItem value="en">English</MenuItem>
                                <MenuItem value="es">Spanish</MenuItem>
                                <MenuItem value="fr">French</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Privacy Settings Section */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" color="textSecondary" gutterBottom>
                            Privacy Settings
                        </Typography>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={settings.privacyPolicyAccepted}
                                    onChange={handleInputChange}
                                    name="privacyPolicyAccepted"
                                />
                            }
                            label="I agree to the privacy policy"
                        />
                    </Grid>

                    {/* Security Settings Section */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" color="textSecondary" gutterBottom>
                            Security Settings
                        </Typography>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={settings.enableTwoFactorAuth}
                                    onChange={handleInputChange}
                                    name="enableTwoFactorAuth"
                                    color="secondary"
                                />
                            }
                            label={
                                <>
                                    <LockIcon sx={{ marginRight: 1 }} />
                                    Enable Two-Factor Authentication
                                </>
                            }
                        />
                    </Grid>

                    {/* SEO Settings Section */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" color="textSecondary" gutterBottom>
                            SEO Settings
                        </Typography>
                        <TextField
                            label="SEO Title"
                            name="seoTitle"
                            value={settings.seoTitle}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                            margin="normal"
                        />
                        <TextField
                            label="SEO Description"
                            name="seoDescription"
                            value={settings.seoDescription}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                            margin="normal"
                        />
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Grid container justifyContent="center">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSaveSettings}
                        startIcon={<SaveIcon />}
                        sx={{
                            fontWeight: 'bold',
                            padding: '10px 20px',
                            borderRadius: '25px',
                            boxShadow: 3,
                            '&:hover': { boxShadow: 6 },
                        }}
                    >
                        Save Settings
                    </Button>
                </Grid>
            </Paper>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
            >
                <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}
