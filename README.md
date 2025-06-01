# Autentisering API med JWT och SQLite

Detta är en RESTful webbtjänst byggd med Node.js, Express och SQLite. Syftet är att skapa ett autentiseringssystem med JWT (JSON Web Tokens), där användare kan registrera sig, logga in, och hämta skyddad data.

---

## Teknisk översikt

- Node.js ochExpress för server och routing
- SQLite används som databas
- bcrypt används för att hasha lösenord innan lagring
- jsonwebtoken (JWT) används för autentisering
- Användardata sparas i en `users`-tabell
- Alla lösenord är hashade och ingen klartext sparas

JWT-token genereras vid inloggning och används som "Bearer Token" för att komma åt skyddade API-routes.

---

## CRUD-funktionalitet

- Create

**POST `/api/register`
Skapar ett nytt användarkonto.

Request body (JSON):
```json
{
  "username": "testuser",
  "password": "test123"
}

- READ

**GET `/api/users`
Hämtar alla registrerade användare från databasen. 
Kräver autentisering via JWT

    Request header:
    Authorization: Bearer <JWT-token>

    Exempelsvar
        [
    {
        "id": 1,
        "username": "testuser",
        "created": "2025-06-01 14:23:00"
    }
         ]



