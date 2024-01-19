export const useHeadlineBannerStore = (function () {
  const state = {
    section: {class: "headline headline--blue headline--thirty headline--half", aria: "helping-people"},
    heading: {class: "headline__heading headline__heading--box", 
      text: "We are a social change charity, helping people to improve their lives through digital."},
    paragraph: {class: "headline__text headline__text--box", 
      text: "We tackle the most pressing issues of our time, working with partners in thousands of communities across the UK and further afield."},
    button: {class: "headline__button headline__button--box", text: "Learn more about us"},
    image: {class: "image-box image-box--charity-people image-box--thirty"}
  };
  return {
    getSection: () => state.section,
    getHeading: () => state.heading,
    getParagraph: () => state.paragraph,
    getButton: () => state.button,
    getImage: () => state.image
  }
})();