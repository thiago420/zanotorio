import React, { useState } from "react";
import {
  bitsAtivos,
  calcularSomatorio,
  calcularNpc,
  calcularNpi,
} from "../../util/utils";
import Input from "../../components/Input";
import Checkbox from "../../components/Checkbox";

const Calculadora = () => {
  const [numeroProposicoes, setNumeroProposicoes] = useState(1);

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
        <form className="flex flex-col" onSubmit={retornarDados}>
          <label htmlFor="np">Número de Proposições</label>
          <select
            name="np"
            id="np"
            value={numeroProposicoes}
            onChange={(e) => setNumeroProposicoes(Number(e.target.value))}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
          </select>

          <Checkbox />

          {/* <label htmlFor="resposta">Resposta</label> */}
          <Input label="Resposta" type="number" id="resposta" name="resposta" />

          {[...Array(numeroProposicoes)].map((_, i) => (
            <div key={`resposta${i}`} className="flex gap-2">
              <input type="checkbox" name={`resposta${i}`} id={`resposta${i}`} value={i} />
              <label htmlFor={`resposta${i}`}>{1 << i}</label>
            </div>
          ))}

          {/* <label htmlFor="gabarito">Gabarito</label> */}
          <Input label="Gabarito" type="number" id="gabarito" name="gabarito" required />

          {[...Array(numeroProposicoes)].map((_, i) => (
            <div key={`gabarito${i}`} className="flex gap-2">
              <input type="checkbox" name={`gabarito${i}`} id={`gabarito${i}`} value={i} />
              <label htmlFor={`gabarito${i}`}>{1 << i}</label>
            </div>
          ))}

          {/* <label htmlFor="pv">Valor da Questão</label> */}
          <Input label="Valor da Questão" type="number" id="gabarito" name="pv" />

          <button type="submit">testar</button>
        </form>
      </div>
    </>
  );
};

export default Calculadora;
