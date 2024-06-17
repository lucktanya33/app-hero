"use client"; // This is a client component 👈🏽
import React, { createContext, useState, useEffect, useCallback, ReactNode, useContext } from 'react';
import { Hero } from '../type';
import { getHeroes } from '../api';

interface HeroesContextProps {
  heroes: Hero[];
  chosenId: string;
  setChosenId: (id: string) => void;
  handleShowProfile: (id: string) => void;
}

const HeroesContext = createContext<HeroesContextProps | undefined>(undefined);

export const HeroesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [chosenId, setChosenId] = useState('');

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
  }, []);

  useEffect(() => {
    console.log('heroes', heroes)
  }, [heroes])

  useEffect(() => {
    console.log('excute context');
  }, [])

  return (
    <HeroesContext.Provider value={{ heroes, chosenId, setChosenId, handleShowProfile }}>
      {children}
    </HeroesContext.Provider>
  );
};

export { HeroesContext };
