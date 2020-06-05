
#ReadMe#

#Installation:#

This is a Node.js module available through the npm registry.
URL: https://nodejs.org/en/

Before installing, download and install Node.js. Node.js version 8 or higher is required.
Installation is done using the npm install command:

$ Run 'npm install' command under server and ui folder.
$ Run 'node app.js' command under server folder to start the application.

Note: if you are using VS-Code please press F5 to run application(optional) and run react app under the folder ui - using the command 'npm run start'. 



#Note:#
Please download sqlite3 for windows using below link, Incase you want to perform DDL and DML statement through command line.

https://www.sqlite.org/download.html


Description of application:

1) ui: UI developed using REACT-REDUX
   This is the React part for creating the bugets and transactions. Basic input validations are in place.

2) Node Express REST-Services are storing the data in below sqlite tables: 
   * tbl_budget
   * tbl_transactions
   * tbl_category
   Table schemas you can find in the file 'schema.sql' under the folde server/data.

3) Node express API's: These are the API's consumed from react ui application.


#Configurations#
1)Server application:
	All configurations for running application is under .env file.
	Please note that you may need to change the path for below parameter according to your file location(in your local system)
	* db current location: D:\\EPG\\Linoy\\Lab\\BudgetManagement\\server\\data\\budgetmanagement.db need to change to your system local path.
	
2) React application#
   All configurations for running application is under webpack.config file.