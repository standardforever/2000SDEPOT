from app import app, db
from app.models.game import Game, db
from app.models.comment import Comment, db
from app.models.GameCategory import GameCategory, db
from app.models.FavoriteGames import FavGames, db
from app.models.user import User, db
from random import randint, choice as rc
from app import  app




if __name__ == '__main__':
    with app.app_context():
        print("Starting seed for categories...")
                # Seed code goes here!
        categories_data = [
                    {"name": "Action"},
                    {"name": "Racing"},
                    {"name": "Farm Life"},
                    {"name": "Cartoon"},
                ]

        for category_info in categories_data:
            category = GameCategory(**category_info)
            db.session.add(category)

        db.session.commit()
        print("Seed for categories completed successfully!")






#         Game.query.delete()
#         Comment.query.delete()
#        # Replies.query.delete()
#         User.query.delete()
#         db.session.commit()
        

#         #create game instances 
#         halo_combat_evolved = Game(title='Halo: Combat Evolved', description='Halo: Combat Evolved is a 2001 first-person shooter video game developed by Bungie and published by Microsoft Game Studios. It is the first game in the Halo series and follows the story of Master Chief, a supersoldier who fights against the alien Covenant on the ringworld known as Halo.', release_date=2001, created_at='04/12/2024')
#         final_fantasy_x = Game(title='Final Fantasy X', description='Final Fantasy X is a 2001 role-playing video game developed and published by Square for the PlayStation 2. It follows the story of Tidus, a young athlete transported to the world of Spira, where he joins a group of adventurers on a quest to defeat the monstrous creature known as Sin.', release_date=2001, created_at='04/12/2024')
#         wind_waker = Game(title='The Legend of Zelda: The Wind Waker', description='The Legend of Zelda: The Wind Waker is a 2002 action-adventure game developed and published by Nintendo for the GameCube. It follows the adventures of Link as he sets out to rescue his sister and defeat the evil sorcerer Ganondorf in a vast, cel-shaded world.', release_date=2002, created_at='04/12/2024')
#         gta_vice_city = Game(title='Grand Theft Auto: Vice City', description='Grand Theft Auto: Vice City is a 2002 action-adventure game developed by Rockstar North and published by Rockstar Games. It is the fourth main entry in the Grand Theft Auto series and is set in the fictional Vice City, based on Miami, during the 1980s. Players control Tommy Vercetti as he rises to power in the criminal underworld.', release_date=2002, created_at='04/12/2024')
#         world_of_warcraft = Game(title='World of Warcraft', description='World of Warcraft is a 2004 massively multiplayer online role-playing game developed and published by Blizzard Entertainment. It is the fourth game set in the Warcraft fantasy universe and allows players to explore the world of Azeroth, complete quests, and interact with other players in a persistent online world.', release_date=2004, created_at='04/12/2024')
#         excitebike_64 = Game(title='Excitebike 64', description='Excitebike 64 is a 1999 motocross racing video game developed by Left Field Productions and published by Nintendo for the Nintendo 64. It is the sequel to the original Excitebike and features 3D graphics, multiple gameplay modes, and a track editor. Players race against opponents on various tracks, performing stunts and tricks to gain an advantage.', release_date=1999, created_at='04/12/2024')
#         stardew_valley = Game(title='Stardew Valley', description='Stardew Valley is a 2016 farm life sim video game developed by Eric "ConcernedApe" Barone. Players take the role of a character who inherits their deceased grandfather\'s dilapidated farm in a place known as Stardew Valley.', release_date=2016, created_at='04/12/2024')
#         grand_theft_auto_3 = Game(title='Grand Theft Auto 3', description='Grand Theft Auto III is a 2001 action-adventure game developed by DMA Design (now Rockstar North) and published by Rockstar Games. It is the first 3D title in the Grand Theft Auto series. Players assume the role of Claude, an imprisoned criminal who is betrayed by his girlfriend and left for dead. Upon escaping, Claude embarks on a quest for revenge and power in the fictional Liberty City.', release_date=2001, created_at='04/12/2024')
#         mario_kart_wii = Game(title='Mario Kart Wii', description='Mario Kart Wii is a 2008 kart racing video game developed and published by Nintendo for the Wii console. It is the sixth installment in the Mario Kart series and introduces motion controls using the Wii Remote. Players compete in races using characters from the Mario franchise and can use various items to hinder opponents and gain an advantage.', release_date=2008, created_at='04/12/2024')
        
# #add & commit game instances
#         db.session.add_all([mario_kart_wii, grand_theft_auto_3, stardew_valley, excitebike_64, world_of_warcraft, gta_vice_city, wind_waker, final_fantasy_x, halo_combat_evolved])
#         db.session.commit()

#         #create comment instances
#         c1 = Comment(title="Mario IS LIFE!", body=" As a super Mario fan I KNOW that Mario Kart Wii is the best game invented!", game_comment_id=mario_kart_wii.game_id)
#         c2 = Comment(title= "Halo", body = "Halo combat evolved is one of the best fighting games out of the 2000s!", game_comment_id=halo_combat_evolved.game_id)
#         c3 = Comment(title="Excitebike 64", body =" Anyone remember how cool Excitebike 64 was when it came out? Pure mayhem between me and my brothers.",game_comment_id=excitebike_64.game_id )
#         c4 = Comment(title="Grand Theft Auto 3", body ="By far once of the most uncut and cool games of the 2000s.", game_comment_id=grand_theft_auto_3.game_id)
#         c5 = Comment(title="Star of Stardew Valley", body =" Stardeq was my jam! After school, In School, Before School! I was the best VIRTUAL farmer you'd ever seen!", game_comment_id=stardew_valley.game_id)
#         c6 = Comment(title= "GTA Vice City", body =" You are BUGGIN' if you think GTA 3 is better than Vice City! I will die on this hill!", game_comment_id=gta_vice_city.game_id)
#         c7 = Comment(title= " World of Warcraft", body =" What game is topping WOW or World of Warcraft if you've lived your entire life under a rock! Not Halo , Not even COD, World or Warcreaft remains KING!", game_comment_id=world_of_warcraft.game_id)
#         c8 = Comment(title="Final Fantasy", body= "If you are leaving final fantasy out of the conversation you might as well exit stage left. Final fantasy had me in the worst chokehold of the 2000s! #RESPECT ", game_comment_id=final_fantasy_x.game_id)
#         c9 = Comment(title=" THE LEGEND", body =" The Legend of Zelda really turned me and my best girlies into gamers. God Bless the 2000s for that!", game_comment_id=wind_waker.game_id)
        
#         #add & commit comment instances
#         db.session.add_all([c1,c2,c3,c4,c5,c6,c7,c8,c9])
#         db.session.commit()

#     #add user instances 
#         admin =User(first_name="admin", last_name="admin",username="admin")
#         u1 = User(first_name="Sponge", last_name="Bob", username="Spongebob")

# # add & commit user instances
#         db.session.add_all([admin,u1])
#         db.session.commit()

        # print("Loading seed...")