import { stripe } from '@/lib/stripe'
import { ImageContainer, ImageContinerItem, SuccessContainer } from '@/styles/pages/success'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Stripe from 'stripe'



interface SuccessProps {
    customerName:string,
    products: {
        imageUrl: string
    }[]
}

export default function success({customerName, products}: SuccessProps) {
  return (
    <SuccessContainer>
        <ImageContinerItem>
            {products.map(product => (
                    <ImageContainer>
                    <Image src={product.imageUrl} width={140} height={140} alt='' />
                    </ImageContainer>
            ))}
        </ImageContinerItem>
        <h1>Compra efetuada</h1>
        <p>Uhuul <strong>{customerName}</strong>, sua compra de <strong>{products.length}</strong> {products.length == 1? 'camiseta': 'camisetas'} já está a caminho da sua casa.</p>
        <Link href="/">Voltar ao catálago</Link>
    </SuccessContainer>
  )
}


export const getServerSideProps:GetServerSideProps = async({query, params})=>{
    if(!query.session_id){
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    const sessionId = String(query.session_id);
   
    const session = await stripe.checkout.sessions.retrieve(sessionId,{
        expand: ['line_items', 'line_items.data.price.product']});

    const customerName = session.customer_details?.email;
    const products = session.line_items?.data.map(lineItems => (
        {imageUrl: (lineItems.price?.product as Stripe.Product).images[0] }
        ))
    //const product = session.line_items?.data[0].price?.product as Stripe.Product;
    console.log('product:::',products)
    return{
        props:{
            customerName,
            products:products
            // product:{
            //     name: product.name,
            //     imageUrl: product.images[0]
            // }
        }
    }
}