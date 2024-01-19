export const useQuestionBoxStore = (function () {
  const state = {
    ariaLabel: "how-can-we-help",
    heading: "How can we help you?",
    text: "Let us know who you are and what you're looking for, and we'll help you get to the right place."
  };
  return {
    getHeading: () => state.heading,
    getText: () => state.text
  }
})();