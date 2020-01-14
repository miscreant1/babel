import { transform } from "@babel/core";
import presetReact from "..";

function transformReactWithOptions(source: string, options: any) {
  transform(source, {
    filename: "test.jsx",
    presets: [[presetReact, options]],
  });
}
describe("preset-react", () => {
  it("should throw when top level options are invalid", () => {
    expect(() => {
      transformReactWithOptions("", { useBuiltins: true });
    }).toThrowErrorMatchingSnapshot();
  });
  it("should throw when boolean options are not provided with boolean values", () => {
    expect(() => {
      transformReactWithOptions("", { useBuiltIns: "true" });
    }).toThrowErrorMatchingSnapshot();
  });
  it("should throw when string options are not provided with string values", () => {
    expect(() => {
      transformReactWithOptions("", { pragma: 0 });
    }).toThrowErrorMatchingSnapshot();
  });
});
