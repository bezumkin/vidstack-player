/* -------------------------------------------------------------------------------------------------
 * RadioGroup
 * -----------------------------------------------------------------------------------------------*/

import React from 'react';

import { composeRefs, createReactComponent, type ReactElementProps } from 'maverick.js/react';

import { RadioGroupInstance, RadioInstance } from '../primitives/instances';
import { Primitive } from '../primitives/nodes';

const RadioGroupBridge = createReactComponent(RadioGroupInstance, {
  events: ['onChange'],
});

export interface RootProps extends ReactElementProps<RadioGroupInstance> {
  asChild?: boolean;
  children?: React.ReactNode;
  ref?: React.Ref<RadioGroupInstance>;
}

/**
 * A radio group consists of options where only one of them can be checked. Each option is
 * provided as a radio (i.e., a selectable element).
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/menu/radio-group}
 */
const Root = React.forwardRef<RadioGroupInstance, RootProps>(
  ({ children, ...props }, forwardRef) => {
    return (
      <RadioGroupBridge {...props} ref={forwardRef}>
        {(props) => <Primitive.div {...props}>{children}</Primitive.div>}
      </RadioGroupBridge>
    );
  },
);

Root.displayName = 'RadioGroup';

/* -------------------------------------------------------------------------------------------------
 * RadioItem
 * -----------------------------------------------------------------------------------------------*/

const ItemBridge = createReactComponent(RadioInstance, {
  events: ['onChange', 'onSelect'],
});

export interface ItemProps extends ReactElementProps<RadioInstance> {
  asChild?: boolean;
  children?: React.ReactNode;
  ref?: React.Ref<HTMLElement>;
}

/**
 * A radio represents a option that a user can select inside of a radio group. Only one radio
 * can be checked in a group.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/menu/radio}
 */
const Item = React.forwardRef<HTMLElement, ItemProps>(({ children, ...props }, forwardRef) => {
  return (
    <ItemBridge {...(props as Omit<ItemProps, 'ref'>)}>
      {(props) => (
        <Primitive.div {...props} ref={composeRefs(props.ref, forwardRef)}>
          {children}
        </Primitive.div>
      )}
    </ItemBridge>
  );
});

Item.displayName = 'RadioItem';

export { Root, Item };
