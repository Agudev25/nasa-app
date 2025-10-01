import { useEffect, useState } from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Comp1() {
  const [data, setData] = useState(null);
  const [date, setDate] = useState(null);
  const key = process.env.REACT_APP_NASA_KEY || "DEMO_KEY";

  const { scrollY } = useViewportScroll();
  const y = useTransform(scrollY, [0, 500], [0, -50]);

  const fetchAPOD = (d) => {
    const url = d
      ? `https://api.nasa.gov/planetary/apod?api_key=${key}&date=${d}`
      : `https://api.nasa.gov/planetary/apod?api_key=${key}`;
    fetch(url)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => {
        console.error(err);
        setData({
          title: "Error cargando",
          explanation: "Revisa la consola.",
          url: "",
          date: "",
          media_type: "image",
        });
      });
  };

  useEffect(() => {
    fetchAPOD(date || undefined);
  }, [date]);

  const handleRandom = () => {
    const start = new Date(1995, 5, 16).getTime();
    const end = new Date().getTime();
    const randomTime = new Date(start + Math.random() * (end - start));
    const randomDate = randomTime.toISOString().split("T")[0];
    setDate(randomDate);
  };

  if (!data)
    return (
      <p className="text-center text-gray-400 mt-10">
        Cargando la foto del día...
      </p>
    );

  const stars = [...Array(150)].map((_, i) => {
    const size = Math.random() * 2 + 1;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 20;
    return {
      id: i,
      size,
      duration,
      delay,
      top: Math.random() * 100,
      left: Math.random() * 100,
    };
  });

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden flex flex-col items-center p-6">
      {/* Cometas */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(5)].map((_, i) => {
          const delay = Math.random() * 20;
          const duration = Math.random() * 10 + 10;
          const top = Math.random() * 50;
          const left = Math.random() * 100 - 50;
          const scale = Math.random() * 0.5 + 0.5;
          return (
            <span
              key={i}
              className="comet"
              style={{
                top: `${top}vh`,
                left: `${left}vw`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                transform: `scale(${scale}) rotate(45deg)`,
              }}
            />
          );
        })}
      </div>

      {/* Fondo de estrellas */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {stars.map((s) => (
          <span
            key={s.id}
            className="absolute bg-white star"
            style={{
              width: `${s.size}px`,
              height: `${s.size}px`,
              top: `${s.top}%`,
              left: `${s.left}%`,
              animationDuration: `${s.duration}s`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Cabecera explicativa */}
      <header className="relative z-10 text-center mb-10 space-y-2">
        <h2 className="text-4xl font-bold leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 drop-shadow-lg">
          NASA Astronomy Picture of the Day
        </h2>
        <p className="text-gray-300">
          Explora diariamente imágenes asombrosas del espacio con su explicación
          oficial.
        </p>
        <h1 className="text-3xl font-bold mb-4 drop-shadow-lg">{data.title}</h1>
      </header>

      {/* Contenido con parallax */}
      <motion.div style={{ y }} className="relative z-10 text-center">
        <div className="bg-blue-900 bg-opacity-50 p-6 rounded-xl shadow-2xl w-full max-w-4xl transform transition hover:scale-105 duration-300">
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
              className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-4 py-2 rounded transition mr-2"
            >
              Ver en HD
            </a>
          )}

          <button
            onClick={handleRandom}
            className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-4 py-2 rounded transition"
          >
            Foto aleatoria
          </button>
        </div>
      </motion.div>
      <footer className="w-full mt-10 py-6 bg-gray-900 bg-opacity-70 text-center text-gray-400 text-sm z-10 relative">
        <p className="mb-4">© 2025 Agustin Jimenez. Proyecto Demo</p>
        <div className="flex justify-center space-x-6">
          {/* Facebook */}
          <a
            href="https://www.facebook.com/share/1DmfoTaAs5/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-500 transition-colors"
          >
            <i className="fab fa-facebook-f text-xl"></i>
          </a>
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/agustín-giménez-llamas-780067380"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition-colors"
          >
            <i className="fab fa-linkedin-in text-xl"></i>
          </a>
          {/* Instagram */}
          <a
            href="https://www.instagram.com/agudev25"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-pink-500 transition-colors"
          >
            <i className="fab fa-instagram text-xl"></i>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Comp1;
