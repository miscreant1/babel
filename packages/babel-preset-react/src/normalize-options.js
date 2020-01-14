// @flow

import findSuggestion from "levenary";
import { type Options } from "./types";
import { TopLevelOptions } from "./options";

const PACKAGE_NAME = "@babel/preset-react";

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

export default function normalizeOptions(opts: Object): Options {
  validateTopLevelOptions(opts);
  return {
    development: validateBoolOption(
      TopLevelOptions.development,
      opts.development,
      false,
    ),
    pragma: validateStringOption(
      TopLevelOptions.pragma,
      opts.pragma,
      "React.createElement",
    ),
    pragmaFrag: validateStringOption(
      TopLevelOptions.pragmaFrag,
      opts.pragmaFrag,
      "React.Fragment",
    ),
    throwIfNamespace: validateBoolOption(
      TopLevelOptions.throwIfNamespace,
      opts.throwIfNamespace,
      true,
    ),
    useBuiltIns: validateBoolOption(
      TopLevelOptions.useBuiltIns,
      opts.useBuiltIns,
      false,
    ),
    useSpread: validateBoolOption(
      TopLevelOptions.useSpread,
      opts.useSpread,
      false,
    ),
  };
}
