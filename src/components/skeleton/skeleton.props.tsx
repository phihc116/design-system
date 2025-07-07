import { heightPropDefs, widthPropDefs, type PropDef } from "@props";


const skeletonPropDefs = {
  loading: { type: 'boolean', default: true },
  ...widthPropDefs,
  ...heightPropDefs,
} satisfies {
  loading: PropDef<boolean>;
};

export { skeletonPropDefs };
