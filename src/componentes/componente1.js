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
        setData({
          title: "Error cargando",
          explanation: "Revisa la consola.",
        });
      });
  }, [key]);

  if (!data)
    return (
      <p className="text-center text-gray-400 mt-10">
        Cargando la foto del día...
      </p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-blue-900 text-white flex flex-col items-center p-6">
      <h1 className="text-5xl font-extrabold mb-8 text-center drop-shadow-lg">
        {data.title}
      </h1>

      <div className="bg-gray-800 bg-opacity-50 p-6 rounded-xl shadow-2xl w-full max-w-4xl transform transition hover:scale-105 duration-300">
        {data.media_type === "image" ? (
          <img
            src={data.url}
            alt={data.title}
            className="w-full max-h-[600px] object-contain rounded-lg shadow-lg mb-4"
          />
        ) : (
          <iframe
            src={data.url}
            title={data.title}
            className="w-full h-[500px] rounded-lg shadow-lg mb-4"
            allowFullScreen
          />
        )}

        <p className="text-gray-200 mb-4">{data.explanation}</p>
        <p className="text-sm text-gray-400 mb-4">
          Fecha: {data.date} {data.copyright && <>| © {data.copyright}</>}
        </p>

        {data.hdurl && (
          <a
            href={data.hdurl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition"
          >
            Ver en HD
          </a>
        )}
      </div>
    </div>
  );
}

export default Comp1;
