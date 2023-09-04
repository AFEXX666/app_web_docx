
#conexion con la base de datos

class DevelopmentConfig():
    DEBUG = False
    TESTING = False
    MYSQL_HOST = '172.16.0.105'
    MYSQL_USER = 'uttn_alumno1'
    MYSQL_PASSWORD = 'radiofax6548'
    MYSQL_DB = 'dica_plan'
    
class produccion():
    DEBUG = False
    TESTING = False
    MYSQL_HOST = 'localhost'
    MYSQL_USER = 'root'
    MYSQL_PASSWORD = ''
    MYSQL_DB = 'dica_plan_pi'
    

config = {
    'development': DevelopmentConfig,
    'produccion': produccion
}
