import { Container, Recomendations } from "@/shared/components/shared"
import { prisma } from "@/prisma/prisma-client"
import { notFound } from "next/navigation"
import { ProductForm } from "@/shared/components/shared/product-form"

export default async function Page({ params: { id } }: { params: { id: string } }) {
    const product = await prisma.product.findFirst({
        where: {
            id: Number(id)
        },
        include: {
            ingredients: true,
            category: { // TODO вынести в отдельный запрос (для рендера рекомендаций)
                include: {
                    products: {
                        include: {
                            items: true
                        }
                    }
                }
            },
            items: true
        }
    })

    if (!product) return notFound()

    return (
        <Container className="flex flex-col my-10">
            <ProductForm product={product} />
            {product.category.products.length > 0 && (
                <Recomendations categoryId={product.categoryId} />
            )}
        </Container>
    )
}