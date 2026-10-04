"use client";

import { useState } from "react";

export default function LeerAlbaran() {
  const [imagen, setImagen] = useState<string | null>(null);
  const [resultado, setResultado] = useState<string>("");

 const seleccionarImagen = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const archivo = e.target.files?.[0];

  if (!archivo) return;

  const lector = new FileReader();

  lector.onloadend = async () => {
    const imagenBase64 = lector.result as string;

    setImagen(imagenBase64);
    console.log("IMAGEN CONVERTIDA:", imagenBase64.substring(0, 50));

    setResultado("Leyendo albarán...");
    console.log("SE HA EJECUTADO seleccionarImagen");

    const respuesta = await fetch("/api/leer-albaran", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imagen: imagenBase64,
      }),
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
         console.log("ERROR DE LA API:", datos);
      setResultado(datos.error || "Ha ocurrido un error.");
      return;
    }

    setResultado(datos.resultado);
    sessionStorage.setItem("datosAlbaran", datos.resultado);
    console.log("RESULTADO IA:", datos.resultado);
  };

  lector.readAsDataURL(archivo);
};

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto w-full max-w-3xl">
        <div className="rounded-2xl bg-white p-4 shadow sm:p-8">
          <h1 className="mb-2 text-2xl font-bold sm:text-3xl">
            Leer albarán
          </h1>

          <p className="mb-6 text-gray-600">
            Haz una foto del albarán o selecciona una imagen de tu dispositivo.
          </p>

          <label className="block cursor-pointer rounded-xl bg-black p-4 text-center font-medium text-white">
            📷 Seleccionar foto del albarán
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={seleccionarImagen}
              className="hidden"
            />
          </label>

          {imagen && (
            <div className="mt-6">
              <h2 className="mb-3 text-lg font-bold">
                Imagen seleccionada
              </h2>

              <img
                src={imagen}
                alt="Albarán seleccionado"
                className="w-full rounded-xl border"
              />
            </div>
            
          )}
                {resultado && (
  <div className="mt-6 rounded-xl bg-white p-4 text-black shadow border border-gray-300">
    <h2 className="mb-3 text-lg font-bold">
      Resultado de la lectura
    </h2>

    <pre className="whitespace-pre-wrap text-sm font-medium text-black">
      {resultado}
    </pre>

    <button
      type="button"
      onClick={() => {
        window.location.href = "/crear";
      }}
      className="mt-4 w-full rounded-xl bg-blue-600 p-4 text-lg font-bold text-white hover:bg-blue-700"
    >
      ➡️ Usar estos datos para crear un DECA
    </button>
  </div>
)}
      </div>
    </div>
  </main>
);
}