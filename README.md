# JEOPARDAY! 

Description: This is a game app that gives you daily Jeoparday style questions! Once you've anwsered your daily set of questions you can then see your data visulized to track your progress on app. 

## What it does: 

#### 1. Upon opening the App for the first time in a calendar day, you'll be faced with the questions page, Simply Press "Play" to begin your first game. 

![](images/Jeoparday1.png)

#### 2. Every day you will recieve 5 questions from a Jeopardy Category to test your trvia chops (NO GOOGLING).

![](images/Jeoparday2.png)

#### 3. Once you are finished for the day it will display your score and offer to take you to your personal data page.

![](images/Jeoparday3.png)

#### 4. Your data page holds all your past game stats including your longest streak (Number of days played in a row), your  current streak, the number of 5/5 games you've had and the total number of games you've played.  The visulizations inclue a pie chart indicating the percentages of your daily scores and a scatter plot showing your score against time. Hovering over a dot will display the category you faced on that day. A line of best fit in included to help display a trend.

![](images/Jeoparday4.png)

#### 5. You can also choose a subsection of data to visulize (last 10 games for example). The pie chart and scatter plot will update accordingly.

![](images/Jeoparday5.png)

## Tech Stack

To make Jeoparday I used React with create-react-app and used local storage to hold the user data.  The scatter plot and pie chart were made using C3 and react-c3js respectively. All of the information for the questions and anwsers came from the [jService API](http://jservice.io/).

## Installation

At the moment the only way to play Jeoparday is to clone this repo on your computer run npm 
