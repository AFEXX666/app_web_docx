from .entities.User import User
import requests
from bs4 import BeautifulSoup
import urllib.parse
from werkzeug.security import check_password_hash

class ModelUser():
    @classmethod
    def login(cls, db, user, table):
        try:
            cursor = db.connection.cursor()
            if table == 'users':
                sql = """SELECT idUser, username, password, Nombres, Apellidos FROM {} 
                        WHERE username = '{}'""".format(table, user.username)
                cursor.execute(sql)
                row = cursor.fetchone()
                if row is not None and check_password_hash(row[2], user.password):
                    return User(row[0], row[1], row[2], row[3], row[4], 'Administrador')
        
            elif table == 'maestros':
                sql = """SELECT idMaestro, username, password, Nombres, ApellidosP FROM {} 
                        WHERE username = '{}'""".format(table, user.username)
                cursor.execute(sql)
                row = cursor.fetchone()
                if row is not None and check_password_hash(row[2], user.password):
                    return User(row[0], row[1], row[2], row[3], row[4], 'Maestro')
            
            elif table == 'superuser':
                sql = """SELECT idSuser, username, password, name, lastname FROM {} 
                        WHERE username = '{}'""".format(table, user.username)
                cursor.execute(sql)
                row = cursor.fetchone()
                if row is not None and check_password_hash(row[2], user.password):
                    return User(row[0], row[1], row[2], row[3], row[4], 'Superusuario')
                
            return None
        except Exception as ex:
            raise Exception(ex)


    @classmethod
    def get_by_id(cls, db, id):
        try:
            cursor = db.connection.cursor()
            sql = "SELECT idUser, username, Nombres, Apellidos FROM users WHERE idUser = {}".format(id)
            cursor.execute(sql)
            row = cursor.fetchone()
            if row is not None:
                return User(row[0], row[1], None, row[2], row[3], 'Administrador')
            
            sql = "SELECT idMaestro, username, Nombres, ApellidosP FROM maestros WHERE idMaestro = {}".format(id)
            cursor.execute(sql)
            row = cursor.fetchone()
            if row is not None:
                return User(row[0], row[1], None, row[2], row[3], "Maestro")
            
            sql = "SELECT idSuser, username, name, lastname FROM superuser WHERE idSuser = {}".format(id)
            cursor.execute(sql)
            row = cursor.fetchone()
            if row is not None:
                return User(row[0], row[1], None, row[2], row[3], 'Superusuario')
            
            return None
        except Exception as ex:
            raise Exception(ex)
        
def get_image_url(name):
    API_KEY = 'AIzaSyBsO-8A8qtM41tOKuZ07iTXimtq5AeQpJs'
    SEARCH_ENGINE_ID = '21a2bf56b1ed44b37'
    
    # Palabras que deseas eliminar de la búsqueda
    words_to_remove = ['Multiplataforma', 'Área', 'Area', 'de', 'y', 'Negocios', 'Digitales', 'Eficientes']
    
    # Eliminar las palabras de la consulta
    for word in words_to_remove:
        name = name.replace(word, '')
    
    encoded_query = urllib.parse.quote(name)
    url = f"https://www.googleapis.com/customsearch/v1?key={API_KEY}&cx={SEARCH_ENGINE_ID}&q={encoded_query}&searchType=image"
    response = requests.get(url)
    data = response.json()

    if 'items' in data and len(data['items']) > 0:
        image_url = data['items'][0]['link']
    else:
        # Si no se encuentra ninguna imagen, puedes proporcionar una URL de imagen alternativa
        image_url = "URL_DE_IMAGEN_ALTERNATIVA"

    return image_url

