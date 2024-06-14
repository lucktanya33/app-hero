export interface Hero {
    id: string;
    name: string;
    image: string;
}

export interface Profile {
    str: number;
    int: number;
    agi: number;
    luk: number;
}

export type Profiles = {
    [key: string]: Profile; // 定義一個索引簽名，表示 key 為 string，值的類型為 Profile
};