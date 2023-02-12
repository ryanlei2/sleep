import type { NextPage } from 'next'
import { Button, Card, Container } from 'react-bootstrap'
import styles from '../styles/home.module.css'
import banner from '../assets/banner.png'
import Link from 'next/link'
import { IBM_Plex_Sans } from '@next/font/google'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/router'


const Home: NextPage = () => {
  return (
    <div>
      
      {/* <div className='' >
        <Image 
              src={banner}
              alt='Brand logo'
              fill
            />
      </div> */}
        
        <div className={styles.banner}>
          <b className={styles.bannerTitle}>Let&apos;s Plan Together</b>
          <br></br>
          <p className={styles.bannerSubtext}>We&apos;re on a mission to help every student choose the right path.</p>
          
            <Link href={"/signup"}
            className={styles.getStartedBtn} 
            legacyBehavior>
              <a className={styles.bannerButton}
                onClick={() => {
                  {user ? (
                    router.push('/survey')
                  ) : (
                    router.push('/signup')
                  )}
                    
                  }} 
              >Get Started</a>
              {/* 
                test
              */}
            </Link>
      </div>
      
      <div
      style={{
        width: '40%',
        margin: 'auto',
      }}> 
        <h2 className="display-1 text-center my-3 ">Unsure about your class selection?</h2>
      </div>
        <div className={styles.buttonsContainer}>
          <Button className={styles.button}>Course Catalog</Button>
          <Button className={styles.button2}>FAQ</Button>
        </div>
    </div>
      
  );
}

export default Home
