from flask import Blueprint, make_response, request, session
from app import db
# import ipdb
from app.models.game import Game
from app.models.comment import Comment
from app.models.user import User
from jose import JWTError, jwt
from datetime import datetime, timedelta


api = Blueprint('my_api', '_name_')


@api.route("/")
def index():
    return "<h1> Welcome To The 2000s Depot! </h1>", 201


def create_jwt_token(payload):
    # Your secret key (guard it with your life!)
    secret_key = 'supersecretkey'
    # Algorithm for token generation
    algorithm = 'HS256'
    token = jwt.encode(payload, secret_key, algorithm=algorithm)
    return token


def validate_jwt_token(token_to_validate):
    secret_key = 'supersecretkey'
    algorithm = 'HS256'
    try:
        token = token_to_validate.split(' ')[1]
        decoded_payload = jwt.decode(
            token, secret_key, algorithms=[algorithm])
        return True
    except JWTError:
        return False


@api.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        user_details = request.json
        user = User.query.filter_by(
            username=user_details.get("username")).first()
        if not user or user.password_hash != 'default_password':
            return {
                "error": "Incorrect password/username"
            }, 401
    return {
        "success": "User login successfully!!",
        "token": create_jwt_token({"user_name": user.username})
    }, 200


@api.route('/games', methods=['GET', 'POST'])
def games():
    token = request.headers.get('Authorization')
    if not validate_jwt_token(token):
        return {
            "error": "Incorrect credientials"
        }, 401

    if request.method == 'GET':
        # ipdb.set_trace()
        all_game_instances = Game.query.all()
        game_dict = [game.to_dict() for game in all_game_instances]
        return make_response(game_dict), 200

    elif request.method == 'POST':
        params = request.json
        user_id = 1
        if params.get('user_id'):
            user_id = params.get('user_id')
        new_game = Game(title=params["title"], description=params["description"],
                        release_date=params["release_date"], user_id=user_id)
                        
        db.session.add(new_game)
        db.session.commit()
        return make_response(new_game.to_dict(), 201)


@api.route('/games/<int:id>', methods=['GET'])
def game_by_id(id):
    token = request.headers.get('Authorization')
    if not validate_jwt_token(token):
        return {
            "error": "Incorrect credientials"
        }

    find_game = Game.query.get(id)
    if find_game:
        return make_response(find_game.to_dict())
    return {}


@api.route('/comments', methods=['GET', 'POST'])
def all_comments():
    token = request.headers.get('Authorization')
    if not validate_jwt_token(token):
        return {
            "error": "Incorrect credentials"
        }

    if request.method == 'GET':
        print('ok')
        comments = Comment.query\
            .join(Game, Comment.game_comment_id == Game.id)\
            .join(User, Comment.user_comment_id == User.user_id)\
            .all()
        
        comment_list = [comment.to_dict() for comment in comments]
        return make_response(comment_list, 200)

    elif request.method == "POST":
        params = request.json
        user_id = 1
        if params.get('user_id'):
            user_id = params.get('user_id')
        new_comment = Comment(title=params["title"], body=params["body"],
                              game_comment_id=params["game_comment_id"], user_comment_id=user_id)

        db.session.add(new_comment)
        db.session.commit()

        return make_response(new_comment.to_dict(), 201)


@api.route('/comments/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def comment_by_id(id):
    token = request.headers.get('Authorization')
    if not validate_jwt_token(token):
        return {
            "error": "Incorrect credientials"
        }

    comment = Comment.query.get(id)

    if request.method == 'PATCH':
        params = request.json

        for attr in params:
            setattr(comment, attr, params[attr])

        db.session.commit()
        return make_response(comment.to_dict(), 200)
    elif request.method == 'DELETE':
        db.session.delete(comment)
        db.session.commit()

        return make_response('', 204)
    elif request.method == 'GET':
        return make_response(comment.to_dict())
