import { query as q } from 'faunadb';
import type { NextAuthOptions } from "next-auth";
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

import { fauna } from '../../../services/fauna';

export const authOptions: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            authorization: {
                params: {
                    scope: 'read:user'
                }
            }
        }),
    ],
    callbacks: {
        async signIn({user, account, profile}) {
            try {
                const { email } = user;

                await fauna.query(
                    q.If(
                        q.Not(
                            q.Exists(
                                q.Match(
                                    q.Index('user_by_email'),
                                    q.Casefold(email)
                                )
                            )
                        ),
                        q.Create(
                            q.Collection('users'), 
                            { data: { email } }
                        ),
                        q.Get(
                            q.Match(
                                q.Index('user_by_email'),
                                q.Casefold(email)
                            )
                        )
                    )
                    
                )

                console.log(email);

                return true;
            } catch (error) {
                console.log(error)
                return false;
            }            
        }
    }
}

export default NextAuth(authOptions)

