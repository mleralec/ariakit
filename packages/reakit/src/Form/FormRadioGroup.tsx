import * as React from "react";
import { RoverStateReturn, useRoverState } from "../Rover/RoverState";
import { unstable_useOptions } from "../system/useOptions";
import { unstable_useProps } from "../system/useProps";
import { unstable_createComponent } from "../utils/createComponent";
import { mergeProps } from "../utils/mergeProps";
import { unstable_useCreateElement } from "../utils/useCreateElement";
import { As, PropsWithAs, Keys } from "../__utils/types";
import {
  unstable_FormGroupOptions,
  unstable_FormGroupProps,
  unstable_useFormGroup
} from "./FormGroup";
import { unstable_FormStateReturn, unstable_useFormState } from "./FormState";
import { DeepPath } from "./__utils/types";

export type unstable_FormRadioGroupOptions<
  V,
  P extends DeepPath<V, P>
> = unstable_FormGroupOptions<V, P> & {
  /**
   * FormRadioGroup's name as in form values.
   */
  name: P;
};

export type unstable_FormRadioGroupProps = unstable_FormGroupProps &
  React.FieldsetHTMLAttributes<any>;

export const FormRadioGroupContext = React.createContext<RoverStateReturn | null>(
  null
);

export function unstable_useFormRadioGroup<V, P extends DeepPath<V, P>>(
  options: unstable_FormRadioGroupOptions<V, P>,
  htmlProps: unstable_FormRadioGroupProps = {}
) {
  options = unstable_useOptions("FormRadioGroup", options, htmlProps);
  htmlProps = mergeProps({ role: "radiogroup" } as typeof htmlProps, htmlProps);
  htmlProps = unstable_useProps("FormRadioGroup", options, htmlProps);
  htmlProps = unstable_useFormGroup(options, htmlProps);
  return htmlProps;
}

const keys: Keys<
  unstable_FormStateReturn<any> & unstable_FormRadioGroupOptions<any, any>
> = [...unstable_useFormGroup.__keys, ...unstable_useFormState.__keys, "name"];

unstable_useFormRadioGroup.__keys = keys;

export const unstable_FormRadioGroup = (unstable_createComponent({
  as: "fieldset",
  useHook: unstable_useFormRadioGroup,
  useCreateElement: (type, props, children) => {
    const element = unstable_useCreateElement(type, props, children);
    const rover = useRoverState({ loop: true });
    const value = React.useMemo(() => rover, [
      rover.stops,
      rover.currentId,
      rover.unstable_pastId
    ]);
    return (
      <FormRadioGroupContext.Provider value={value}>
        {element}
      </FormRadioGroupContext.Provider>
    );
  }
}) as unknown) as <V, P extends DeepPath<V, P>, T extends As = "fieldset">(
  props: PropsWithAs<unstable_FormRadioGroupOptions<V, P>, T>
) => JSX.Element;
