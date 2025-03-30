import { useNavigate, useParams } from "react-router-dom";
import WelcomeBand from "../WelcomeBand";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";

function PurchasePage() {
        const navigate = useNavigate();
        const {title, price, bookID} = useParams();
        const {addToCart} = useCart();


        const handleAddToCart = () => {
            const newItem: CartItem = {
                bookID: Number(bookID),
                title: title || "No book found",
                price: parseFloat(price || "0"),
                };
          
                addToCart(newItem);
                navigate('/cart');
              
          
            };

    return (
        <>
        <WelcomeBand />
        <h2>Purchase {title}</h2>

        <div>
            <h4>{price}</h4>  {/* Make sure to replace with real price */}
            <button onClick={(handleAddToCart)} >Add to Cart</button>
        </div>
        

         <button onClick={() => navigate('/books')}>Go Back</button>
        </>
    );
}

export default PurchasePage;