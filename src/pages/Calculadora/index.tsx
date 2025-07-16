import React from "react";
import { bitsAtivos, calcularSomatorio, calcularNpc, calcularNpi } from "../../util/utils";

const Calculadora = () => {
  const retornarDados = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const resposta = Number(formData.get("resposta"));
    const gabarito = Number(formData.get("gabarito"));

    const np = Number(formData.get("np"));
    const ntpc = bitsAtivos(gabarito).length;
    const npc = calcularNpc(bitsAtivos(gabarito), bitsAtivos(resposta));
    const npi = calcularNpi(bitsAtivos(gabarito), bitsAtivos(resposta));
    const pv = Number(formData.get("pv")) || 1;

    console.log(calcularSomatorio(np, ntpc, npc, npi, pv));
  };

  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center">
        <form onSubmit={retornarDados}>
          <label htmlFor="np">Número de Proposições</label>
          <select name="np" id="np">
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
          </select>

          <label htmlFor="resposta">Resposta</label>
          <input type="number" id="resposta" name="resposta" />

          <label htmlFor="gabarito">Gabarito</label>
          <input type="number" id="gabarito" name="gabarito" />

          <label htmlFor="pv">Valor da Questão</label>
          <input type="number" id="gabarito" name="pv" />

          <button type="submit">testar</button>
        </form>
      </div>
    </>
  )
}

export default Calculadora;
