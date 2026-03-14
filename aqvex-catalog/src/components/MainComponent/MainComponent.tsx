import { useEffect, useMemo, useState } from "react"
import { CatalogControlsComponent } from "../CatalogControlsComponent/CatalogControlsComponent"
import { ProductGridComponent } from "../ProductGridComponent/ProductGridComponent"
import { PaginationComponent } from "../ProductGridComponent/PaginationComponent"
import type { Product } from "@/types/product.types"
import { fetchProducts } from "@/services/api"

type SortField = "price" | "rating" | "name"
type SortOrder = "asc" | "desc"

export const MainComponent = () => {
  const [sortField, setSortField] = useState<SortField>("price")
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc")
  const [search, setSearch] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [page, setPage] = useState(1)
  const perPage = 12;

  useEffect(() => {
    let isMounted = true
    const load = async () => {
      try {
        setLoading(true)
        const apiProducts = await fetchProducts()
        if (isMounted) {
          setProducts(apiProducts)
        }
      } catch (e) {
        if (isMounted) {
          console.error("Помилка завантаження товарів:", e)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }
    load()
    return () => {
      isMounted = false
    }
  }, [])

  const handleAddToCart = (product: Product, selectedVolumeId: string) => {
    try {
      console.log("Додаємо в корзину:", product.name, "Об'єм:", selectedVolumeId);
      
      const raw = window.localStorage.getItem("aqvex_cart")
      const parsed = raw ? JSON.parse(raw) : []
      
      const existing = parsed.find(
        (item: any) =>
          item.product.id === product.id &&
          item.selectedVolumeId === selectedVolumeId,
        )
      
      let next
      if (existing) {
        next = parsed.map((item: any) =>
          item === existing 
            ? { ...item, quantity: item.quantity + 1 } 
            : item,
        )
      } else {
        next = [...parsed, { 
          product: {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            selected_volume_id: selectedVolumeId 
          }, 
          quantity: 1,
          selectedVolumeId: selectedVolumeId 
        }]
      }
      
      window.localStorage.setItem("aqvex_cart", JSON.stringify(next))
      
      window.dispatchEvent(new Event('cart-updated'))
      
    } catch (error) {
      console.error("Помилка додавання в корзину:", error)
    }
  }

  useEffect(() => {
    setPage(1)
  }, [search])

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return products

    return products.filter((p) => {
      const name = p.name.toLowerCase()
      const category = p.category.toLowerCase()
      return name.includes(term) || category.includes(term)
    })
  }, [products, search])

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts].sort((a, b) => {
      if (sortField === "name") {
        return sortOrder === "asc" 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      }
      
      const valueA = a[sortField]
      const valueB = b[sortField]
      
      return sortOrder === "asc" 
        ? valueA - valueB
        : valueB - valueA
    })

    const start = (page - 1) * perPage
    const end = start + perPage

    return sorted.slice(start, end)
  }, [filteredProducts, sortField, sortOrder, page, perPage])

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / perPage))

  return (
    <div>
      <CatalogControlsComponent
        totalCount={filteredProducts.length}
        search={search}
        onSearchChange={setSearch}
        sortField={sortField}
        sortOrder={sortOrder}
        onSortFieldChange={setSortField}
        onSortOrderToggle={() =>
          setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
        }
      />
      
      <ProductGridComponent
        products={sortedProducts}
        loading={loading}
        onAddToCart={handleAddToCart} 
        />

      <PaginationComponent
        page={page}
        totalPages={totalPages}
        onChange={setPage}
      />
    </div>
  )
}