import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

export default new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  parseValue(value) {
    return (new Date(value)).toISOString();
  },
  parseLiteral(ast) {
    if (ast.kind === _language.Kind.INT) {
      return (new Date(parseInt(ast.value, 10))).toISOString();
    }

    return null;
  },
  serialize(value) {
    if (!value || !value.getTime) return value;

    return value.toISOString();
  },
});
