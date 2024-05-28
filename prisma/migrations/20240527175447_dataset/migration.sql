-- CreateTable
CREATE TABLE "compras" (
    "id" SERIAL NOT NULL,
    "itemname" VARCHAR(255) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "estado" VARCHAR(255) NOT NULL,

    CONSTRAINT "compras_pkey" PRIMARY KEY ("id")
);
