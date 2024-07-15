CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateTable
CREATE TABLE "CartLine" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "cart_id" UUID NOT NULL,
    "sku" VARCHAR(255) NOT NULL,
    "qty" SMALLINT NOT NULL DEFAULT 0,

    CONSTRAINT "CartLine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(255) NOT NULL,
    "sku" VARCHAR(255) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "image" VARCHAR(255),

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");

-- AddForeignKey
ALTER TABLE "CartLine" ADD CONSTRAINT "CartLine_sku_fkey" FOREIGN KEY ("sku") REFERENCES "Product"("sku") ON DELETE NO ACTION ON UPDATE NO ACTION;

