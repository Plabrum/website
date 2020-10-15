from app import app
import flask_mail
from threading import Thread
from config import MAIL_USR, MAIL_PSW

app.config.update(
    MAIL_SERVER='mail.plabrum.com',
    MAIL_PORT=465,
    MAIL_USE_SSL=True,
    MAIL_USERNAME = MAIL_USR,
    MAIL_PASSWORD = MAIL_PSW
    )

mail = flask_mail.Mail(app)

# msg = flask_mail.Message("Hello", sender="labrust4phil@gmail.com", recipients=["philip.labrum@gmail.com"])

def async_(f):
	def wrapper(*args, **kwargs):
		thr = Thread(target=f, args=args, kwargs=kwargs)
		thr.start()
	return wrapper

@async_
def send_async_email(app, msg):
    with app.app_context():
        mail.send(msg)

def send_email(subject, sender, recipients, text_body):
    msg = flask_mail.Message(subject, sender=sender, recipients=recipients)
    msg.body = text_body
    send_async_email(app, msg)