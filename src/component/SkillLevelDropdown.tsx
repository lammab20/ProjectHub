// SkillLevelDropdown.tsx
import React from 'react';
import styles from '../styles/SkillLevelDropdown.module.css';

interface SkillLevelDropdownProps {
    value: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SkillLevelDropdown: React.FC<SkillLevelDropdownProps> = ({ value, onChange }) => {
    return (
        <div className={styles.dropdownContainer}>
            <label className={styles.dropdownLabel}>Skill Level:</label>
            <select
                name="skillLevel"
                value={value}
                onChange={onChange}
                className={styles.dropdownSelect}
            >
                <option value="BEGINNER">Beginner</option>
                <option value="INTERMEDIATE">Fortgeschritten</option>
                <option value="ADVANCED">Experte</option>
            </select>
        </div>
    );
};

export default SkillLevelDropdown;
