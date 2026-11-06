import { useEffect } from "react";
import api from "../services/api";

function Home() {
  useEffect(() => {
    const checkServer = async () => {
      try {
        const response = await api.get("/health");

        console.log("Backend Response:", response.data);
      } catch (error) {
        console.error("Backend Connection Failed:", error);
      }
    };

    checkServer();
  }, []);

  return (
    <main>
      <h1>MERN University Starter</h1>
      <p>Frontend is running.</p>
    </main>
  );
}

export default Home;
