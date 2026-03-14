import { useState } from "react"
import upDown from "@assets/up-down.svg"
import styles from "./FilterDropdownComponent.module.scss"
import { IoChevronDownOutline } from "react-icons/io5";

type SortField = "price" | "rating" | "name"
type SortOrder = "asc" | "desc"

type Props = {
    totalCount: number
    sortField: SortField
    sortOrder: SortOrder
    onSortFieldChange: (field: SortField) => void
    onSortOrderToggle: () => void
}

const getSortLabel = (field: SortField) => {
    if (field === "price") return "По цене"
    if (field === "rating") return "По рейтингу"
    return "По названию"
}

export const FilterDropDownComponent = ({
    totalCount,
    sortField,
    sortOrder,
    onSortFieldChange,
    onSortOrderToggle,
}: Props) => {
    const [open, setOpen] = useState(false)

    const handleSelect = (field: SortField) => {
        onSortFieldChange(field)
        setOpen(false)
    }

    return(
        <div className={styles.filter}>
            <div className={styles.filter__info}>
                <p className={styles.filter__count}>{totalCount} товара</p>
            </div>
            <div className={styles.filter__trigger}>
                <button className={styles.filter__orderButton} onClick={onSortOrderToggle}>
                    <img
                        src={upDown}
                        alt="updown"
                        className={styles.filter__icon}
                        style={{
                            transform: sortOrder === "asc" ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.15s ease-out",
                        }}
                    />
                </button>
                <button
                    className={styles.filter__button}
                    type="button"
                    onClick={() => setOpen((prev) => !prev)}
                >
                    {getSortLabel(sortField)}
                    <IoChevronDownOutline
                        className={styles.filter__iconDown}
                        style={{
                            transform: open ? "rotate(180deg)" : "rotate(0deg)",
                            opacity: sortOrder === "asc" ? 0.7 : 1,
                        }}
                    />
                </button>
                {open && (
                    <div className={styles.filter__dropdown}>
                        <div
                            className={styles.filter__option}
                            onClick={() => handleSelect("price")}
                        >
                            По цене
                        </div>
                        <div
                            className={styles.filter__option}
                            onClick={() => handleSelect("rating")}
                        >
                            По рейтингу
                        </div>
                        <div
                            className={styles.filter__option}
                            onClick={() => handleSelect("name")}
                        >
                            По названию
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}