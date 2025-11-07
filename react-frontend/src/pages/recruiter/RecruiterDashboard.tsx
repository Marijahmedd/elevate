import JobCard from "@/components/JobCard"
import { Input } from "@/components/ui/input"
import { api } from "@/lib/axios"
import { useStore } from "@/store/useStore"
import type { Job } from "@/types/job"
import { useQuery } from "@tanstack/react-query"
import { Spinner } from "flowbite-react"
import { SearchIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const RecruiterDashboard = () => {
    const [searchValue, setSearchValue] = useState("")
    const [filteredData, setFilteredData] = useState<Job[]>([])
    const navigate = useNavigate()
    const user = useStore(state => state.user)

    const { isPending, isError, data } = useQuery({
        queryKey: ["recruiterJobs", user?.id],
        queryFn: async () => {
            const res = await api.get(`/recruiter/jobs`)
            return res.data.jobsPosted
        },
        staleTime: 1000 * 60 * 5
    })

    useEffect(() => {
        if (data) setFilteredData(data)
    }, [data])

    useEffect(() => {
        if (!data) return
        const value = searchValue.trim().toLowerCase()
        const handler = setTimeout(() => {
            if (!value) {
                setFilteredData(data)
                return
            }
            const filtered = data.filter((job: Job) =>
                job.title.toLowerCase().includes(value)
            )
            setFilteredData(filtered)
        }, 400)
        return () => clearTimeout(handler)
    }, [searchValue, data])

    if (isPending)
        return <span className="flex items-center justify-center h-150 text-2xl">
            <Spinner color="gray" aria-label="Loading" />
        </span>

    if (isError)
        return <span className="flex items-center justify-center h-150 text-2xl">Something went wrong!</span>

    return (
        <div>


            {filteredData.length === 0 ? (
                <div className="flex items-center justify-center h-150 text-2xl">
                    No Job Found!
                </div>
            ) : (
                <>
                    <div className="flex flex-col px-4 mt-4 gap-3">
                        <div className="relative">
                            <Input
                                type="text"
                                placeholder="Search"
                                className="pl-10 w-[300px]"
                                value={searchValue}
                                onChange={e => setSearchValue(e.target.value)}
                            />
                            <SearchIcon className="absolute h-4 w-4 left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        </div>
                        <p className="text-muted-foreground text-sm">
                            Total posted Jobs : {data.length}
                        </p>
                    </div>
                    <ul className="px-4 min-h-svh">
                        {filteredData.map(job => (
                            <li
                                key={job.id}
                                onClick={() => navigate(`/recruiter/jobs/${job.id}`)}
                            >
                                <JobCard job={job} />
                            </li>
                        ))}
                    </ul>
                </>

            )}
        </div>
    )
}

export default RecruiterDashboard
