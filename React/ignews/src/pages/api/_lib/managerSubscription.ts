import { fauna } from "../../../services/fauna";
import { query as q } from 'faunadb';
import { stripe } from "../../../services/stripe";

export async function saveSubscription(subscriptionId: string, customerId: string, createdAction = false) {
    // Buscar o usuário no banco do FaunaDB com o ID {customerId}
    // Antes precisamos criar um index no fauna user_by_stripe_customer_id -> data.stripe_customer_id
    // Salvar os dados da subscription do usuário no FaunaDB, devemos criar uma collection subscription

    const userRef = await fauna.query(
       q.Select(
        "ref",
        q.Get(
            q.Match(
                q.Index('user_by_stripe_customer_id'),
                customerId
            )
        )
       )
    )

    const subscription = await stripe.subscriptions.retrieve(subscriptionId)

    const subscriptionData = {
        id: subscription.id,
        userId: userRef,
        status: subscription.status,
        price_id: subscription.items.data[0].price.id
    }

    if (createdAction) {
        await fauna.query(
            q.Create(
                q.Collection('subscription'),
                { data: subscriptionData}
            )
        )
    } else {
        // Criar um novo index na collection subscription
        // subscription_by_id -> data.id
        await fauna.query(
            q.Replace(
                q.Select(
                    "ref",
                    q.Get(
                        q.Match(
                            q.Index('subscription_by_id'),
                            subscription.id
                        )
                    )
                ),
                { data: subscriptionData}
            )
        )
    }

}