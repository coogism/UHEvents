We don't have node modules installed on our frontend folder, so please cd into your frontend folder and execute this command in your terminal
npm i
to install all dependencies for your React app

=========================================================
Writing this out incase anyone is running into errors running UHEvents flask environment

You will need to activate a virtual environment to run flask. First, cd into your backend folder
Cd backend
Py -m venv .venv

Now that you have created the virtual environment folder, we need to activate it.
.venv\Scripts\activate 

To install flask, run 
Pip install flask

You will also need to download the following dependencies (still in backend folder)
pip install waitress
pip install requests
