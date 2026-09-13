from app.database import SessionLocal
from app.models import Usuario, RolePerfil
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
db = SessionLocal()

admin = Usuario(
    nome="Flavio",
    email="flaviopaixao1992@gmail.com",
    senha_hash=pwd_context.hash("mvpro2026"),
    role=RolePerfil.admin,
)
db.add(admin)
db.commit()
print("Admin criado com sucesso!")
