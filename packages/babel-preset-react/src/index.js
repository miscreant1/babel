import { declare } from "@babel/helper-plugin-utils";
import transformReactJSX from "@babel/plugin-transform-react-jsx";
import transformReactDisplayName from "@babel/plugin-transform-react-display-name";
import transformReactJSXSource from "@babel/plugin-transform-react-jsx-source";
import transformReactJSXSelf from "@babel/plugin-transform-react-jsx-self";

export default declare((api, opts) => {
  api.assertVersion(7);

  const pragma = opts.pragma || "React.createElement";
  const pragmaFrag = opts.pragmaFrag || "React.Fragment";
  const throwIfNamespace =
    opts.throwIfNamespace === undefined ? true : !!opts.throwIfNamespace;
  const development = !!opts.development;
  if ("useSpread" in opts) {
    console.warn(
      "useSpread is always enabled in Babel 8, please remove it from the config.\n" +
        "- If you need the behavior of `useSpread: false`, please use `@babel/preset-env`\n" +
        "or `@babel/plugin-proposal-object-rest-spread`",
    );
  }
  if ("useBuiltIns" in opts) {
    console.warn(
      "useBuiltIns is removed in Babel 8, please remove it from the config.\n" +
        "- If you need the behavior of `useBuiltIns: true`, please use `@babel/preset-env`\n" +
        "or `@babel/plugin-proposal-object-rest-spread`\n" +
        "- If you need the behavior of `useBuiltIns: false`, please use `@babel/preset-env`\n" +
        "or `@babel/plugin-transform-object-assign`",
    );
  }

  if (typeof development !== "boolean") {
    throw new Error(
      "@babel/preset-react 'development' option must be a boolean.",
    );
  }

  return {
    plugins: [
      [transformReactJSX, { pragma, pragmaFrag, throwIfNamespace }],
      transformReactDisplayName,

      development && transformReactJSXSource,
      development && transformReactJSXSelf,
    ].filter(Boolean),
  };
});
