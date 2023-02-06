import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Container } from 'react-bootstrap'
import styles from '../styles/home.module.css'
import banner from '../assets/banner.png'


const Home: NextPage = () => {
  return (
    <div>
      <Container className={styles.body}>
          <Image className={styles.heroBanner}
              src={banner}
              layout='fill'
              objectFit='cover'
              alt='Brand logo'
            />
        {/* ^ must be cropped, image whitespacce treated as image still */}
      <div className={styles.homeTitle}>
        <b className={styles.bannerTitle}>Let&apos;s Plan Together</b>
        <br></br><p className={styles.bannerSubtext}>We&apos;re on a mission to help every student choose the right path.</p>
      </div>
      <h2 className={styles.homeBodyTitle}>Unsure about your class selection?</h2>

      <div className={styles.buttons}>
      
      </div>


      </Container>
    </div>
  )
}

export default Home
