# Groupproject_HWSet
Welcome to the apadProject_haas wiki!


Team Members:
 
1. Angel
2. Bo
3. Chad
4. Jose
5. Mayank

Tools used: 

React js
Flask (Python)
Heroku
Github
Jira
MongoDb

Sprint Velocity: 
1 week sprint cycle



Project Plan:

1. Requirement Gathering and creating stories (_we will do it together_)
2. Creating login Page (login and create account option)
3. Creating the Dashboard (create project, search project, show user projects)
4. Resource Management (Checking in and out resources)
5. Creating database (Users, projects and resources)
6. Creating API's to exchange data between client and server
6. Deploying and hosting the project (_we will do it together_)

# Features

### Frontend
1. Allow user to login or create account
2. Allow user to create new project or be added to existing project using projectID
3. Allow user to check out assets
4. Allow user to check in assets
5. Prompt user with error message if they check out too many assets
6. Prompt user with a success message if they checked out appropriate assets
7. Prompt user with success message when they check in assets
8. Allow user to specify the amount of assets they want to check in/out
9. Allow user to navigate between pages with navigation bar
10. Allow the user to log out of account

Jose:
1. Allow users to sign in using their userid and password, granting them access to their accounts and project management capabilities.
2. Allow users to click on "New User" and enter a new userid and password, facilitating the creation of new accounts for managing projects.
3. Allow users to create new projects by providing project name, description, and projectID, enabling effective organization and tracking of 
   projects.
4. Allow users to view a list of existing projects and choose to log in to a specific project, allowing them to resume work on previously 
   created projects.
5. Allow the system to store user information and project details securely in a database, ensuring data integrity and accessibility.
6. Allow the implementation of an API to provide authorized access to user and project information stored in the database, enabling 
   interaction with the data from external systems or applications.
7. Allow the encryption of userids and passwords to enhance security and protect sensitive user information.
8. Allow users to reset their passwords in case they forget them, providing a mechanism to regain access to their accounts.
9. Allow system administrators to manage user accounts, including creating, updating, and deleting user profiles, ensuring system integrity 
   and user management.
10. Allow users to log out from their accounts, ensuring the secure closure of their sessions and preventing unauthorized access to their 
   projects.

### Backend
1. User Authentication: Implement user registration, login, and logout functionality to secure the application and identify users.
2. Database Integration: Connect the backend to a database (MongoDB) to store user data, project details, and resource information.
3. API Endpoints: Create APIs for essential CRUD (Create, Read, Update, Delete) operations for managing users, projects, and resources.
4. Input Validation: Implement basic validation to ensure that data entered by users is correct and prevent common security vulnerabilities.
5. Error Handling: Handle errors and exceptions to provide meaningful error messages and prevent application crashes.
6. Session Management: Maintain user sessions to keep users authenticated and provide a personalized experience.
7. Security Measures: Implement basic security measures like encryption to protect user data.
8. Logging: Set up logging functionality to track important events and troubleshoot issues.
9. Deployment: Deploy the backend application to a hosting platform (e.g., Heroku) to make it accessible over the internet.
10. Documentation: Provide basic documentation for the backend APIs, including descriptions of endpoints, expected parameters, and responses.


### Database
1. The solution should utilize MongoDB as the document database engine, hosted in the cloud environment.
2. The data should be organized into logical collections and individual documents within each collection.
3. It is important to have a clear and up-to-date diagram illustrating the structure of each collection and its properties. This will help understand the data model and facilitate future development and maintenance.
4. Each collection and its properties should have accompanying metadata describing each document's purpose and content. This metadata should be easily accessible and maintained to ensure accurate documentation.
5. Security measures must be implemented to encrypt sensitive data, particularly credentials, stored in the database. This will help protect the data from unauthorized access or exposure.
6. To ensure efficient query performance, proper indexing strategies should be considered based on the analysis of the anticipated queries. Indexes should be created for frequently executed queries and optimized to improve response times.
7. Scalability should be a key consideration, allowing the solution to handle increasing amounts of data and user load over time. 


