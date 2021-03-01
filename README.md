# Flask and create-react-app

## Requirements
1. `npm install`
2. `pip install -r requirements.txt`

## Setup
1. Run `echo "DANGEROUSLY_DISABLE_HOST_CHECK=true" > .env.development.local` in the project directory

## Run Application
1. Run command in terminal (in your project directory): `python app.py`
2. Run command in another terminal, `cd` into the project directory, and run `npm run start`
3. Preview web page in browser '/'

## Known problems
1. Socketio when being used on heroku had a response time that was so slow I thought I messed up deploying it.
2. There was an issue where the second players goes first but that can be debugged.


## Technical Issues
1. Had a difficult time figuring out how to display the playerlist and how to calculate a winner/tie.
2. There were some issues with the app.py not properly communicating with the App.js file.
