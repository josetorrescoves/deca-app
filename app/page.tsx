"use client";
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto max-w-md">
        
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

          <div className="rounded-2xl bg-white p-5 shadow">
            <p className="font-semibold">
              Todavía no hay documentos
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Los DeCA que generes aparecerán aquí.
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}

