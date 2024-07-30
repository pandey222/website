from flask import Flask, request
import boto3

app = Flask(__name__)
sns_client = boto3.client('sns')

@app.route('/send_notification', methods=['POST'])
def send_notification():
    data = request.json
    message = f"Flight {data['flightNumber']} status updated to {data['status']}"
    response = sns_client.publish(
        PhoneNumber=data['phone'],
        Message=message
    )
    return {"message": "Notification sent", "response": response}

if __name__ == '__main__':
    app.run(port=5000)
