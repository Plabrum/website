# must import this to avoid numpy using thread limit on shared server
import os
os.environ['OPENBLAS_NUM_THREADS'] = '1'
from flask import Flask, render_template, request, flash, redirect
from config import *
# Import flask extension modules
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager, current_user, login_user, logout_user, login_required
from werkzeug.urls import url_parse

app = Flask(__name__)
app.config.from_object('config')
db = SQLAlchemy(app)
migrate = Migrate(app, db)
login = LoginManager(app)
login.login_view = 'login'

import emails, models
import pandas as pd 
import random as rand

from forms import ContactForm, LoginForm


coming_soon = True

@login.user_loader
def load_user(session_id):
    return User.query.get(int(session_id))

def read_in(filename):
	data = pd.read_csv('temp/'+str(filename))
	df = pd.DataFrame(data)
	return list(df.to_dict("index").values())

# @app.route("/kpa")
# def kpa():
# 	return render_template("kp-fellow.html")

@app.route("/", methods=('GET', 'POST'))
def index():
	# Prepare contact form
	form = ContactForm()

	if form.validate_on_submit() == True:
		form_data = (form.firstname.data, form.lastname.data, form.email.data, form.body.data)
		form_model = models.ContactForm(*form_data)
		flash("Thanks for contacting me!")
		emails.send_contact_email(*form_data)
		return redirect("/#contact")
	elif request.method == "POST":
		flash("Error sending the form, please verify the reCaptcha")
		return redirect("/#contact")
		
	# Show a coming soon screen on the server
	if coming_soon and (FLASK_ENV == "production"):
		return render_template("coming_soon.html", form=form)

	# Pull models in (currently from csv)
	projects = read_in("portfolio.csv")
	experiences = read_in("experience.csv")
	spotlight = rand.choice(projects)
	about_me = open('temp/about_me.txt', 'r').read()

	return render_template("index.html", projects=projects, experiences=experiences, 
		spotlight=spotlight, about_me=about_me, form=form)



@app.route('/admin')
@login_required
def admin():
	return render_template("admin.html")


@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    login_form = LoginForm()
    form = ContactForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user is None or not user.check_password(form.password.data):
            flash('Invalid username or password')
            return redirect(url_for('login'))
        login_user(user)
        next_page = request.args.get('next')
        if not next_page or url_parse(next_page).netloc != '':
        	next_page = url_for('index')
        return redirect(next_page)
    return render_template('login.html', login_form=login_form, form=form)

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))

# @app.route("/simple")
# def simple():
#     email_data = {"fname":"Phil", "body":"Hi Phil, how are you?"}
#     return render_template("mail/simple.html", email_data=email_data)

# @app.route("/admin")
# def admin():
# 	if logged_in:
# 		return render_template("admin_dashboard")
# 	else:
# 		return render_template("login.html")

# @app.route('/submit', methods=('GET', 'POST'))
# def submit():
#     form = MyForm()
#     if form.validate_on_submit():
#         return redirect('/success')
#     return render_template('submit.html', form=form)
# TODO:
# Put portfolio info on a second page

@app.route("/experience")
def experience():
	return redirect("static/data/resume.pdf")

'''

@app.route('/portfolio')
def portfolio():
	project_list = get_projects()
	return render_template("portfolio.html", project_list)

'''

# TODO:
# Ad blog functionality, database, users

'''

@app.route('/blog/<b_slug>')
def blog():
	post_slugs = post_slugs_list()
	if 'b_slug' == "":
		# serve the listing page if the b_slug is empty (i.e. just clicked the blog page)
		post_list = post_shortlist()
		return render_template("blog_listing.html")
	else if "b_slug" in post_list:
		# check if slug is the post lists, if yes then show that post
		post = get_post(b_slug)
		return render_template("post.html", post)
	else:
		# raise error that theres no post with that name, try search
		return render_template("blog_listing.html", error=("no_slug", "b_slug"))
'''
		
if __name__ == '__main__':
	app.run(debug=True)

