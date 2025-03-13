import styles from './styles.module.scss';
import Link from 'next/link'

import { LogOutIcon } from 'lucide-react'
import { cookies } from 'next/headers';

export function Header(){

  async function handleLogout() {
    'use server'
    cookies().delete("auth") 
  }

  return(
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/dashboard">
          <img src="/logo.png" width={200} height={90} alt="DevPizza"/>
        </Link>

        <nav>
          <Link href="/dashboard/category">
            Categoria
          </Link>
          <Link href="/dashboard/product">
            Cardapio
          </Link>
          <form action={handleLogout}>
            <button type="submit">
              <LogOutIcon size={23} color="#FFF"/>
            </button>
          </form>
        </nav>

      </div>
    </header>
  )
}