/**
 * The idea here is that we have an array of actual slides and we need to build
 * an array of "virtual" slides when the carousel is in am infinite loop. Our
 * virtual slides array will have a fixed width based on the number of slides
 * per page and slides per "move" (meaning, how many slides can be moved at
 * once). When the first slide from the original list needs to be moved into the
 * virtual list, we copy slides from the end of the list to get the "infinite"
 * loop effect (same is true for the last slide). A few simplified examples:
 *
 * @example
 * ```js
 * const activeSlidePosition = 'center';
 * const slidesPerPage = 3;
 * const slidesPerMove = 1;
 * const params = { activeSlidePosition: 'center', slidesPerPage: 3, slidesPerMove: 1 };
 *
 * // [2, 3, 1, 2, 3]
 * buildVirtualSlides([1, 2, 3], 0, params);
 * buildVirtualSlides([1, 2, 3, 4], 1, params); // [3, 1, 2, 3, 1]
 *
 * params.slidesPerMove = 2;
 * params.slidesPerPage = 4;
 *
 * // [3, 1, 2, 3, 1, 2, 3, 1, 2]
 * // Current page shows [2, 3, 1, 2, 3]
 * // Because we have an even number of slides per page, and the active slide
 * // is centered, we need to show 1/2 of the first and last slides on each
 * // side of the current page. So the output will actually assume we have 1
 * // additional slide in the view.
 * buildVirtualSlides([1, 2, 3], 0, params);
 *
 * // [2, 3, 1, 2, 3, 1, 2]
 * buildVirtualSlides([1, 2, 3, 4], 1, params);
 * ```
 */
export function buildVirtualSlides(slides, props) {
  const { activeSlideIndex, activeSlidePosition, slidesPerMove } = props;

  slides = Array.isArray(slides) ? slides : Array.from(slides.values());
  const slideCount = slides.length;
  if (slideCount === 0) {
    return [];
  }

  let slidesPerPage = props.slidesPerPage;
  if (activeSlidePosition === "center" && slidesPerPage % 2 === 0) {
    // If we have an event number of slides per page and the active slide is
    // centered, we'll show 1/2 of first and last slides on each side, so our
    // calculation will be based on having one additional slide in the view.
    slidesPerPage++;
  }

  const offscreenEdgeSlideCount = slidesPerMove;

  // When the active slide is in the `start` position, its index in the virtual
  // slides array will be equal to `offscreenEdgeSlideCount`. When the active
  // slide is in the `center` it needs to be offset to the right
  //
  // start:
  // [1] [2] | *[3]* [0] [1] [2] [3] | [0] [1]
  // center:
  // [3] [0] | [1] [2] *[3]* [0] [1] | [2] [3]
  const centeredSlideOffset =
    activeSlidePosition === "center" ? Math.floor(slidesPerPage / 2) : 0;

  const totalVirtualSlideCount = slidesPerPage + offscreenEdgeSlideCount * 2;

  // Thw index of the item from our source array that will be added as the first
  // item to our virtual slides array
  const startingIndex =
    ((activeSlideIndex - offscreenEdgeSlideCount) % slideCount) -
    centeredSlideOffset;

  const virtualSlides = [];
  for (let i = 0; i < totalVirtualSlideCount; i++) {
    const relativeIndex = (startingIndex + i) % slideCount;
    const slide = slides.at(relativeIndex);
    virtualSlides.push(slide);
  }
  return virtualSlides;
}
