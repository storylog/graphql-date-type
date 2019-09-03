/*  eslint-env jest */

import { Kind } from 'graphql';
import { stringify } from 'jest-matcher-utils';
import GraphQLDate from './index';

describe('GraphQLDate', () => {
  describe('serialize', () => {
    [
      [new Date(Date.UTC(2019, 0, 1)), '2019-01-01T00:00:00.000Z'],
      [new Date(Date.UTC(2019, 0, 1, 11, 22, 33, 444)), '2019-01-01T11:22:33.444Z'],
    ].forEach(([value, expected]) => {
      it(`serialize Date ${stringify(value)} to ${stringify(expected)}`, () => {
        expect(GraphQLDate.serialize(value)).toEqual(expected);
      });
    });

    it('throw error when serializing invalid date', () => {
      expect(() => {
        GraphQLDate.serialize(new Date('invalid date'));
      }).toThrowError();
    });
  });

  describe('parseValue', () => {
    [
      ['2019-01-01T00:00:00Z', new Date(Date.UTC(2019, 0, 1, 0, 0, 0, 0))],
      ['2019-01-01T00:00:00.000Z', new Date(Date.UTC(2019, 0, 1, 0, 0, 0, 0))],
      ['2019-01-01T11:22:33.444Z', new Date(Date.UTC(2019, 0, 1, 11, 22, 33, 444))],
    ].forEach(([value, expected]) => {
      it(`parse ${stringify(value)} to Date ${stringify(expected)}`, () => {
        expect(GraphQLDate.parseValue(value)).toEqual(expected);
      });
    });

    it('throw error when parsing invalid date string', () => {
      expect(() => {
        GraphQLDate.parseValue('invalid date');
      }).toThrowError();
    });
  });

  describe('parseLiteral', () => {
    [
      ['2019-01-01T00:00:00Z', new Date(Date.UTC(2019, 0, 1, 0, 0, 0, 0))],
      ['2019-01-01T00:00:00.000Z', new Date(Date.UTC(2019, 0, 1, 0, 0, 0, 0))],
      ['2019-01-01T11:22:33.444Z', new Date(Date.UTC(2019, 0, 1, 11, 22, 33, 444))],
    ].forEach(([value, expected]) => {
      const literal = {
        kind: Kind.STRING,
        value,
      };

      it(`parse literal ${stringify(literal)} to Date ${stringify(expected)}`, () => {
        expect(GraphQLDate.parseLiteral(literal)).toEqual(expected);
      });
    });

    [
      [Kind.STRING, 'invalid date'],
      [Kind.INT, 1],
    ].forEach(([kind, value]) => {
      const literal = {
        kind,
        value,
      };

      it(`throw error when parsing invalid literal ${stringify(literal)}`, () => {
        expect(() => {
          GraphQLDate.parseLiteral(literal);
        }).toThrowError();
      });
    });
  });
});
