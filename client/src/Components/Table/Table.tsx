import React, { useState, useEffect } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface RowsI {
    countryCode: string, name: string
}

export const TableComp = () => {
    const navigate = useNavigate()
    const [rows, setRows] = useState<RowsI[] | null>(null)
    useEffect(() => {
        const getRows = async () => {
            try {
                const { data } = await axios.get('http://localhost:4000/countries')

                setRows(data)
            } catch (err) {
                console.log(err)
            }
        }
        getRows()
    }, [])
    return (
        <>
            {rows ? <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Country-code</TableCell>
                            <TableCell align="right">Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                onClick={() => navigate(`/detailed/${row.countryCode}`)}
                                sx={{ cursor: 'pointer' }}
                                key={row.name}
                            >
                                <TableCell >
                                    {row.countryCode}
                                </TableCell>
                                <TableCell align="right">
                                    {row.name}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> : <h3>Loading...</h3>}
        </>
    )
}