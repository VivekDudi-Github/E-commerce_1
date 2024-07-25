import { useSelector , useDispatch} from "react-redux"
import Layout from "../../layout/Layout"
import { Minus, PlusSquareIcon, Trash } from 'lucide-react'
import { remove_cart  , cart_changeQuantity } from "../../../redux-store/productSlice"
import BuyNowModal from "../../buyNow/buyNow"


const CartPage = () => {
const dispatch = useDispatch()    

const cartlist = useSelector(state => state.productlist.cartList)


const total_price = cartlist.reduce((preValue , currValue) =>  (preValue) + (currValue.amount ?  Number(currValue.price) * Number(currValue.amount) : Number(currValue.price)) , 0)
const discount = cartlist.some(item => item.discount) ? cartlist.reduce((acc , curr) => acc + curr?.discount , 0 )  : 0

//removing item from cartlist
 const remove_item = (id) => {
    try {
        dispatch(remove_cart(id))   
    } catch (error) {
        console.log( "error while removing from list" , error)
    }
 }

//increase and decrease item-quantity 

const increment = (id , amount) => {
    if(amount){
      amount =  Number(amount) 
       amount++
    }else {
        amount = 1 ;
    }
    
    try {
        dispatch(cart_changeQuantity({id , amount}))
    } catch (error) {
        console.log( "error while dispatching increasingQuantity in cart.jsx " , error);
    }
}

const Change_quantity = (id , amount) => {
    try {
        dispatch(cart_changeQuantity({id , amount}))
    } catch (error) {
        console.log( "error while dispatching increasingQuantity in cart.jsx " , error);
    }
}

const decreament = (id , amount) => {
    if(amount){
        amount =  Number(amount) 
         amount --
      }else {
          amount = 1 ;
      }
      try {
          dispatch(cart_changeQuantity({id , amount}))
      } catch (error) {
          console.log( "error while dispatching decreasing Quantity in cart.jsx " , error);
      }
}

return (
        <Layout>
            <div className="container mx-auto px-4 max-w-7xl lg:px-0">
                <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Shopping Cart
                    </h1>
                    <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                        <section aria-labelledby="cart-heading" className="rounded-lg bg-white lg:col-span-8">
                            <h2 id="cart-heading" className="sr-only">
                                Items in your shopping cart
                            </h2>
                            <ul role="list" className="divide-y divide-gray-200">
                               
                            {/* cartList */}
                                {cartlist.map((product) => (
                                    
                                    <div key={product.id} className="">
                                        <li className="flex py-6 sm:py-6 ">
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={product.image_url}
                                                    alt={product.title}
                                                    className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                                                />
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                    <div>
                                                        <div className="flex justify-between">
                                                            <h3 className="text-sm">
                                                                <a href={"#"} className="font-semibold text-black">
                                                                    {product.title}
                                                                </a>
                                                            </h3>
                                                        </div>
                                                        <div className="mt-1 flex text-sm">
                                                            <p className="text-sm text-gray-500">{product.color}</p>
                                                            {product.size ? (
                                                                <p className="ml-4 border-l border-gray-200 pl-4 text-sm text-gray-500">
                                                                    {product.size}
                                                                </p>
                                                            ) : null}
                                                        </div>
                                                        <div className="mt-1 flex items-end">
                                                            <p className="text-xs font-medium text-gray-500 line-through">
                                                                {product.originalPrice || null}
                                                            </p>
                                                            <p className="text-sm font-medium text-gray-900">
                                                                &nbsp;&nbsp;₹{product.price}
                                                            </p>
                                                            &nbsp;&nbsp;
                                                            <p className="text-sm font-medium text-green-500">{product.discount || null }</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                   
                        {/* increment--decrement buttons */}
                                        <div className="mb-2 flex">
                                            <div className="min-w-24 flex">
                                                <button type="button" className="h-7 w-7 flex items-center justify-center border-[1px] border-gray-200 rounded-lg hover:border-gray-400 active:bg-gray-500 duration-100 ease-in "
                                                onClick={() => decreament( product.id  , product.amount)}
                                                >
                                                    <Minus size={18} className="text-pink-500 " />
                                                </button>
                                                <input
                                                    type="text"
                                                    className="mx-1 h-7 w-9 rounded-md border text-center"
                                                    value={product.amount || 1 }
                                                    onChange={ (e) => increment( product.id , e.target.value)}
                                                />
                                                <button type="button" className="flex h-7 w-7 items-center justify-center border-[1px] border-gray-200 rounded-lg hover:border-gray-400 active:bg-gray-500 duration-100 ease-in "
                                                     onClick={() => increment( product.id  , product.amount)}
                                                 >
                                                    <PlusSquareIcon size={18} className="text-pink-500 " />
                                                </button>
                                            </div>
                                            <div className="ml-6 flex text-sm border-[1px] border-gray-200 rounded-lg hover:border-gray-400 active:bg-gray-500 duration-100 ease-in">
                                                <button type="button" className="flex items-center space-x-1 px-2 py-1 "
                                                        onClick={() => remove_item(product.id)}
                                                >
                                                    <Trash size={12} className="text-red-500" />
                                                    <span className="text-xs font-medium text-red-500">Remove</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </ul>
                        </section>
                        {/* Order summary */}
                        <section
                            aria-labelledby="summary-heading"
                            className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
                        >
                            <h2
                                id="summary-heading"
                                className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
                            >
                                Price Details
                            </h2>
                            <div>
                                <dl className=" space-y-1 px-2 py-4">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-sm text-gray-800">Price ({cartlist.length} item)</dt>
                                        <dd className="text-sm font-medium text-gray-900">₹ {total_price}</dd>
                                    </div>
                                    <div className="flex items-center justify-between pt-4">
                                        <dt className="flex items-center text-sm text-gray-800">
                                            <span>Discount</span>
                                        </dt>
                                        <dd className="text-sm font-medium text-green-700">- ₹ { discount}</dd>
                                    </div>
                                    <div className="flex items-center justify-between py-4">
                                        <dt className="flex text-sm text-gray-800">
                                            <span>Delivery Charges</span>
                                        </dt>
                                        <dd className="text-sm font-medium text-green-700">Free</dd>
                                    </div>
                                    <div className="flex items-center justify-between border-y border-dashed py-4 ">
                                        <dt className="text-base font-medium text-gray-900">Total Amount</dt>
                                        <dd className="text-base font-medium text-gray-900">₹ {total_price - discount}</dd>
                                    </div>
                                </dl>
                                <div className="px-2 pb-4 font-medium text-green-700">
                                <div className="flex gap-4 mb-6">
                                    <BuyNowModal/>
                                </div>
                                </div>
                            </div>
                        </section>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default CartPage;