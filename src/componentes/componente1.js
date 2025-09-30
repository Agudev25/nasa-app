import { useEffect, useState } from "react";

function Comp1() {
  const [data, setData] = useState(null);
  const key = process.env.REACT_APP_NASA_KEY || "DEMO_KEY";

  useEffect(() => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${key}`)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => {
        console.error(err);
        setData({ title: "Error cargando", explanation: "Revisa la consola." });
      });
  }, [key]);

  if (!data) return <p>Cargando la foto del día...</p>;

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>{data.title}</h1>
      <img src={data.url} alt={data.title} style={{ maxWidth: "80%" }} />
      <p>{data.explanation}</p>
    </div>
  );
}

export default Comp1;
