"use client"; // This is a client component 👈🏽
import { useState, useEffect, useCallback, useMemo } from "react";
import styled, { css } from "styled-components";
import { Hero, Profile, ProfileResponse, ModalProps} from "../type";
import { getHeroes, fetchProfileData, PROFILE_BASE_URL } from "../api";

// 定義卡片容器
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

// 定義卡片
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
`;

const ModalButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
`;

const Modal: React.FC<ModalProps> = ({ message, onClose }) => {
    return (
      <ModalOverlay>
        <ModalContent>
          <p>{message}</p>
          <ModalButton onClick={onClose}>確定</ModalButton>
        </ModalContent>
      </ModalOverlay>
    );
  }

export default function Heroes() {
    const [heroes, setHeroes] = useState<Hero[]>([]);
    const [heroProfiles, setHeroProfiles] = useState({});
    const [chosenId, setChosenId] = useState('');
    const [abilities, setAbilities] = useState<Profile | null>(null)
    const [error, setError] = useState<string | null>(null);

    const generateProfileApis = useMemo(() => {
        return heroes.map(hero => `${PROFILE_BASE_URL}/${hero.id}/profile`);
    }, [heroes])

    const pointsRemaining = useMemo(() => {
        if (abilities === null || abilities === undefined) {
            return;}
            return abilities.total - abilities.agi - abilities.int - abilities.luk - abilities.str
        }, [abilities])

    const handleCloseError = useCallback(() => {
        setError(null)
    }, [])

    const handleShowProfile = useCallback((id: string) => {
        window.history.replaceState(null, "", `/heroes/:${id}`)
        setChosenId(id);
    }, [])

    // 調整能力值點數
    const handleModifyAbility = useCallback((direction: string, key: keyof ProfileResponse) => {
        if (abilities === null || abilities === undefined) {
            return;
        }        
        if (direction === "plus") {
            setAbilities({...abilities, [key]: abilities[key] + 1})           
        }
        if (direction === "minus") {
            setAbilities({...abilities, [key]: abilities[key] - 1 })           
        }
    }, [abilities])

    const handleSave = useCallback(() => {
        if (pointsRemaining !== 0) {
            setError('請使用完剩餘點數才能儲存喔！')
        }
        // 打 PATCH API
    }, [pointsRemaining])

    // 設定當前能力表
    useEffect(() => {
        const heroKey = `hero${chosenId}`;
        setAbilities(heroProfiles[heroKey as keyof typeof heroProfiles])// 告訴 TypeScript，heroKey 是 heroProfiles 的一個有效索引。
        console.log('abilities', abilities);
    }, [heroProfiles, chosenId]) 

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
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

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
                                isSelected={hero.id === chosenId}
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
                {abilities && Object.entries(abilities)
                .filter(([key]) => key !== 'total')
                .map(([key, value]) => (
                    <AbilityRow key={key}>
                        <AbilityLabel>{key.toUpperCase()}</AbilityLabel>
                        <Button
                            disabled={pointsRemaining === 0}
                            onClick={() => {handleModifyAbility('plus', key as keyof ProfileResponse)}}>
                            +
                        </Button>
                        <AbilityValue>{value}</AbilityValue>
                        <Button
                            disabled={value === 0}
                            onClick={() => {handleModifyAbility('minus', key as keyof ProfileResponse)}}>
                        -</Button>
                    </AbilityRow>
                ))}
                <PointsRemaining>剩餘點數: {pointsRemaining}</PointsRemaining>
                <SaveButton onClick={() => {handleSave()}}>儲存</SaveButton>
            </AbilityContainer>
            </Container>
            {error && <Modal message={error} onClose={handleCloseError} />}
        </>
    );
}
