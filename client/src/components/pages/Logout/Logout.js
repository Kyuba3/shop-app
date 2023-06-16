import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config";
import { logOut } from "../../../redux/usersRedux";
import { removeAllProducts } from "../../../redux/cartRedux";


const Logout = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      method: 'DELETE',
      credentials: 'include',
    };

    localStorage.clear(process.env.CART_ITEMS);

    fetch(`${API_URL}auth/logout`, options)
      .then(() => {
        dispatch(logOut());
        dispatch(removeAllProducts());
        navigate('/');
      })
      .catch(err => {
        console.error(err);
      });
  }, [dispatch, navigate]);

  return null;

}

export default Logout;