module.exports = {
    Query: {
      books: (parent, args, context) => context.books,
      heros: (parent, args, context) => context.heros,
      hero: (parent, { id }, context) => {
          let r = null;
          context.heros.array.forEach(element => {
              if (element.id === id) { r = element }
          });
          return r;
      },
    },
};
