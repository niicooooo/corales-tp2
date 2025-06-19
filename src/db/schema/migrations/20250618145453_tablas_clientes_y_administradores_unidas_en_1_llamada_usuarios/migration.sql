/*
  Warnings:

  - You are about to drop the `Administradores` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Clientes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `clienteId` on the `Pedidos` table. All the data in the column will be lost.
  - Added the required column `usuarioId` to the `Pedidos` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Clientes_telefono_key";

-- DropIndex
DROP INDEX "Clientes_correo_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Administradores";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Clientes";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Usuarios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "cantidad_pedidos" INTEGER NOT NULL DEFAULT 0,
    "rol" TEXT NOT NULL,
    "contraseña" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pedidos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usuarioId" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "monto" DECIMAL NOT NULL,
    "descuento" DECIMAL NOT NULL,
    "lugar_de_entrega" TEXT NOT NULL,
    CONSTRAINT "Pedidos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pedidos" ("descuento", "estado", "id", "lugar_de_entrega", "monto") SELECT "descuento", "estado", "id", "lugar_de_entrega", "monto" FROM "Pedidos";
DROP TABLE "Pedidos";
ALTER TABLE "new_Pedidos" RENAME TO "Pedidos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_correo_key" ON "Usuarios"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_telefono_key" ON "Usuarios"("telefono");
