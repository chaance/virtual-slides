import assert from "node:assert/strict";
import { buildVirtualSlides } from "./index.js";

test("small input, small output", () => {
  const sourceArray = [1, 2, 3];
  assert.deepEqual(
    buildVirtualSlides(sourceArray, {
      activeSlideIndex: 0,
      activeSlidePosition: "start",
      slidesPerMove: 1,
      slidesPerPage: 3,
    }),
    [3, 1, 2, 3, 1]
  );
  assert.deepEqual(
    buildVirtualSlides(sourceArray, {
      activeSlideIndex: 0,
      activeSlidePosition: "center",
      slidesPerMove: 1,
      slidesPerPage: 3,
    }),
    [2, 3, 1, 2, 3]
  );
});

test("small input, large output", () => {
  const sourceArray = [1, 2, 3, 4];
  assert.deepEqual(
    buildVirtualSlides(sourceArray, {
      activeSlideIndex: 2,
      activeSlidePosition: "start",
      slidesPerMove: 3,
      slidesPerPage: 4,
    }),
    [4, 1, 2, 3, 4, 1, 2, 3, 4, 1]
  );
  assert.deepEqual(
    buildVirtualSlides(sourceArray, {
      activeSlideIndex: 2,
      activeSlidePosition: "center",
      slidesPerMove: 3,
      slidesPerPage: 4,
    }),
    [2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4]
  );
});

test("large input, small output", () => {
  const sourceArray = [1, 2, 3, 4, 5, 6, 7, 8];
  assert.deepEqual(
    buildVirtualSlides(sourceArray, {
      activeSlideIndex: 0,
      activeSlidePosition: "start",
      slidesPerMove: 1,
      slidesPerPage: 3,
    }),
    [8, 1, 2, 3, 4]
  );
  assert.deepEqual(
    buildVirtualSlides(sourceArray, {
      activeSlideIndex: 0,
      activeSlidePosition: "center",
      slidesPerMove: 1,
      slidesPerPage: 3,
    }),
    [7, 8, 1, 2, 3]
  );
});

test("tiny input, large output", () => {
  const sourceArray = Array.from({ length: 30 }, (_, i) => i + 1);
  assert.deepEqual(
    buildVirtualSlides(sourceArray, {
      activeSlideIndex: 15,
      activeSlidePosition: "start",
      slidesPerMove: 3,
      slidesPerPage: 4,
    }),
    [13, 14, 15, 16, 17, 18, 19, 20, 21, 22]
  );
  assert.deepEqual(
    buildVirtualSlides(sourceArray, {
      activeSlideIndex: 15,
      activeSlidePosition: "center",
      slidesPerMove: 3,
      slidesPerPage: 4,
    }),
    [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
  );
  assert.deepEqual(
    buildVirtualSlides(sourceArray, {
      activeSlideIndex: 1,
      activeSlidePosition: "center",
      slidesPerMove: 3,
      slidesPerPage: 4,
    }),
    [27, 28, 29, 30, 1, 2, 3, 4, 5, 6, 7]
  );
  assert.deepEqual(
    buildVirtualSlides(sourceArray, {
      activeSlideIndex: 28,
      activeSlidePosition: "center",
      slidesPerMove: 3,
      slidesPerPage: 4,
    }),
    [24, 25, 26, 27, 28, 29, 30, 1, 2, 3, 4]
  );
  assert.deepEqual(
    buildVirtualSlides(sourceArray, {
      activeSlideIndex: 28,
      activeSlidePosition: "center",
      slidesPerMove: 3,
      slidesPerPage: 5,
    }),
    [24, 25, 26, 27, 28, 29, 30, 1, 2, 3, 4]
  );
  assert.deepEqual(
    buildVirtualSlides(sourceArray, {
      activeSlideIndex: 28,
      activeSlidePosition: "center",
      slidesPerMove: 3,
      slidesPerPage: 6,
    }),
    [23, 24, 25, 26, 27, 28, 29, 30, 1, 2, 3, 4, 5]
  );
});

test("empty input", () => {
  const sourceArray = [];
  assert.deepEqual(
    buildVirtualSlides(sourceArray, {
      activeSlideIndex: 1,
      activeSlidePosition: "start",
      slidesPerMove: 3,
      slidesPerPage: 4,
    }),
    []
  );
  assert.deepEqual(
    buildVirtualSlides(sourceArray, {
      activeSlideIndex: 1,
      activeSlidePosition: "center",
      slidesPerMove: 3,
      slidesPerPage: 4,
    }),
    []
  );
});

test("huge input", () => {
  const sourceArray = [];
  assert.deepEqual(
    buildVirtualSlides(sourceArray, {
      activeSlideIndex: 1,
      activeSlidePosition: "start",
      slidesPerMove: 3,
      slidesPerPage: 4,
    }),
    []
  );
  assert.deepEqual(
    buildVirtualSlides(sourceArray, {
      activeSlideIndex: 1,
      activeSlidePosition: "center",
      slidesPerMove: 3,
      slidesPerPage: 4,
    }),
    []
  );
});

function test(...args) {
  let name = typeof args[0] === "string" ? args[0] : null;
  let testFn = typeof args[0] === "function" ? args[0] : args[1];
  try {
    testFn();
    console.log(`✅ PASS ${name ? ": " + name : ""}`.trim());
  } catch (err) {
    if (err.code === "ERR_ASSERTION") {
      console.error(`❌ FAIL ${name ? ": " + name : ""}`);
    }
    throw err;
  }
}
