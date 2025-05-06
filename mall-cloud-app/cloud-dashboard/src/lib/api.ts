import { MallStats, OverallStats, StoreSummary } from "./types";

const API_URL = import.meta.env.VITE_API_URL as string;

export async function fetchOverallStats(): Promise<OverallStats> {
    const res = await fetch(`${API_URL}/stats/overall`);
    if (!res.ok) throw new Error("Failed to fetch overall stats");
    return await res.json();
  }
  
  export async function fetchPerMallStats(): Promise<MallStats[]> {
    const res = await fetch(`${API_URL}/stats`);
    if (!res.ok) throw new Error("Failed to fetch per-mall stats");
    return await res.json();
  }
  

  export const fetchStoreSummary = async (mallId: string): Promise<StoreSummary[] | null> => {
    try {
      const res = await fetch(`${API_URL}/malls/${mallId}/summary`);
      if (!res.ok) return null;
      return await res.json();
    } catch (err) {
      console.error("Error fetching store summary:", err);
      return null;
    }
  };
  