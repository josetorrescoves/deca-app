"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function RestablecerContrasena() {
  const [password, setPassword] = useState("");
  const [confirmacion, setConfirmacion] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const cambiarContrasena = async (e: React.FormEvent) => {
    e.preventDefault();

    setMensaje("");
    setError("");

    if (password !== confirmacion) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setCargando(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      console.error("Error al cambiar la contraseña:", error);
      setError("No se ha podido cambiar la contraseña.");
      setCargando(false);
      return;
    }

    setMensaje("Contraseña cambiada correctamente.");
    setPassword("");
    setConfirmacion("");
    setCargando(false);
  };

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Nueva contraseña
        </h1>

        <p className="mb-6 text-gray-600">
          Introduce tu nueva contraseña.
        </p>

        <form onSubmit={cambiarContrasena} className="space-y-4">
          <div>
            <label className="mb-1 block font-medium text-gray-900">
              Nueva contraseña
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-900"
              required
            />
          </div>

          <div>
            <label className="mb-1 block font-medium text-gray-900">
              Repetir contraseña
            </label>

            <input
              type="password"
              value={confirmacion}
              onChange={(e) => setConfirmacion(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-900"
              required
            />
          </div>

          {error && (
            <p className="text-red-600">
              {error}
            </p>
          )}

          {mensaje && (
            <p className="text-green-600">
              {mensaje}
            </p>
          )}

          <button
            type="submit"
            disabled={cargando}
            className="w-full rounded-lg bg-black px-4 py-3 font-medium text-white"
          >
            {cargando ? "Guardando..." : "Cambiar contraseña"}
          </button>
        </form>
      </div>
    </main>
  );
}