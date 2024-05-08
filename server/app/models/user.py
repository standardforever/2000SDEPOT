from app import db, bcrypt
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

class User(db.Model, SerializerMixin):
    __tablename__='users'

    serialize_rules= ('-comments.user', '-comments.game_comment_id','-comments.user_game-id', '-password_hash', )

    user_id= db.Column(db.Integer, primary_key=True)
    first_name= db.Column(db.String(50))
    last_name= db.Column(db.String(50))
    username= db.Column(db.String, nullable=False)
    password_hash = db.Column(db.String, nullable =False)
    created_at = db.Column(db.DateTime, server_default= db.func.now())

    # comments = db.relationship('Comment', back_populates = 'user')
    games = db.relationship('Game', back_populates='user')
    fav_games = db.relationship('FavGames', back_populates= 'user')
    fav_games_proxy = association_proxy('fav_games', 'games')


    @staticmethod
    def create_default_user():
        # Check if the default user already exists
        default_user = User.query.filter_by(username='default_user').first()
        if not default_user:
            # Create a new default user
            default_user = User(
                username='default_user',
                first_name='Default',
                last_name='User',
                # Set a default password (you might want to change this)
                password_hash='default_password'
            )
            db.session.add(default_user)
            db.session.commit()
            print("Default user created successfully.")
        else:
            print("Default user already exists.")
