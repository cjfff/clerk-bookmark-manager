"use client";

import { useState } from "react";
import { BookmarkInsert } from "@/types/bookmark";
import { useRouter } from "next/navigation";

interface BookmarkFormProps {
    onSubmit: (data: BookmarkInsert) => void;
    initialData?: Partial<BookmarkInsert>;
    isSubmitting: boolean;
}

export default function BookmarkForm({
    onSubmit,
    initialData,
    isSubmitting = false,
}: BookmarkFormProps) {
    const router = useRouter();

    const [formData, setFormData] = useState<BookmarkInsert>({
        url: initialData?.url || "",
        title: initialData?.title || "",
        notes: initialData?.notes || "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.url.trim() || !formData.title.trim() || isSubmitting) {
            return;
        }
        onSubmit(formData);
        router.refresh(); // Background refresh
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <h2 className="form-title">Add New Bookmark</h2>

            <div className="form-group">
                <label htmlFor="url" className="form-label">
                    URL *
                </label>
                <input
                    type="url"
                    id="url"
                    onChange={(e) =>
                        setFormData((prev) => ({ ...prev, url: e.target.value }))
                    }
                    className="form-input"
                    placeholder="https://example.com"
                    required
                    disabled={isSubmitting}
                />
            </div>
            <div className="form-group">
                <label htmlFor="title" className="form-label">
                    Title *
                </label>
                <input
                    type="text"
                    id="title"
                    onChange={(e) =>
                        setFormData((prev) => ({ ...prev, title: e.target.value }))
                    }
                    className="form-input"
                    placeholder="Enter Title"
                    required
                    disabled={isSubmitting}
                />
            </div>

            <div className="form-group">
                <label htmlFor="notes" className="form-label">
                    Notes
                </label>
                <input
                    type="text"
                    id="notes"
                    onChange={(e) =>
                        setFormData((prev) => ({ ...prev, notes: e.target.value }))
                    }
                    className="form-input"
                    placeholder="Enter any notes"
                    disabled={isSubmitting}
                />
            </div>

            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Bookmark"}
            </button>
        </form>
    );
}