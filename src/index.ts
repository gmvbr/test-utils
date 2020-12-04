import anyTest, { TestInterface } from 'ava';
import fastify, { FastifyInstance } from 'fastify';

export interface Context {
  fastify: FastifyInstance;
}

export const test = anyTest as TestInterface<Context>;

export function createTestService(
  test: TestInterface<Context>,
  service: (fastify: FastifyInstance) => Promise<void>
) {
  test.before(async t => {
    t.context.fastify = fastify();
    t.context.fastify.register(service);
    await t.context.fastify.listen(0);
  });
  test.after(async t => {
    await t.context.fastify.close();
  });
}