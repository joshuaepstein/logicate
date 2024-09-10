import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@logicate/ui/not-done-yet/accordion';
import { DraggableItem } from './draggable-item';
import { GateType } from './node/gates/types';
import { InputType } from './node/inputs';

export default function Sidebar() {
  return (
    <aside className="border-neutralgrey-400 h-full w-0 border-r transition-all duration-300 md:w-[35%] lg:w-[25%] xl:w-[15%]">
      <Accordion type="multiple">
        <AccordionItem value="inputs">
          <AccordionTrigger>Inputs</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap items-start justify-between gap-5 p-4">
              {Object.values(InputType).map((type) => (
                <DraggableItem key={type} type={{ type: 'input', node: type }} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="gates">
          <AccordionTrigger>Gates</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap items-start justify-between gap-5 p-4">
              {Object.values(GateType).map((type) => (
                <DraggableItem key={type} type={{ type: 'gate', node: type }} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}