_**Based on the above work items following epics has been defined. The epics are subject to change as the team progresses with the project.**_

The epics has user stories, both can be found on jira in the given link. 
https://apadproject.atlassian.net/jira/software/projects/HSP/issues/

**Epic 1**: Designing the project and development of the Home page 

Design the wireframe and UI of the entire haas application. Develop the home page of the application to describe the project and navigate between admin page (for admin control and resource management) user login.

Acceptance Criteria 1:
Given: The user intends to open the url.
When: When the user opens the url on browser.
Then: The user is shown the home page of the application with all the information, input boxes and buttons.

Acceptance Criteria 2:
Given: The user clicks on admin login button.
When: The user enters the correct credentials for admin login
Then: The user is taken to the admin dashboard.

Acceptance Criteria 3:
Given: The user intends to login to the respective account.
When: The user clicks on the user login button.
Then: The user is taken to the user login page.

**Epic 2**: Develop a sign-in area where users can sign in by providing their userid and password.

A sign-in area where users can sign in by providing their user-id and password. If the user clicks on New User, display a pop-up that allows them to enter a new user-id and password. If the user enter the wrong password an error message is displayed.

Note: Please consider the the validation on the frontend side as part of development, it will not be mentioned explicitly. 

Acceptance Criteria 1:
Given: A user is on the sign-in/sign-up page.
When: The user enters the correct user-id and password.
Then: The user is logged in and the dashboard for assigned account is shown to the user. 



Acceptance Criteria 2:
Given: A user is on the sign-in/sign-up page.
When: The user enters the correct user-id and wrong password.
Then: The user is shown a wrong password message. 



Acceptance Criteria 3:
Given: A user is on the sign-in/sign-up page.
When: The user enters the non existing user-id.
Then: The user is shown a message conveying that the account is not present and the user is asked if the user need to create a new account. If the selected yes the user is taken to the signup page else, the user is taken back to sign in page. 



Acceptance Criteria 4:
Given: A user is on the sign-in/sign-up page.
When: The user clicks on the new user button.
Then: The user is taken to the sign-up page.

**Epic 3**: Develop a dashboard and user account pages to perform user activities

Deign and Develop a dashboard where users can create new projects, by providing project name, description, and projectID also can choose to login to existing projects.

Note: Please consider the the validation on the frontend side as part of development, it will not be mentioned explicitly. 

Acceptance Criteria 1:
Given: The user has enter the user id and password to sign in.
When:  The user is  verified and signed in into the account.
Then: The user is shown the respective dashboard page with all the user information and sections to create new project and open an existing project.

Acceptance Criteria 2:
Given: A user has successfully logged in to the account.
When: The user enters tries to create a new project and enters the details (name, description and projected). For existing project id entered here , the user will be conned the message and asked to re enter the project id.
Then: A new project is created and the resource information for the new project is displayed.

Acceptance Criteria 3:
Given: A user has successfully logged in to the account.
When: The user enters tries to login to an existing project and enters the existing project id.
Then: A user is taken to the resource information page for the project.

Acceptance Criteria 4:
Given: A user has successfully logged in to the account.
When: The user enters tries to login to an existing project and enters the non-existing project id.
Then: A user is conveyed the message ”The project does not exist”.

**Epic 4**: Design and develop account management page and Sign out button

Design and develop account manager page where user can view and edit all his personal details, userid and password.

Note: Please consider the the validation on the frontend side as part of development, it will not be mentioned explicitly. 

Acceptance Criteria 1:
The user is directed to account manager page when the account manage icon is clicked. The user is able to view his personal details.

Acceptance Criteria 2:
Regarding edit functionality( needs to be discussed)

Acceptance Criteria 3:
Clicking the sign-out button logs out the user and takes to the home page.

# UI Sketch
[Project Sketch.pdf](https://github.com/mayankt153/apadProject_haas/files/12065395/Project.Sketch.pdf)

 
