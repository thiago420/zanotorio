import { useState } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  bitsAtivos,
  calcularSomatorio,
  calcularNpc,
  calcularNpi,
} from "../../util/utils";
import Input from "../../components/Input";
import Checkbox from "../../components/Checkbox";

const formulaSchema = z.object({
  np: z.coerce.number().min(1).max(7),
  resposta: z.coerce.number("Você precisa inserir um número").min(1, "Você precisa colocar um número\nmaior ou igual que 1").max(99, "Você precisa colocar um número menor ou igual que 99"),
  gabarito: z.coerce.number("Você precisa inserir um número").min(1, "Você precisa colocar um número maior ou igual que 1").max(99, "Você precisa colocar um número menor ou igual que 99"),
  pv: z.coerce.number().gt(0),
});

type FormulaSchema = z.infer<typeof formulaSchema>;

const Calculadora = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: zodResolver(formulaSchema),
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [numeroProposicoes, setNumeroProposicoes] = useState(1);

  const retornarDados = ({ np, resposta, gabarito, pv }: FormulaSchema) => {
    console.log(np, gabarito, resposta, pv)
    const ntpc = bitsAtivos(gabarito).length;
    const npc = calcularNpc(bitsAtivos(gabarito), bitsAtivos(resposta));
    const npi = calcularNpi(bitsAtivos(gabarito), bitsAtivos(resposta));

    console.log(calcularSomatorio(np, ntpc, npc, npi, pv));
  };

  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center">
        <form className="flex flex-col" onSubmit={handleSubmit(retornarDados)}>
          <label htmlFor="np">Número de Proposições</label>
          <select
            id="np"
            {...register('np')}
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
          <Input label="Resposta" style={{ width: 'min' }} type="number" id="resposta" error={errors.resposta?.message} {...register('resposta')} />

          {[...Array(numeroProposicoes)].map((_, i) => (
            <div key={`resposta${i}`} className="flex gap-2">
              <input type="checkbox" name={`resposta${i}`} id={`resposta${i}`} value={i} />
              <label htmlFor={`resposta${i}`}>{1 << i}</label>
            </div>
          ))}

          {/* <label htmlFor="gabarito">Gabarito</label> */}
          <Input label="Gabarito" type="number" id="gabarito" {...register('gabarito')} />

          {[...Array(numeroProposicoes)].map((_, i) => (
            <div key={`gabarito${i}`} className="flex gap-2">
              <input type="checkbox" name={`gabarito${i}`} id={`gabarito${i}`} value={i} />
              <label htmlFor={`gabarito${i}`}>{1 << i}</label>
            </div>
          ))}

          {/* <label htmlFor="pv">Valor da Questão</label> */}
          <Input label="Valor da Questão" type="number" id="pv" {...register('pv')} />

          <button type="submit">testar</button>
        </form>
      </div>
    </>
  );
};

export default Calculadora;
