"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
    const [decas, setDecas] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);
    useEffect(() => {
    const cargarDecas = async () => {
      const { data: usuarioData } = await supabase.auth.getUser();

      if (!usuarioData.user) {
        setCargando(false);
        return;
      }

      const { data, error } = await supabase
        .from("decas")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) {
        console.error("Error al cargar los DECA:", error);
        setCargando(false);
        return;
      }

      setDecas(data || []);
      setCargando(false);
    };

    cargarDecas();
  }, []);
  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto max-w-md">
        <div className="mb-4 flex justify-end">
  <button
    type="button"
    onClick={async () => {
      await supabase.auth.signOut();
      window.location.href = "/login";
    }}
    className="rounded-lg bg-gray-800 px-4 py-2 text-sm font-semibold text-white"
  >
    Cerrar sesión
  </button>
</div>
        
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            DeCA
          </h1>

          <p className="mt-2 text-gray-600">
            Documento de Control Administrativo
          </p>
        </header>

        <div className="space-y-4">
          
          <button
  onClick={() => {
    window.location.href = "/leer-albaran";
  }}
  className="w-full rounded-2xl bg-blue-600 p-6 text-xl font-semibold text-white shadow-lg"
>
            📷
            <span className="ml-3">
              Escanear albarán
            </span>
          </button>

          <button
  onClick={() => {
    window.location.href = "/crear";
  }}
  className="w-full rounded-2xl bg-white p-6 text-xl font-semibold text-gray-900 shadow-lg"
>
            ✏️
            <span className="ml-3">
              Introducir datos manualmente
            </span>
          </button>

        </div>

        <section className="mt-10">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Mis últimos DeCA
          </h2>

          <div className="space-y-3">
  {cargando ? (
    <div className="rounded-2xl bg-white p-5 shadow">
      <p className="text-gray-500">
        Cargando tus DeCA...
      </p>
    </div>
  ) : decas.length === 0 ? (
    <div className="rounded-2xl bg-white p-5 shadow">
      <p className="font-semibold">
        Todavía no hay documentos
      </p>

      <p className="mt-1 text-sm text-gray-500">
        Los DeCA que generes aparecerán aquí.
      </p>
    </div>
  ) : (
    decas.map((deca) => (
      <div
        key={deca.id}
        className="rounded-2xl bg-white p-5 shadow"
      >
        <p className="font-semibold text-gray-900">
          {deca.numero_documento}
        </p>

        <p className="mt-1 text-sm text-gray-600">
          {deca.origen} → {deca.destino}
        </p>

        <p className="mt-1 text-sm text-gray-500">
          {deca.fecha}
        </p>

        <button
          type="button"
          onClick={() => {
            window.location.href = `/deca/${deca.numero_documento}`;
          }}
          className="mt-3 w-full rounded-xl bg-blue-600 p-3 font-semibold text-white"
        >
          Ver DECA
        </button>
        <button
  type="button"
  onClick={() => {
    window.location.href = `/editar/${deca.numero_documento}`;
  }}
  className="mt-2 w-full rounded-xl bg-gray-800 p-3 font-semibold text-white"
>
  ✏️ Editar DECA
</button>
<button
  type="button"
  onClick={async () => {
    const confirmar = window.confirm(
      "¿Seguro que quieres eliminar este DECA?"
    );

    if (!confirmar) return;

    const { error } = await supabase
      .from("decas")
      .delete()
      .eq("id", deca.id);

    if (error) {
      console.error("Error al eliminar el DECA:", error);
      alert("No se ha podido eliminar el DECA.");
      return;
    }

    setDecas((anteriores) =>
      anteriores.filter((item) => item.id !== deca.id)
    );
  }}
  className="mt-2 w-full rounded-xl bg-red-600 p-3 font-semibold text-white"
>
  🗑️ Eliminar DECA
</button>
      </div>
    ))
  )}
</div>
        </section>

      </div>
    </main>
  );
}

