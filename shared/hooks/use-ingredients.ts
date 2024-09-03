import { Api } from "@/shared/services/api-client"
import { Ingredient } from "@prisma/client"
import React from "react"

export const useIngredients = () => {
    const [ingredients, setIngredients] = React.useState<Ingredient[]>([])
    const [loading, setLoading] = React.useState(true)


    React.useEffect(() => {
        Api.ingredients
        .getAll()
        .then((ingredients) => {
            setLoading(true)
            setIngredients(
                ingredients
            );
        })
        .catch((error) => {
            console.log(`[USE_INGREDIENTS] Error ${__filename} ${error}`);
        })
        .finally(() => setLoading(false))

    }, [])

    return { ingredients, loading }
}
