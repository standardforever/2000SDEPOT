from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from app import db, bcrypt

class Category(db.Model, SerializerMixin):
    __tablename__ = 'categories'

    serialize_rules = ('-games.categories',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=True)

    game_categories = db.relationship('GameCategory', back_populates='category')
    games = association_proxy('game_categories', 'games')


class GameCategory(db.Model):
    __tablename__ = 'game_categories'

    id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'))
    game_category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))

    game = db.relationship('Game', back_populates='game_categories')
    category = db.relationship('Category', back_populates='game_categories')
