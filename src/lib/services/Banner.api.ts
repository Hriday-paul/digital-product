import { config } from "@/utils/config";

export interface IBanner {
    id: string;
    url: string;
    key: string;
    link?: string;
}

export const GetBanners = async () => {
    try {
        const response = await fetch(config.serverBaseApi + "/banners", {
            cache: "no-store",
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.message || "Failed to load banners");
        }

        const res = await response.json();
        return res;
    } catch (err) {
        throw err;
    }
};
