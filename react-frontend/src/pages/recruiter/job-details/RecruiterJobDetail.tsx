import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useStore } from '@/store/useStore'
import { api } from '@/lib/axios'
import { Spinner } from 'flowbite-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { Building2, Clock10, MapPin, Clock, Briefcase, Banknote, AlertCircle, MoreVertical } from 'lucide-react'
import { formatDistanceToNowStrict } from 'date-fns'
import { capitalizeFirst, convertIntoK } from '@/lib/utility'
import { jobTypeLabels, LocationTypeLabels, } from '@/lib/constants'
import type { applicationStatusType } from '@/lib/constants'
import type { JobDetails as JobDetailsType } from '@/types/job'
import ApplicationTable from '@/components/ApplicationTable'
import DOMPurify from "dompurify"
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DeleteJobDialog } from '@/components/ui/delete-dialog'
import toast from 'react-hot-toast'
import { queryClient } from '@/main'


type Applicant = { name: string; email: string; pictureUrl: string | null }
export type Application = { id: string; applicant: Applicant; resumeUrl: string | null; createdAt: string; ai_score: number | null; status: applicationStatusType }
type JobDetailsResponse = { success: boolean; jobDetails: JobDetailsType & { applications: Application[] } }

export default function RecruiterJobDetails() {
    const { jobId } = useParams<{ jobId: string }>()
    const user = useStore((s) => s.user)
    const navigate = useNavigate()



    const deleteJobMutation = useMutation({
        mutationFn: async () => {
            await api.delete(`/recruiter/jobs/${jobId}`)
        },
        onSuccess: () => {
            toast.success("Successfully deleted job!")
            queryClient.invalidateQueries({ queryKey: ["recruiterJobs"] })
            navigate("/recruiter")

        },
        onError: () => {
            toast.error("Cannot delete job!")

        }
    })


    const { data, isLoading, isError } = useQuery<JobDetailsResponse>({
        queryKey: ['recruiter_job_details', jobId, user?.id],
        queryFn: async () => {
            const res = await api.get(`/recruiter/jobs/${jobId}`)
            return res.data
        },
        enabled: !!jobId,
    })

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

    const capsuleStyle = 'flex items-center gap-2 text-white text-sm border-1 px-3 py-1 rounded-lg w-max hover:bg-neutral-700 whitespace-nowrap'

    return (
        <div className="py-10 px-8 space-y-6 max-w-full overflow-x-hidden">
            <div>
                <div className="flex justify-between items-start gap-2">
                    <h1 className="text-3xl font-bold flex-1 wrap-break-word">{jobDetails.title}</h1>


                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon">
                                <MoreVertical />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild className="text-red-600" >
                                <DeleteJobDialog deleteJobMutation={deleteJobMutation} />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground mt-2">
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
                <div className='text-muted-foreground leading-relaxed whitespace-pre-line text-wrap text-md'
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(jobDetails.description || "") }}

                />
            </div>

            <Separator />

            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">Applications ({applications.length})</h3>
                </div>
                {applications.length === 0 ? (
                    <p className="text-muted-foreground">No applications yet.</p>
                ) : (
                    <div className="rounded-md border overflow-x-auto" style={{ height: 500 }}>
                        <ApplicationTable applications={applications} />
                    </div>
                )}
            </div>
        </div>
    )
}