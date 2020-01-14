import { transform } from "@babel/core";
import presetFlow from "..";

function transformFlowWithOptions(source: string, options: any) {
  transform(source, {
    filename: "test.js",
    presets: [[presetFlow, options]],
  });
}
describe("preset-flow", () => {
  it("should throw when top level options are invalid", () => {
    expect(() => {
      transformFlowWithOptions("", { All: true });
    }).toThrowErrorMatchingSnapshot();
  });
  it("should throw when boolean options are not provided with boolean values", () => {
    expect(() => {
      transformFlowWithOptions("", { all: "true" });
    }).toThrowErrorMatchingSnapshot();
  });
});
