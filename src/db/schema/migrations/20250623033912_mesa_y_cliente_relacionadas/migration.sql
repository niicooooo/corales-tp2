-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Usuarios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "cantidad_pedidos" INTEGER NOT NULL DEFAULT 0,
    "rol" TEXT NOT NULL,
    "contraseña" TEXT NOT NULL,
    "mesaReservadaId" INTEGER,
    CONSTRAINT "Usuarios_mesaReservadaId_fkey" FOREIGN KEY ("mesaReservadaId") REFERENCES "Mesas" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Usuarios" ("cantidad_pedidos", "contraseña", "correo", "direccion", "id", "nombre", "rol", "telefono") SELECT "cantidad_pedidos", "contraseña", "correo", "direccion", "id", "nombre", "rol", "telefono" FROM "Usuarios";
DROP TABLE "Usuarios";
ALTER TABLE "new_Usuarios" RENAME TO "Usuarios";
CREATE UNIQUE INDEX "Usuarios_correo_key" ON "Usuarios"("correo");
CREATE UNIQUE INDEX "Usuarios_telefono_key" ON "Usuarios"("telefono");
CREATE UNIQUE INDEX "Usuarios_mesaReservadaId_key" ON "Usuarios"("mesaReservadaId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
