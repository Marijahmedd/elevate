import JobCard from "@/components/JobCard"
import JobDetail from "@/components/JobDetail";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { api } from "@/lib/axios"
import type { Job } from "@/types/job"
import { useQuery } from "@tanstack/react-query"
import { Pagination } from "flowbite-react";
import { useSearchParams } from "react-router-dom";


const JobListing = () => {


    const [searchParams, setSearchParams] = useSearchParams();
    const jobId: string | null = searchParams.get("job_id")
    let pageNumber = Number(searchParams.get("page")) || 1
    if (pageNumber < 1) {
        pageNumber = 1
    }
    const params = searchParams.toString();
    const filterParams = new URLSearchParams(searchParams) //Seperating so irrelevant params donot refetch job listings
    filterParams.delete("job_id")

    const { isPending, isError, data } = useQuery({
        queryKey: ['jobs', filterParams.toString()],
        queryFn: () => {
            return api.get(`/jobs?${params}`)
        },
        staleTime: 1000 * 60 * 5
    })

    if (isPending) {
        return <span className="flex items-center justify-center h-150 text-2xl">Loading...</span>
    }

    if (isError) {
        return <span className="flex items-center justify-center h-150 text-2xl">{"Something went Wrong!"}</span>
    }



    const jobList: Job[] = data.data.jobs
    const jobCount: number = data.data.count < 1 ? 1 : data.data.count

    return (
        <div>
            {jobList.length === 0 ? (
                <div className="flex items-center justify-center h-150 text-2xl">No Jobs Found!</div>
            ) :
                <>
                    <ul className="px-4 min-h-svh">
                        {jobList.map((job) => (
                            <li key={job.id} onClick={() => {
                                searchParams.set("job_id", job.id)
                                setSearchParams(searchParams)
                            }}>
                                <JobCard job={job} />
                            </li>
                        ))}
                    </ul>

                    <div className="flex justify-center mb-10">
                        <Pagination
                            currentPage={pageNumber}
                            totalPages={Math.ceil(jobCount / 10)}
                            onPageChange={(page: number) => {
                                searchParams.set("page", page.toString());
                                setSearchParams(searchParams);
                            }}
                        />
                    </div>
                </>
            }


            {/* JOB DETAILS PAGE */}



            <Sheet open={!!jobId}>
                <SheetContent side="right" className="sm:w-[600px] w-screen ">
                    <JobDetail />
                </SheetContent>
            </Sheet>

        </div >
    )


}

export default JobListing