import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { imagen } = await request.json();

    if (!imagen) {
      return Response.json(
        { error: "No se ha recibido ninguna imagen." },
        { status: 400 }
      );
    }

    const respuesta = await openai.responses.create({
      model: "gpt-6-luna",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `
Lee esta imagen de un albarán o documento de transporte.

Extrae únicamente los datos que puedas identificar con claridad.
Presta especial atención a estos datos del documento:
- número de carga
- nombre, NIF y domicilio del cargador
- nombre y NIF del transportista
- fecha de carga
- origen y destino
- naturaleza de la mercancía
- peso de la mercancía
- matrícula del tractor o camión
- matrícula del remolque
- observaciones

Busca estos datos en todo el documento, aunque aparezcan en tablas, casillas o junto a otros datos.
Para la fecha, busca específicamente el campo "Fecha carga" y copia exactamente la fecha que aparezca en ese campo.

Para el peso, busca específicamente el campo "Peso mercancía" y copia exactamente ese valor.

Para las matrículas, busca específicamente los campos "Matrícula camión" y "Remolque". El valor de "Matrícula camión" corresponde a matricula_tractor y el valor de "Remolque" corresponde a matricula_remolque.

No confundas estos datos con otros números que aparezcan en el documento.

Devuelve un JSON con estos campos:

{
  "numero_carga": "",
  "cargador_nombre": "",
  "cargador_nif": "",
  "cargador_domicilio": "",
  "transportista_nombre": "",
  "transportista_nif": "",
  "fecha": "",
  "origen": "",
  "destino": "",
  "naturaleza_mercancia": "",
  "peso": "",
  "matricula_tractor": "",
  "matricula_remolque": "",
  "autorizacion_especial": "",
  "observaciones": ""
}

Si un dato no aparece o no se puede leer con seguridad, deja ese campo vacío.
No inventes datos.
Antes de devolver el JSON, revisa específicamente estos campos:
- Fecha carga
- Destino
- Matrícula camión
- Remolque

Si alguno de ellos aparece en el documento, copia exactamente el valor que aparece junto a su etiqueta.
Si no puedes identificarlo con seguridad, déjalo vacío.
No deduzcas ni calcules ningún valor.
              `,
            },
            {
              type: "input_image",
              image_url: imagen,
              detail: "low",
            },
          ],
        },
      ],
    });

    return Response.json({
      resultado: respuesta.output_text,
    });
  } catch (error) {
  console.error("ERROR REAL AL LEER EL ALBARÁN:", error);

  return Response.json(
    {
      error: String(error),
    },
    { status: 500 }
  );
}
}