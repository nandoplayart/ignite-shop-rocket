import React, { useContext, useState } from 'react';
import Image from 'next/image';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { ImageContainer, ProductContainer, ProductDetails } from '@/styles/pages/produt';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';
import ShoppingCart from '@/components/ShoppingCart';
import { StoreContext } from '@/storage/StoreContext';


interface ProdutProps {
  product:{
    id:string;
    name:string;
    imageUrl: string;
    price: string,
    description:string,
    priceId:string,
    priceNumber: number
  }
}

export default function Product({product}:ProdutProps) {
  
  const {add} = useContext(StoreContext);
  const [isShowShoppingCart,setShowShoppingCart] = useState(false);
  const {isFallback} = useRouter();
  const handlerAddToCart = () => {
    add(product);
    setShowShoppingCart(true);
  }

  if(isFallback)
    return <p>Loading...</p>
  return (
    <>
        <Head>
          <title>{product.name}</title>
        </Head>
        <ProductContainer>
          <ImageContainer>
              <Image src={product.imageUrl} width={520} height={480} alt='' />
          </ImageContainer>
          <ProductDetails>
            <h1>{product.name}</h1>
            <span>{product.price}</span>
            <p>{product.description}</p>
            <button  onClick={handlerAddToCart}>Comprar</button>
          </ProductDetails>
        </ProductContainer>
         { isShowShoppingCart && <ShoppingCart onClose={()=> setShowShoppingCart(false)}  />}
    </>
  )
}

export const getStaticPaths:GetStaticPaths = async ()=>{
  return {
    paths:[
      {params: {id: 'prod_NetuEXwSeKQnxQ'}}
    ],
    fallback: true
  }
}

export const getStaticProps:GetStaticProps<any,{id: string}> = async({params})=>{

  const productId = params?.id as string;
  const product = await stripe.products.retrieve(productId,{expand: ['default_price']})
  const price = product.default_price as Stripe.Price;
  console.log('::priceId::', price.id)
  return {
    props:{
      product:{
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(price.unit_amount as number / 100),
        priceNumber: price.unit_amount as number / 100,
        description: product.description,
        priceId: price.id
      }
    },
    revalidate: 60 * 60 * 1// 1 hora
  }
}