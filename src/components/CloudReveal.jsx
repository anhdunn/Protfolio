import { useEffect, useState } from "react";
import "./CloudReveal.css";

export default function CloudReveal() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 3600);
    return () => clearTimeout(t);
  }, []);

  if (done) return null;

  return (
    <div className="cloud-reveal">
      <div className="cloud-mass cloud-mass--a" />
      <div className="cloud-mass cloud-mass--b" />
    </div>
  );
}