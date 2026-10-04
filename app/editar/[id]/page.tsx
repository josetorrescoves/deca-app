"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function EditarDeca({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [deca, setDeca] = useState<any>(null);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    const cargarDeca = async () => {
      const { id } = await params;

      const { data, error } = await supabase
        .from("decas")
        .select("*")
        .eq("numero_documento", id)
        .maybeSingle();

      if (error) {
        console.error("Error al cargar el DECA:", error);
      } else {
        setDeca(data);
      }

      setCargando(false);
    };

    cargarDeca();
  }, [params]);

  const guardarCambios = async () => {
    if (!deca) return;

    setGuardando(true);

    const { error } = await supabase
      .from("decas")
      .update({
        cargador_nombre: deca.cargador_nombre,
        cargador_nif: deca.cargador_nif,
        cargador_domicilio: deca.cargador_domicilio,
        transportista_nombre: deca.transportista_nombre,
        transportista_nif: deca.transportista_nif,
        fecha: deca.fecha,
        origen: deca.origen,
        destino: deca.destino,
        naturaleza_mercancia: deca.naturaleza_mercancia,
        peso: deca.peso,
        matricula_tractor: deca.matricula_tractor,
        matricula_remolque: deca.matricula_remolque,
        tiene_autorizacion_especial:
          Boolean(deca.tiene_autorizacion_especial),
        autorizacion_especial: deca.autorizacion_especial,
        observaciones: deca.observaciones,
      })
      .eq("numero_documento", deca.numero_documento);

    if (error) {
      console.error("Error al guardar los cambios:", error);
      alert("Ha ocurrido un error al guardar los cambios.");
      setGuardando(false);
      return;
    }

    alert("¡Cambios guardados correctamente!");

    window.location.href = `/deca/${deca.numero_documento}`;
  };

  if (cargando) {
    return (
      <main className="min-h-screen bg-gray-100 p-8">
        <p>Cargando DECA...</p>
      </main>
    );
  }

  if (!deca) {
    return (
      <main className="min-h-screen bg-gray-100 p-8">
        <p>No se ha encontrado el DECA.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8">
     <div className="mx-auto w-full max-w-3xl rounded-2xl bg-white p-4 shadow sm:p-8">
        <h1 className="mb-2 text-3xl font-bold">
          Editar DECA
        </h1>

        <p className="mb-8 text-gray-600">
          Nº de documento: {deca.numero_documento}
        </p>

        <div className="space-y-6">

          <div>
            <h2 className="mb-3 text-xl font-bold">
              Cargador contractual
            </h2>

            <input
              value={deca.cargador_nombre || ""}
              onChange={(e) =>
                setDeca({
                  ...deca,
                  cargador_nombre: e.target.value,
                })
              }
              placeholder="Razón social"
              className="mb-3 w-full rounded-lg border p-3 text-base"
            />

            <input
              value={deca.cargador_nif || ""}
              onChange={(e) =>
                setDeca({
                  ...deca,
                  cargador_nif: e.target.value,
                })
              }
              placeholder="NIF"
              className="mb-3 w-full rounded-lg border p-3"
            />

            <input
              value={deca.cargador_domicilio || ""}
              onChange={(e) =>
                setDeca({
                  ...deca,
                  cargador_domicilio: e.target.value,
                })
              }
              placeholder="Domicilio"
              className="w-full rounded-lg border p-3 text-base"
            />
          </div>

          <div>
            <h2 className="mb-3 text-xl font-bold">
              Transportista efectivo
            </h2>

            <input
              value={deca.transportista_nombre || ""}
              onChange={(e) =>
                setDeca({
                  ...deca,
                  transportista_nombre: e.target.value,
                })
              }
              placeholder="Razón social"
              className="mb-3 w-full rounded-lg border p-3 text-base"
            />

            <input
              value={deca.transportista_nif || ""}
              onChange={(e) =>
                setDeca({
                  ...deca,
                  transportista_nif: e.target.value,
                })
              }
              placeholder="NIF"
              className="w-full rounded-lg border p-3 text-base"
            />
          </div>

          <div>
            <h2 className="mb-3 text-xl font-bold">
              Transporte
            </h2>

            <input
              type="date"
              value={deca.fecha || ""}
              onChange={(e) =>
                setDeca({
                  ...deca,
                  fecha: e.target.value,
                })
              }
              className="mb-3 w-full rounded-lg border p-3 text-base"
            />

            <input
              value={deca.origen || ""}
              onChange={(e) =>
                setDeca({
                  ...deca,
                  origen: e.target.value,
                })
              }
              placeholder="Origen"
              className="mb-3 w-full rounded-lg border p-3 text-base"
            />

            <input
              value={deca.destino || ""}
              onChange={(e) =>
                setDeca({
                  ...deca,
                  destino: e.target.value,
                })
              }
              placeholder="Destino"
              className="w-full rounded-lg border p-3 text-base"
            />
          </div>

          <div>
            <h2 className="mb-3 text-xl font-bold">
              Mercancía
            </h2>

            <input
              value={deca.naturaleza_mercancia || ""}
              onChange={(e) =>
                setDeca({
                  ...deca,
                  naturaleza_mercancia: e.target.value,
                })
              }
              placeholder="Naturaleza de la mercancía"
              className="mb-3 w-full rounded-lg border p-3 text-base"
            />

            <input
              value={deca.peso || ""}
              onChange={(e) =>
                setDeca({
                  ...deca,
                  peso: e.target.value,
                })
              }
              placeholder="Peso"
              className="w-full rounded-lg border p-3 text-base"
            />
          </div>

          <div>
            <h2 className="mb-3 text-xl font-bold">
              Vehículo
            </h2>

            <input
              value={deca.matricula_tractor || ""}
              onChange={(e) =>
                setDeca({
                  ...deca,
                  matricula_tractor: e.target.value,
                })
              }
              placeholder="Matrícula tractor"
              className="mb-3 w-full rounded-lg border p-3 text-base"
            />

            <input
              value={deca.matricula_remolque || ""}
              onChange={(e) =>
                setDeca({
                  ...deca,
                  matricula_remolque: e.target.value,
                })
              }
              placeholder="Matrícula remolque"
              className="w-full rounded-lg border p-3 text-base"
            />
          </div>

          <div>
            <h2 className="mb-3 text-xl font-bold">
              Autorización especial
            </h2>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={Boolean(deca.tiene_autorizacion_especial)}
                onChange={(e) =>
                  setDeca({
                    ...deca,
                    tiene_autorizacion_especial: e.target.checked,
                  })
                }
              />

              <span>
                El transporte dispone de autorización especial
              </span>
            </label>

            {deca.tiene_autorizacion_especial && (
              <input
                value={deca.autorizacion_especial || ""}
                onChange={(e) =>
                  setDeca({
                    ...deca,
                    autorizacion_especial: e.target.value,
                  })
                }
                placeholder="Número o referencia"
                className="mt-3 w-full rounded-lg border p-3 text-base"
              />
            )}
          </div>

          <div>
            <h2 className="mb-3 text-xl font-bold">
              Observaciones
            </h2>

            <textarea
              value={deca.observaciones || ""}
              onChange={(e) =>
                setDeca({
                  ...deca,
                  observaciones: e.target.value,
                })
              }
              placeholder="Observaciones"
              rows={4}
              className="w-full rounded-lg border p-3 text-base"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                window.location.href = `/deca/${deca.numero_documento}`;
              }}
              className="rounded-lg border px-5 py-3 font-medium"
            >
              Cancelar
            </button>

            <button
              onClick={guardarCambios}
              disabled={guardando}
              className="rounded-lg bg-black px-5 py-3 font-medium text-white"
            >
              {guardando
                ? "Guardando..."
                : "Guardar cambios"}
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}