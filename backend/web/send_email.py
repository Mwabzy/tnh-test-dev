import requests
import msal
from django.conf import settings
from django.utils import timezone
import logging
import re

logger = logging.getLogger(__name__)  # Initialize logger
EMAIL_REGEX = re.compile(r"[^@]+@[^@]+\.[^@]+")


def get_access_token():
    """Get an access token from Microsoft Identity Platform."""
    authority = f"https://login.microsoftonline.com/{settings.MICROSOFT_TENANT_ID}"
    app = msal.ConfidentialClientApplication(
        settings.MICROSOFT_CLIENT_ID, 
        settings.MICROSOFT_CLIENT_SECRET, 
        authority=authority
    )

    token = app.acquire_token_for_client(scopes=["https://graph.microsoft.com/.default"])

    if "access_token" in token:
        return token["access_token"]
    else:
        logger.error(f"❌ Failed to acquire access token: {token}", exc_info=True)
        raise Exception("Could not get access token: " + str(token))

# Microsoft Graph API URL
GRAPH_API_URL = f"https://graph.microsoft.com/v1.0/users/{settings.MICROSOFT_EMAIL_SENDER}/sendMail"

def send_email(recipient_email, subject, body, cc_emails=None):
    """Send an email using Microsoft Graph API."""
    try:
        access_token = get_access_token()  # Get token from settings

        # Normalize recipients to list
        to_emails = [recipient_email] if isinstance(recipient_email, str) else recipient_email or []
        cc_emails = [cc_emails] if isinstance(cc_emails, str) else (cc_emails or [])

        # Validate emails
        to_emails = [email for email in to_emails if EMAIL_REGEX.fullmatch(email)]
        cc_emails = [email for email in cc_emails if EMAIL_REGEX.fullmatch(email)]

        if not to_emails:
            logger.warning("❌ No valid recipient emails provided. Email not sent.")
            return

        message = {
            "subject": subject,
            "body": {"contentType": "HTML", "content": body},
            "from": {"emailAddress": {"address": settings.MICROSOFT_EMAIL_SENDER}},
            "toRecipients": [{"emailAddress": {"address": email}} for email in to_emails],
        }

        # Add CC if provided
        if cc_emails:
            message["ccRecipients"] = [{"emailAddress": {"address": email}} for email in cc_emails]

        email_message = {"message": message}

        headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json",
        }

        response = requests.post(GRAPH_API_URL, json=email_message, headers=headers)

        if response.status_code == 202:
            logger.info(f"✅ Email sent to {to_emails} (CC: {cc_emails}) at {timezone.now()}")
        else:
            logger.error(f"❌ Failed to send email to {to_emails} at {timezone.now()}. "
                         f"Status: {response.status_code}, Response: {response.text}")

    except Exception as e:
        logger.error(f"❌ Exception occurred while sending email to {recipient_email} at {timezone.now()}: {e}", exc_info=True)
