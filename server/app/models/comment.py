from app import db, bcrypt
from sqlalchemy_serializer import SerializerMixin

class Comment(db.Model, SerializerMixin):

    __tablename__ = 'comments'

    # serialize_rules= ('-games.comments', )
    id= db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50))
    body = db.Column(db.String(555), nullable=False)
    
    game_comment_id= db.Column(db.Integer, db.ForeignKey('games.id') )
    user_comment_id= db.Column(db.Integer, db.ForeignKey('users.user_id'))
    user = db.relationship('User', back_populates= 'comments')
    
    # games = db.relationship('Game', back_populates='comments')


    def __repr__(self):
        return f'<Comment id={self.id}, game_comment_id={self.game_comment_id}, user_comment_id={self.user_comment_id}, title={self.title}, body={self.body}>'

