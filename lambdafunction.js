import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('LeaveRequests')
sns_topic_arn = 'arn:aws:sns:us-east-1:768083852842:Leave-Approval-Notifications'
ses_sender_email = 'thrishitha11@gmail.com'
s3_bucket_name = 'myleaveappbucket'

def send_notification_sns(employee_id, manager_email, status):
    boto3.client('sns').publish(TopicArn=sns_topic_arn, Message=f"Leave request for EmployeeID: {employee_id} has been {status}", Subject="Leave Approval Notification")

def send_notification_ses(manager_email, status):
    boto3.client('ses').send_email(Source=ses_sender_email, Destination={'ToAddresses': [manager_email]}, Message={'Subject': {'Data': "Leave Approval Notification"}, 'Body': {'Text': {'Data': f"Leave request has been {status}."}}})

def lambda_handler(event, context):
    data = json.loads(event['body']) if isinstance(event['body'], str) else event['body']
    item = {'EmployeeID': data['EmployeeID'], 'LeaveStartDate': data['LeaveStartDate'], 'LeaveEndDate': data['LeaveEndDate'], 'Reason': data['Reason'], 'Status': 'Approved', 'ManagerEmail': data['ManagerEmail']}
    table.put_item(Item=item)
    send_notification_sns(item['EmployeeID'], item['ManagerEmail'], item['Status'])
    send_notification_ses(item['ManagerEmail'], item['Status'])
    return {'statusCode': 200, 'body': json.dumps('Leave request processed successfully!')}

def lambda_handler_s3(event, context):
    data = json.loads(boto3.client('s3').get_object(Bucket=event['Records'][0]['s3']['bucket']['name'], Key=event['Records'][0]['s3']['object']['key'])['Body'].read().decode('utf-8'))
    return lambda_handler({'body': data}, context)