"use client";

import { DashIcon, ExpandIcon, Plus01Icon } from "@jfstech/icons-react/24/outline";
import { Button } from "@logicate/ui/button";
import { TextInput } from "@logicate/ui/input/index";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import useCanvasStore from "./hooks/useCanvasStore";
import { defaultInputs } from "./node/gate";
import { GateItem, InputItem, OutputItem } from "./types";

export default function SettingsPopup() {
  const { selected, updateItem, updateSelected } = useCanvasStore();
  const [visible, setVisible] = useState(false);
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    setVisible(selected.length === 1);
  }, [selected]);

  return (
    <AnimatePresence>
      {visible && selected[0] && (
        <motion.div
          className="min-w-80 bg-white rounded-md shadow-hard-xs origin-bottom-right"
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 0.9,
          }}
        >
          <div className="w-full py-2 border-b border-b-neutralgrey-400 px-4 flex justify-between items-center">
            <h5 className="text-neutralgrey-1100 text-sm font-medium">Node Settings</h5>
            <Button variant="no-borders" size="icon-xs" onClick={() => setMinimized(!minimized)}>
              {minimized ? <ExpandIcon className="size-4" /> : <DashIcon className="size-4" />}
            </Button>
          </div>
          {!minimized && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex flex-col w-full justify-between items-start p-4"
            >
              {selected[0].selectedType === "item" ? (
                <div className="flex flex-col w-full gap-4">
                  {selected[0].itemType === "gate" ? (
                    <div className="flex flex-row gap-4 justify-between w-full items-center">
                      <p className="text-neutralgrey-800 text-sm">Inputs</p>
                      <div className="flex flex-row w-max items-center">
                        <Button
                          variant="no-borders"
                          size="icon-xs"
                          onClick={() => {
                            const inputs = (selected[0] as GateItem).settings.inputs;
                            if (inputs - 1 < defaultInputs[(selected[0] as GateItem).type].min) return;
                            updateItem(selected[0].id, {
                              ...selected[0],
                              settings: {
                                ...(selected[0] as GateItem).settings,
                                // @ts-expect-error because we know that the settings are an object with an inputs property
                                inputs: inputs - 1,
                              },
                            });
                            updateSelected();
                          }}
                        >
                          <DashIcon className="size-4" />
                        </Button>
                        <input
                          className="w-full max-w-20 border-none outline-none ring-0 focus:ring-0 focus:outline-none text-center"
                          value={selected[0].settings.inputs}
                          // type="number"
                          id="logicate-gate-inputs-quantity-field"
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (!isNaN(value)) {
                              if (value + 1 > 10) return;
                              if (value - 1 < defaultInputs[(selected[0] as GateItem).type].max) return;
                              updateItem(selected[0].id, {
                                ...selected[0],
                                settings: {
                                  ...(selected[0] as GateItem).settings,
                                  // @ts-expect-error because we know that the settings are an object with an inputs property
                                  inputs: value,
                                },
                              });
                              updateSelected();
                            }
                          }}
                        />
                        <Button
                          variant="no-borders"
                          size="icon-xs"
                          onClick={() => {
                            const inputs = (selected[0] as GateItem).settings.inputs;
                            if (inputs + 1 > 10) return;
                            updateItem(selected[0].id, {
                              ...selected[0],
                              settings: {
                                ...(selected[0] as GateItem).settings,
                                // @ts-expect-error because we know that the settings are an object with an inputs property
                                inputs: inputs + 1,
                              },
                            });
                            updateSelected();
                          }}
                        >
                          <Plus01Icon className="size-4" />
                        </Button>
                      </div>
                    </div>
                  ) : null}
                  <div className="flex flex-row gap-4 justify-between w-full items-center">
                    <p className="text-neutralgrey-800 text-sm">Label</p>
                    <div className="flex flex-row w-max items-center">
                      <TextInput
                        value={selected[0].settings.label}
                        className="min-w-40"
                        onChange={(e) => {
                          updateItem(selected[0].id, {
                            ...selected[0],
                            settings: {
                              ...(selected[0] as GateItem).settings,
                              label: e.target.value,
                            },
                          });
                          updateSelected();
                        }}
                      />
                    </div>
                    {selected[0].itemType === "input" || selected[0].itemType === "output" ? (
                      <div className="flex flex-row gap-4 justify-between w-full items-center">
                        <p className="text-neutralgrey-800 text-sm">Symbol</p>
                        <div className="flex flex-row w-max items-center">
                          <TextInput
                            value={(selected[0] as InputItem | OutputItem).settings.expressionLetter}
                            className="min-w-40"
                            onChange={(e) => {
                              updateItem(selected[0].id, {
                                ...selected[0],
                                settings: {
                                  ...(selected[0] as InputItem | OutputItem).settings,
                                  // @ts-expect-error because we know that the settings are an object with an expressionLetter property
                                  expressionLetter: e.target.value as Alphabet,
                                },
                              });
                              updateSelected();
                            }}
                          />
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
