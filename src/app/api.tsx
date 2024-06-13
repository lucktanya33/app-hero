import axios, { AxiosResponse } from "axios";
import { Hero, HeroProfile } from "./type";

const urlGetHeroes = "https://hahow-recruit.herokuapp.com/heroes";

// 定義 API URL 的陣列
const apiUrls = [
    'https://hahow-recruit.herokuapp.com/heroes/1/profile',
    'https://hahow-recruit.herokuapp.com/heroes/2/profile',
    // 可以繼續添加更多的 URL
];


export const getHeroes = (): Promise<Hero[]> => {
    return axios.get<Hero[]>(urlGetHeroes)
        .then((response: AxiosResponse<Hero[]>) => {
            return response.data; // 返回資料
        })
        .catch((error: Error) => {
            console.error("Error fetching data:", error);
            throw error; // 拋出錯誤，以便上層處理
        });
};

export const fetchProfileData = async () => {
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

// // 使用範例
// fetchProfileData().then((data) => {
//     // 在這裡處理獲得的資料
// }).catch((error) => {
//     // 在這裡處理錯誤
// });