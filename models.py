from app import db
# from flask_sqlalchemy import SQLAlchemy


class Person(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    score = db.Column(db.Integer())

    def __repr__(self):
        return '<Person %r>' % self.username
        
    
    @property
    def toFormat(self):
        return{
            'id' : self.id,
            'username' : self.username,
            'score' : self.score
        }