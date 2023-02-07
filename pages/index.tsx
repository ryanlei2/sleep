import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Button, Container } from 'react-bootstrap'
import styles from '../styles/home.module.css'
import banner from '../assets/banner.png'
import Link from 'next/link'
import { IBM_Plex_Sans } from '@next/font/google'

const Home: NextPage = () => {
  function handleClick() {
    console.log('increment like count');
  }

  return (
    <div>
      <Container>
        <div className={styles.heroImg}>
          <Image className={styles.heroBanner}
              src={banner}
              fill
              objectFit='cover'
              alt='Brand logo'
            />
        </div>
        {/* ^ must be cropped, image whitespacce treated as image still */}
      <div className={styles.homeTitle}>
        <b className={styles.bannerTitle}>Let&apos;s Plan Together</b>
        <br></br><p className={styles.bannerSubtext}>We&apos;re on a mission to help every student choose the right path.</p>
        <Link href="/signup" passHref>
          <Button className={styles.getStartedBtn}>
            Get Started
          </Button>
        </Link>
      </div>
      <h2 className={styles.homeBodyTitle}>Unsure about your class selection?</h2>

      <div className={styles.buttonsContainer}>
        <Button className={styles.button}>Course Catalog</Button>
        <Button className={styles.button2}>FAQ</Button>
      </div>


      </Container>
    </div>
  )
}

export default Home
