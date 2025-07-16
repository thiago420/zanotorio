
/**
 * Retorna os bits ativos de um número.
 * @param num O número a ser analisado.
 * @returns Um array com os bits ativos.
 */

export const bitsAtivos = (num: number): number[] => {
  const bits = [];
  for (let i = 0; (1 << i) <= num; i++) {
    if (num & (1 << i)) {
      bits.push(1 << i);
    }
  }
  return bits;
};

/**
 * Calcula o número de proposições corretas consideradas corretas pelo candidato.
 * @param gabarito Array das proposições cosideradas corretas pelo canidato.
 * @param resposta Array das proposições corretas.
 * @returns Retorna o NPC
 */

export const calcularNpc = (gabarito: number[], resposta: number[]): number => {
  return resposta.map((bit: number) => { if (gabarito.includes(bit)) return bit }).filter(Boolean).length;
}

/**
 * Calcula o número de proposições incorretas consideradas corretas pelo candidato.
 * @param gabarito Array das proposições cosideradas corretas pelo canidato.
 * @param resposta Array das proposições corretas.
 * @returns Retorna o NPI
 */

export const calcularNpi = (gabarito: number[], resposta: number[]): number => {
  return resposta.map((bit: number) => { if (!gabarito.includes(bit)) return bit }).filter(Boolean).length;
}

/**
 * Calcula uma questão somatória e retorna a pontuação do candidato na questão.
 * @param np Número de proposições da questão.
 * @param ntpc Número total de proposições corretas.
 * @param npc Número de proposições corretas consideradas corretas pelo candidato.
 * @param npi Número de proposições incorretas consideradas corretas pelo candidato.
 * @param pv Valor da total da questão, Opcional, padrão é 1.
 * @returns A pontuação do candidato na questão.
 */

export const calcularSomatorio = (np: number, ntpc: number, npc: number, npi: number, pv: number = 1): number => {
  return npc > npi ? ((np - (ntpc - (npc - npi))) / np) * pv : 0;
};
