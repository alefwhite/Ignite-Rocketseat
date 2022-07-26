import { signIn, useSession } from 'next-auth/react';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';

interface SubscribeButtonProps {
    priceId: string;
}

// 3 lugares onde podemos utilizar com segurança nossas credenciais do env.local
// getServerSideProps (SSR)
// getStaticProps (SSG)
// API routes

export function SubscribeButton({ priceId } : SubscribeButtonProps) {
    const {data: session, status } = useSession()

    const handleSubscribe = async () => {
        if (!session) {
            signIn("github")

            return;
        }
        
        try {
            const response = await api.post('/subscribe')

            const { sessionId } = response.data

            const stripe = await getStripeJs()

            await stripe.redirectToCheckout({ sessionId })

        } catch (error) {
            console.log(error)
            alert(error.message)
        }
    }

    return (
        <button 
            type="button"
            className={styles.subscribeButton}
            onClick={handleSubscribe}
        >
            Subscribe now
        </button>
    )
}