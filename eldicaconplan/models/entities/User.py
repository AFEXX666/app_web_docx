from werkzeug.security import check_password_hash, generate_password_hash
from flask_login import UserMixin


class User(UserMixin):

    def __init__(self, id, username, password, fullname="", lastname="", usertype="") -> None:
        self.id = id
        self.username = username
        self.password = password
        self.fullname = fullname + ' ' + lastname
        self.user_type = usertype

    @classmethod
    def check_password(self, hashed_password, password):
        return check_password_hash(hashed_password, password)
    
    @classmethod
    def password(self, passw):
        newpass = generate_password_hash(passw)
        return newpass
