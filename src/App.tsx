import Container from 'react-bootstrap/Container'
import { Table } from './components/Table'
import { Consult } from './components/Consult'
import { useStates } from './hooks/useStates'

function App() {
  const { products, setProducts } = useStates()
  return (
    <Container className='d-flex flex-column align-items-center justify-content-center px-0 py-0 pt-5 gap-3'>
      <Consult setProducts={setProducts}/>
      <Table products={products} setProducts={setProducts}/>
    </Container>
  )
}

export default App
