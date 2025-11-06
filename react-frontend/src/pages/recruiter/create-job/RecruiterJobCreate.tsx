import { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "react-hot-toast";
import { api } from "@/lib/axios";
import { jobTypeLabels, LocationTypeLabels } from "@/lib/constants";
import { convertIntoK } from "@/lib/utility";
import { useMutation } from "@tanstack/react-query";
import { lowerCaseCities } from "../../../../../shared/cities";
import { AutocompleteInput } from "@/components/ui/autocomplete-input";
import { queryClient } from "@/main";

const minSalaryRanges = [10000, 40000, 60000, 80000, 100000, 150000, 200000, 300000, 500000]
const maxSalaryRanges = [10000, 40000, 60000, 80000, 100000, 150000, 200000, 300000, 500000, 1000000]



export default function RecruiterJobCreate() {
    const [title, setTitle] = useState("");
    const [city, setCity] = useState("");
    const [location, setLocation] = useState("");
    const [jobType, setJobType] = useState("");
    const [salaryMin, setSalaryMin] = useState("");
    const [salaryMax, setSalaryMax] = useState("");
    const [value, setValue] = useState("");
    const [textLength, setTextLength] = useState(0);

    const maxLength = 3000;

    const modules = {
        toolbar: [
            ["bold", "italic", "underline"],

        ],
    };

    const formats = ["bold", "italic", "underline"];

    const handleChange = (content: string, _delta: any, _source: string, editor: any) => {
        const plainText = editor.getText().trim();
        setTextLength(plainText.length);
        setValue(content);
    };

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async () => {
            await api.post("/recruiter/jobs", {
                title,
                city,
                location,
                jobType,
                description: value,
                salaryMin: Number(salaryMin),
                salaryMax: Number(salaryMax),
            });
        },
        onSuccess: () => {
            toast.success("Job posted successfully!");
            queryClient.invalidateQueries({ queryKey: ['recruiterJobs'] })
            setTitle("");
            setCity("");
            setLocation("");
            setJobType("");
            setSalaryMin("");
            setSalaryMax("");
            setValue("");
            setTextLength(0);
        }
    })


    const handleSubmit = async () => {
        const plainText = new DOMParser().parseFromString(value, "text/html").body.textContent?.trim() || "";

        if (plainText.length < 30 || plainText.length > maxLength) {
            toast.error("Description must be between 30 and 3000 characters.");
            return;
        }

        if (!title || title.length < 10) {
            toast.error("Title must be at least 10 characters long.");
            return;
        }

        if (!city || !location || !jobType || !salaryMin || !salaryMax) {
            toast.error("All fields are required.");
            return;
        }

        if (Number(salaryMin) > Number(salaryMax)) {
            toast.error("Minimum salary cannot be greater than maximum salary.");
            return;
        }

        try {
            await mutateAsync()
        } catch (err) {
            toast.error("Failed to post job.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-4 p-4 text-gray-100">
            <h1 className="text-2xl font-semibold mb-4">Post a New Job</h1>

            {/* Job title */}
            <Input
                placeholder="Job title (e.g. Frontend Developer)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            {/* City using AutocompleteInput */}
            <AutocompleteInput
                options={lowerCaseCities}
                value={city}
                onChange={setCity}
                placeholder="Select city"
            />

            <div className="grid grid-cols-2 gap-3">
                <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select location type" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.entries(LocationTypeLabels).map(([key, label]) => (
                            <SelectItem key={key} value={key}>
                                {label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={jobType} onValueChange={setJobType}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.entries(jobTypeLabels).map(([key, label]) => (
                            <SelectItem key={key} value={key}>
                                {label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <Select value={salaryMin} onValueChange={setSalaryMin}>
                    <SelectTrigger>
                        <SelectValue placeholder="Minimum Salary" />
                    </SelectTrigger>
                    <SelectContent>
                        {minSalaryRanges.map((v: number) => (
                            <SelectItem key={v} value={String(v)}>
                                Rs {convertIntoK(v).toLocaleString()}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={salaryMax} onValueChange={setSalaryMax}>
                    <SelectTrigger>
                        <SelectValue placeholder="Maximum Salary" />
                    </SelectTrigger>
                    <SelectContent>
                        {maxSalaryRanges.map((v) => (
                            <SelectItem key={v} value={String(v)}>
                                Rs {convertIntoK(v).toLocaleString()}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <p className="text-xs text-gray-400 mt-1">
                Select monthly salary range (PKR)
            </p>

            {/* Description editor */}
            <div className="border rounded-md p-2 [&_.ql-editor]:text-lg [&_.ql-editor]:text-gray-100 [&_.ql-editor]:min-h-[300px]">
                <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={handleChange}
                    modules={modules}
                    formats={formats}
                />
                <div className="flex justify-between items-center mt-2">
                    <p
                        className={`text-sm ${textLength > maxLength ? "text-red-500" : "text-gray-400"
                            }`}
                    >
                        {textLength}/{maxLength} visible characters
                    </p>
                </div>
            </div>

            <Button
                onClick={handleSubmit}
                disabled={textLength > maxLength || isPending}
                className="w-full bg-neutral-600 hover:bg-neutral-700 text-white"
            >
                {!isPending ? "Create New Job" : "Creating"}
            </Button>
        </div>
    );
}
