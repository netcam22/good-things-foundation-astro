export const useHeroBannerStore = (function () {
  const state = {
    section: {class: "headline headline--image headline--fifty headline--volunteers", aria: "get-online-week"},
    heading: {class: "headline__heading headline__heading--hero", text: "Get online week 2021"},
    paragraph: {class: "headline__text headline__text--hero", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},
    button: {class: "headline__button headline__button--hero", text: "Get involved now!"}
  };
  return {
    getSection: () => state.section,
    getHeading: () => state.heading,
    getParagraph: () => state.paragraph,
    getButton: () => state.button
  }
})();