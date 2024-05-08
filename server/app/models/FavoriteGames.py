from app import db
from sqlalchemy_serializer import SerializerMixin

class FavGames(db.Model, SerializerMixin):
    __tablename__ = 'fav_games'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'))

    user = db.relationship('User', back_populates='fav_games')
    game = db.relationship('Game', back_populates= 'fav_games')