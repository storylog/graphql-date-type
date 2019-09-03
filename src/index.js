import { GraphQLScalarType, Kind } from 'graphql';

function errorMessage(value) {
  return `Cannot represent an invalid Date instance ${JSON.stringify(value)}`;
}

function parseDate(value) {
  const date = new Date(value);

  if (isNaN(date)) {
    throw new TypeError(errorMessage(value));
  }

  return date;
}

export default new GraphQLScalarType({
  name: 'Date',
  description: 'Date string in ISO format',
  serialize(value) {
    try {
      return (new Date(value)).toISOString();
    } catch (error) {
      throw new TypeError(errorMessage(value));
    }
  },
  parseValue(value) {
    return parseDate(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return parseDate(ast.value);
    }

    throw new TypeError(errorMessage(ast));
  },
});
