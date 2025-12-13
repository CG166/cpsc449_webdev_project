"use ";
import { addProductToCart } from "../actions/shoppingCart";

type AddProductDisplayProps = {
    UserID: number;
    ProductID: number;
    quantity: number;

};

export default async function AddButton({UserID,ProductID, quantity}  : AddProductDisplayProps) {

    return (
        <button className='btn' onClick={async () => {await addProductToCart(UserID, ProductID, quantity);}}>
            Add
          </button>
    );
}