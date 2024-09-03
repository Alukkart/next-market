import { Container, Title, TopBar, Filters, ProductsGroupList, FiltersDrawer, SortPopup, CartButton, CartDrawer, Stories } from "@/shared/components/shared";
import { Button } from "@/shared/components/ui";
import { SlidersHorizontal } from "lucide-react";
import { Suspense } from "react";
import { findPizzas, GetSearchParams } from "@/shared/lib/find-pizzas";


export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
    const categories = await findPizzas(searchParams)

    return (
        <>
            <Title text="Все пиццы" size="lg" className="font-extrabold mt-10" />

            <TopBar categories={categories.filter((category) => category.products.length > 0)} />

            <Stories />

            <div className='flex flex-wrap lg:hidden justify-between mt-5'>
                <FiltersDrawer>
                    <Button variant="secondary" className="w-full h-[52px]"><SlidersHorizontal /></Button>
                </FiltersDrawer>
                <SortPopup />
            </div>

            <div className="flex gap-[40px] mt-10 pb-14">
                {/* Filtering */}
                <div className="w-[300px] hidden lg:block">
                    <Suspense>
                        <Filters />
                    </Suspense>
                </div>

                {/* Products list */}
                <div className="flex-1">
                    <div className="flex flex-col gap-16">
                        {
                            categories.map((category) => (
                                category.products.length > 0 && (
                                    <ProductsGroupList
                                        key={category.id}
                                        title={category.name}
                                        items={category.products}
                                        categoryId={category.id}
                                    />
                                )
                            ))
                        }
                    </div>
                </div>
            </div>

            <CartButton className="fixed md:hidden bottom-5 right-5 h-11 " />
        </>
    );
}
