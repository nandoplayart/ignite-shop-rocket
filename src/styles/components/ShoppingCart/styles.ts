import { styled } from "@/styles";

export const ShoppingCartContainer = styled('div', {
    position: 'absolute',
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: '$gray800',
    width: '35%',
    maxWidth: '480px',
    padding: '3rem'
});

export const ShoppingCartHeader = styled('header', {
    height: '10%',
    backgroundColor: '$gray800',
    display: 'flex',
    alignItems: 'flex-end',
    paddingBottom: '3rem',
    span:{
        position: 'absolute',
        right: '2rem',
        top: '2rem',
        cursor: 'pointer',
        '&:hover':{
            color: '$white'
        }
    }
});


export const ShoppingCartContent = styled('div', {
    height: '60%',
});

export const ShoppingCartContentItem = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1.5rem'
});


export const ShoppingCartProductDescription = styled('div', {
    height: 94,
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '1rem',
    label:{
        marginTop: '0.5rem'
    },
    span:{
        marginTop: '0.5rem',
        marginBottom: '1.5rem',
        fontWeight: 'bold'
    },
    a:{  
        color: '$green500',
        border: 0,
        borderRadius: 8,
        cursor: "pointer",
        '&:hover':{
            color: '$green300'
        }
    }
});


export const ShoppingImageProduct = styled('div', {
    width: '20%',
    height: 94,
    borderRadius: 6,
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
});

export const ShoppingCartFooter = styled('footer', {
    height: '30%',
    backgroundColor: 'gray800',
});


export const ShoppingCartItemFooter = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    marginTop: '0.5rem',
    span:{
        fontSize: '$md'
    },
    strong:{
        fontSize: '$lg'
    }
});

export const ShoppingCartItemButton = styled('button', {
    backgroundColor: '$green500',
    marginTop: '2rem',
    border: 0,
    color: '$white',
    width: '100%',
    borderRadius: 8,
    padding: '1.25rem',
    cursor: "pointer",
    fontWeight: 'bold',
    fontSize: '$md',
    '&:disabled':{
      opacity: 0.6,
      cursor: 'not-allowed'
    },
    '&:not(:disabled):hover':{
      backgroundColor: '$green300',
    }  
});