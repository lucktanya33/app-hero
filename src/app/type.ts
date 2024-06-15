export interface Hero {
    id: string;
    name: string;
    image: string;
}

export interface ProfileResponse {
    str: number;
    int: number;
    agi: number;
    luk: number;
}

export type Profile = ProfileResponse & {
    total: number;
};

export type Profiles = {
    [key: string]: ProfileResponse; // 定義一個索引簽名，表示 key 為 string，值的類型為 Profile
};

export interface ModalProps {
    message: string;
    onClose: () => void;
  }