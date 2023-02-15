import Link from 'next/link';
import { Container } from 'react-bootstrap';


const Catalog = () => {
  return (
    <Container className='display-1'
    style={{
      marginTop:'3rem',
      textAlign:'center'
    }}
    >
      <Link target="_blank" href='https://resources.finalsite.net/images/v1653403002/rsdedu/v8gyhn1oxq83dtsqsw46/HS2022-23Catalogv6.pdf'>Catalog Page</Link>
    </Container>
  );
};

export default Catalog;