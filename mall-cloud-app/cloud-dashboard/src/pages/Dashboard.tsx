"use client";

import { fetchOverallStats, fetchPerMallStats } from "@/lib/api";
import { MallStats, OverallStats } from "@/lib/types";
import { useEffect, useState } from "react";

import MallCard from "@/components/MallCard";
import StatsGrid from "@/components/StatsGrid";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
    const [overall, setOverall] = useState<OverallStats | null>(null);
    const [mallStats, setMallStats] = useState<MallStats[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([fetchOverallStats(), fetchPerMallStats()])
            .then(([overallStats, perMallStats]) => {
                setOverall(overallStats);
                setMallStats(perMallStats);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className="min-h-screen w-screen bg-background text-foreground p-6">
            <h1 className="text-3xl font-bold mb-6 text-primary">
                📊 Mall Monitoring Dashboard
            </h1>

            {loading ? (
                <div className="space-y-6">
                    <Skeleton className="h-32 w-full rounded-xl" />
                    <Skeleton className="h-6 w-1/4" />
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {[...Array(3)].map((_, i) => (
                            <Skeleton key={i} className="h-48 w-full rounded-2xl" />
                        ))}
                    </div>
                </div>
            ) : (
                <>
                    {overall && <StatsGrid stats={overall} />}
                    <Separator className="my-6" />
                    <h2 className="text-2xl font-semibold mb-4">📍 Per Mall Stats</h2>
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {mallStats.map((mall) => (
                            <MallCard key={mall.mall_id} stats={mall} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
