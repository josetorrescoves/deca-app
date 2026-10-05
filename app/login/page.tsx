"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const iniciarSesion = async (e: React.FormEvent) => {
    e.preventDefault();

    setCargando(true);
    setError("");
    setMensaje("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error al iniciar sesión:", error);
      setError("Correo o contraseña incorrectos.");
      setCargando(false);
      return;
    }

    window.location.href = "/crear";
  };

  const recuperarContrasena = async () => {
    setError("");
    setMensaje("");

    if (!email) {
      setError("Escribe primero tu correo electrónico.");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo:
        "https://deca-app-939p-fuxtb1wt6-deca-app.vercel.app/restablecer-contrasena",
    });

    if (error) {
      console.error("Error al enviar recuperación:", error);
      setError("No se ha podido enviar el correo de recuperación.");
      return;
    }

    setMensaje(
      "Te hemos enviado un correo para restablecer la contraseña."
    );
  };

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">
          Acceso a DECA
        </h1>

        <form onSubmit={iniciarSesion} className="space-y-4">
          <div>
            <label className="mb-1 block font-medium text-gray-900">
              Correo electrónico
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-900"
              required
            />
          </div>

          <div>
            <label className="mb-1 block font-medium text-gray-900">
              Contraseña
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            {cargando ? "Entrando..." : "Iniciar sesión"}
          </button>
        </form>

        <button
          type="button"
          onClick={recuperarContrasena}
          className="mt-4 w-full text-sm font-medium text-blue-600"
        >
          ¿Has olvidado tu contraseña?
        </button>
      </div>
    </main>
  );
}