import requests
import pymongo

# Configuração do MongoDB Atlas
MONGO_URI = "sua_string_de_conexao"
DATABASE_NAME = "seu_banco"
COLLECTION_NAME = "clientes"

# URL da API para cadastro de usuários
API_URL = "http://localhost:3000/api/clientes"  # Ajuste para o endpoint correto

# Conectar ao MongoDB Atlas
client = pymongo.MongoClient(MONGO_URI)
db = client[DATABASE_NAME]
collection = db[COLLECTION_NAME]

# Buscar usuários no banco de dados
usuarios = collection.find({})  # Pode filtrar por critério, se necessário

for usuario in usuarios:
    payload = {
        "name": usuario.get("name"),
        "city": usuario.get("city"),
        "phone": usuario.get("phone"),
        "excursao": usuario.get("excursao"),
        "sector": usuario.get("sector"),
        "vacancy": usuario.get("vacancy"),
        "observation": usuario.get("observation", ""),
    }
    
    response = requests.post(API_URL, json=payload)

    if response.status_code == 201:
        print(f"Usuário {usuario['name']} cadastrado com sucesso!")
    else:
        print(f"Erro ao cadastrar {usuario['name']}: {response.text}")

# Fechar conexão
client.close()
