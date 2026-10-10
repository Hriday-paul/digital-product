import { config } from "@/utils/config";

export const GetServices = async ({ query }: { query: { [key: string]: string } }) => {

    try {

        const queryString = query ? `?${new URLSearchParams(query).toString()}` : "";

        const response = await fetch(
            config.serverBaseApi + "/services" + queryString,
            {
                cache: "no-store",
            }
        );

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);

            throw new Error(
                errorData?.message || "Failed to load services"
            );
        }
        const res = response.json();
        return res;
    } catch (err) {
        throw err;
    }
};

export const GetServiceBySlug = async (slug: string) => {

    try {

        const response = await fetch(
            config.serverBaseApi + "/services/" + slug,
            {
                cache: "no-store",
            }
        );

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);

            throw new Error(
                errorData?.message || "Failed to load service"
            );
        }
        const res = response.json();
        return res;
    } catch (err) {
        throw err;
    }
};