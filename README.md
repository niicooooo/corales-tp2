# Trabajo Práctico N°2
Integrantes:
- Nicolas Gonzalez
- Bautista Crocco

## Pasos para ejecutar el proyecto

1. **Instalar las dependencias**
   ```bash
   npm install
   ```

2. **Generar el cliente de Prisma**
   ```bash
   npm run db:generate
   ```

3. **Aplicar las migraciones a la base de datos**
   ```bash
   npm run db:migrate
   ```

4. **Levantar el servidor**
   ```bash
   npm run dev
   ```

5. **Realizar consultas**
   - Usar [Postman](https://www.postman.com/) o una herramienta similar para probar la API.

---

Una vez levantado el servidor, la app estará disponible en:  
[http://localhost:8080](http://localhost:8080)

---
## Decisiones de diseño

*Arquitectura en capas*: se separaron responsabilidades entre controladores (HTTP), servicios (lógica de negocio) y capa de acceso a datos (Prisma).

*Autenticación por token y middleware*: se implementaron middleware para validar token (jwt) y rol (admin) en ciertas rutas.

*Base de datos SQLite*

*Modelo relacional*: el sistema modela usuarios, mesas, menús, platos y pedidos de forma interrelacionada y normalizada.