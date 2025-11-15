import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { capitalizeFirst, keyToS3Url } from '@/lib/utility'
import type { Application } from '@/pages/recruiter/job-details/RecruiterJobDetail'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { applicationStatusLabels, type applicationStatusType } from '@/lib/constants'
import { ApplicationStatusEnum } from '../../../shared/constants'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import toast from 'react-hot-toast'
import { useMemo } from 'react'
import { RatingCircle } from './ui/rating-circle'
import { useParams } from 'react-router-dom'
import { queryClient } from '@/main'
import { useStore } from '@/store/useStore'


//
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#0a0a0a',
            paper: '#1a1a1a',
        },
        text: {
            primary: '#e5e5e5',
            secondary: '#9ca3af',
        },
    },
    components: {

    },
})

export default function ApplicationTable({ applications }: { applications: Application[] }) {

    const { jobId } = useParams<{ jobId: string }>()
    const user = useStore((s) => s.user)

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const applicationId = e.target.id
        const status = e.target.value as applicationStatusType
        if (!applicationId || !status) return
        mutate({ applicationId, status })
    }
    const { mutate } = useMutation({
        mutationFn: async ({ applicationId, status }: { applicationId: string, status: applicationStatusType }) => {
            const res = await api.post('/recruiter/applications/status', { applicationId, status })
            return res.data
        },
        onSuccess: () => {
            toast.success('Status updated successfully')
            queryClient.invalidateQueries({ queryKey: ['recruiter_job_details', jobId, user?.id] })

        },
        onError: () => toast.error('Failed to update status')
    })

    const columns: GridColDef[] = [
        {
            field: 'applicant', headerName: 'Applicant', minWidth: 250, resizable: true,
            renderCell(params) {
                return (
                    <div className='flex gap-2 items-center'>
                        <img src={params.value.profileImage} referrerPolicy='no-referrer' className=' h-8 w-8  rounded-full' alt="user" />
                        <p>{params.value.name}</p>

                    </div>)
            },
        },
        { field: 'email', headerName: 'Email', minWidth: 250, resizable: true },
        {
            field: 'ai_score',
            headerName: 'AI Score',
            width: 80,
            resizable: true,
            sortComparator: (v1, v2) => {
                const a = v1 === null || v1 === undefined ? -1 : v1
                const b = v2 === null || v2 === undefined ? -1 : v2
                return a - b
            },
            renderCell: (params) =>
                params.value === null ? (
                    <div className=" flex h-full justify-center items-center">
                        -
                    </div>
                ) : (
                    <div className=" flex h-full justify-center items-center">
                        <RatingCircle value={params.value} />
                    </div>
                ),
        },
        {
            field: 'status', headerName: 'Status', minWidth: 250,
            renderCell: (params) => {
                return (
                    <select id={params.row.id} defaultValue={params.value} onChange={handleStatusChange} className='w-full m-0'>
                        {ApplicationStatusEnum.map((option) => {
                            return (<option
                                key={option}
                                value={option}>{applicationStatusLabels[option]}</option>)
                        })}
                    </select>)
            },
            resizable: true
        },
        { field: 'createdAt', headerName: 'Applied At', minWidth: 250, resizable: true },
        {
            field: 'resumeUrl',
            headerName: 'Resume',
            minWidth: 130,  // Ensure enough space for button
            renderCell: (params) =>
                params.value ? (
                    <button
                        className='bg-neutral-700 hover:bg-neutral-600 text-white px-3 py-1 rounded-md text-sm w-auto'
                        onClick={() => window.open(keyToS3Url(params.value), '_blank')}
                    >
                        View Resume
                    </button>
                ) : (
                    <span className='text-neutral-500'>—</span>
                ),
        },
    ]

    const rows = useMemo(() => (applications.map((a: Application) => ({
        id: a.id,
        applicant: { name: capitalizeFirst(a.applicant.name), profileImage: a.applicant.pictureUrl },
        email: a.applicant.email,
        ai_score: a.ai_score ?? null,
        status: a.status,
        createdAt: new Date(a.createdAt).toLocaleString(),
        resumeUrl: a.resumeUrl,
    }))), [applications])

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <div
                style={{
                    height: '100%',
                    width: '100%',
                }}
            >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    disableColumnMenu
                    disableRowSelectionOnClick
                    sx={{
                        width: '100%',
                        border: 'none',
                        '& .MuiDataGrid-virtualScroller': {
                            overflowY: 'auto !important',
                            overflowX: 'auto !important',
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#171717',
                            borderBottom: '1px solid #2f2f2f',
                        },
                        '& .MuiDataGrid-cell': { borderColor: '#2f2f2f' },
                        '& .MuiDataGrid-row:hover': { backgroundColor: '#262626' },
                    }}
                />
            </div>
        </ThemeProvider>
    )
}
