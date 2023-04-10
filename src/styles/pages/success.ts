import { styled } from "..";

export const SuccessContainer = styled('main',{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    height: 656,
    h1:{
        fontSize: '$2xl',
        color: '$gray100',
        marginTop: '3rem'
    },
    p:{
        fontSize: '$xl',
        color: '$gray300',
        maxWidth: 560,
        textAlign: 'center',
        marginTop: '2rem'
    },
    a:{
        textDecoration: 'none',
        fontWeight: 'bold',
        display: 'block',
        marginTop: '5rem',
        fontSize: '$lg',
        color: '$green500',
        '&:hover':{
            color: '$green300'
        }

    }
});

export const ImageContainer = styled('div',{
   width: 140,
   height: 140,
   background: 'linear-gradient(180deg, #1EA483 0%, #7465D4 100%)',
   borderRadius: 200,
   margin: '0 -37px',
});

export const ImageContinerItem = styled('div',{
    display: 'flex',
    flexDirection: 'row'
})