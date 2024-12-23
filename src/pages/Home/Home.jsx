import './Home.scss'
import { Container } from "../../components/Container/Container"
import { Slider } from './components/Slider/Slider'
import { HotProduct } from './components/HotProduct/HotProduct'
import { Banner } from './components/Banner/Banner'
import { ListProduct } from './components/ListProduct/ListProduct'

export const Home = () => {
    return (
        <div className="home">
            <Slider />
            <Container>
                <HotProduct />
                <Banner />
                <ListProduct />
            </Container>
        </div>
    )
}
