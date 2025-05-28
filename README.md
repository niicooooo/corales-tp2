# Trabajo Práctico N°2
Integrantes:
- Nicolas Gonzalez
- Bautista Crocco

## Pasos para ejecutar el proyecto

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/niicooooo/corales-tp2.git
   cd corales-tp2
   ```

2. **Abrir el proyecto con el editor de codigo (Visual Studio por ejemplo)**

3. **Abrir la terminal**

4. **Instalar las dependencias**
   ```bash
   npm install
   ```

5. **Crear el archivo `.env`**
   Ejecutar el siguiente comando para crear el archivo de entorno necesario:
   ```bash
   echo -e "PORT=8080\nDATABASE_URL=\"file:./dev.db\"" > .env
   ```

6. **Generar el cliente de Prisma**
   ```bash
   npm run db:generate
   ```

7. **Aplicar las migraciones a la base de datos**
   ```bash
   npm run db:migrate
   ```

8. **Levantar el servidor**
   ```bash
   npm run dev
   ```

9. **Realizar consultas**
   - Usar [Postman](https://www.postman.com/) o una herramienta similar para probar la API.

---

Una vez levantado el servidor, la app estará disponible en:  
[http://localhost:8080](http://localhost:8080)

---