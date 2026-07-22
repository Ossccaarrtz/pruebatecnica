# Prueba técnica — Del dato a la decisión

## Contexto

El responsable de mantenimiento de una empresa industrial recibe cada mes un
listado de movimientos contables. El archivo contiene compras de refacciones,
servicios, consumibles y equipo de seguridad, pero verlo como una tabla extensa no
le permite responder rápidamente dónde se está gastando más ni qué merece atención.

Este repositorio contiene una página inicial en **HTML, CSS y JavaScript**, junto
con datos ficticios inspirados en la estructura de un sistema de análisis de
frecuencia y gasto.

Tu objetivo es transformar esos datos en una página que ayude a una persona a tomar
decisiones. No buscamos una cantidad específica de gráficas: queremos ver cómo
analizas la información y eliges la forma más efectiva de comunicarla.

## Tiempo

Dispones de **60 minutos**. Al concluir, conserva el último estado funcional y
documenta cualquier pendiente en `SOLUTION.md`.

## Audiencia

Diseña para un responsable de mantenimiento que quiere entender:

- cómo se comporta el gasto a lo largo del tiempo;
- qué planta, categoría o equipo concentra el gasto;
- si existe algún movimiento o cambio que merezca investigación.

No es necesario responder cada pregunta con una visualización distinta. Prioriza
las que consideres más importantes.

## Datos disponibles

El repositorio incluye dos representaciones del mismo conjunto ficticio:

- `data/movements.sql`: tabla e inserts SQL para inspeccionar el origen;
- `data/movements.js`: resultado equivalente listo para utilizarse en el navegador
  mediante `window.MOVEMENTS`.

Cada movimiento contiene:

| Campo | Significado |
|---|---|
| `movement_date` | Fecha del movimiento |
| `plant` | Planta que originó el gasto |
| `account_name` | Categoría contable |
| `article_name` | Artículo o servicio |
| `equipment_name` | Equipo relacionado, cuando existe |
| `supplier_name` | Proveedor |
| `quantity` | Cantidad |
| `unit_price` | Precio unitario |
| `amount` | Importe del movimiento |
| `is_cancellation` | Indica si el movimiento es una cancelación |

Todos los nombres, códigos e importes fueron inventados para esta prueba. No
representan empresas, proveedores ni transacciones reales.

## Tu tarea

Modifica libremente `index.html`, `styles.css` y `app.js` para construir una
experiencia de análisis útil.

La solución debe:

1. mostrar al menos un resumen numérico relevante;
2. comunicar la evolución del gasto en el tiempo;
3. permitir comparar el gasto por al menos una dimensión —planta, categoría o
   equipo—;
4. incluir al menos una interacción útil, como un filtro, selector, ordenamiento o
   acceso al detalle;
5. destacar por escrito un hallazgo derivado de los datos;
6. funcionar correctamente en una laptop y seguir siendo legible en una pantalla
   angosta.

Tú decides qué indicadores, gráficas, tablas y jerarquía visual utilizar. También
debes decidir cómo tratar las cancelaciones y explicar la decisión en
`SOLUTION.md`.

## Reglas

- Trabaja con el HTML, CSS y JavaScript incluidos.
- Puedes utilizar Chart.js, ya referenciado en `index.html`, o construir las
  visualizaciones con HTML, CSS, Canvas o SVG.
- Puedes consultar documentación y utilizar tus herramientas habituales.
- Puedes usar asistencia de IA si puedes explicar y modificar el resultado durante
  la entrevista.
- No agregues backend, framework frontend, autenticación ni base de datos.
- No modifiques los valores de `data/movements.sql` o `data/movements.js`.
- Puedes limpiar, filtrar, agrupar y derivar métricas desde JavaScript.
- No es necesario escribir SQL nuevo ni pruebas automatizadas.
- No se evalúa la cantidad de gráficas, la cantidad de commits ni una librería
  específica.

## Entrega

Además de la página, completa `SOLUTION.md` con respuestas breves:

1. ¿Qué necesidad del usuario priorizaste?
2. ¿Cuál es el hallazgo principal de los datos?
3. ¿Cómo trataste las cancelaciones y por qué?
4. ¿Qué mejorarías con más tiempo?

Si algo queda incompleto, indícalo. Una solución pequeña con una historia clara es
preferible a un dashboard saturado.

## Cómo ejecutar

Desde la raíz del repositorio:

```bash
python3 -m http.server 8000
```

Abre `http://localhost:8000`. También puedes utilizar cualquier servidor estático
equivalente.
