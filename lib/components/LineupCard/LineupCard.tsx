import React from "react";
import styles from "./LineupCard.module.css";

type LineupCardVariant = "araGradient" | "ariGradient";

interface LineupCardProps {
  variant: LineupCardVariant;
}

export const LineupCard: React.FC<LineupCardProps> = ({ variant }) => {
  return (
    <div className={styles.card}>
      <div className={`${styles.inner} ${styles[variant]}`} />
    </div>
  );
};
