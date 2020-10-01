# website
Personal Website displaying resume and projects.

Design choices:
Why SQL alchemy? Why use on ORM at all, why not write at the database connector level? why use mysql over Postgres?


This website is likely going change and develop several times as I improve my skills. I want to try and minimize the amount of code rewriting when I want to change an underlying technology.

Framework: In the past I used a django framework, but I wanted a lighter framework for this project - it will likely not need to be as production ready as my last use cases. 

Database: Although my experience is with Postgres databases, I am choosing to use mysql because it comes including in my namecheap hosting plan (I have time to learn but not money to spend)

ORM: I am choosing to use SQL alchemy due to it's cross compatibility across postgres and mysql as well as flask and django. 

With these design choices, the website should be modular enough to change either the framework or database without having to do 'major' rewrites. 
