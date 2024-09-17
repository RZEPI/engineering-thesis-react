import styles from '../../styles/ToggleSwitch.module.css'

import { ToggleSwitchProps } from '../../models/ToggleSwitchProps.ts';

export default function ToggleSwitch({inputName, toggleFunc }:ToggleSwitchProps){
    function handleChange()
    {
        toggleFunc();
    }
    return (
        <label className={styles.switch}>
        <input type="checkbox" name={inputName} onChange={handleChange}/>
        <span className={`${styles.slider}  ${styles.round}`}></span>
      </label>
    )
}