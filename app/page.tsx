'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect } from "react";
import Chat from "./components/Chat";

export default function Home() {
  useEffect(() => {
    fetch("/api/socket"); // Initialize the WebSocket server
}, []);
  return (
    <div className={styles.page}>
    <Chat/>
    </div>
  );
}
