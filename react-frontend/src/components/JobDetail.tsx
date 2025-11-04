import { SheetHeader, SheetTitle, SheetFooter } from './ui/sheet';
import { useSearchParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import type { JobDetails } from '@/types/job';
import { Button } from "@/components/ui/stateful-button"
import { jobTypeLabels, LocationTypeLabels } from '@/lib/constants';
import { Spinner } from "flowbite-react";
import { formatDistanceToNowStrict } from "date-fns"
import DOMPurify from "dompurify";
import {
    MapPin,
    Briefcase,
    Clock,
    Building2,

    AlertCircle,
    Banknote,
    Clock10
} from 'lucide-react';

import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { useStore } from '@/store/useStore';
import { queryClient } from '@/main';
import toast from 'react-hot-toast';
import { capitalizeFirst, convertIntoK } from '@/lib/utility';
import UploadResumeModal from './UploadResumeModal';
import { useState } from 'react';

const JobDetail = () => {
    const userData = useStore((state) => state.user)
    const [isUploadModalOpen, setUploadModalOpen] = useState(false)
    const token = useStore((state) => state.token)
    const [searchParams] = useSearchParams();
    const jobId = searchParams.get('job_id');

    const { data, isPending, isError } = useQuery({
        queryKey: ['job_details', jobId],
        queryFn: async () => {
            return api.get(`/jobs/${jobId}`);
        },
        enabled: !!jobId,
    });


    const { data: applicationData, isPending: isPendingStatus, refetch: refetchStatus } = useQuery({
        queryKey: ['job_application_status', jobId],
        queryFn: async () => {
            return api.get(`/jobs/${jobId}/status`);
        },
        enabled: !!token && !!jobId,
    });


    const { mutate } = useMutation({
        mutationFn: () => {
            return api.post('/applications', { jobId })
        },
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ["job_application_status", jobId] })
            refetchStatus()
        },
        onError: () => {
            toast.error("Error Applying for this job")
        }
    })



    const isApplied = applicationData?.data.isApplied ?? false

    if (!jobId) {
        return null;
    }

    if (isPending) {
        return (
            <>

                <div className='flex h-full justify-center items-center'>
                    <Spinner color="gray" size='xl' aria-label="Loading" />
                </div>

            </>
        );
    }

    if (isError) {
        return (
            <>
                <SheetHeader>
                    <SheetTitle>Job Details</SheetTitle>
                </SheetHeader>
                <div className="flex items-center justify-center min-h-[400px]">
                    <Alert variant="destructive" className="max-w-md">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            Unable to load job details. Please try again later.
                        </AlertDescription>
                    </Alert>
                </div>
            </>
        );
    }

    const capsuleStyle: string = "flex items-center gap-2 text-white text-sm border-1 px-3 py-1 rounded-lg w-max hover:bg-neutral-700 whitespace-nowrap"

    const jobDetails: JobDetails = data.data.jobDetails;

    return (
        <>
            <UploadResumeModal open={isUploadModalOpen} onOpenChange={setUploadModalOpen} />
            <div className='px-5 pt-5 pb-0 m-0'>

                <div className="text-2xl font-bold my-2">{jobDetails.title}</div>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Building2 size={14} />
                    <span className="text-sm font-medium">{jobDetails.recruiter.organizationName}</span>
                </div>
                <div className='flex my-2 items-center gap-2 text-sm rounded-lg w-max whitespace-nowrap text-muted-foreground'>
                    <Clock10 size={14} />
                    {formatDistanceToNowStrict(jobDetails.createdAt, { addSuffix: true })}
                </div>
            </div>

            <div className='overflow-y-auto px-5  '>
                <div className="space-y-6 animate-fade-in">
                    <div className="flex flex-wrap gap-2">
                        <div className={capsuleStyle}>
                            <MapPin size={14} className="shrink-0" />
                            <span>{capitalizeFirst(jobDetails.city)}</span>
                        </div>
                        <div className={capsuleStyle}>
                            <Clock size={14} className="shrink-0" />
                            <span>{jobTypeLabels[jobDetails.jobType]}</span>
                        </div>
                        <div className={capsuleStyle}>
                            <Briefcase size={14} className="shrink-0" />
                            <span>{LocationTypeLabels[jobDetails.location]}</span>
                        </div>
                        {
                            jobDetails.salaryMax && jobDetails.salaryMin &&
                            <div className={capsuleStyle}>
                                <Banknote size={14} className="shrink-0" />
                                <span>{convertIntoK(jobDetails.salaryMin)}-{convertIntoK(jobDetails.salaryMax)}</span>
                            </div>
                        }
                    </div>

                    <Separator />

                    {/* Description */}
                    <div>
                        <h3 className="font-semibold mb-3 text-lg">Job Description</h3>
                        {/* <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-wrap text-md">
                            {jobDetails.description}


                        </p> */}
                        <div className='text-muted-foreground leading-relaxed whitespace-pre-line text-wrap text-md'
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(jobDetails.description || "") }}

                        />


                    </div>
                </div >
            </div>
            <SheetFooter className="bg-neutral-900">
                {!token ? (
                    <Button className="mb-2 hover:ring-0  bg-neutral-600" disabled onClick={() => { /* redirect to login */ }}>
                        Login to apply
                    </Button>
                ) : isPendingStatus ? (
                    <Button className="mb-2 hover:ring-0  bg-neutral-600" disabled>
                        <Spinner color="gray" aria-label="Loading" />
                    </Button>
                ) : isApplied ? (
                    <Button className="mb-2 hover:ring-0  bg-neutral-600" disabled>
                        You have applied for this job
                    </Button>
                ) : (
                    <Button className="mb-2" onClick={() => {
                        if (!userData?.resumeUrl) {
                            return setUploadModalOpen(true)
                        }
                        mutate()
                    }}>
                        Apply
                    </Button>
                )}
            </SheetFooter>
        </>
    );
};

export default JobDetail;
