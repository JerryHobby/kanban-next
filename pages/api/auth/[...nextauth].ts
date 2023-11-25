import NextAuth from "next-auth"
import nextAuthOptions from "../../../auth/authOptions";

// const handler = NextAuth(nextAuthOptions);
// export { handler as GET, handler as POST};
// export default handler;

const authHandler = NextAuth(nextAuthOptions);
export default async function handler(...params: any[]) {
    await authHandler(...params);
}