import { useState } from "react";
import { useRouter } from "next/navigation";
const Create = () => {
  const router =useRouter()
  const initialState ={name: '', price:0}
  const [product, setProduct] = useState(initialState);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    const inputName = e.target.name;
    setProduct((prevState) => ({
      ...prevState,
      [inputName]: inputValue,
    }));
  };
 
  const handleClick = (e) => {
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => {
       return res.json();
      }).then((data)=>{
       if(data.ok==true){
        alert('Producto Creado Exitosament')
        router.refresh()
        
       }
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  return (
    <div>
      <h1>Crear Nuevo Producto</h1>
      <form>
        <input
        value={product.name}
          onChange={handleChange}
          type="text"
          name="name"
          placeholder="Nombre del producto"
        />
        <input value={product.price} onChange={handleChange} type="number" name="price" />
        <button onClick={handleClick}>Crear Producto</button>
      </form>
    </div>
  );
};

export default Create;
