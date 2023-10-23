export function buildVirtualSlides<T>(
  slides: T[] | Map<any, T>,
  props: {
    activeSlideIndex: number;
    activeSlidePosition: "start" | "center";
    slidesPerPage: number;
    slidesPerMove: number;
  }
): T[];
