import Image from 'next/image';
import styles from './page.module.scss';

import logoImg from '/public/logo.png';

import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import { api } from '@/services/api';

export default function Page() {

  async function handleLogin(formData: FormData){
    "use server"
    
    const email = formData.get("email")
    const password = formData.get("password")

    if(email === '' || password === ''){
      return;
    }

    try{
      const response = await api.post("/auth", {
        email: email,
        password: password,
      })
  
      if(!response.data.token){
        return;
      }
  
      const expiresTime = 60 * 60 * 24 * 30 * 1000;
      cookies().set("session", response.data.token,
        {
          maxAge: expiresTime,
          httpOnly: false,
          path: "/",
          secure: process.env.NODE_ENV === "production",
        });
  
    }catch(err){
      console.log(err);
    }

    redirect("/dashboard")
  }

  return (
    <>
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo Sujeito Pizzaria" />

      <div className={styles.login}>
        <form action={handleLogin} >
          <input
            placeholder="Digite seu email"
            className={styles.input}
            type="email"
            name="email"
            required
          />

          <input
            placeholder="Digite sua senha..."
            className={styles.input}
            type="password"
            name="password"
            required
          />
          
          <button type="submit" className={styles.button}>
            Acessar
          </button>
        </form>
        
        <Link href="/signup" className={styles.text}>
           Nao possui uma conta? Cadastre-se
        </Link>

      </div>
    </div>
    </>
  )
}
