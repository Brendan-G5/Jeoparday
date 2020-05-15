# JEOPARDAY! 

Description: This is a game app that gives you daily Jeoparday style questions! Once you've anwsered your daily set of questions you can then see your data visulized to track your progress on app. 

## What it does: 

#### 1. Upon opening the App for the first time in a calendar day, you'll be faced with the questions page, Simply Press "Play" to begin your first game. 

![](images/Jeoparday1.png)

#### 2. Every day you will recieve 5 questions from a Jeopardy Category to test your trvia chops (NO GOOGLING).

![](images/Jeoparday2.png)

#### 3. Once you are finished for the day it will display your score and offer to take you to your personal data page.

![](images/Jeoparday3.png)

#### 4. Your data page holds all your past game stats including your longest streak (Number of days played in a row), your  current streak, the number of 5/5 games you've had and the total number of games you've played.  The visulizations inclue a pie chart indicating the percentages of your daily scores and a scatter plot showing your score against time. A line of best fit in included to help display a trend.

![](images/Jeoparday4.png)

#### 5. You can also choose a subsection of data to visulize (last 10 games for example). The pie chart and scatter plot will update accordingly.

![](images/Jeoparday5.png)
This app was created using create-react-app and local storage to hold the data.  The charts were made with C3 and react-c3js. Quesitions and answers come from the jService API.

To Demo the app, clone the repo and run npm start from the root directory. You can then play your first day of Jeoparday! (Getting the chrome extension will be easier once it is up)
