from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template("home.html")


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

