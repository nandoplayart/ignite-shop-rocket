import { 
  ShoppingCartContainer, 
  ShoppingCartContent, 
  ShoppingCartContentItem, 
  ShoppingCartFooter, 
  ShoppingCartHeader, 
  ShoppingCartItemButton, 
  ShoppingCartItemFooter, 
  ShoppingCartProductDescription, 
  ShoppingImageProduct } from '@/styles/components/ShoppingCart/styles'
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import productImg from '../../assets/camisetas/1.png'
import axios from 'axios';
import { StoreContext } from '@/storage/StoreContext';



interface ShoppingCartProps {
  onClose: ()=> void;
}

export default function ShoppingCart({onClose}: ShoppingCartProps) {
  let total = 0;
  const {products, remove} = useContext(StoreContext);
  const [isCheckoutStarting,setCheckoutStarting] = useState(false);
  if(products.length > 0)
    total = products.map(product => (product.priceNumber)).reduce((calculatePrice,price) => calculatePrice + price);
  
  const handlerRemoveProduct = (id:string)=>{ 
      remove(id);
  }
  const handleBuyProduct = async ()=>{
    try{
        setCheckoutStarting(true);
          const ids = products.map(product =>  product.priceId)
          const response = await axios.post('/api/checkout',{
            //priceId: product.priceId
            ids: ids
          });
          
          const {checkoutUrl} = response.data;
          window.location.href = checkoutUrl;
          
          //caso seja uma rota interna do projeto
          //router.push('/checkout');

    }catch(err){
      alert('Falha ao redirecionar ao checkout!');
      setCheckoutStarting(false);
    }
  }

  return (
    <ShoppingCartContainer>
      <ShoppingCartHeader>
            <h1>Sacola de compras</h1>
            <span onClick={onClose}>X</span>
      </ShoppingCartHeader>
      <ShoppingCartContent>
        {
          products.map(product =>(
              <ShoppingCartContentItem>
                  <ShoppingImageProduct>
                        <Image alt='' src={product.imageUrl} width={100} height={100} />
                  </ShoppingImageProduct>
                    <ShoppingCartProductDescription>
                      <label>{product.name}</label>
                      <span>{product.price}</span>
                      <a onClick={()=> handlerRemoveProduct(product.id)}>Remover</a>
                  </ShoppingCartProductDescription>
              </ShoppingCartContentItem>
          ))
        }
      </ShoppingCartContent>


      <ShoppingCartFooter>
        <ShoppingCartItemFooter>
            <span>Quantidade</span>
            <span>{products.length} itens</span>
        </ShoppingCartItemFooter>
        <ShoppingCartItemFooter>
            <strong>Valor total</strong>
            <strong>{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(total)}</strong>
        </ShoppingCartItemFooter>
       <ShoppingCartItemButton disabled={products.length === 0} onClick={handleBuyProduct}>
            Finalizar Compra
       </ShoppingCartItemButton>
        
      </ShoppingCartFooter>
    </ShoppingCartContainer>
  )
}
