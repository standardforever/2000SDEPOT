from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData

#instatiate flask
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI']= 'sqlite:///games.db'
app.config['SQLALCHEMY_TRACK_NOTIFICATIONS'] = False


metadata = MetaData(naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    })

#new instance of SQLALCHEMY class
db = SQLAlchemy(metadata=metadata)

# config db with flask app
db.init_app(app)

migrate = Migrate(app,db)

#instatiate bcrypt
bcrypt = Bcrypt(app)


from app.models.user import User
with app.app_context():
    db.create_all()
    User.create_default_user()

from app.route.api import api
app.register_blueprint(api, url_prefix='/api')

