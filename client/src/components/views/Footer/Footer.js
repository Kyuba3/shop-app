import { Container } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <Container>
      <p className={styles.copyright}> COPYRIGHT  <FontAwesomeIcon icon={faCopyright} className={styles.icon}></FontAwesomeIcon>  2023 </p>
    </Container>
  );
};

export default Footer;