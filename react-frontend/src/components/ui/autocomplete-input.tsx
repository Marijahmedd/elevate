import { capitalizeFirst } from "@/lib/utility";
import { X } from "lucide-react";
import { useState, useRef, useEffect } from "react";


interface AutocompleteInputProps {
    options: string[]
    value: string
    onChange: (value: string) => void
    placeholder?: string
}

export function AutocompleteInput({ options, value, onChange, placeholder }: AutocompleteInputProps) {
    const [inputValue, setInputValue] = useState("");
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Close dropdown if click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
                setInputValue("")
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filtered = options.filter((o: string) =>
        o.toLowerCase().includes(inputValue.toLowerCase())
    );

    return (
        <div ref={ref} className="relative mt-2">
            <input
                className="w-full bg-transparent border border-gray-700 px-3 py-2 rounded-md text-sm focus:outline-none"
                placeholder={placeholder}
                value={value || inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                    onChange(""); // allow resetting value
                    setOpen(true);
                }}
                onFocus={() => setOpen(true)}
            />

            {value && (
                <button
                    type="button"
                    onClick={() => {
                        onChange("");
                        setInputValue("")
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                    <X className="h-4 w-4 text-gray-400 hover:text-gray-200" />
                </button>
            )}

            {open && !value && inputValue.trim() && (
                <ul className="absolute mt-1 w-full bg-zinc-900 border border-zinc-800 rounded-md shadow-lg max-h-40 overflow-y-auto z-50">
                    {filtered.length === 0 && (
                        <li className="px-3 py-2 text-gray-400 text-sm">No matches</li>
                    )}
                    {filtered.map((item: string) => (
                        <li
                            key={item}
                            className="px-3 py-2 cursor-pointer hover:bg-zinc-800 text-sm"
                            onClick={() => {
                                onChange(capitalizeFirst(item));
                                setOpen(false);
                            }}
                        >
                            {capitalizeFirst(item)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
