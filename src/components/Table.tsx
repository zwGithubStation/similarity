'use client'

import { DataGrid, GridColumnHeaderParams, type GridColDef } from '@mui/x-data-grid'
import { ApiRequest } from '@prisma/client'
import { FC } from 'react'
import { useTheme } from 'next-themes';
import { createTheme, ThemeProvider } from '@mui/material'

const columnsDraft: GridColDef[] = [
    {
        field: 'col1',
        headerName: 'API key used',
        width: 400,
        renderHeader(params) {
            return (
                <strong className='font-semibold'>{params.colDef.headerName}</strong>
            )
        },
    },
{field: 'col2', headerName: 'Path', width: 250},
{field: 'col3', headerName: 'Recently', width: 250},
{field: 'col4', headerName: 'Deration', width: 150},
{field: 'col5', headerName: 'Status', width: 150},
]

const columns = columnsDraft.map((col) => {
    if(col.field === 'col1') {
        return col
    }

    return {
        ...col,
        renderHeader(params: GridColumnHeaderParams<any, any, any>) {
            return (
                <strong className='font-semibold'>{params.colDef.headerName}</strong>
            )
        },
    }
})

type ModifiedRequestType<K extends keyof ApiRequest> = Omit<ApiRequest, K> & {
    timeStamp: string
}

interface TableProps {
    userRequests: ModifiedRequestType<'timestamp'>[]
}

const Table: FC<TableProps> = ({userRequests}) => {
    const {theme: applicationTheme} = useTheme()

    const theme = createTheme({
        palette: {
            mode: applicationTheme === 'light' ? 'light' : 'dark', 
        },
    })

    const rows = userRequests.map((request) => ({
        id: request.id,
        col1: request.usedApiKey,
        col2: request.path,
        col3: `${request.timeStamp} ago`,
        col4: `${request.duration} ms`,
        col5: request.status,
    }))

    return <ThemeProvider theme={theme}>
        <DataGrid
            style={{
                backgroundColor: applicationTheme === 'light' ? 'white' : '#152238',
                fontSize: '1rem',
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            autoHeight
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 5,
                    },
                },
            }}
            columns={columns}
            rows={rows} />
    </ThemeProvider>
}

export default Table