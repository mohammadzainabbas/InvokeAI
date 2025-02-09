import { get, isObject, isString } from 'lodash-es';
import {
  GraphExecutionState,
  GraphInvocationOutput,
  ImageOutput,
  MaskOutput,
  PromptOutput,
  IterateInvocationOutput,
  CollectInvocationOutput,
  ImageField,
  LatentsOutput,
  ResourceOrigin,
  ImageDTO,
} from 'services/api';

export const isImageDTO = (obj: unknown): obj is ImageDTO => {
  return (
    isObject(obj) &&
    'image_name' in obj &&
    isString(obj?.image_name) &&
    'thumbnail_url' in obj &&
    isString(obj?.thumbnail_url) &&
    'image_url' in obj &&
    isString(obj?.image_url) &&
    'image_origin' in obj &&
    isString(obj?.image_origin) &&
    'created_at' in obj &&
    isString(obj?.created_at)
  );
};

export const isImageOutput = (
  output: GraphExecutionState['results'][string]
): output is ImageOutput => output.type === 'image_output';

export const isLatentsOutput = (
  output: GraphExecutionState['results'][string]
): output is LatentsOutput => output.type === 'latents_output';

export const isMaskOutput = (
  output: GraphExecutionState['results'][string]
): output is MaskOutput => output.type === 'mask';

export const isPromptOutput = (
  output: GraphExecutionState['results'][string]
): output is PromptOutput => output.type === 'prompt';

export const isGraphOutput = (
  output: GraphExecutionState['results'][string]
): output is GraphInvocationOutput => output.type === 'graph_output';

export const isIterateOutput = (
  output: GraphExecutionState['results'][string]
): output is IterateInvocationOutput => output.type === 'iterate_output';

export const isCollectOutput = (
  output: GraphExecutionState['results'][string]
): output is CollectInvocationOutput => output.type === 'collect_output';

export const isResourceOrigin = (t: unknown): t is ResourceOrigin =>
  isString(t) && ['internal', 'external'].includes(t);

export const isImageField = (imageField: unknown): imageField is ImageField =>
  isObject(imageField) &&
  isString(get(imageField, 'image_name')) &&
  isResourceOrigin(get(imageField, 'image_origin'));
