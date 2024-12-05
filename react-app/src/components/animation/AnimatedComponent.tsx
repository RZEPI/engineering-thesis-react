import { motion } from "framer-motion";
import { AnimatedComponentProps } from "../../models/animation/AnimatedComponentProps";

import styles from "../../styles/animation/AnimatedComponent.module.css";

export default function AnimatedComponent({
  name,
  isRight,
}: AnimatedComponentProps) {
  return (
    <motion.div
      className={styles.component}
      animate={{ x: isRight ? "85vw" : 0 }}
      transition={{ duration: 0.5 }}
    >
      {name}
    </motion.div>
  );
}
