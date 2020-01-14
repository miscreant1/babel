// @flow

import findSuggestion from "levenary";
import { type Options } from "./types";
import { TopLevelOptions } from "./options";

const PACKAGE_NAME = "@babel/preset-typescript";

const validateTopLevelOptions = (options: Options) => {
  const validOptions = Object.keys(TopLevelOptions);

  for (const option in options) {
    if (!TopLevelOptions[option]) {
      throw new Error(
        `${PACKAGE_NAME}: '${option}' is not a valid top-level option.\n` +
          `Maybe you meant to use '${findSuggestion(option, validOptions)}'?`,
      );
    }
  }
};

export const validateBoolOption = (
  name: string,
  value: any,
  defaultValue: ?boolean,
): ?boolean => {
  if (typeof value === "undefined") {
    value = defaultValue;
  }

  if (typeof value !== "boolean" && typeof value !== "undefined") {
    throw new Error(`${PACKAGE_NAME}: '${name}' option must be a boolean.`);
  }

  return value;
};

export const validateStringOption = (
  name: string,
  value: any,
  defaultValue: ?string,
): ?string => {
  if (typeof value === "undefined") {
    value = defaultValue;
  }

  if (typeof value !== "string" && typeof value !== "undefined") {
    throw new Error(`${PACKAGE_NAME}: '${name}' option must be a string.`);
  }

  return value;
};

export const validateConstraints = (opts: Options) => {
  const { isTSX, allExtensions } = opts;
  if (isTSX && !allExtensions) {
    throw new Error(`${PACKAGE_NAME}: isTSX:true requires allExtensions:true`);
  }
};

export default function normalizeOptions(opts: Object): Options {
  validateTopLevelOptions(opts);
  const normalized = {
    allExtensions: validateBoolOption(
      TopLevelOptions.allExtensions,
      opts.allExtensions,
      false,
    ),
    allowDeclareFields: validateBoolOption(
      TopLevelOptions.allowDeclareFields,
      opts.allowDeclareFields,
      undefined,
    ),
    allowNamespaces: validateBoolOption(
      TopLevelOptions.allowNamespaces,
      opts.allowNamespaces,
      undefined,
    ),
    isTSX: validateBoolOption(TopLevelOptions.isTSX, opts.isTSX, false),
    jsxPragma: validateStringOption(
      TopLevelOptions.jsxPragma,
      opts.jsxPragma,
      undefined,
    ),
  };
  validateConstraints(normalized);
  return normalized;
}
