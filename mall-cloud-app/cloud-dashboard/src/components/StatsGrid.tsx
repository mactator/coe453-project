import { OverallStats } from "@/lib/types";

export default function StatsGrid({ stats }: { stats: OverallStats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="stat bg-white dark:bg-base-200 rounded-2xl p-4 shadow">
        <div className="text-sm font-medium">🏬 Malls</div>
        <div className="text-xl font-bold">{stats.total_malls}</div>
      </div>
      <div className="stat bg-white dark:bg-base-200 rounded-2xl p-4 shadow">
        <div className="text-sm font-medium">👥 Visitors</div>
        <div className="text-xl font-bold">{stats.total_visitors}</div>
      </div>
      <div className="stat bg-white dark:bg-base-200 rounded-2xl p-4 shadow">
        <div className="text-sm font-medium">💰 Sales</div>
        <div className="text-xl font-bold">${stats.total_sales}</div>
      </div>
      <div className="stat bg-white dark:bg-base-200 rounded-2xl p-4 shadow">
        <div className="text-sm font-medium">🚨 Alarms</div>
        <div className="text-xl font-bold">{stats.total_alarms}</div>
      </div>
    </div>
  );
}
