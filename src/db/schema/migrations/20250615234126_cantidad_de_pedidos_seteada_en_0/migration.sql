-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Clientes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "cantidad_pedidos" INTEGER NOT NULL DEFAULT 0,
    "contraseña" TEXT NOT NULL
);
INSERT INTO "new_Clientes" ("contraseña", "correo", "direccion", "id", "nombre", "telefono") SELECT "contraseña", "correo", "direccion", "id", "nombre", "telefono" FROM "Clientes";
DROP TABLE "Clientes";
ALTER TABLE "new_Clientes" RENAME TO "Clientes";
CREATE UNIQUE INDEX "Clientes_correo_key" ON "Clientes"("correo");
CREATE UNIQUE INDEX "Clientes_telefono_key" ON "Clientes"("telefono");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
