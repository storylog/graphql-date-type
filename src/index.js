import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

export default new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  parseValue(value) {
    try {
      return (new Date(value)).toISOString();
    } catch (error) {
      throw new TypeError(
        `Cannot represent an invalid Date instance ${JSON.stringify(value)}`
      );
    }
  },
  parseLiteral(ast) {
    try {
      if (ast.kind === _language.Kind.INT) {
        return (new Date(parseInt(ast.value, 10))).toISOString();
      }
      return null;
    } catch (error) {
      throw new TypeError(
        `Cannot represent an invalid Date instance ${JSON.stringify(ast)}`
      );
    }
  },
  serialize(value) {
    try {
      if (!value || !value.getTime) return value;
      return value.toISOString();
    } catch (error) {
      throw new TypeError(
        `Cannot represent an invalid Date instance ${JSON.stringify(value)}`
      );
    }
  },
});
