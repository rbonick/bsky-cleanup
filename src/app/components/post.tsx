"use client";

import { AppBskyFeedDefs } from "@atproto/api";
import { useState } from 'react';

export function Post({ post }: { post: AppBskyFeedDefs.PostView }) {
    const [selected, setSelected] = useState(false);
    const bgClass = selected ? "bg-teal-300" : "bg-slate-100"

    return (
        <div className={`grid rounded p-4 ${bgClass}`} onClick={() => setSelected(!selected)}>
            <div className="w-full">
                <div className="flex flex-row items-center">
                    <img
                        src={post.author.avatar}
                        alt={post.author.handle}
                        className="h-12 w-12 rounded-full"
                    />
                    <div className="ml-4">
                        <p className="text-lg font-medium">{post.author.displayName}</p>
                        <p>@{post.author.handle}</p>
                    </div>
                </div>
                <div className="mt-4">
                    <p>{post.record.text}</p>
                </div>
            </div>
        </div>
    )
}