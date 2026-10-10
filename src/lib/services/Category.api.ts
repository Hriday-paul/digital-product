import { config } from "@/utils/config";

export const GetCategories = async () => {

    try {

        const response = await fetch(
            config.serverBaseApi + "/categories",
            {
                cache: "no-store",
            }
        );

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);

            throw new Error(
                errorData?.message || "Failed to load categories"
            );
        }
        const res = response.json();
        return res;
    } catch (err) {
        throw err;
    }
};