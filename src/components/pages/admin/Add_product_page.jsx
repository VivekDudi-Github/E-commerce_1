import {Timestamp , addDoc , collection } from "firebase/firestore"
import {useState} from "react"
import { auth, DB } from "../../../firebase/firebase"
import Loader from "../../track/Loader"
import { useNavigate } from "react-router-dom"

const categoryList = [
  {
      name: 'fashion'
  },
  {
      name: 'shirt'
  },
  {
      name: 'jacket'
  },
  {
      name: 'mobile'
  },
  {
      name: 'laptop'
  },
  {
      name: 'shoes'
  },
  {
      name: 'home'
  },
  {
      name: 'books'
  }
]
const AddProductPage = () => {
  const navigate = useNavigate()
  const [Loading , setLoading] = useState(false)
  const adminId = auth?.currentUser?.uid 

  const [ProductDetail , setProductDetail] = useState({
        title : "" , 
        price : "" , 
        image_url : "" ,
        catagory : "" , 
        description : "" ,
        time : Timestamp.now() ,
        adminId: adminId ,
        date : new Date().toString(
          "en-US" ,
          {
            month : "short" , 
            day : "2-digit" ,
            year : "numeric" 
          }
        )
  });


//adding product function
async function add_product_handle(event) {
    event.preventDefault();
    setLoading(true) ;
        
    try {
      const productRef = collection(DB, 'products');
      await addDoc(productRef, ProductDetail);
      
      alert("Product Added")
      setLoading(false) ;
      navigate("/admin_dashboard") ;
     
    } catch (e) {
        setLoading(false) ;
      console.error("Error adding document: ", e);
    }
  }

  return (
      <div>
          <div className='flex justify-center items-center h-screen'>
              
              <div className="login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">

                  {/* Top Heading  */}
                  <div className="mb-5">
                      <h2 className='text-center text-2xl font-bold text-pink-500 '>
                          Add Product
                      </h2>
                  </div>

              {/* Form */}
              <form onSubmit={ add_product_handle}>
                  
                  {/* Input One */}
                  <div className="mb-3">
                      <input
                          type="text"
                          name="title"
                          placeholder='Product Title'
                          onChange={(e) => setProductDetail({
                            ...ProductDetail , 
                            title : e.target.value
                           })}
                          className='bg-pink-50 text-pink-300 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                          required/>
                  </div>

                  {/* Input Two  */}
                  <div className="mb-3">
                      <input
                          type="number"
                          placeholder='Product Price'
                          onChange={(e) => setProductDetail({
                            ...ProductDetail , 
                            price : e.target.value
                          })}
                          className='bg-pink-50 text-pink-300 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                          required />
                  </div>

                  {/* Input Three  */}
                  <div className="mb-3">
                      <input
                          type="text"
                          placeholder='Product Image Url'
                          onChange={(e) => setProductDetail({
                            ...ProductDetail , 
                            image_url : e.target.value
                          })}
                          className='bg-pink-50 text-pink-300 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                          required />
                  </div>

                  {/* Input Four  */}
                  <div className="mb-3">
                      <select className="w-full px-1 py-2 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none  "
                           onChange={(e) => setProductDetail({
                            ...ProductDetail , 
                            catagory : e.target.value
                          })} 
                          required>
                          <option disabled>Select Product Category</option>
                          {categoryList.map((value, index) => {
                              const { name } = value
                              return (
                                  <option className=" first-letter:uppercase " key={index} value={name}>{name}</option>
                              )
                          })}
                      </select>
                  </div>

                  {/* Input Five  */}
                  <div className="mb-3">
                      <textarea name="description" placeholder="Product Description" rows="5" className=" w-full px-2 py-1 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none placeholder-pink-300 "
                       onChange={(e) => setProductDetail({
                        ...ProductDetail , 
                        description : e.target.value
                      })}
                      required>
                      </textarea>
                  </div>

                  {/* Add Product Button */}
                  <div className="mb-3">
                      <button
                          type='submit'
                          className='bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md '
                      >
                          Add Product
                      </button>  
                  </div>
              </form>

              </div>
          </div>
          {Loading && <Loader/>}
      </div>
  );
}

export default AddProductPage;

