import { BACKEND_URL } from "./Config";

export const FetchArticles = async () => {
    const res = await fetch(`${BACKEND_URL}/article/`, {
        method: "GET",
        mode: "cors",
        credentials: "include",
    })
    return res
}
