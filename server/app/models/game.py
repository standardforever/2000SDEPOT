from app import db, bcrypt 
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy


class Game(db.Model, SerializerMixin):
    __tablename__ = 'games'

    # serialize_rules= ('-user.games','-comments.games','-comments.game_comment_id','-categories', )
    
    id = db.Column(db.Integer , primary_key=True, autoincrement=True) 
    title = db.Column(db.String(50))
    description = db.Column(db.String(500))
    release_date = db.Column(db.Integer)
  
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    user = db.relationship('User', back_populates='games')

    game_categories = db.relationship('GameCategory', back_populates='game')
    categories = association_proxy('game_categories', 'category')
    
    # comments = db.relationship('Comment', back_populates='games')
    fav_games = db.relationship('FavGames', back_populates='game')  # Updated back reference here
    favorite_users_proxy = association_proxy('fav_games', 'user')
    created_at = db.Column(db.DateTime, server_default= db.func.now())

    def to_dict(self):
        return {'id': self.id, 'title': self.title, 'description': self.description, 'release_date': self.release_date, 'created_at': self.created_at} 

