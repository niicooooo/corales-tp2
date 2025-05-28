-- CreateTable
CREATE TABLE "Clientes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "telefono" INTEGER NOT NULL,
    "direccion" TEXT NOT NULL,
    "contraseña" TEXT NOT NULL,
    "rol" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Menus" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Mesas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "estado" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Pedidos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clienteId" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "monto" DECIMAL NOT NULL,
    "descuento" DECIMAL NOT NULL,
    "lugar_de_entrega" TEXT NOT NULL,
    CONSTRAINT "Pedidos_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Clientes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Platos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "precio" DECIMAL NOT NULL,
    "categoria" TEXT NOT NULL,
    "menuId" INTEGER NOT NULL,
    CONSTRAINT "Platos_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PlatosPedidos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pedidoId" TEXT NOT NULL,
    "platoId" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    CONSTRAINT "PlatosPedidos_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedidos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlatosPedidos_platoId_fkey" FOREIGN KEY ("platoId") REFERENCES "Platos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_correo_key" ON "Clientes"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_telefono_key" ON "Clientes"("telefono");

-- CreateIndex
CREATE UNIQUE INDEX "Platos_nombre_key" ON "Platos"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "PlatosPedidos_pedidoId_platoId_key" ON "PlatosPedidos"("pedidoId", "platoId");
