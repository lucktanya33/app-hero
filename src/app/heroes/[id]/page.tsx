"use client"; // This is a client component 👈🏽
import HeroList from "../../components/HeroList";
import Modal from "../../components/Modal"
import { useState, useEffect, useCallback, useMemo, useContext } from "react";
import { HeroesContext } from "../HeroContext";
import {
  HeroesContextProps,
  Profile,
  ProfileResponse,
} from "@/app/type";
import React from "react";
import styled from "styled-components";
import { patchProfile, PROFILE_BASE_URL } from "../../api";

const AbilityContainer = styled.div`
  border: 1px solid #000;
  padding: 20px;
  width: 300px;
  margin: 0 auto; /* 將左右 margin 設定為 auto，使其水平置中 */
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

const Id: React.FC = () => {
  const context = useContext(HeroesContext) as HeroesContextProps;
  const { heroes, handleShowProfile, chosenId, heroProfiles } = context;
  const [abilities, setAbilities] = useState<Profile | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [reminder, setReminder] = useState<string | null>(null);

  const pointsRemaining = useMemo(() => {
    if (abilities === null || abilities === undefined) {
      return;
    }
    return (
      abilities.total -
      abilities.agi -
      abilities.int -
      abilities.luk -
      abilities.str
    );
  }, [abilities]);

  // 調整能力值點數
  const handleModifyAbility = useCallback(
    (direction: string, key: keyof ProfileResponse) => {
      if (abilities === null || abilities === undefined) {
        return;
      }
      if (direction === "plus") {
        setAbilities({ ...abilities, [key]: abilities[key] + 1 });
      }
      if (direction === "minus") {
        setAbilities({ ...abilities, [key]: abilities[key] - 1 });
      }
    },
    [abilities]
  );

  const handleSave = useCallback(() => {
    setIsSaving(true);
    if (!abilities) {
      return;
    }
    if (pointsRemaining !== 0) {
      setReminder("請使用完剩餘點數才能儲存喔！");
      setIsSaving(false);
      return;
    }
    
    // 打 PATCH API
    const { total, ...patchPayload } = abilities;
    patchProfile(`${PROFILE_BASE_URL}/${chosenId}/profile`, patchPayload)
      .then((response) => {
        console.log("response", response);
        if (response === "OK") {
          setReminder("成功保存！");
          setIsSaving(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setReminder(error.message);
        setIsSaving(false);
      });
  }, [pointsRemaining]);

  const handleCloseError = useCallback(() => {
    setReminder(null);
  }, []);

  // 設定當前能力表
  useEffect(() => {
    const heroKey = `hero${chosenId}`;
    setAbilities(heroProfiles[heroKey]);
  }, [heroProfiles, chosenId]);

  return (
    <>
      <HeroList />
      {chosenId && (
        <AbilityContainer>
          {abilities &&
            Object.entries(abilities)
              .filter(([key]) => key !== "total")
              .map(([key, value]) => (
                <AbilityRow key={key}>
                  <AbilityLabel>{key.toUpperCase()}</AbilityLabel>
                  <Button
                    disabled={pointsRemaining === 0}
                    onClick={() => {
                      handleModifyAbility("plus", key as keyof ProfileResponse);
                    }}
                  >
                    +
                  </Button>
                  <AbilityValue>{value}</AbilityValue>
                  <Button
                    disabled={value === 0}
                    onClick={() => {
                      handleModifyAbility(
                        "minus",
                        key as keyof ProfileResponse
                      );
                    }}
                  >
                    -
                  </Button>
                </AbilityRow>
              ))}
          <PointsRemaining>剩餘點數: {pointsRemaining}</PointsRemaining>
          <SaveButton
            disabled={isSaving}
            onClick={() => {
              handleSave();
            }}
          >
            儲存
          </SaveButton>
        </AbilityContainer>
      )}
      {reminder && <Modal message={reminder} onClose={handleCloseError} />}
    </>
  );
};

export default Id;
