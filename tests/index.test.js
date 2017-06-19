/*  eslint-env jest */

import { Kind } from 'graphql/language';
import GraphQLDate from '../src/index';

describe('GraphQLDate', () => {
  describe('serialize', () => {
    it('can serialize Date value', () => {
      const date = new Date();

      expect(GraphQLDate.serialize(date)).toBe(date.getTime());
    });

    it('can serialize timestamp value', () => {
      const date = new Date();

      expect(GraphQLDate.serialize(date.getTime())).toBe(date.getTime());
    });
  });

  describe('parseValue', () => {
    it('can parse value to Date', () => {
      const date = new Date();

      expect(GraphQLDate.parseValue(date.getTime())).toBeInstanceOf(Date);
    });

    it('should throw error when parse invalid value', () => {
      expect(GraphQLDate.parseValue.bind(null, 'invalid')).toThrow();
    });
  });

  describe('parseLiteral', () => {
    it('can parse ast literal', () => {
      const ast = {
        kind: Kind.INT,
        value: (new Date()).getTime(),
      };
      const date = GraphQLDate.parseLiteral(ast);

      expect(date).toBeInstanceOf(Date);
    });

    it('should return null when parse invalid ast', () => {
      const ast = {
        kind: Kind.STRING,
        value: 'invalid',
      };
      const date = GraphQLDate.parseLiteral(ast);

      expect(date).toBeNull();
    });
  });
});
