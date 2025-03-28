import { FaGithub, FaLinkedin } from "react-icons/fa";
import styles from "../styles/Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>Created by Elvis Espinoza</p>

        <a
          href="https://www.linkedin.com/in/elvis-espinoza/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          <FaLinkedin className={styles.icon} />
          <span>LinkedIn</span>
        </a>
        <a
          href="https://github.com/elvisEspinozaN"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          <FaGithub className={styles.icon} />
          <span>GitHub</span>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
