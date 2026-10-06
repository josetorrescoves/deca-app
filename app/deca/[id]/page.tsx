"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import { QRCodeSVG } from "qrcode.react";

export default function VerDeca({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [deca, setDeca] = useState<any>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDeca = async () => {
      const { id } = await params;

      const { data, error } = await supabase
        .from("decas")
        .select("*")
        .eq("numero_documento", id)
        .maybeSingle();

      if (error) {
        console.error("Error al cargar el DeCA:", error);
      } else {
        setDeca(data);
      }

      setCargando(false);
    };

    cargarDeca();
  }, [params]);

  if (cargando) {
    return (
      <main className="p-8">
        <p>Cargando DeCA...</p>
      </main>
    );
  }

  if (!deca) {
    return (
      <main className="p-8">
        <p>No se ha encontrado el DeCA.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8 print:bg-white print:p-0">
      <div className="mx-auto w-full max-w-4xl rounded-2xl bg-white p-4 text-black shadow print:shadow-none sm:p-8">
        <h1 className="mb-2 text-2xl font-bold sm:text-3xl">
          Documento de Control Administrativo
        </h1>

        <div className="mb-6 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
  <p className="text-sm text-black sm:text-base">
    Nº de documento: {deca.numero_documento}
  </p>

  <div className="flex flex-col items-center">
    <QRCodeSVG
  value={`${window.location.origin}/deca/${deca.numero_documento}`}
  size={120}
/>
    <p className="mt-2 text-xs text-black">
      Código identificativo
    </p>
  </div>
</div>

        <hr className="mb-5 sm:mb-6" />

        <h2 className="mb-3 text-lg font-bold sm:text-xl">Cargador contractual</h2>

        <p>
          <strong>Razón social:</strong> {deca.cargador_nombre}
        </p>

        <p>
          <strong>NIF:</strong> {deca.cargador_nif}
        </p>

        <p>
          <strong>Domicilio:</strong> {deca.cargador_domicilio}
        </p>

        <h2 className="mb-3 text-lg font-bold sm:text-xl">Transportista efectivo</h2>

        <p>
          <strong>Razón social:</strong> {deca.transportista_nombre}
        </p>

        <p>
          <strong>NIF:</strong> {deca.transportista_nif}
        </p>

        <h2 className="mb-3 text-lg font-bold sm:text-xl">Transporte</h2>

        <p>
          <strong>Fecha:</strong> {deca.fecha}
        </p>

        <p>
          <strong>Origen:</strong> {deca.origen}
        </p>

        <p>
          <strong>Destino:</strong> {deca.destino}
        </p>

        <h2 className="mb-3 text-lg font-bold sm:text-xl">Mercancía</h2>

        <p>
          <strong>Naturaleza:</strong>{" "}
          {deca.naturaleza_mercancia}
        </p>

        <p>
          <strong>Peso:</strong> {deca.peso}
        </p>

        <h2 className="mb-3 text-lg font-bold sm:text-xl">Vehículo</h2>

        <p>
          <strong>Matrícula tractor:</strong>{" "}
          {deca.matricula_tractor}
        </p>

        <p>
          <strong>Matrícula remolque:</strong>{" "}
          {deca.matricula_remolque}
        </p>

        <h2 className="mb-3 text-lg font-bold sm:text-xl">Autorización especial</h2>

        <p>
          <strong>Dispone de autorización:</strong>{" "}
          {deca.tiene_autorizacion_especial ? "Sí" : "No"}
        </p>

        {deca.autorizacion_especial && (
          <p>
            <strong>Datos:</strong>{" "}
            {deca.autorizacion_especial}
          </p>
        )}

        <h2 className="mb-3 text-lg font-bold sm:text-xl">Observaciones</h2>

        <p>
          {deca.observaciones || "Sin observaciones"}
        </p>

        <div className="mt-8 flex flex-col gap-3 print:hidden sm:flex-row">
  <button
    onClick={() => {
      window.location.href = `/editar/${deca.numero_documento}`;
    }}
    className="rounded-lg bg-black px-5 py-3 font-medium text-white"
  >
    ✏️ Editar DECA
  </button>

  <button
    onClick={() => window.print()}
    className="rounded-lg bg-black px-5 py-3 font-medium text-white"
  >
    🖨️ Imprimir / Guardar PDF
  </button>

  <button
    onClick={() => {
      window.location.href = "/";
    }}
    className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white"
  >
    🏠 Volver al inicio
  </button>
</div>
      </div>
    </main>
  );
}