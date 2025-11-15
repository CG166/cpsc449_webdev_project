"use ";
import { addProductToCart } from "../actions/shoppingCart";

type AddProductDisplayProps = {
    UserID: number;
    ProductID: number;

};

export default async function AddButton({UserID,ProductID}  : AddProductDisplayProps) {

    return (
        <button className='btn' onClick={async () => {await addProductToCart(UserID, ProductID);}}>
            Add
          </button>
    );
}