import * as React from 'react';
import clsx from 'clsx';
import { Slot } from 'radix-ui';
import { marginPropDefs, textPropDefs, type GetPropDefTypes, type MarginProps } from '@props';
import { extractProps, type ComponentPropsWithout, type RemovedProps } from '@helpers';


type TextElement = HTMLSpanElement;
type TextOwnProps = GetPropDefTypes<typeof textPropDefs>;
interface CommonTextProps extends MarginProps, TextOwnProps { }
type TextSpanProps = { as?: 'span' } & ComponentPropsWithout<'span', RemovedProps>;
type TextDivProps = { as: 'div' } & ComponentPropsWithout<'div', RemovedProps>;
type TextLabelProps = { as: 'label' } & ComponentPropsWithout<'label', RemovedProps>;
type TextPProps = { as: 'p' } & ComponentPropsWithout<'p', RemovedProps>;
type TextProps = CommonTextProps & (TextSpanProps | TextDivProps | TextLabelProps | TextPProps);

const Text = React.forwardRef<TextElement, TextProps>((props, forwardedRef) => {
  const {
    children,
    className,
    asChild,
    as: Tag = 'span',
    color,
    ...textProps
  } = extractProps(props, textPropDefs, marginPropDefs);
  return (
    <Slot.Root
      data-accent-color={color}
      {...textProps}
      ref={forwardedRef}
      className={clsx('rt-Text', className)}
    >
      {asChild ? children : <Tag>{children}</Tag>}
    </Slot.Root>
  );
});
Text.displayName = 'Text';

export { Text };
export type { TextProps };
