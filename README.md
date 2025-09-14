# Lister Web

This is a web app designed to work alongside the [Lister Java App](https://github.com/jamesL103/ListerApp). The server provides synchronization of the task lists across devices.

# Data Storage

The server tracks individual users and stores their list data in a MySQL database. As of right now, the target MySQL database must be self-hosted on XAMPP.

# Synchronizing Data

The main page of the app provides a function to generate a unique ID. 

In the Java application, press the 'activate sync' button, and enter your ID.

You can choose to use your local list data or the server data as your up-to-date data for all machines.