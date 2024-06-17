"use client"; // This is a client component 👈🏽
import React, { createContext, useState, useEffect, useCallback, ReactNode, useMemo } from 'react';
import { Hero } from '../type';
import { HeroesContextProps } from '../type';
import { useRouter } from "next/navigation";
import {
  getHeroes,
  fetchProfileData,
  PROFILE_BASE_URL,
} from "../api";

const HeroesContext = createContext<HeroesContextProps>({
  heroes: [],
  chosenId: '',
  setChosenId: () => { },
  handleShowProfile: () => { },
  heroProfiles: {}
});

export const HeroesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [chosenId, setChosenId] = useState('');
  const [heroProfiles, setHeroProfiles] = useState({});

  const profileApis = useMemo(() => {
    return heroes.map((hero) => `${PROFILE_BASE_URL}/${hero.id}/profile`);
  }, [heroes]);

  // 拿到英雄能力值
  useEffect(() => {
    fetchProfileData(profileApis)
      .then((data) => {
        setHeroProfiles(data);
      })
      .catch((error) => { });
  }, [heroes, chosenId]);

  // 拿到英雄列表
  useEffect(() => {
    getHeroes()
      .then((heroesData) => {
        setHeroes(heroesData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleShowProfile = useCallback((id: string) => {
    setChosenId(id);
    router.push(`/heroes/:${id}`)
  }, []);

  return (
    <HeroesContext.Provider value={{ heroes, chosenId, setChosenId, handleShowProfile, heroProfiles }}>
      {children}
    </HeroesContext.Provider>
  );
};

export { HeroesContext };
