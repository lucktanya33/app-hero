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
    [key: string]: Profile;
};

export interface ModalProps {
    message: string;
    onClose: () => void;
  }

export interface HeroesContextProps {
    heroes: Hero[];
    chosenId: string;
    setChosenId: (id: string) => void;
    handleShowProfile: (id: string) => void;
    heroProfiles: Profiles
  }
  