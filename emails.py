from app import app, render_template
import flask_mail
from threading import Thread
from config import MAIL_USR, MAIL_PSW

app.config.update(
    MAIL_SERVER='mail.plabrum.com',
    MAIL_PORT=465,
    MAIL_USE_SSL=True,
    MAIL_SUPPRESS_SEND= True,
    MAIL_USERNAME = MAIL_USR,
    MAIL_PASSWORD = MAIL_PSW
    )

mail = flask_mail.Mail(app)

def async_(f):
	def wrapper(*args, **kwargs):
		thr = Thread(target=f, args=args, kwargs=kwargs)
		thr.start()
	return wrapper

@async_
def send_async_email(msg_ls):
    with app.app_context():
        with mail.connect() as conn:
            for msg in msg_ls:
                conn.send(msg)
def send_emails(email_ls):
    msg_ls = []
    for email in email_ls:
        msg = flask_mail.Message(email.subject, sender=email.sender, recipients=email.recipients)
        if email.html_body == None:
            msg.body = email.text_body
        elif email.text_body == None:
            msg.html = email.html_body
        msg_ls.append(msg)
    send_async_email(msg_ls)

# Email form {subject: "", sender: "", recipients:"", text_body:"", html_body:""}
def send_contact_email(fname, lname, email, body):
    with app.app_context():
        rendered_body = render_template("mail/simple.html", email_data={"fname":fname, "body":body})
    contacter = Email(subject="Thank You for Contacting!", sender="hello@plabrum.com", recipients=[email],
                     text_body=None, html_body=rendered_body)
    to_me = Email(subject="Message from Website", sender="hello@plabrum.com", recipients=["philip.labrum@gmail.com"], 
                text_body=(fname+" "+lname+ " from "+email+" sent the following: "+body), html_body=None)
    send_emails([contacter, to_me])

class Email:
    def __init__(self, subject, sender, recipients, text_body, html_body):
        self.subject = subject
        self.sender = sender
        self.recipients = recipients
        self.text_body = text_body
        self.html_body = html_body

# @async_
# def send_async_email(app, msg):
#     with app.app_context():
#         mail.send(msg)

# def send_email(subject, sender, recipients, text_body):
#     msg = flask_mail.Message(subject, sender=sender, recipients=recipients)
#     msg.body = text_body
#     send_async_email(app, msg)
