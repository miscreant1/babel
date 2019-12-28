const callDelegate = require("@babel/helper-call-delegate").default;
module.exports = function( { types: t } ) {
  return {
    visitor: {
      FunctionDeclaration(path, state) {
        const body = [callDelegate(path, path.scope)];
        path.set("body", t.blockStatement(body));
      }
    }
  }
};
