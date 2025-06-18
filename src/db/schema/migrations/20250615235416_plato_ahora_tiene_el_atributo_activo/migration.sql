-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Platos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "precio" DECIMAL NOT NULL,
    "categoria" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "menuId" INTEGER NOT NULL,
    CONSTRAINT "Platos_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Platos" ("categoria", "descripcion", "id", "menuId", "nombre", "precio") SELECT "categoria", "descripcion", "id", "menuId", "nombre", "precio" FROM "Platos";
DROP TABLE "Platos";
ALTER TABLE "new_Platos" RENAME TO "Platos";
CREATE UNIQUE INDEX "Platos_nombre_key" ON "Platos"("nombre");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
