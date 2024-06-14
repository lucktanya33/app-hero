import axios, { AxiosResponse } from "axios";
import { Hero, HeroProfile } from "./type";

const HERO_LIST_URL = "https://hahow-recruit.herokuapp.com/heroes";
export const PROFILE_BASE_URL = 'https://hahow-recruit.herokuapp.com/heroes'



export const getHeroes = (): Promise<Hero[]> => {
    return axios.get<Hero[]>(HERO_LIST_URL)
        .then((response: AxiosResponse<Hero[]>) => {
            return response.data; // 返回資料
        })
        .catch((error: Error) => {
            console.error("Error fetching data:", error);
            throw error; // 拋出錯誤，以便上層處理
        });
};

export const fetchProfileData = async (apiUrls: string[]) => {
    try {
        const responses = await Promise.allSettled(apiUrls.map(url => axios.get<HeroProfile>(url)));

        const profileData: { [key: string]: HeroProfile | null } = {};

        responses.forEach((response, index) => {
            if (response.status === 'fulfilled') {
                const data = (response as PromiseFulfilledResult<AxiosResponse<HeroProfile>>).value.data;
                profileData[`hero${index + 1}`] = data;
            } else {
                const reason = (response as PromiseRejectedResult).reason;
                console.error(`Error fetching data for hero ${index + 1}:`, reason);
                profileData[`hero${index + 1}`] = null; // 或者根據需要做其他處理
            }
        });

        console.log('Profile data:', profileData);
        return profileData;
    } catch (error) {
        console.error('Error fetching profile data:', error);
        throw error; // 這裡可以根據需求進一步處理錯誤
    }
};
