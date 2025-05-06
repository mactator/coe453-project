"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchStoreSummary } from "@/lib/api";
import { MallStats, StoreSummary } from "@/lib/types";
import { ChevronDown, ChevronUp, Store } from "lucide-react";
import { useState } from "react";

interface Props {
    stats: MallStats;
}

export default function MallCard({ stats }: Props) {
    const [expanded, setExpanded] = useState(false);
    const [stores, setStores] = useState<StoreSummary[]>([]);
    const [loadingStores, setLoadingStores] = useState(false);

    const handleToggle = async () => {
        if (!expanded && stores.length === 0) {
            setLoadingStores(true);
            const data = await fetchStoreSummary(stats.mall_id);
            setStores(data || []);
            setLoadingStores(false);
        }
        setExpanded(!expanded);
    };

    return (
        <Card className="transition-all hover:shadow-xl bg-card border rounded-2xl p-4">
            <CardContent className="p-0 space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-primary">
                        🏢 {stats.mall_id}
                    </h3>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleToggle}
                        className="text-primary hover:bg-primary/10"
                    >
                        {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </Button>
                </div>

                {/* Stats */}
                <div className="text-sm text-muted-foreground space-y-1">
                    <p>🛍️ <span className="font-medium">{stats.total_sales} SAR</span> total sales</p>
                    <p>🚶‍♂️ {stats.mall_entries} entries</p>
                    <p>🚨 {stats.alarms_triggered} alarms triggered</p>
                </div>

                {/* Expandable Section */}
                {expanded && (
                    <div className="space-y-2 pt-2">
                        <Separator />
                        <h4 className="text-sm font-semibold text-foreground">🏪 Stores</h4>
                        {loadingStores ? (
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-2/3" />
                                <Skeleton className="h-4 w-5/6" />
                            </div>
                        ) : (
                            <ScrollArea className="h-40 pr-2">
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                    {stores.map((store) => (
                                        <li key={store.store_id} className="flex items-center gap-2">
                                            <Store size={16} className="text-gray-400" />
                                            <span className="font-medium">{store.store_id}</span> — {store.sales} SAR ({store.events} events)
                                        </li>
                                    ))}
                                </ul>
                            </ScrollArea>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
