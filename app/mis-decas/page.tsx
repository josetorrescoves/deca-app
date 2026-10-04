"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function MisDecas() {
  const [decas, setDecas] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDecas = async () => {
      const { data: usuarioData } = await supabase.auth.getUser();

      if (!usuarioData.user) {
        window.location.href = "/login";
        return;
      }

      const { data, error } = await supabase
        .from("decas")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error al cargar los DECAs:", error);
      } else {
        setDecas(data || []);
      }

      setCargando(false);
    };

    cargarDecas();
  }, []);

  if (cargando) {
    return (
      <main className="min-h-screen bg-gray-100 p-8">
        <p>Cargando tus DECAs...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Mis DECAs
            </h1>

            <p className="mt-2 text-gray-600">
              Aquí aparecen los documentos que has creado.
            </p>
          </div>

          <button
            onClick={() => {
              window.location.href = "/crear";
            }}
            className="rounded-lg bg-black px-5 py-3 font-medium text-white"
          >
            + Crear DECA
          </button>
        </div>

        {decas.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center shadow">
            <p className="text-gray-600">
              Todavía no has creado ningún DECA.
            </p>

            <button
              onClick={() => {
                window.location.href = "/crear";
              }}
              className="mt-4 rounded-lg bg-black px-5 py-3 font-medium text-white"
            >
              Crear mi primer DECA
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {decas.map((deca) => (
              <div
                key={deca.id}
                className="rounded-2xl bg-white p-6 shadow"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl font-bold">
                      {deca.numero_documento}
                    </h2>

                    <p className="mt-1 text-gray-600">
                      {deca.fecha}
                    </p>

                    <p className="mt-1 text-gray-600">
                      {deca.origen} → {deca.destino}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      window.location.href = `/deca/${deca.numero_documento}`;
                    }}
                    className="rounded-lg border px-4 py-2 font-medium"
                  >
                    Ver DECA
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}