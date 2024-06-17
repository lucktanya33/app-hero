import axios, { AxiosResponse } from "axios";
import { Hero, ProfileResponse, Profile } from "./type";

const HERO_LIST_URL = "https://hahow-recruit.herokuapp.com/heroes";
export const PROFILE_BASE_URL = 'https://hahow-recruit.herokuapp.com/heroes'


export const getHeroes = (): Promise<Hero[]> => {
    return axios.get<Hero[]>(HERO_LIST_URL)
        .then((response: AxiosResponse<Hero[]>) => {
            return response.data;
        })
        .catch((error: Error) => {
            console.error("Error fetching data:", error);
            throw error;
        });
};

export const patchProfile = (url: string, payload: ProfileResponse) => {
    return axios.patch(url, payload)
    .then((response) => {
        return response.data;
    })
    .catch((error: Error) => {
        console.error("Error fetching data:", error);
        throw error;
    });
}

export const fetchProfileData = async (apiUrls: string[]) => {
    try {
        const responses = await Promise.allSettled(apiUrls.map(url => axios.get<ProfileResponse>(url)));

        const profileData: { [key: string]: Profile | null } = {};

        responses.forEach((response, index) => {
            if (response.status === 'fulfilled') {
                const data = response.value.data;
                // 計算總和
                const total = data.str + data.int + data.agi + data.luk;
                // 建立包含 total 的資料存入 profileData
                profileData[`hero${index + 1}`] = { ...data, total };
            } else {
                const reason = (response as PromiseRejectedResult).reason;
                console.error(`Error fetching data for hero ${index + 1}:`, reason);
                profileData[`hero${index + 1}`] = null; // 或者根據需要做其他處理
            }
        });
        return profileData;
    } catch (error) {
        console.error('Error fetching profile data:', error);
        throw error;
    }
};
