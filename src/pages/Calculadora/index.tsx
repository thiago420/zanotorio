import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  bitsAtivos,
  calcularSomatorio,
  calcularNpc,
  calcularNpi,
} from "../../util/utils";
import Checkbox from "../../components/Checkbox";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const formulaSchema = z.object({
  np: z.coerce.number().min(1).max(7),
  resposta: z.coerce
    .number("Você precisa inserir um número")
    .min(1, "Você precisa colocar um número\nmaior ou igual que 1")
    .max(99, "Você precisa colocar um número menor ou igual que 99"),
  gabarito: z.coerce
    .number("Você precisa inserir um número")
    .min(1, "Você precisa colocar um número maior ou igual que 1")
    .max(99, "Você precisa colocar um número menor ou igual que 99"),
  pv: z.coerce.number().gt(0),
});

type FormulaSchema = z.infer<typeof formulaSchema>;

const Calculadora = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: zodResolver(formulaSchema),
    defaultValues: {
      np: ''
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const numeroProposicoes = Number(watch('np')) || 1;

  const retornarDados = ({ np, resposta, gabarito, pv }: FormulaSchema) => {
    console.log(np, gabarito, resposta, pv);
    const ntpc = bitsAtivos(gabarito).length;
    const npc = calcularNpc(bitsAtivos(gabarito), bitsAtivos(resposta));
    const npi = calcularNpi(bitsAtivos(gabarito), bitsAtivos(resposta));

    console.log(calcularSomatorio(np, ntpc, npc, npi, pv));
  };

  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center">
        <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit(retornarDados)}>
          <ToggleGroup variant="outline" type="multiple">
            <ToggleGroupItem value="bold" aria-label="Toggle bold">
              A
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic">
              B
            </ToggleGroupItem>
            <ToggleGroupItem
              value="strikethrough"
              aria-label="Toggle strikethrough"
            >
              C
            </ToggleGroupItem>
          </ToggleGroup>

          <label>Número de Proposições</label>
          <Controller
            {...register("np")}
            control={control}
            render={({ field }) => (
              <Select value={String(field.value)} onValueChange={field.onChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="1">1 proposição (1)</SelectItem>
                    <SelectItem value="2">2 proposições (2)</SelectItem>
                    <SelectItem value="3">3 proposições (4)</SelectItem>
                    <SelectItem value="4">4 proposições (8)</SelectItem>
                    <SelectItem value="5">5 proposições (16)</SelectItem>
                    <SelectItem value="6">6 proposições (32)</SelectItem>
                    <SelectItem value="7">7 proposições (64)</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          {/* <label htmlFor="resposta">Resposta</label> */}
          <Input
            label="Resposta"
            style={{
              width: '64px',
              height: '48px',
              fontSize: '1.8rem',
              textAlign: 'center',
            }}
            type="number"
            id="resposta"
            error={errors.resposta?.message}
            {...register("resposta")}
          />
          {/* <Input
            label="Resposta"
            style={{ width: "min" }}
            type="number"
            id="resposta"
            error={errors.resposta?.message}
            {...register("resposta")}
          /> */}

          {[...Array(numeroProposicoes)].map((_, i) => (
            <div key={`resposta${i}`}>
              <Checkbox id={`resposta${i}`} name={`resposta${i}`} label={String(1 << i)} value={i} />
            </div>
          ))}

          {/* <label htmlFor="gabarito">Gabarito</label> */}
          <Input
            label="Gabarito"
            style={{
              width: '64px',
              height: '48px',
              fontSize: '1.8rem',
              textAlign: 'center',
            }}
            type="number"
            id="gabarito"
            {...register("gabarito")}
          />

          {[...Array(numeroProposicoes)].map((_, i) => (
            <div key={`gabarito${i}`}>
              <Checkbox id={`gabarito${i}`} name={`gabarito${i}`} label={String(1 << i)} value={i} />
            </div>
          ))}

          {/* <label htmlFor="pv">Valor da Questão</label> */}
          <Input
            label="Valor da Questão"
            style={{
              width: '64px',
              height: '48px',
              fontSize: '1.8rem',
              textAlign: 'center',
            }}
            type="number"
            id="pv"
            {...register("pv")}
          />

          <Button type="submit">Calcular</Button>
        </form>
      </div>
    </>
  );
};

export default Calculadora;
