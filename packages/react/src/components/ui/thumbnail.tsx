import * as React from 'react';

import {
  composeRefs,
  createReactComponent,
  useSignal,
  useStateContext,
  type ReactElementProps,
} from 'maverick.js/react';
import { mediaState } from 'vidstack/local';

import { ThumbnailInstance } from '../primitives/instances';
import { Primitive, type PrimitivePropsWithRef } from '../primitives/nodes';

/* -------------------------------------------------------------------------------------------------
 * Thumbnail
 * -----------------------------------------------------------------------------------------------*/

const ThumbnailBridge = createReactComponent(ThumbnailInstance);

export interface RootProps extends ReactElementProps<ThumbnailInstance, HTMLElement> {
  asChild?: boolean;
  children?: React.ReactNode;
  ref?: React.Ref<HTMLElement>;
}

/**
 * Used to load and display a preview thumbnail at the given `time`.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/display/thumbnail}
 */
const Root = React.forwardRef<HTMLElement, RootProps>(({ children, ...props }, forwardRef) => {
  return (
    <ThumbnailBridge {...(props as Omit<RootProps, 'ref'>)}>
      {(props) => (
        <Primitive.div {...props} ref={composeRefs(props.ref, forwardRef)}>
          {children}
        </Primitive.div>
      )}
    </ThumbnailBridge>
  );
});

Root.displayName = 'Thumbnail';

/* -------------------------------------------------------------------------------------------------
 * ThumbnailImg
 * -----------------------------------------------------------------------------------------------*/

export interface ImgProps extends PrimitivePropsWithRef<'img'> {
  children?: React.ReactNode;
}

const Img = React.forwardRef<HTMLImageElement, ImgProps>(({ children, ...props }, forwardRef) => {
  const { crossorigin } = useStateContext(mediaState),
    { src, img } = useStateContext(ThumbnailInstance.state),
    $src = useSignal(src),
    $crossorigin = useSignal(crossorigin);
  return (
    <Primitive.img
      crossOrigin={$crossorigin as '' | undefined}
      {...props}
      src={$src}
      ref={composeRefs((img as any).set, forwardRef)}
    >
      {children}
    </Primitive.img>
  );
});

Img.displayName = 'ThumbnailImg';

export { Root, Img };
