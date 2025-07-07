import * as React from 'react';
import { Slot } from 'radix-ui';
import { marginPropDefs, type GetPropDefTypes, type MarginProps } from '@props';
import { skeletonPropDefs } from './skeleton.props';
import { extractProps, type ComponentPropsWithout, type RemovedProps } from '@helpers';
import clsx from 'clsx';
import { inert } from '@helpers/inert';



type SkeletonElement = HTMLSpanElement;
type SkeletonOwnProps = GetPropDefTypes<typeof skeletonPropDefs>;
interface SkeletonProps
  extends ComponentPropsWithout<'span', RemovedProps>,
  MarginProps,
  SkeletonOwnProps { }
const Skeleton = React.forwardRef<SkeletonElement, SkeletonProps>((props, forwardedRef) => {
  const { children, className, loading, ...skeletonProps } = extractProps(
    props,
    skeletonPropDefs,
    marginPropDefs
  );

  if (!loading) return children;

  const Tag = React.isValidElement(children) ? Slot.Root : 'span';

  return (
    <Tag
      ref={forwardedRef}
      aria-hidden
      className={clsx('rt-Skeleton', className)}
      data-inline-skeleton={React.isValidElement(children) ? undefined : true}
      tabIndex={-1}
      // @ts-expect-error
      inert={inert}
      {...skeletonProps}
    >
      {children}
    </Tag>
  );
});
Skeleton.displayName = 'Skeleton';

export { Skeleton };
export type { SkeletonProps };
