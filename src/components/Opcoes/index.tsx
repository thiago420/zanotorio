import { useState, type FC, type HTMLAttributes } from 'react';

interface MeuComponenteProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

const Opcoes: FC<MeuComponenteProps> = ({ value: initialValue, ...props }) => {
  const [value, setValue] = useState<string>(initialValue);

  const alterarValor = () => {
    setValue('Novo valor!');
  };

  return (
    <div {...props} data-value={value}>
      <p>Valor: {value}</p>
      <button onClick={alterarValor}>Mudar valor</button>
    </div>
  );
};

export default Opcoes;
