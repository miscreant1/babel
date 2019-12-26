import { declare } from "@babel/helper-plugin-utils";
import transformReactJSX from "@babel/plugin-transform-react-jsx";
import transformReactDisplayName from "@babel/plugin-transform-react-display-name";
import transformReactJSXSource from "@babel/plugin-transform-react-jsx-source";
import transformReactJSXSelf from "@babel/plugin-transform-react-jsx-self";
import normalizeOptions from "./normalize-options";

export default declare((api, opts) => {
  api.assertVersion(7);

  const {
    development,
    pragma,
    pragmaFrag,
    throwIfNamespace,
    useBuiltIns,
    useSpread,
  } = normalizeOptions(opts);

  return {
    plugins: [
      [
        transformReactJSX,
        { pragma, pragmaFrag, throwIfNamespace, useBuiltIns, useSpread },
      ],
      transformReactDisplayName,

      development && transformReactJSXSource,
      development && transformReactJSXSelf,
    ].filter(Boolean),
  };
});
