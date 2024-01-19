export const useQuestionFormStore = (function () {
  const state = {
    formClass: "question-box__form",
    formId: "i-form",
    selectBoxes: [
      {id: 1, labelClass: "question-box__label", label: "I am",
      selectClass: "question-box__select", selectId: "i-am", 
      options: [{value: "individual", text: "an individual"},
      {value: "organisation", text: "a group"},
      {value: "group", text: "an individual"},
      {value: "journalist", text: "a journalist"}]},

      {id: 2, labelClass: "question-box__label", label: "and I want",
      selectClass: "question-box__select", selectId: "i-want", 
      options: [{value: "learn", text: "to learn"},
      {value: "get-advice", text: "to get advice"},
      {value: "volunteer", text: "to volunteer"},
      {value: "speak", text: "to speak to someone"}]}
    ],
    buttonClass: "question-box__button question-box__button--red", 
    buttonText: "Start now"
  };
  return {
    getFormClass: () => state.formClass,
    getFormId: () => state.formId,
    getSelectBoxes: () => state.selectBoxes,
    getButtonClass: () => state.buttonClass,
    getButtonText: () => state.buttonText
  }
})();

    
    