import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { IconButton, Tooltip, Box, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Fab } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const DataTable = () => {
    const [editableRowId, setEditableRowId] = React.useState<number | null>(null);
    const [rows, setRows] = React.useState([
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
        { id: 10, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ]);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [newRow, setNewRow] = React.useState({ firstName: '', lastName: '', age: '' });

    const handleEdit = (id: number) => {};

    const handleRowEditCommit = (params: any) => {
        const updatedRows = rows.map((row) => (row.id === params.id ? { ...row, ...params } : row));
        setRows(updatedRows);
        setEditableRowId(null);
    };

    const handleDelete = (id: number) => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleAddRow = () => {
        const newRowWithId = { ...newRow, id: rows.length + 1, age: Number(newRow.age) };
        setRows([...rows, newRowWithId]);
        setOpenDialog(false);
        setNewRow({ firstName: '', lastName: '', age: '' });
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130, editable: true },
        { field: 'lastName', headerName: 'Last name', width: 130, editable: true },
        { field: 'age', headerName: 'Age', type: 'number', width: 90, editable: true },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 120,
            sortable: false,
            renderCell: (params) => (
                <Box sx={{
                    display: 'flex',
                    gap: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%'
                }}>
                    <Tooltip title="Edit">
                        <IconButton
                            onClick={() => handleEdit(params.row)}
                            sx={{
                                color: '#2196f3',
                                backgroundColor: 'rgba(33, 150, 243, 0.08)',
                                '&:hover': {
                                    backgroundColor: 'rgba(33, 150, 243, 0.15)',
                                }
                            }}
                            size="small"
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton
                            onClick={() => handleDelete(params.row.id)}
                            sx={{
                                color: '#f44336',
                                backgroundColor: 'rgba(244, 67, 54, 0.08)',
                                '&:hover': {
                                    backgroundColor: 'rgba(244, 67, 54, 0.15)',
                                }
                            }}
                            size="small"
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            ),
        },
    ];

    return (
        <div>
            <div className="flex justify-end mb-4">
                <button
                    type="button"
                    className="p-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => setOpenDialog(true)}
                >
                    <svg className="w-3.5 h-3.5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                        <path
                            d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                    </svg>
                    Buy now
                </button>
            </div>

            <Paper sx={{ height: 545, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    sx={{ border: 'none' }}
                    isCellEditable={(params) => params.row.id === editableRowId}
                    processRowUpdate={(newRow) => {
                        handleRowEditCommit(newRow);
                        return newRow;
                    }}
                />
            </Paper>

            {/* Add Row Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Add New Row</DialogTitle>
                <DialogContent sx={{ paddingBottom: '16px' }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="First Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={newRow.firstName}
                        onChange={(e) => setNewRow({ ...newRow, firstName: e.target.value })}
                        sx={{
                            marginBottom: 2,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '8px',
                            },
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Last Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={newRow.lastName}
                        onChange={(e) => setNewRow({ ...newRow, lastName: e.target.value })}
                        sx={{
                            marginBottom: 2,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '8px',
                            },
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Age"
                        type="number"
                        fullWidth
                        variant="outlined"
                        value={newRow.age}
                        onChange={(e) => setNewRow({ ...newRow, age: e.target.value })}
                        sx={{
                            marginBottom: 2,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '8px',
                            },
                        }}
                    />
                </DialogContent>
                <DialogActions sx={{ padding: '16px' }}>
                    <Button
                        onClick={() => setOpenDialog(false)}
                        color="secondary"
                        variant="outlined"
                        sx={{
                            borderRadius: '8px',
                            fontWeight: '600',
                            textTransform: 'none',
                            padding: '8px 20px',
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleAddRow}
                        color="primary"
                        variant="contained"
                        sx={{
                            borderRadius: '8px',
                            fontWeight: '600',
                            textTransform: 'none',
                            padding: '8px 20px',
                        }}
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>


        </div>
    );
};

export default DataTable;
