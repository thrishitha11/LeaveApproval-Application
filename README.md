# LeaveApproval-Application      
PROBLEM STATEMENT:
Create an app that makes it easy for employees to request time off and for managers to approve or deny those requests. Right now, the way many companies handle leave approvals is slow and confusing, causing delays and mistakes. This app should simplify the process, keeping everyone in the loop and making sure it follows company rules. The goal is to make taking time off hassle-free for employees and managing leave straightforward for managers.

AWS SERVICES USED:
•	Amazon S3: Scalable object storage for data of any kind.
•	Amazon API Gateway: Creates a single endpoint for your APIs.
•	Amazon DynamoDB: NoSQL database for fast and scalable applications.
•	Lambda: Serverless compute service that lets you run code without provisioning or managing servers.
•	IAM: Controls who can access what AWS resources.
•	Amazon SNS: Delivers messages to different destinations like email, mobile apps, and more.
•	Amazon SES: Sends transactional email at scale.

BREIF DESCRIPTION:
The Leave Approval App is like a super helpful tool for employees and bosses. Instead of filling out confusing forms, employees can just use the app to ask for time off. The app makes sure everything follows the company rules, and bosses can easily see and decide whether to say 'yes' or 'no.' Everyone gets quick updates on what's happening with the requests, so there's no confusion. This makes taking time off stress-free for employees, and bosses can manage leaves without any hassle. The app is like a smart assistant, making the whole process easy, fast, and clear for everyone in the company.

PROCEDURE:

IAM Role Creation:
In AWS IAM, select "Roles" then "Create role", choose Lambda as the service, attach policies like AWSLambdaBasicExecutionRole, and optionally AmazonDynamoDBFullAccess and AmazonSNSFullAccess. Finally, name the role, add tags if needed, and create it for enabling Lambda functions with requisite permissions. 
S3 Bucket Creation:
Create a S3 bucket ,to upload the files of the frontend and in properties enable the static website hosting
 
API Gateway Setup:
In AWS API Gateway, select "Create API", choose "HTTP API", and name your API. Then, add a POST method integrating with a Lambda function and deploy the API to a stage for use.

DynamoDB Table Creation:
In AWS DynamoDB, create a table named "LeaveRequests" with a primary key "EmployeeID" (String) and define optional attributes such as LeaveStartDate, LeaveEndDate, Reason, Status, and ManagerEmail. Set the initial status to "Pending" and create the table.
 
Set Up Amazon SES for Email Notifications :
If email notifications are preferred, configure Amazon SES to send email notifications to stakeholders upon receiving leave approval requests.
Integrate SES with Lambda to send emails programmatically based on specific conditions.
 
Set Up Amazon SNS Topic:
Create an Amazon SNS topic for leave approval notifications in the AWS Management Console.
Define subscriptions for relevant stakeholders (e.g., managers, HR personnel) to receive notifications.
 
Lambda Function Setup:
In AWS Lambda, create a function named "LeaveApprovalFunction" using Python 3.8 runtime and assign the previously created role.

CONCLUSION:
By leveraging AWS services like API Gateway, Lambda, DynamoDB, and IAM, this project has established a foundation for a scalable and secure leave approval application. Further development on the front-end user interface and integration with notification services like SNS/SES will complete the application for real-world use.
