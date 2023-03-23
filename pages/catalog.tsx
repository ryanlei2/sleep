import Link from 'next/link';
import { Container } from 'react-bootstrap';


const Catalog = () => {
  return (
    <Container className='display-1'
    style={{
      marginTop:'150px',
      textAlign:'center'
    }}
    >
      <Link target="_blank" href='https://resources.finalsite.net/images/v1677715498/rsdedu/livi36kif2azcpamtafa/RSDHighSchoolCatalog2023-2024Digital.pdf'>Catalog Page</Link>
    </Container>
  );
};

export default Catalog;