# must import this to avoid numpy using thread limit on shared server
import os
os.environ['OPENBLAS_NUM_THREADS'] = '1'
from flask import Flask, render_template, request, flash, redirect
from config import *

app = Flask(__name__)
app.config.from_object('config')
import pandas as pd 
import random as rand
from emails import send_contact_email, send_emails
from forms import ContactForm

coming_soon = True

def read_in(filename):
	data = pd.read_csv('temp/'+str(filename))
	df = pd.DataFrame(data)
	return list(df.to_dict("index").values())

@app.route("/", methods=('GET', 'POST'))
def index():
	# Prepare contact form
	form = ContactForm()

	# Show a coming soon screen on the server
	if coming_soon and (FLASK_ENV == "production"):
		return render_template("coming_soon.html", form=form)

	# Pull models in (currently from csv)
	projects = read_in("portfolio.csv")
	experiences = read_in("experience.csv")
	spotlight = rand.choice(projects)
	about_me = open('temp/about_me.txt', 'r').read()

	if form.validate_on_submit() == True:
		flash("Thanks for contacting me!")
		print("success")
		send_contact_email(form.firstname.data, form.lastname.data, form.email.data, form.body.data)
		return redirect("/#contact")

	return render_template("home.html", projects=projects, experiences=experiences, 
		spotlight=spotlight, about_me=about_me, form=form)


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

