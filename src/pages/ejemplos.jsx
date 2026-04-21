/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h } from "preact";
import Document from "../components/Document.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import SharedScripts from "../components/SharedScripts.jsx";

export default function Ejemplos() {
  return (
    <Document
      title="Ejemplos de reglas y sugerencias – Lenguaje Claro"
      description="Ejemplos prácticos de las reglas y sugerencias que aplica la extensión Lenguaje Claro para Google Docs."
      canonical="ejemplos.html"
    >
      <Header />

      <main>
        <section
          className="block wrap"
          style={{ paddingTop: 48, paddingBottom: 32 }}
        >
          <div className="block-header">
            <div className="kicker">
              <span className="num">Ejemplos</span>
            </div>
            <div>
              <h1 className="section-title" style={{ marginBottom: 0 }}>
                Ejemplos de reglas y sugerencias
              </h1>
              <p className="section-sub" style={{ marginTop: 18 }}>
                La extensión <b>Lenguaje Claro</b> detecta y sugiere mejoras
                sobre arcaísmos, tecnicismos, vaguedades, rodeos, voz pasiva,
                nominalizaciones y otros problemas comunes en la redacción
                jurídica.
              </p>
            </div>
          </div>
        </section>

        <div className="wrap priv-doc">
          <aside>
            <nav aria-label="Índice de ejemplos">
              <div className="sidebar-section">Reglas</div>
              <a href="#arcaismo">
                <span className="snum">01</span> Arcaísmo
              </a>
              <a href="#tecnicismo">
                <span className="snum">02</span> Tecnicismo
              </a>
              <a href="#vaguedad">
                <span className="snum">03</span> Vaguedad
              </a>
              <a href="#rodeo">
                <span className="snum">04</span> Rodeo
              </a>
              <a href="#vozpasiva">
                <span className="snum">05</span> Voz pasiva
              </a>
              <a href="#queismo">
                <span className="snum">06</span> Queísmo
              </a>
              <a href="#nominalizacion">
                <span className="snum">07</span> Nominalización
              </a>
              <a href="#numeros">
                <span className="snum">08</span> Números
              </a>
              <a href="#siglas">
                <span className="snum">09</span> Siglas
              </a>
            </nav>
          </aside>

          <article>
            <div className="examples-tables" style={{ paddingBottom: 48 }}>
              <section
                id="arcaismo"
                className="regla"
                style={{ borderColor: "#f1c40f" }}
              >
                <h2>Arcaísmo innecesario</h2>
                <p>Sustituye términos obsoletos por lenguaje actual</p>
                <div className="tabla-contenedor">
                  <table className="ejemplo-tabla">
                    <thead>
                      <tr>
                        <th>Texto detectado</th>
                        <th>Sugerencias</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>in fine</td>
                        <td>al final</td>
                      </tr>
                      <tr>
                        <td>a sensu contrario</td>
                        <td>en sentido contrario</td>
                      </tr>
                      <tr>
                        <td>viene en decidir</td>
                        <td>se decide</td>
                      </tr>
                      <tr>
                        <td>otrosí digo</td>
                        <td>además solicito</td>
                      </tr>
                      <tr>
                        <td>susodicho</td>
                        <td>mencionado</td>
                      </tr>
                      <tr>
                        <td>infraescrito</td>
                        <td>quien firma</td>
                      </tr>
                      <tr>
                        <td>fehaciente</td>
                        <td>comprobable</td>
                      </tr>
                      <tr>
                        <td>incoar</td>
                        <td>iniciar</td>
                      </tr>
                      <tr>
                        <td>adverar</td>
                        <td>acreditar</td>
                      </tr>
                      <tr>
                        <td>dirimir</td>
                        <td>resolver</td>
                      </tr>
                      <tr>
                        <td>decaer en su derecho</td>
                        <td>perder su derecho</td>
                      </tr>
                      <tr>
                        <td>sírvase proveer</td>
                        <td>disponga</td>
                      </tr>
                      <tr>
                        <td>tenor literal</td>
                        <td>texto literal</td>
                      </tr>
                      <tr>
                        <td>tengo el agrado de dirigirme</td>
                        <td>le escribo para</td>
                      </tr>
                      <tr>
                        <td>obra en mi poder</td>
                        <td>tengo</td>
                      </tr>
                      <tr>
                        <td rowSpan={2}>elevar una consulta</td>
                        <td>consultar</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>preguntar</td>
                      </tr>
                      <tr>
                        <td>in situ</td>
                        <td>en el lugar</td>
                      </tr>
                      <tr>
                        <td>in-situ</td>
                        <td>en el lugar</td>
                      </tr>
                      <tr>
                        <td rowSpan={2}>fágase</td>
                        <td>hágase</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>se aprueba</td>
                      </tr>
                      <tr>
                        <td rowSpan={3}>habida cuenta que</td>
                        <td>porque</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>ya que</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>dado que</td>
                      </tr>
                      <tr>
                        <td rowSpan={3}>habida cuenta de que</td>
                        <td>porque</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>ya que</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>dado que</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section
                id="tecnicismo"
                className="regla"
                style={{ borderColor: "#e67e22" }}
              >
                <h2>Tecnicismo</h2>
                <p>Reemplaza términos técnicos por lenguaje llano</p>
                <div className="tabla-contenedor">
                  <table className="ejemplo-tabla">
                    <thead>
                      <tr>
                        <th>Texto detectado</th>
                        <th>Sugerencias</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>prestatario</td>
                        <td>persona que recibe un préstamo</td>
                      </tr>
                      <tr>
                        <td>expiración</td>
                        <td>vencimiento</td>
                      </tr>
                      <tr>
                        <td rowSpan={2}>mora</td>
                        <td>retraso</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>aplazamiento</td>
                      </tr>
                      <tr>
                        <td rowSpan={2}>enajenar</td>
                        <td>vender</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>transmitir</td>
                      </tr>
                      <tr>
                        <td rowSpan={2}>enajenación</td>
                        <td>venta</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>transmisión</td>
                      </tr>
                      <tr>
                        <td>empero</td>
                        <td>sin embargo</td>
                      </tr>
                      <tr>
                        <td>dilación</td>
                        <td>demora</td>
                      </tr>
                      <tr>
                        <td>per cápita</td>
                        <td>por persona</td>
                      </tr>
                      <tr>
                        <td>cláusula penal</td>
                        <td>penalidad por incumplimiento</td>
                      </tr>
                      <tr>
                        <td rowSpan={2}>acreedor</td>
                        <td>quien presta el dinero</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>quien tiene el derecho a cobrar</td>
                      </tr>
                      <tr>
                        <td rowSpan={2}>deudor</td>
                        <td>quien debe el dinero</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>quien tiene la obligación de pagar</td>
                      </tr>
                      <tr>
                        <td rowSpan={2}>rescisión</td>
                        <td>cancelación</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>terminación</td>
                      </tr>
                      <tr>
                        <td rowSpan={2}>resolución</td>
                        <td>cancelación</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>terminación</td>
                      </tr>
                      <tr>
                        <td>suscribir</td>
                        <td>firmar</td>
                      </tr>
                      <tr>
                        <td>suscripto</td>
                        <td>firmado</td>
                      </tr>
                      <tr>
                        <td rowSpan={2}>fojas</td>
                        <td>páginas</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>hojas</td>
                      </tr>
                      <tr>
                        <td rowSpan={2}>notificar</td>
                        <td>avisar</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>comunicar</td>
                      </tr>
                      <tr>
                        <td rowSpan={2}>arbitrar los medios</td>
                        <td>hacer lo necesario</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>gestionar</td>
                      </tr>
                      <tr>
                        <td rowSpan={2}>erogación</td>
                        <td>gasto</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>pago</td>
                      </tr>
                      <tr>
                        <td rowSpan={2}>fehacientemente</td>
                        <td>de forma comprobable</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>formalmente</td>
                      </tr>
                      <tr>
                        <td>autógrafa</td>
                        <td>firma de puño y letra</td>
                      </tr>
                      <tr>
                        <td rowSpan={2}>estipulaciones</td>
                        <td>condiciones</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>términos</td>
                      </tr>
                      <tr>
                        <td rowSpan={2}>estipulación</td>
                        <td>condición</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>término</td>
                      </tr>
                      <tr>
                        <td rowSpan={2}>estipular</td>
                        <td>acordar</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>establecer</td>
                      </tr>
                      <tr>
                        <td rowSpan={2}>actor</td>
                        <td>quien demanda</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>la parte demandante</td>
                      </tr>
                      <tr>
                        <td rowSpan={2}>actora</td>
                        <td>quien demanda</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>la parte demandante</td>
                      </tr>
                      <tr>
                        <td rowSpan={2}>accionante</td>
                        <td>quien inició el juicio</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>quien demanda</td>
                      </tr>
                      <tr>
                        <td rowSpan={2}>juzgador</td>
                        <td>el juez</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>quien juzga</td>
                      </tr>
                      <tr>
                        <td rowSpan={2}>in limine</td>
                        <td>sin más trámite</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>de entrada</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section
                id="vaguedad"
                className="regla"
                style={{ borderColor: "#8e44ad" }}
              >
                <h2>Vaguedad</h2>
                <p>
                  Reemplaza expresiones vagas por información precisa y
                  verificable
                </p>
                <div className="tabla-contenedor">
                  <table className="ejemplo-tabla">
                    <thead>
                      <tr>
                        <th>Texto detectado</th>
                        <th>Sugerencias</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>mucho</td>
                        <td>Cifra o porcentaje (ej: 90%)</td>
                      </tr>
                      <tr>
                        <td>mucha</td>
                        <td>Cifra o porcentaje (ej: 90%)</td>
                      </tr>
                      <tr>
                        <td>muchos</td>
                        <td>Cifra o porcentaje (ej: 90%)</td>
                      </tr>
                      <tr>
                        <td>muchas</td>
                        <td>Cifra o porcentaje (ej: 90%)</td>
                      </tr>
                      <tr>
                        <td>maravilloso</td>
                        <td>Cifra o porcentaje de satisfacción (ej: 85%)</td>
                      </tr>
                      <tr>
                        <td>maravillosa</td>
                        <td>Cifra o porcentaje de satisfacción (ej: 85%)</td>
                      </tr>
                      <tr>
                        <td>en alguna medida</td>
                        <td>
                          Cifra de proporción numérica (ej: uno de cada tres)
                        </td>
                      </tr>
                      <tr>
                        <td>razonable</td>
                        <td>
                          Cifra que sustente la afirmación (ej: un computador
                          por cada tres estudiantes)
                        </td>
                      </tr>
                      <tr>
                        <td>suficiente</td>
                        <td>
                          Cifra que sustente la afirmación (ej: un computador
                          por cada tres estudiantes)
                        </td>
                      </tr>
                      <tr>
                        <td>suficientes</td>
                        <td>
                          Cifra que sustente la afirmación (ej: un computador
                          por cada tres estudiantes)
                        </td>
                      </tr>
                      <tr>
                        <td>considerable</td>
                        <td>
                          Cifra que sustente la afirmación (ej: un computador
                          por cada tres estudiantes)
                        </td>
                      </tr>
                      <tr>
                        <td>considerables</td>
                        <td>
                          Cifra que sustente la afirmación (ej: un computador
                          por cada tres estudiantes)
                        </td>
                      </tr>
                      <tr>
                        <td>oportuno</td>
                        <td>
                          Cifra que sustente la afirmación (ej: un computador
                          por cada tres estudiantes)
                        </td>
                      </tr>
                      <tr>
                        <td>oportuna</td>
                        <td>
                          Cifra que sustente la afirmación (ej: un computador
                          por cada tres estudiantes)
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section
                id="rodeo"
                className="regla"
                style={{ borderColor: "#8e44ad" }}
              >
                <h2>Rodeo innecesario</h2>
                <p>Sustituye frases extensas por alternativas concisas</p>
                <div className="tabla-contenedor">
                  <table className="ejemplo-tabla">
                    <thead>
                      <tr>
                        <th>Texto detectado</th>
                        <th>Sugerencias</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>en el momento actual</td>
                        <td>ahora</td>
                      </tr>
                      <tr>
                        <td>en vista de que</td>
                        <td>por</td>
                      </tr>
                      <tr>
                        <td>dado el hecho de que</td>
                        <td>porque</td>
                      </tr>
                      <tr>
                        <td>con motivo de</td>
                        <td>porque</td>
                      </tr>
                      <tr>
                        <td>como efecto de</td>
                        <td>porque</td>
                      </tr>
                      <tr>
                        <td>a fin de</td>
                        <td>para</td>
                      </tr>
                      <tr>
                        <td>con el objeto de</td>
                        <td>para</td>
                      </tr>
                      <tr>
                        <td>para el propósito de</td>
                        <td>para</td>
                      </tr>
                      <tr>
                        <td>con la finalidad de</td>
                        <td>para</td>
                      </tr>
                      <tr rowSpan={2}>
                        <td>en el entendido de</td>
                        <td>porque</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>ya que</td>
                      </tr>
                      <tr rowSpan={2}>
                        <td>toda vez que</td>
                        <td>porque</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>ya que</td>
                      </tr>
                      <tr>
                        <td>debido a que</td>
                        <td>porque</td>
                      </tr>
                      <tr rowSpan={2}>
                        <td>no obstante el hecho de que</td>
                        <td>aunque</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>a pesar de que</td>
                      </tr>
                      <tr rowSpan={2}>
                        <td>de conformidad con</td>
                        <td>según</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>bajo</td>
                      </tr>
                      <tr>
                        <td>a considerable distancia</td>
                        <td>lejos</td>
                      </tr>
                      <tr rowSpan={2}>
                        <td>en virtud de lo expuesto</td>
                        <td>por lo expuesto</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>por eso</td>
                      </tr>
                      <tr rowSpan={2}>
                        <td>en virtud de lo anteriormente expuesto</td>
                        <td>por lo expuesto</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>por eso</td>
                      </tr>
                      <tr>
                        <td>vengo por el presente a</td>
                        <td>por este escrito</td>
                      </tr>
                      <tr>
                        <td>por el presente</td>
                        <td>por este escrito</td>
                      </tr>
                      <tr rowSpan={2}>
                        <td>de fecha</td>
                        <td>del</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>fechado el</td>
                      </tr>
                      <tr rowSpan={2}>
                        <td>con posterioridad</td>
                        <td>después</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>luego</td>
                      </tr>
                      <tr>
                        <td>con anterioridad</td>
                        <td>antes</td>
                      </tr>
                      <tr rowSpan={2}>
                        <td>motivo por el cual</td>
                        <td>por eso</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>por lo que</td>
                      </tr>
                      <tr>
                        <td>en el día de la fecha</td>
                        <td>hoy</td>
                      </tr>
                      <tr rowSpan={2}>
                        <td>a la brevedad posible</td>
                        <td>pronto</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>cuanto antes</td>
                      </tr>
                      <tr rowSpan={2}>
                        <td>en el marco de</td>
                        <td>en</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>dentro de</td>
                      </tr>
                      <tr>
                        <td>a los efectos de</td>
                        <td>para</td>
                      </tr>
                      <tr>
                        <td>a efectos de</td>
                        <td>para</td>
                      </tr>
                      <tr rowSpan={2}>
                        <td>en razón de</td>
                        <td>por</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>debido a</td>
                      </tr>
                      <tr rowSpan={2}>
                        <td>en lo que respecta a</td>
                        <td>sobre</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>en cuanto a</td>
                      </tr>
                      <tr>
                        <td>a partir de este momento</td>
                        <td>desde ahora</td>
                      </tr>
                      <tr>
                        <td>sin que se tuviera en consideración</td>
                        <td>sin considerar</td>
                      </tr>
                      <tr>
                        <td>sin tener en consideración</td>
                        <td>sin considerar</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section
                id="vozpasiva"
                className="regla"
                style={{ borderColor: "#f1c40f" }}
              >
                <h2>Voz pasiva</h2>
                <p>
                  Reemplaza construcciones pasivas por voz activa más directa
                </p>
                <div className="tabla-contenedor">
                  <table className="ejemplo-tabla">
                    <thead>
                      <tr>
                        <th>Texto detectado</th>
                        <th>Sugerencias</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>La medida fue aprobada por el Senado</td>
                        <td>El Senado aprobó la medida</td>
                      </tr>
                      <tr>
                        <td>Fue interpuesto el recurso por la actora</td>
                        <td>La actora interpuso el recurso</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section
                id="queismo"
                className="regla"
                style={{ borderColor: "#f1c40f" }}
              >
                <h2>Queismo y dequeismo</h2>
                <p>
                  Detecta posible queismo y posible dequeismo con patrones
                  curados y contexto local
                </p>
                <div className="tabla-contenedor">
                  <table className="ejemplo-tabla">
                    <thead>
                      <tr>
                        <th>Texto detectado</th>
                        <th>Sugerencias</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>darse cuenta que</td>
                        <td>darse cuenta de que</td>
                      </tr>
                      <tr>
                        <td>alegrarse que</td>
                        <td>alegrarse de que</td>
                      </tr>
                      <tr>
                        <td>asegurarse que</td>
                        <td>asegurarse de que</td>
                      </tr>
                      <tr>
                        <td>convencerse que</td>
                        <td>convencerse de que</td>
                      </tr>
                      <tr>
                        <td>tener certeza que</td>
                        <td>tener certeza de que</td>
                      </tr>
                      <tr>
                        <td>haber posibilidad que</td>
                        <td>haber posibilidad de que</td>
                      </tr>
                      <tr>
                        <td>a pesar que</td>
                        <td>a pesar de que</td>
                      </tr>
                      <tr>
                        <td>olvidarse que</td>
                        <td>olvidarse de que</td>
                      </tr>
                      <tr>
                        <td>afirmar de que</td>
                        <td>afirmar que</td>
                      </tr>
                      <tr>
                        <td>decir de que</td>
                        <td>decir que</td>
                      </tr>
                      <tr>
                        <td>sostener de que</td>
                        <td>sostener que</td>
                      </tr>
                      <tr>
                        <td>alegar de que</td>
                        <td>alegar que</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section
                id="nominalizacion"
                className="regla"
                style={{ borderColor: "#16a085" }}
              >
                <h2>Nominalización</h2>
                <p>
                  Usa el verbo directamente en lugar de una construcción
                  sustantivada
                </p>
                <div className="tabla-contenedor">
                  <table className="ejemplo-tabla">
                    <thead>
                      <tr>
                        <th>Texto detectado</th>
                        <th>Sugerencias</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>poner en consideración</td>
                        <td>considerar</td>
                      </tr>
                      <tr>
                        <td rowSpan={2}>dar comienzo</td>
                        <td>comenzar</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>empezar</td>
                      </tr>
                      <tr>
                        <td>llegar a la conclusión</td>
                        <td>concluir</td>
                      </tr>
                      <tr>
                        <td rowSpan={3}>poner de manifiesto</td>
                        <td>manifestar</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>decir</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>exponer</td>
                      </tr>
                      <tr>
                        <td>mantuvieron una reunión</td>
                        <td>se reunieron</td>
                      </tr>
                      <tr>
                        <td>proceder a la entrega</td>
                        <td>entregar</td>
                      </tr>
                      <tr>
                        <td>realizar una inspección</td>
                        <td>inspeccionar</td>
                      </tr>
                      <tr>
                        <td>efectuar la presentación</td>
                        <td>presentar</td>
                      </tr>
                      <tr>
                        <td>proceder a la presentación</td>
                        <td>presentar</td>
                      </tr>
                      <tr>
                        <td>proceder a la interposición</td>
                        <td>interponer</td>
                      </tr>
                      <tr>
                        <td>interponer recurso de apelación</td>
                        <td>apelar</td>
                      </tr>
                      <tr>
                        <td rowSpan={2}>interponer recurso de queja</td>
                        <td>quejarse</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>impugnar</td>
                      </tr>
                      <tr>
                        <td>interponer recurso de casación</td>
                        <td>recurrir en casación</td>
                      </tr>
                      <tr>
                        <td>tener en consideración</td>
                        <td>considerar</td>
                      </tr>
                      <tr>
                        <td>tomar en consideración</td>
                        <td>considerar</td>
                      </tr>
                      <tr>
                        <td>hacer entrega</td>
                        <td>entregar</td>
                      </tr>
                      <tr>
                        <td rowSpan={2}>dar aviso</td>
                        <td>avisar</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>notificar</td>
                      </tr>
                      <tr>
                        <td rowSpan={2}>llevar a cabo</td>
                        <td>realizar</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>hacer</td>
                      </tr>
                      <tr>
                        <td rowSpan={2}>poner en conocimiento</td>
                        <td>informar</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>comunicar</td>
                      </tr>
                      <tr>
                        <td>dar cumplimiento</td>
                        <td>cumplir</td>
                      </tr>
                      <tr>
                        <td rowSpan={2}>proceder a efectuar</td>
                        <td>efectuar</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>hacer</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section
                id="numeros"
                className="regla"
                style={{ borderColor: "#2980b9" }}
              >
                <h2>Números</h2>
                <p>
                  Sugiere reemplazar números escritos con palabras por dígitos,
                  y números romanos por arábigos
                </p>
                <div className="tabla-contenedor">
                  <table className="ejemplo-tabla">
                    <thead>
                      <tr>
                        <th>Texto detectado</th>
                        <th>Sugerencias</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td rowSpan={2}>treinta y dos</td>
                        <td>32</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>treinta y dos (32)</td>
                      </tr>
                      <tr>
                        <td rowSpan={2}>ciento veinte</td>
                        <td>120</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>ciento veinte (120)</td>
                      </tr>
                      <tr>
                        <td rowSpan={2}>dos millones</td>
                        <td>2000000</td>
                      </tr>
                      <tr className="sugerencia-subfila">
                        <td>dos millones (2000000)</td>
                      </tr>
                      <tr>
                        <td>IV</td>
                        <td>4</td>
                      </tr>
                      <tr>
                        <td>XXI</td>
                        <td>21</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section
                id="siglas"
                className="regla"
                style={{ borderColor: "#8e44ad" }}
              >
                <h2>Siglas sin puntos</h2>
                <p>
                  Detecta siglas escritas con puntos y sugiere la forma correcta
                  (sin puntos).
                </p>
                <div className="tabla-contenedor">
                  <table className="ejemplo-tabla">
                    <thead>
                      <tr>
                        <th>Texto detectado</th>
                        <th>Sugerencias</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>U.N.E.S.C.O</td>
                        <td>UNESCO</td>
                      </tr>
                      <tr>
                        <td>O.N.U</td>
                        <td>ONU</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </article>
        </div>
      </main>

      <Footer />
      <SharedScripts />
    </Document>
  );
}
