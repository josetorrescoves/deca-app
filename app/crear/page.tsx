"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function CrearDeca() {
  const [formulario, setFormulario] = useState({
    // Cargador contractual
    cargadorNombre: "",
    cargadorNif: "",
    cargadorDomicilio: "",

    // Transportista efectivo
    transportistaNombre: "",
    transportistaNif: "",

    // Transporte
    fecha: "",
    origen: "",
    destino: "",

    // Mercancía
    naturalezaMercancia: "",
    peso: "",

    // Vehículo
    matriculaTractor: "",
    matriculaRemolque: "",

    // Autorización especial
    tieneAutorizacionEspecial: false,
    autorizacionEspecial: "",

    // Observaciones
    observaciones: "",
  });
  useEffect(() => {
  const datosGuardados = sessionStorage.getItem("datosAlbaran");

  if (!datosGuardados) return;

  try {
    const jsonLimpio = datosGuardados
      .replace(/```json\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();

    const datos = JSON.parse(jsonLimpio);

    setFormulario((anterior) => ({
      ...anterior,
      cargadorNombre: datos.cargador_nombre || "",
      cargadorNif: datos.cargador_nif || "",
      cargadorDomicilio: datos.cargador_domicilio || "",
      transportistaNombre: datos.transportista_nombre || "",
      transportistaNif: datos.transportista_nif || "",
      fecha: datos.fecha
  ? datos.fecha.split("/").reverse().join("-")
  : "",
      origen: datos.origen || "",
      destino: datos.destino || "",
      naturalezaMercancia: datos.naturaleza_mercancia || "",
      peso: datos.peso || "",
      matriculaTractor: datos.matricula_tractor || "",
      matriculaRemolque: datos.matricula_remolque || "",
      autorizacionEspecial: datos.autorizacion_especial || "",
      observaciones: datos.observaciones || "",
    }));

    sessionStorage.removeItem("datosAlbaran");
  } catch (error) {
    console.error("Error al cargar los datos del albarán:", error);
  }
}, []);

  const actualizarCampo = (
    campo: string,
    valor: string | boolean
  ) => {
    setFormulario({
      ...formulario,
      [campo]: valor,
    });
  };

  const generarDeca = async (e: React.FormEvent) => {
    const { data: authData } = await supabase.auth.getSession();
console.log("SESION SUPABASE:", authData.session);
  e.preventDefault();
  const { data: usuarioData } = await supabase.auth.getUser();

if (!usuarioData.user) {
  alert("Debes iniciar sesión para crear un DeCA.");
  return;
}

const usuarioId = usuarioData.user.id;
console.log("USUARIO LOGUEADO:", usuarioData.user);
console.log("USUARIO ID:", usuarioId);



  const numeroDocumento = "DECA-" + Date.now();

const { error } = await supabase
  .from("decas")
  .insert({
    numero_documento: numeroDocumento,
    usuario_id: usuarioId,
    cargador_nombre: formulario.cargadorNombre,
    cargador_nif: formulario.cargadorNif,
    cargador_domicilio: formulario.cargadorDomicilio,
    transportista_nombre: formulario.transportistaNombre,
    transportista_nif: formulario.transportistaNif,
    fecha: formulario.fecha,
    origen: formulario.origen,
    destino: formulario.destino,
    naturaleza_mercancia: formulario.naturalezaMercancia,
    peso: formulario.peso,
    matricula_tractor: formulario.matriculaTractor,
    matricula_remolque: formulario.matriculaRemolque,
    tiene_autorizacion_especial: Boolean(
      formulario.tieneAutorizacionEspecial
    ),
    autorizacion_especial: formulario.autorizacionEspecial,
    observaciones: formulario.observaciones,
  });

if (error) {
  console.error("Error al guardar el DeCA:", error);
  alert("Ha ocurrido un error al guardar el DeCA.");
  return;
}

alert("¡DeCA guardado correctamente!");

window.location.href = `/deca/${numeroDocumento}`;
};

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4 text-blue-900">
  <p className="font-semibold">
    🤖 Datos obtenidos del albarán
  </p>
  <p className="mt-1 text-sm">
    Revisa la información antes de generar el DECA. Puedes corregir cualquier dato que no sea correcto.
  </p>
</div>

        {/* CABECERA */}

        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Nuevo DeCA
          </h1>

          <p className="mt-2 text-black">
            Documento de Control Administrativo
          </p>
        </header>


        <form
  onSubmit={generarDeca}
  className="space-y-6 text-black [&_input]:text-black [&_textarea]:text-black [&_input::placeholder]:text-black [&_textarea::placeholder]:text-black"
>

          {/* CARGADOR CONTRACTUAL */}

          <section className="rounded-2xl bg-white p-4 shadow sm:p-6">
            <h2 className="mb-5 text-xl font-bold text-gray-900">
              1. Cargador contractual
            </h2>

            <div className="space-y-4">

              <div>
                <label className="mb-2 block font-semibold">
                  Razón social
                </label>

                <input
                  type="text"
                  value={formulario.cargadorNombre}
                  onChange={(e) =>
                    actualizarCampo(
                      "cargadorNombre",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-300 p-3 text-base text-gray-900"
                  placeholder="Nombre o razón social"
                  required
                />
              </div>


              <div>
                <label className="mb-2 block font-semibold">
                  NIF
                </label>

                <input
                  type="text"
                  value={formulario.cargadorNif}
                  onChange={(e) =>
                    actualizarCampo(
                      "cargadorNif",
                      e.target.value.toUpperCase()
                    )
                  }
                  className="w-full rounded-xl border border-gray-300 p-3 text-base text-gray-900"
                  placeholder="Ej. B12345678"
                  required
                />
              </div>uppercase"


              <div>
                <label className="mb-2 block font-semibold">
                  Domicilio
                </label>

                <input
                  type="text"
                  value={formulario.cargadorDomicilio}
                  onChange={(e) =>
                    actualizarCampo(
                      "cargadorDomicilio",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-300 p-3 text-base text-gray-900"
                  placeholder="Dirección completa"
                  required
                />
              </div>

            </div>
          </section>


          {/* TRANSPORTISTA */}

          <section className="rounded-2xl bg-white p-4 shadow sm:p-6">
            <h2 className="mb-5 text-xl font-bold text-gray-900">
              2. Transportista efectivo
            </h2>

            <div className="space-y-4">

              <div>
                <label className="mb-2 block font-semibold">
                  Razón social
                </label>

                <input
                  type="text"
                  value={formulario.transportistaNombre}
                  onChange={(e) =>
                    actualizarCampo(
                      "transportistaNombre",
                      e.target.value
                    )
                  }
                 className="w-full rounded-xl border border-gray-300 p-3 text-base text-gray-900"
                  placeholder="Nombre o razón social"
                  required
                />
              </div>


              <div>
                <label className="mb-2 block font-semibold">
                  NIF
                </label>

                <input
                  type="text"
                  value={formulario.transportistaNif}
                  onChange={(e) =>
                    actualizarCampo(
                      "transportistaNif",
                      e.target.value.toUpperCase()
                    )
                  }
                 className="w-full rounded-xl border border-gray-300 p-3 text-base text-gray-900"
                  placeholder="Ej. B12345678"
                  required
                />
              </div>

            </div>
          </section>


          {/* TRANSPORTE */}

          <section className="rounded-2xl bg-white p-4 shadow sm:p-6">
            <h2 className="mb-5 text-xl font-bold text-gray-900">
              3. Datos del transporte
            </h2>

            <div className="space-y-4">

              <div>
                <label className="mb-2 block font-semibold">
                  Fecha del transporte
                </label>

                <input
                  type="date"
                  value={formulario.fecha}
                  onChange={(e) =>
                    actualizarCampo(
                      "fecha",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-300 p-3 text-base text-gray-900"
                  required
                />
              </div>


              <div>
                <label className="mb-2 block font-semibold">
                  Lugar de origen
                </label>

                <input
                  type="text"
                  value={formulario.origen}
                  onChange={(e) =>
                    actualizarCampo(
                      "origen",
                      e.target.value
                    )
                  }
                 className="w-full rounded-xl border border-gray-300 p-3 text-base text-gray-900"
                  placeholder="Lugar de origen"
                  required
                />
              </div>


              <div>
                <label className="mb-2 block font-semibold">
                  Lugar de destino
                </label>

                <input
                  type="text"
                  value={formulario.destino}
                  onChange={(e) =>
                    actualizarCampo(
                      "destino",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-300 p-3 text-base text-gray-900"
                  placeholder="Lugar de destino"
                  required
                />
              </div>

            </div>
          </section>


          {/* MERCANCÍA */}

          <section className="rounded-2xl bg-white p-4 shadow sm:p-6">
            <h2 className="mb-5 text-xl font-bold text-gray-900">
              4. Mercancía
            </h2>

            <div className="space-y-4">

              <div>
                <label className="mb-2 block font-semibold">
                  Naturaleza de la mercancía
                </label>

                <textarea
                  value={formulario.naturalezaMercancia}
                  onChange={(e) =>
                    actualizarCampo(
                      "naturalezaMercancia",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-300 p-3 text-base"
                  placeholder="Describe la mercancía"
                  rows={3}
                  required
                />
              </div>


              <div>
                <label className="mb-2 block font-semibold">
                  Peso / magnitud
                </label>

                <input
                  type="text"
                  value={formulario.peso}
                  onChange={(e) =>
                    actualizarCampo(
                      "peso",
                      e.target.value
                    )
                  }
                 className="w-full rounded-xl border border-gray-300 p-3 text-base text-gray-900"
                  placeholder="Ej. 18.500 kg"
                  required
                />
              </div>

            </div>
          </section>


          {/* VEHÍCULO */}

          <section className="rounded-2xl bg-white p-4 shadow sm:p-6">
            <h2 className="mb-5 text-xl font-bold text-gray-900">
              5. Vehículo
            </h2>

            <div className="space-y-4">

              <div>
                <label className="mb-2 block font-semibold">
                  Matrícula del tractor
                </label>

                <input
                  type="text"
                  value={formulario.matriculaTractor}
                  onChange={(e) =>
                    actualizarCampo(
                      "matriculaTractor",
                      e.target.value.toUpperCase()
                    )
                  }
                 className="w-full rounded-xl border border-gray-300 p-3 text-base text-gray-900"
                  placeholder="Ej. 1234 ABC"
                  required
                />
              </div>


              <div>
                <label className="mb-2 block font-semibold">
                  Matrícula del remolque / semirremolque
                </label>

                <input
                  type="text"
                  value={formulario.matriculaRemolque}
                  onChange={(e) =>
                    actualizarCampo(
                      "matriculaRemolque",
                      e.target.value.toUpperCase()
                    )
                  }
                  className="w-full rounded-xl border border-gray-300 p-3 text-base text-gray-900"
                  placeholder="Si corresponde"
                />
              </div>

            </div>
          </section>


          {/* AUTORIZACIÓN ESPECIAL */}

          <section className="rounded-2xl bg-white p-4 shadow sm:p-6">

            <h2 className="mb-5 text-xl font-bold text-gray-900">
              6. Autorización especial de circulación
            </h2>

            <label className="flex cursor-pointer items-center gap-3">
  <input
    type="checkbox"
    checked={formulario.tieneAutorizacionEspecial}
    onChange={(e) =>
      actualizarCampo(
        "tieneAutorizacionEspecial",
        e.target.checked
      )
    }
    className="h-5 w-5"
  />

  <span>
    El transporte dispone de autorización especial
  </span>
</label>


            {formulario.tieneAutorizacionEspecial && (
              <div className="mt-4">

                <label className="mb-2 block font-semibold">
                  Datos de la autorización
                </label>

                <input
                  type="text"
                  value={formulario.autorizacionEspecial}
                  onChange={(e) =>
                    actualizarCampo(
                      "autorizacionEspecial",
                      e.target.value
                    )
                  }
                 className="w-full rounded-xl border border-gray-300 p-3 text-base text-gray-900"
                  placeholder="Número o referencia"
                />

              </div>
            )}

          </section>


          {/* OBSERVACIONES */}

          <section className="rounded-2xl bg-white p-4 shadow sm:p-6">

            <h2 className="mb-5 text-xl font-bold text-gray-900">
              7. Observaciones
            </h2>

            <textarea
              value={formulario.observaciones}
              onChange={(e) =>
                actualizarCampo(
                  "observaciones",
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-gray-300 p-3 text-base"
              placeholder="Observaciones, reservas u otras indicaciones"
              rows={4}
            />

          </section>


          {/* BOTÓN */}

          <button
            type="submit"
            className="w-full rounded-2xl bg-blue-600 p-4 text-lg font-bold text-white shadow-lg hover:bg-blue-700 sm:p-5 sm:text-xl"
          >
            Generar DeCA
          </button>

        </form>

      </div>
    </main>
  );
}


