"use client";

import * as React from 'react';
import {useEffect, useState} from 'react';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {Box, IconButton, Tooltip} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {CirclePlus, Sheet, X} from 'lucide-react';
import {RoleRepositoryImpl} from './controller/RoleRepositoryImp';
import {Role} from "@/app/user/model/Role";
import {exportToExcel} from "@/app/util/ExportToExcel";

export default function UserRoleView() {
    const [rows, setRows] = useState<Role[]>([]);
    const [rollInput, setRoleInput] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [newRow, setNewRow] = useState<Role | null>(null);

    const roleRepository = new RoleRepositoryImpl();

    useEffect(() => {
        fetchRoles()
            .then(() => {
                console.log("Roles fetched successfully");
            })
            .catch((error) => {
                console.error('Error fetching roles:', error);
            });
    }, []);

    async function fetchRoles() {
        try {
            console.log("Fetching roles...");
            const response = await roleRepository.getRoles();
            const updatedRows = response.map((row: Role) => ({
                ...row,
                roleName: row.roleName,
            }));
            setRows(updatedRows as Role[]);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    }


    const handleDelete = async (id: string) => {
        try {
            await roleRepository.deleteRole(id);
            setRows(rows.filter((row) => row.id !== id));
        } catch (error) {
            console.error('Error deleting role:', error);
        }
    };

    const handleAddRow = async () => {
        try {
            setOpenDialog(false);
            setIsEdit(false);
            const data = new Role(newRow?.id ?? '', rollInput);  // Use rollInput for roleName
            if (isEdit) {
                await roleRepository.updateRole(newRow?.id ?? '', data);
                fetchRoles()
                    .then(() => {
                        console.log("Roles fetched successfully");
                    })
                    .catch((error) => {
                        console.error('Error fetching roles:', error);
                    });
            } else {
                const response = await roleRepository.createRole(data);
                setRows((prevRows) => [...prevRows, response.result]);
            }
        } catch (error) {
            console.error('Error adding role:', error);
        }
    };


    const handleExport = () => {
        exportToExcel(rows, 'roles_data.xlsx', 'Roles');
    };

    const handleDialogAddEdit = (role: Role | null) => {
        if (role != null) {
            setRoleInput(role.roleName);
            setNewRow(role);
            setIsEdit(true);
        } else {
            setRoleInput("");
        }
        setOpenDialog(true);

    }

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 220},
        {field: 'roleName', headerName: 'Role', width: 200, editable: false},
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            sortable: false,
            renderCell: (params) => (
                <Box sx={{display: 'flex', gap: 1, justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                    <Tooltip title="Edit">
                        <IconButton
                            onClick={() => handleDialogAddEdit(params.row)}
                            sx={{
                                color: '#2196f3',
                                backgroundColor: 'rgba(33, 150, 243, 0.08)',
                                '&:hover': {
                                    backgroundColor: 'rgba(33, 150, 243, 0.15)',
                                },
                            }}
                            size="small"
                        >
                            <EditIcon fontSize="small"/>
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
                                },
                            }}
                            size="small"
                        >
                            <DeleteIcon fontSize="small"/>
                        </IconButton>
                    </Tooltip>
                </Box>
            ),
        },
    ];

    return (
        <div>
            <div
                className="bg-white/80 backdrop-blur-lg p-6 rounded-xl shadow-sm flex justify-end items-center gap-5 border border-gray-300">
                <button
                    type="button"
                    className="flex items-center gap-2 px-5 py-2.5
               bg-gradient-to-r from-gray-700 to-gray-900 text-white
               rounded-lg shadow-md hover:from-gray-800 hover:to-black
               hover:shadow-xl active:scale-95 transition-all duration-300"
                    onClick={handleExport}
                >
                    <Sheet className="w-5 h-5 text-gray-200"/>
                    <span className="font-semibold text-sm tracking-wide">Export</span>
                </button>

                <button
                    type="button"
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 hover:shadow-lg active:scale-95 transition-all duration-300"
                    onClick={() => handleDialogAddEdit(null)}
                >
                    <CirclePlus className="w-5 h-5 text-white"/>
                    <span className="font-semibold text-sm tracking-wide">Add Role</span>
                </button>
            </div>

            <div className="bg-white p-4 rounded-lg">

                <div style={{height: 512, overflowY: 'auto'}}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        pageSizeOptions={[5, 10, 25, 50, 100]}
                        checkboxSelection
                        sx={{
                            border: 'none',
                            '& .MuiDataGrid-columnHeaders': {
                                position: 'sticky',
                                top: 0,
                                background: '#f5f5f5',
                                color: '#1976d2',
                                fontWeight: 'bold',
                                zIndex: 1,
                            },
                            '& .MuiDataGrid-columnHeaderTitle': {
                                textTransform: 'uppercase',
                            },
                            '& .MuiDataGrid-cell': {
                                padding: '8px',
                            },
                        }}
                    />
                </div>
            </div>

            {openDialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 p-8">
                    <div
                        className="bg-white p-8 rounded-lg shadow-lg w-[600px] relative transform transition-transform duration-300 scale-105"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Add Role</h2>
                            <button
                                className="text-gray-500 hover:text-white p-2 rounded hover:bg-gray-700"
                                onClick={() => setOpenDialog(false)}
                            >
                                <X className="h-6 w-6"/>
                            </button>
                        </div>
                        <input
                            type="text"
                            value={rollInput}  // Use rollInput for the input value
                            placeholder="Enter role name"
                            onChange={(e) => setRoleInput(e.target.value)} // Set rollInput when the input changes
                            className="w-full p-3 border rounded-md mb-6"
                        />
                        <button
                            className="w-full px-8 py-2 bg-gray-700 text-white rounded-md hover:bg-green-700 transition"
                            onClick={handleAddRow}
                        >
                            Save
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
