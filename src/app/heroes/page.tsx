"use client"; // This is a client component 👈🏽
import axios from "axios";
import { AxiosResponse } from "../../../node_modules/axios/index";
import { useState, useEffect } from "react";
import styled from "styled-components";

const urlGetHeroes = "https://hahow-recruit.herokuapp.com/heroes";

interface Hero {
    id: string;
    name: string;
    image: string;
}

// 定義卡片容器
const CardContainer = styled.div`
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

export default function Heroes() {
    const [heroes, setHeroes] = useState<Hero[]>([]);

    useEffect(() => {
        axios
            .get<Hero[]>(urlGetHeroes)
            .then((response: AxiosResponse<Hero[]>) => {
                console.log("Response:", response.data);
                setHeroes(response.data);
            })
            .catch((error: Error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <>
            <CardContainer>
                <h1>Marvel Heroes</h1>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                    }}
                >
                    {Array.isArray(heroes) && heroes.length > 0 ? (
                        heroes.map(hero => (
                            <Card key={hero.id}>
                                <HeroImage src={hero.image} alt={hero.name} />
                                <HeroName>{hero.name}</HeroName>
                            </Card>
                        ))
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </CardContainer>
        </>
    );
}
