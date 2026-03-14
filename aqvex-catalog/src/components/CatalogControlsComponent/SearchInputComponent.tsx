import styles from "./SearchInputComponent.module.scss"
import { IoSearch } from "react-icons/io5";

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export const SearchInputComponent = ({ value, onChange }: Props) => {
    return(
        <div className={styles.search}>
            <IoSearch className={styles.search__icon} />
            <input 
                type="text" 
                placeholder="Поиск" 
                className={styles.search__input}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}