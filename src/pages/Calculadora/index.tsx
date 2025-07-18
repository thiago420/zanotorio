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
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/animate-ui/radix/toggle-group";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  // DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import confetti from "canvas-confetti";

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
  pv: z.coerce
    .number("Você precisa inserir um número")
    .gt(0, "Você precisa colocar um número maior que 0"),
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
      np: "",
    },
  });

  const [clicar, setClicar] = useState<string[]>([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [resultado, setResultado] = useState(0);

  const numeroProposicoes = Number(watch("np")) || 1;

  const calcular = ({ np, resposta, gabarito, pv }: FormulaSchema) => {
    const ntpc = bitsAtivos(gabarito).length;
    const npc = calcularNpc(bitsAtivos(gabarito), bitsAtivos(resposta));
    const npi = calcularNpi(bitsAtivos(gabarito), bitsAtivos(resposta));

    const resultadoSomatorio = calcularSomatorio(np, ntpc, npc, npi, pv);

    setResultado(resultadoSomatorio);

    setOpenDialog(true);

    if (resultadoSomatorio >= pv * 0.7) soltarConfetes();
  };

  const soltarConfetes = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
    };

    function fire(
      particleRatio: number,
      opts: {
        spread?: number;
        decay?: number;
        scalar?: number;
        startVelocity?: number;
      },
    ) {
      confetti({
        ...defaults,
        ...{
          ...opts,
          zIndex: 75,
          colors: ["#008235", "#00c950", "#ffffff"],
        },
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center">
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <form
            className="flex flex-col justify-center gap-3"
            onSubmit={handleSubmit(calcular)}
          >
            <ToggleGroup
              type="multiple"
              value={clicar}
              onValueChange={(value) => {
                if (value) setClicar(value);
              }}
            >
              <ToggleGroupItem value="clicar-resposta" variant="outline">
                Clicar Resposta
              </ToggleGroupItem>
              <ToggleGroupItem value="clicar-gabarito" variant="outline">
                Clicar Gabarito
              </ToggleGroupItem>
            </ToggleGroup>

            <label>Número de Proposições</label>
            <Controller
              {...register("np")}
              control={control}
              render={({ field }) => (
                <Select
                  value={String(field.value)}
                  onValueChange={field.onChange}
                >
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

            {clicar.includes("clicar-resposta") ? (
              <>
                <label>Resposta</label>
                <div className="flex flex-row gap-2">
                  {[...Array(numeroProposicoes)].map((_, i) => (
                    <div key={`resposta${i}`}>
                      <Checkbox
                        id={`resposta${i}`}
                        name={`resposta${i}`}
                        label={String(1 << i)}
                        value={i}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <Input
                id="resposta"
                type="number"
                label="Resposta"
                inputMode="numeric"
                style={{
                  width: "64px",
                  height: "48px",
                  fontSize: "1.8rem",
                  textAlign: "center",
                }}
                error={errors.resposta?.message}
                {...register("resposta")}
              />
            )}

            {/* <label htmlFor="gabarito">Gabarito</label> */}

            {clicar.includes("clicar-gabarito") ? (
              <>
                <label>Gabarito</label>
                <div className="flex flex-row gap-2">
                  {[...Array(numeroProposicoes)].map((_, i) => (
                    <div key={`gabarito${i}`}>
                      <Checkbox
                        id={`gabarito${i}`}
                        name={`gabarito${i}`}
                        label={String(1 << i)}
                        value={i}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <Input
                id="gabarito"
                type="number"
                label="Gabarito"
                inputMode="numeric"
                onInput={(e) => {
                  if (e.currentTarget.value.length > 2) {
                    e.currentTarget.value = e.currentTarget.value.slice(0, 2);
                  }
                }}
                style={{
                  width: "64px",
                  height: "48px",
                  fontSize: "1.8rem",
                  textAlign: "center",
                }}
                error={errors.gabarito?.message}
                {...register("gabarito")}
              />
            )}

            <Input
              id="pv"
              type="number"
              label="Valor da Questão"
              inputMode="numeric"
              onInput={(e) => {
                if (e.currentTarget.value.length > 2) {
                  e.currentTarget.style.width = `${64 + (e.currentTarget.value.length - 1) * 16}px`;
                } else {
                  e.currentTarget.style.width = "64px";
                }
              }}
              style={{
                width: "64px",
                height: "48px",
                fontSize: "1.8rem",
                textAlign: "center",
              }}
              error={errors.pv?.message}
              {...register("pv")}
            />

            <Button type="submit">Calcular</Button>

            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Resultado</DialogTitle>
                {/* <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </DialogDescription> */}
              </DialogHeader>
              <span>{resultado.toFixed(2)}</span>
              <DialogFooter>
                <DialogClose asChild>
                  <Button>Fechar</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </div>
    </>
  );
};

export default Calculadora;
