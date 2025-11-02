import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useStore } from '@/store/useStore'
import { api } from '@/lib/axios'
import { toast } from 'react-hot-toast'
import { Spinner } from 'flowbite-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { Building2, Clock10, MapPin, Clock, Briefcase, Banknote, AlertCircle } from 'lucide-react'
import { formatDistanceToNowStrict } from 'date-fns'
import { capitalizeFirst, convertIntoK } from '@/lib/utility'
import { jobTypeLabels, LocationTypeLabels, } from '@/lib/constants'
import type { applicationStatusType } from '@/lib/constants'
import type { JobDetails as JobDetailsType } from '@/types/job'



type Applicant = { name: string; email: string; pictureUrl: string | null }
type Application = { id: string; applicant: Applicant; resumeUrl: string | null; createdAt: string; ai_score: number | null; status: applicationStatusType }
type JobDetailsResponse = { success: boolean; jobDetails: JobDetailsType & { applications: Application[] } }

export default function RecruiterJobDetails() {
    const { jobId } = useParams<{ jobId: string }>()
    const user = useStore((s) => s.user)

    const { data, isLoading, isError } = useQuery<JobDetailsResponse>({
        queryKey: ['recruiter_job_details', jobId],
        queryFn: async () => {
            const res = await api.get(`/recruiter/jobs/${jobId}`)
            return res.data
        },
        enabled: !!jobId,
    })

    const updateStatusMutation = useMutation({
        mutationFn: async ({ applicationId, status }: { applicationId: string, status: applicationStatusType }) => {
            const res = await api.post('/recruiter/applications/status', { applicationId, status })
            return res.data
        },
        onSuccess: () => toast.success('Status updated successfully'),
        onError: () => toast.error('Failed to update status')
    })

    // Hooks before any early returns
    const [appStatuses, setAppStatuses] = useState<Record<string, applicationStatusType>>({})
    const [sort, setSort] = useState<{ key: 'createdAt' | 'ai'; dir: 'asc' | 'desc' }>({ key: 'createdAt', dir: 'desc' })

    useEffect(() => {
        const apps = data?.jobDetails?.applications
        if (apps && Array.isArray(apps)) {
            const initial = Object.fromEntries(apps.map(app => [app.id, app.status])) as Record<string, applicationStatusType>
            setAppStatuses(initial)
        } else {
            setAppStatuses({})
        }
    }, [data?.jobDetails?.applications])

    if (!jobId || !user) return null

    if (isLoading) return (
        <div className='flex h-full justify-center items-center'>
            <Spinner color="gray" size='xl' />
        </div>
    )

    if (isError || !data?.success) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <Alert variant="destructive" className="max-w-md">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                    Unable to load job details. Please try again later.
                </AlertDescription>
            </Alert>
        </div>
    )

    const jobDetails = data.jobDetails
    const { applications } = jobDetails

    const handleStatusChange = (applicationId: string, newStatus: applicationStatusType) => {
        updateStatusMutation.mutate({ applicationId, status: newStatus })
        setAppStatuses(prev => ({ ...prev, [applicationId]: newStatus }))
    }

    const capsuleStyle = 'flex items-center gap-2 text-white text-sm border-1 px-3 py-1 rounded-lg w-max hover:bg-neutral-700 whitespace-nowrap'

    return (
        <div className="p-5 space-y-6">
            <div>
                <div className="text-2xl font-bold">{jobDetails.title}</div>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Building2 size={14} />
                    <span className="text-sm font-medium">{jobDetails.recruiter.organizationName}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                    <Clock10 size={14} />
                    {formatDistanceToNowStrict(new Date(jobDetails.createdAt), { addSuffix: true })}
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                <div className={capsuleStyle}>
                    <MapPin size={14} />
                    <span>{capitalizeFirst(jobDetails.city)}</span>
                </div>
                <div className={capsuleStyle}>
                    <Clock size={14} />
                    <span>{jobTypeLabels[jobDetails.jobType]}</span>
                </div>
                <div className={capsuleStyle}>
                    <Briefcase size={14} />
                    <span>{LocationTypeLabels[jobDetails.location]}</span>
                </div>
                {jobDetails.salaryMin && jobDetails.salaryMax && (
                    <div className={capsuleStyle}>
                        <Banknote size={14} />
                        <span>{convertIntoK(jobDetails.salaryMin)}–{convertIntoK(jobDetails.salaryMax)}</span>
                    </div>
                )}
            </div>

            <Separator />

            <div>
                <h3 className="font-semibold mb-3 text-lg">Job Description</h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{jobDetails.description}</p>
            </div>

            <Separator />

            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">Applications ({applications.length})</h3>
                </div>
                {applications.length === 0 ? (
                    <p className="text-muted-foreground">No applications yet.</p>
                ) : (
                    <div className="rounded-md border overflow-x-auto">

                    </div>
                )}
            </div>
        </div>
    )
}

























