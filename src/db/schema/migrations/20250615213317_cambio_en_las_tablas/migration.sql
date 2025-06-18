/*
  Warnings:

  - You are about to drop the `Usuarios` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `usuarioId` on the `Pedidos` table. All the data in the column will be lost.
  - Added the required column `clienteId` to the `Pedidos` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Usuarios_telefono_key";

-- DropIndex
DROP INDEX "Usuarios_correo_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Usuarios";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Administradores" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "contraseña" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Cliente" (
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
    CONSTRAINT "Pedidos_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pedidos" ("descuento", "estado", "id", "lugar_de_entrega", "monto") SELECT "descuento", "estado", "id", "lugar_de_entrega", "monto" FROM "Pedidos";
DROP TABLE "Pedidos";
ALTER TABLE "new_Pedidos" RENAME TO "Pedidos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_correo_key" ON "Cliente"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_telefono_key" ON "Cliente"("telefono");
