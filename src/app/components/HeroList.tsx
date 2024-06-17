import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { HeroesContext } from '../heroes/HeroContext';
import { HeroesContextProps } from '../type';

const Card = styled.div<{ isSelected: boolean }>`
  width: 200px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: center;
  cursor: pointer; /* 讓卡片有指標樣式，表明它是可點擊的 */
  
  ${(props) =>
    props.isSelected &&
    css`
      background-color: lightblue; /* 選中時的背景顏色 */
    `}  
`;

const HeroImage = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 5px;
`;

const HeroName = styled.div`
  margin-top: 10px;
  font-weight: bold;
`;

const HeroesList: React.FC = () => {
  const context = useContext(HeroesContext) as HeroesContextProps;
  const { heroes, chosenId, handleShowProfile } = context;

  return (
    <>
      <h1>Marvel Heroes</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {heroes !== undefined && heroes.length > 0 ? (
          heroes.map((hero) => (
            <Card
              key={hero.id}
              isSelected={hero.id === chosenId}
              onClick={() => handleShowProfile(hero.id)}
            >
              <HeroImage src={hero.image} alt={hero.name} />
              <HeroName>{hero.name}</HeroName>
            </Card>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default HeroesList;

