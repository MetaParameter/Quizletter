/*

Completes quizlet learning sets for you.

Evaluate the page, look at the elements in order to categorise the question into
one of three categories:

	Flashcard
	Multichoice
	Written

*/

// ClassNames
var QUESTION_CLASS = "FormattedText notranslate FormattedTextWithImage-wrapper lang-en"
var TEXT_BOX_CLASS = "FormattedText notranslate FormattedTextWithImage-wrapper lang-es"
var OPTION_CLASS = "t1vgx2mw"
var INCORRECT_OPTION_CLASS = "i199r63q wbkjose"
var CORRECT_OPTION_CLASS = "c17oj589 wbkjose"
var NEUTRAL_OPTION_CLASS = "s1bua9we wbkjose"
var CONTINUE_CLASS = "AssemblyButtonBase AssemblyPrimaryButton--default AssemblyButtonBase--large AssemblyButtonBase--padding"
var FLASHCARD_BUTTON_CLASS = "a17kns5"

var INPUT_CLASS = "AssemblyInput-input AssemblyInput-placeholder"
var ANSWER_CLASS = "AssemblyButtonBase AssemblyPrimaryButton--default AssemblyButtonBase--medium AssemblyButtonBase--padding"

// Events
var inputEvent = new Event('input', {
    bubbles: true,
    cancelable: true,
})

// ActiveValues
var lastQuestion = ""

// Dictionaries
var questionToAnswer = {}
var questionTypeToFunction = {}

// Arrays
var classList = [FLASHCARD_BUTTON_CLASS, OPTION_CLASS, INPUT_CLASS]
var questionTypeList = ["Flashcard", "MultiChoice", "Written"]

// HelperFunctions
function getElementList(className){
	return document.getElementsByClassName(className)
}

function getElement(className){
	return getElementList(className)[0]
}

function reEvaluate(){
	setTimeout(evaluatePage, 10)
}

// AnswerFunctions
questionTypeToFunction.Flashcard = function(questionElement, flashcardButton){
	questionElement.click()
	flashcardButton[0].click()
}

questionTypeToFunction.MultiChoice = function(questionElement, options){
	var question = questionElement.textContent
	var answer = questionToAnswer[question]

	if (answer){
		console.log("I know the answer!")
		console.log("The answer is " + answer)

		for (i = 0; i < options.length; i++){
			var option = options[i]

			console.log(option.textContent)

			if (option.textContent == answer){
				option.click()

				console.log("Clicking!")

				break
			}
		}
	} else {
		console.log("Don't know the answer")

		options[0].click()
		questionToAnswer[question] = getElement(CORRECT_OPTION_CLASS).textContent
	}
}

questionTypeToFunction.Written = function(questionElement, input){
	var answer = questionToAnswer[questionElement.textContent]

	if (answer){
		input = input[0]
		input.setAttribute("value", answer)
		input.dispatchEvent(inputEvent)
	}

	getElement(ANSWER_CLASS).click()
}

// MainFunction
function evaluatePage(){
	// Elements
	var correctOption = getElement(CORRECT_OPTION_CLASS)
	var neutralOption = getElement(NEUTRAL_OPTION_CLASS)
	var questionElement = getElement(QUESTION_CLASS)
	var continueButton = getElement(CONTINUE_CLASS)

	// Checks
	if (neutralOption){
		// We have just answered a written question.

		questionToAnswer[lastQuestion] = correctOption.textContent
	}

	if (continueButton){
		if (continueButton.textContent == "Study again"){
			alert("Quizletter has completed your test")

			return
		}
		
		continueButton.click()
		reEvaluate()

		return
	}

	if (correctOption){
		reEvaluate()

		return
	}

	for (i = 0; i < classList.length; i++){
		var questionType = questionTypeList[i]
		var elementList = getElementList(classList[i])

		if (elementList[0]){
			lastQuestion = questionElement.textContent
			questionTypeToFunction[questionType](questionElement, elementList)

			break
		}
	}

	reEvaluate()
}

// Calls
evaluatePage()