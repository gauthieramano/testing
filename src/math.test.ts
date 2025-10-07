import { afterEach, describe, expect, test, vi } from "vitest";
import { addAndSubOne } from "./math";
import * as other from "./other";
import { sub } from "./other";

describe("addAndSubOne", () => {
  afterEach(vi.restoreAllMocks);

  test("calls `sub` once with [9, 1]", () => {
    // GIVEN
    vi.mock("./other", { spy: true });

    // WHEN
    addAndSubOne(5, 3);

    // THEN
    expect(sub).toHaveBeenCalledOnce();
    expect(sub).toHaveBeenCalledWith(5 + 3, 1);
  });

  test("called with [1, 2] returns 3 when `sub` mocked as identity", () => {
    // GIVEN
    vi.spyOn(other, "sub").mockImplementation((a) => a);

    // WHEN
    const result = addAndSubOne(1, 2);

    // THEN
    expect(result).toBe(3);
  });

  test("called with [1, 2] returns 2", () => {
    // WHEN
    const result = addAndSubOne(1, 2);

    // THEN
    expect(result).toBe(2);
  });
});
