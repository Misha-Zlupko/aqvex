import { useState, useEffect } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import styles from "./VolumeSelectorComponent.module.scss";

interface Volume {
  id: string;
  label: string;
  in_stock: boolean;
}

interface Props {
  volumes: Volume[];
  selectedVolumeId: string;
  onVolumeChange: (volumeId: string) => void;
}

export const VolumeSelectorComponent = ({ volumes, selectedVolumeId, onVolumeChange }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localSelectedId, setLocalSelectedId] = useState(selectedVolumeId);

  // Синхронізація з пропсом
  useEffect(() => {
    setLocalSelectedId(selectedVolumeId);
  }, [selectedVolumeId]);

  const selectedVolume = volumes.find(v => v.id === localSelectedId);

  const handleVolumeSelect = (volumeId: string) => {
    const volume = volumes.find(v => v.id === volumeId);
    if (!volume?.in_stock) return;

    setLocalSelectedId(volumeId);
    onVolumeChange(volumeId);
    setIsOpen(false);
  };

  return (
    <div className={styles.volume}>
      <button 
        className={styles.volume__trigger}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span className={styles.volume__label}>
          {selectedVolume?.label || 'Выберите объем'}
        </span>
        <IoChevronDownOutline 
          className={`${styles.volume__icon} ${isOpen ? styles.volume__iconRotated : ''}`} 
        />
      </button>
      
      {isOpen && (
        <div className={styles.volume__dropdown}>
          {volumes.map(volume => (
            <button
              key={volume.id}
              type="button"
              className={`${styles.volume__option} ${
                !volume.in_stock ? styles.volume__optionDisabled : ''
              } ${localSelectedId === volume.id ? styles.volume__optionSelected : ''}`}
              onClick={() => handleVolumeSelect(volume.id)}
              disabled={!volume.in_stock}
            >
              {volume.label}
              {!volume.in_stock && <span className={styles.volume__stockBadge}>Немає</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};