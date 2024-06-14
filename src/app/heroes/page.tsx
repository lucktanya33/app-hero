"use client"; // This is a client component 👈🏽
import { useState, useEffect, useCallback, useMemo } from "react";
import styled from "styled-components";
import { Hero } from "../type";
import { getHeroes, fetchProfileData, PROFILE_BASE_URL } from "../api";

// 定義卡片容器
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

// 定義卡片
const Card = styled.div`
  width: 200px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: center;
`;

// 定義英雄圖片
const HeroImage = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 5px;
`;

// 定義英雄名稱
const HeroName = styled.div`
  margin-top: 10px;
  font-weight: bold;
`;

const AbilityContainer = styled.div`
  border: 1px solid #000;
  padding: 20px;
  width: 300px;
`;

const AbilityRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const AbilityLabel = styled.div`
  flex: 1;
`;

const AbilityValue = styled.div`
  flex: 1;
  text-align: center;
`;

const Button = styled.button`
  width: 30px;
  height: 30px;
  margin: 0 5px;
`;

const SaveButton = styled.button`
  margin-top: 20px;
  padding: 10px;
  width: 100%;
`;

const PointsRemaining = styled.div`
  margin-top: 20px;
  text-align: right;
`;

export default function Heroes() {
    // MOCK DATA
    const abilities = {
        str: 5, // 力量
        int: 5, // 智力
        agi: 0, // 敏捷
        luk: 5, // 幸運
      };
    
      const pointsRemaining = 30;

    const [heroes, setHeroes] = useState<Hero[]>([]);
    const [heroProfiles, setHeroProfiles] = useState({});
    const [chosenId, setChosenId] = useState('');

    const generateProfileApis = useMemo(() => {
        return heroes.map(hero => `${PROFILE_BASE_URL}/${hero.id}/profile`);
    }, [heroes])

    const handleShowProfile = useCallback((id: string) => {
        window.history.replaceState(null, "", `/heroes/:${id}`)
        setChosenId(id);
    }, [])

    // 拿到英雄能力值
    useEffect(() => {
        fetchProfileData(generateProfileApis)
            .then((data) => {
                setHeroProfiles(data)
            })
            .catch((error) => {
            });
    }, [heroes]);

    // 拿到英雄名單
    useEffect(() => {
        getHeroes()
            .then((heroesData) => {
                setHeroes(heroesData);
                console.log("Heroes data:", heroesData);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    useEffect(() => {
        console.log('heroProfiles', heroProfiles);
    }, [heroProfiles])

    return (
        <>
            <Container>
                <h1>Marvel Heroes</h1>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                    }}
                >
                    {Array.isArray(heroes) && heroes.length > 0 ? (
                        heroes.map((hero) => (
                            <Card
                                key={hero.id}
                                onClick={() => {
                                    handleShowProfile(hero.id)
                                }}
                            >
                                <HeroImage src={hero.image} alt={hero.name} />
                                <HeroName>{hero.name}</HeroName>
                            </Card>
                        ))
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
                <AbilityContainer>
                {Object.entries(abilities).map(([key, value]) => (
                    <AbilityRow key={key}>
                        <AbilityLabel>{key.toUpperCase()}</AbilityLabel>
                        <Button>+</Button>
                        <AbilityValue>{value}</AbilityValue>
                        <Button>-</Button>
                    </AbilityRow>
                ))}
                <PointsRemaining>剩餘點數: {pointsRemaining}</PointsRemaining>
                <SaveButton>儲存</SaveButton>
            </AbilityContainer>
            </Container>
        </>
    );
}
