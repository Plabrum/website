# must import this to avoid numpy using thread limit on shared server
import os
os.environ['OPENBLAS_NUM_THREADS'] = '1'

from flask import Flask, render_template
import pandas as pd 
import random as rand 

app = Flask(__name__)

# TEMP
# def read_in(filename):
# 	reader = csv.DictReader(open('temp/'+str(filename), mode='r'))
# 	dictlist = []
# 	for line in reader:
# 		dictlist.append(line)
# 	return dictlist

def read_in(filename):
	data = pd.read_csv('temp/'+str(filename))
	df = pd.DataFrame(data)
	return list(df.to_dict("index").values())

@app.route('/')
def index():
	projects = read_in("portfolio.csv")
	experiences = read_in("experience.csv")
	spotlight = rand.choice(projects)
	about_me = open('temp/about_me.txt', 'r').read()
	return render_template("home.html", projects=projects, experiences=experiences, spotlight=spotlight, about_me=about_me)


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

