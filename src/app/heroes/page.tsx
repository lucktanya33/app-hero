"use client"; // This is a client component 👈🏽
import styled from "styled-components";
import HeroList from "../components/HeroList";

// 定義卡片容器
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

export default function Heroes() {

  return (
      <Container>
        <HeroList />
      </Container>
  );
}
