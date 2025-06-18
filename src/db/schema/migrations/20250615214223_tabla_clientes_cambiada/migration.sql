/*
  Warnings:

  - You are about to drop the `Cliente` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Cliente_telefono_key";

-- DropIndex
DROP INDEX "Cliente_correo_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Cliente";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Clientes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "contraseña" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pedidos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clienteId" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "monto" DECIMAL NOT NULL,
    "descuento" DECIMAL NOT NULL,
    "lugar_de_entrega" TEXT NOT NULL,
    CONSTRAINT "Pedidos_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Clientes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pedidos" ("clienteId", "descuento", "estado", "id", "lugar_de_entrega", "monto") SELECT "clienteId", "descuento", "estado", "id", "lugar_de_entrega", "monto" FROM "Pedidos";
DROP TABLE "Pedidos";
ALTER TABLE "new_Pedidos" RENAME TO "Pedidos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_correo_key" ON "Clientes"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_telefono_key" ON "Clientes"("telefono");
