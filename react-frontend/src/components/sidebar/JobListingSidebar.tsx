import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,

} from "@/components/ui/sidebar"
import { cities } from "../../../../shared/cities"
import { X } from "lucide-react"
import { useSearchParams } from "react-router-dom"
import { Separator } from "@/components/ui/separator"
import { Controller, useForm } from "react-hook-form"
import { AutocompleteInput } from "./../ui/autocomplete-input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { jobTypeLabels, LocationTypeLabels, type JobType, type LocationType } from "@/lib/constants"
import { jobTypeEnum, locationEnum } from "../../../../shared/constants"
import Footer from "./../sidebar/Footer"
import { useNavigate } from "react-router-dom";
import Header from "./Header"




export function JobListingSidebar() {
    const navigate = useNavigate()

    // const user = useStore(state => state.user)


    const [searchParams] = useSearchParams()
    const getParam = (key: string) => {
        const value = searchParams.get(key)
        if (key === "city" || key === "q") {
            return value ?? ""
        }
        return value?.toUpperCase() ?? ""
    }
    const { register, control, handleSubmit, formState: { isSubmitting } } = useForm({
        defaultValues: {
            q: getParam("q"),
            city: cities.includes(getParam("city") as typeof cities[number]) ? getParam("city") : "",
            jobtype: jobTypeEnum.includes(getParam("jobtype") as JobType) ? getParam("jobtype") : "",
            location: locationEnum.includes(getParam("location") as LocationType) ? getParam("location") : "",
        }
    })


    const onSubmit = async <T extends Record<string, string>>(data: T): Promise<void> => {
        console.log(data, "data")
        const normalizedData = { ...data, jobtype: data.jobtype ? data.jobtype.toLowerCase() : "", location: data.location ? data.location.toLowerCase() : "" }

        let searchQuery: Record<string, string> = {}
        for (let key in normalizedData) {
            if (normalizedData[key] !== null && normalizedData[key] !== undefined && normalizedData[key] !== "") {
                searchQuery[key] = normalizedData[key]
            }
        }
        console.log(searchQuery)
        const params = new URLSearchParams(searchQuery);
        navigate(`?${params.toString()}`);
    };

    const inputClass =
        "w-full bg-transparent border border-gray-700 px-3 py-2 mt-2 rounded-md text-sm focus:outline-none focus:none "

    return (
        <Sidebar className="border-r bg-sidebar text-sidebar-foreground">
            <Header />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-sm mb-4">Filters</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="overflow-x-hidden">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                                {/* Job Title */}
                                <div>
                                    <label className="block text-sm pl-2">Job Title</label>
                                    <input
                                        {...register("q")}
                                        placeholder="Search job title..."
                                        className={inputClass}
                                    />
                                </div>

                                {/* City */}
                                <div>
                                    <label className="block text-sm pl-2 ">City</label>
                                    <Controller
                                        name="city"
                                        control={control}


                                        render={({ field }) => (
                                            <AutocompleteInput
                                                placeholder="Select city..."
                                                options={cities}
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                </div>

                                {/* Job Type */}
                                <div className="relative">
                                    <label className="block text-sm pl-2">Job Type</label>
                                    <Controller
                                        name="jobtype"
                                        control={control}
                                        render={({ field }) => (
                                            <>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger className={inputClass}>
                                                        <SelectValue placeholder="Select job type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {jobTypeEnum.map((jobtype) => (
                                                            <SelectItem key={jobtype} value={jobtype}>
                                                                {jobTypeLabels[jobtype]}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>

                                                {field.value && (
                                                    <button
                                                        type="button"
                                                        onClick={() => field.onChange("")}
                                                        className="absolute right-3 top-[38px]"
                                                    >
                                                        <X className="h-4 w-4 text-gray-400 hover:text-gray-200" />
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    />
                                </div>

                                {/* Location */}
                                <div className="relative">
                                    <label className="block text-sm pl-2">Location</label>
                                    <Controller
                                        name="location"
                                        control={control}
                                        render={({ field }) => (
                                            <>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger className={inputClass}>
                                                        <SelectValue placeholder="Select work mode" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {locationEnum.map((loc) => (
                                                            <SelectItem key={loc} value={loc}>
                                                                {LocationTypeLabels[loc]}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>

                                                {field.value && (
                                                    <button
                                                        type="button"
                                                        onClick={() => field.onChange("")}
                                                        className="absolute right-3 top-[38px]"
                                                    >
                                                        <X className="h-4 w-4 text-gray-400 hover:text-gray-200" />
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    />
                                </div>

                                <div className="flex w-full  justify-center">

                                    <button
                                        type="submit"
                                        className="  mx-2 mt-2 w-[50%] rounded bg-blue-600 py-2 font-semibold hover:bg-blue-700 "
                                    >
                                        {isSubmitting ? "Searching..." : "Search"}
                                    </button>
                                </div>

                            </form>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* Footer */}
            <Footer />
        </Sidebar >
    )
}
