"use client"; // This is a client component 👈🏽
import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Made by Tanya Lin For Hahow
        </p>
      </div>
      <h1 onClick={() => {router.push('/heroes')}}>ClICK ME! GO TO HERO APP</h1>
      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>
    </main>
  );
}
