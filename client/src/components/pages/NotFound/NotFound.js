import { Container } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";

const NotFound = () => {
  return (
    <Container>
      <h1 className="d-flex justify-content-center"> <FontAwesomeIcon icon={faXmarkCircle} className="mt-2 px-3" /> 404 NOT FOUND </h1>
    </Container>
  );
};

export default NotFound;