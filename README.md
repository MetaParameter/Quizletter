# Quizletter
Automatically completes the quizlet learning mode. Reformed from previous script, and now loops until the next question appears.

In terms of multiple-choice questions, it sees if the question has been answered before. If not, it will choose the first option, since it does not know the answer.

It will then get the element of the correct_option class and store its text as the answer. If it does know the answer, then it will iterate through the options, and see which option has
text that matches the correct answer, and then select that option.
