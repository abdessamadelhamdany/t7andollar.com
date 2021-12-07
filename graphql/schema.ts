import { join } from 'path';
import { makeSchema } from 'nexus';
import * as types from './types';

const rootDir = process.cwd();

export const schema = makeSchema({
  types,
  outputs: {
    schema: join(rootDir, 'graphql/schema.graphql'),
    typegen: join(rootDir, 'node_modules/@types/nexus-typegen', 'index.d.ts'),
  },
  contextType: {
    export: 'Context',
    module: join(rootDir, 'graphql/context.ts'),
  },
});
