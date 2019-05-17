<#git clone git://github.com/mongolab/hello-mongoose.git
cd hello-mongoose#>
heroku create
heroku addons:add mongolab
git push heroku master
heroku open