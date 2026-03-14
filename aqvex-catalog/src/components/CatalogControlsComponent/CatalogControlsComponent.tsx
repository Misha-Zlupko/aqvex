import style from "./CatalogControlsComponent.module.scss"
import { SearchInputComponent } from "./SearchInputComponent"
import { FilterDropDownComponent } from "./FilterDropdownComponent"

type SortField = "price" | "rating" | "name"
type SortOrder = "asc" | "desc"

type Props = {
    totalCount: number
    search: string
    onSearchChange: (value: string) => void
    sortField: SortField
    sortOrder: SortOrder
    onSortFieldChange: (field: SortField) => void
    onSortOrderToggle: () => void
}

export const CatalogControlsComponent = ({
    totalCount,
    search,
    onSearchChange,
    sortField,
    sortOrder,
    onSortFieldChange,
    onSortOrderToggle,
}: Props) => {
    return(
        <section className={`${style.container} ${style.catalog}`}>
            <SearchInputComponent value={search} onChange={onSearchChange} />
            <FilterDropDownComponent
                totalCount={totalCount}
                sortField={sortField}
                sortOrder={sortOrder}
                onSortFieldChange={onSortFieldChange}
                onSortOrderToggle={onSortOrderToggle}
            />
        </section>
    )
}