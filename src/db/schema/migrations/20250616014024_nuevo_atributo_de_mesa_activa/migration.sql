-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Mesas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "estado" TEXT NOT NULL DEFAULT 'DISPONIBLE',
    "activa" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Mesas" ("estado", "id") SELECT "estado", "id" FROM "Mesas";
DROP TABLE "Mesas";
ALTER TABLE "new_Mesas" RENAME TO "Mesas";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
