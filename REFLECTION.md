### Overview of the desing:  
  
The functionalities that have been implemented are the ones defined in  
'Requirements for passing' -section of the project handout. The requirements defined in   
'Requirements for passing with merits' -section are NOT completely implemented.  
  
## User-interface (programming-ui):  
  
The ui is implemented as a SPA-app.  
  
Using the app:  
  
When a user opens the application frontpage a programming assingment is presented. User can then type the solution to a textbox and submit it. When a user submits the solution, the status of the grading is polled and the feedback is rendered when the grading finishes. If the solution passes the tests done by the grader-api a button for retrieving the next assingment appears. User can then press the button and the next assingment is presented. If the solution is incorrect, the feedback of the tests are shown to the user.  
  
User is identified with a Universally Unique Identifier (uuid). The assingments are presented in a spesific order and the user can return to the next unsolved assigment if he/she for example closes the browser.  
  
## Backend (programming-api)  
  
-The backend is a simple deno-application that handles the requests sent from the ui and from the grader-api.  
-The app uses a postgresql database for saving the data.  
-The database queries are cached to improve performance.  
-The solution feedback that is sent from the grader-api is checked for correct or incorrect solution and then saved to the database.  
  
## grader-api  
  
When a solution is submitted, the programming-api sends the solution to be graded by the grader-api. The solutions are added to a queue which is processed sequentially. The grader-api creates a docker container and which runs tests against the solution and the sends the feedback back to the programming-api.  
  
### Possible improvements:  
  
programming-ui:  
-The polling could be switched to server-sent events.  
-Implementing the possibility to use TAB inside the textbox  
-rows in the textbox are numbered and highlighted with different colours.  
  
programming-api:  
-The indexing of the database could be tested, studied and possibly improved  
  
grader-api:  
The queue could be implemented in a better way. It is now implemented as a simple js-array.  






