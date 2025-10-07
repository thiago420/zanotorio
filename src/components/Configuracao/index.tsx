// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/animate-ui/radix/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/animate-ui/radix/tooltip";
import { Settings } from "../animate-ui/icons/settings";
import { AnimateIcon } from "../animate-ui/icons/icon";
import { useEffect, useState } from "react";
import configJSON from '@/configuration/config.json';

const ConfiguracaoMenu = () => {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const storageConfig = localStorage.getItem('configuration');
    // typeof JSON.parse(storageConfig) !== 'object'
    if (!storageConfig) {
      localStorage.setItem('configuration', JSON.stringify(configJSON.defaultConfiguration));
    }
  });

  return (
    <div className="fixed top-4 right-4">
      <Popover open={open} onOpenChange={setOpen}>
        <Tooltip delayDuration={1000}>
          <TooltipTrigger>
            <PopoverTrigger asChild>
              <Button
                className="cursor-pointer"
                variant="outline"
                size="icon"
                onClick={() => setOpen(true)}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                <AnimateIcon animate={hover} animation="default-loop">
                  <Settings />
                </AnimateIcon>
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          {!open && <TooltipContent align="end">Configuração</TooltipContent>}
        </Tooltip>
        <PopoverContent className="w-min" align="end" sideOffset={12}>
          <span>Teste</span>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ConfiguracaoMenu;