{/* <table className="w-full min-w-[760px] text-sm">
    <thead className="bg-muted/20">
        <tr>
            <th className="px-3 py-2 text-left font-medium text-muted-foreground">Applicant</th>
            <th className="px-3 py-2 text-left font-medium text-muted-foreground">Email</th>
            <th
                className="px-3 py-2 text-left font-medium text-muted-foreground select-none cursor-pointer"
                onClick={() => setSort(prev => ({ key: 'ai', dir: prev.key === 'ai' && prev.dir === 'desc' ? 'asc' : 'desc' }))}
                aria-sort={sort.key === 'ai' ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none'}
            >
                AI Score {sort.key === 'ai' ? (sort.dir === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th className="px-3 py-2 text-left font-medium text-muted-foreground">Status</th>
            <th className="px-3 py-2 text-left font-medium text-muted-foreground">Resume</th>
            <th
                className="px-3 py-2 text-left font-medium text-muted-foreground select-none cursor-pointer"
                onClick={() => setSort(prev => ({ key: 'createdAt', dir: prev.key === 'createdAt' && prev.dir === 'desc' ? 'asc' : 'desc' }))}
                aria-sort={sort.key === 'createdAt' ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none'}
            >
                Applied {sort.key === 'createdAt' ? (sort.dir === 'asc' ? '▲' : '▼') : ''}
            </th>
        </tr>
    </thead>
    <tbody>
        {applications
            .slice()
            .sort((a, b) => {
                if (sort.key === 'ai') {
                    const sa = a.ai_score === null ? -1 : (a.ai_score)
                    const sb = b.ai_score === null ? -1 : (b.ai_score)
                    return sort.dir === 'asc' ? sa - sb : sb - sa
                } else {
                    const da = new Date(a.createdAt).getTime()
                    const db = new Date(b.createdAt).getTime()
                    return sort.dir === 'asc' ? da - db : db - da
                }
            })
            .map(app => (
                <tr key={app.id} className="border-t">
                    <td className="px-3 py-3">
                        <div className="flex items-center gap-3">
                            <img src={app.applicant.pictureUrl || '/placeholder.png'}
                                referrerPolicy='no-referrer'
                                alt={app.applicant.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
                            <span className="font-medium truncate max-w-[220px]">{app.applicant.name}</span>
                        </div>
                    </td>
                    <td className="px-3 py-3 text-muted-foreground truncate max-w-[220px]">{app.applicant.email}</td>
                    <td className="px-3 py-3"><div>{app.ai_score ? app.ai_score : "Not Rated"}<div /></div></td>
                    <td className="px-3 py-3">
                        <select
                            value={appStatuses[app.id]}
                            onChange={e => handleStatusChange(app.id, e.target.value as applicationStatusType)}
                            className="bg-card border border-border rounded px-2 py-1 text-xs text-white"
                        >
                            {Object.entries(applicationSatusLabels).map(([key, label]) => (
                                <option key={key} value={key}>{label}</option>
                            ))}
                        </select>
                    </td>
                    <td className="px-3 py-3">
                        {app.resumeUrl ? (
                            <a href={`https://your-s3-domain.com/${app.resumeUrl}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">View</a>
                        ) : (
                            <span className="text-muted-foreground">—</span>
                        )}
                    </td>
                    <td className="px-3 py-3 text-muted-foreground whitespace-nowrap">
                        {formatDistanceToNowStrict(new Date(app.createdAt), { addSuffix: true })}
                    </td>
                </tr>
            ))}
    </tbody>
</table> */}