from flask_wtf import FlaskForm, RecaptchaField
from wtforms import BooleanField, StringField, TextField, PasswordField, validators, SubmitField
# from config import RECAPTCHA_PUBLIC_KEY, RECAPTCHA_PRIVATE_KEY

class ContactForm(FlaskForm):
	firstname = StringField('First Name', validators=[validators.DataRequired()])
	lastname = StringField('Last Name', validators=[validators.DataRequired()])
	email = StringField('Email Address', validators=[validators.DataRequired()])
	body = TextField('Message', validators=[validators.DataRequired()])
	recaptcha = RecaptchaField()
	submit = SubmitField('Submit')