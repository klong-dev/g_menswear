import './Home.scss'
import { Container } from "../../components/Container/Container"
import { Slider } from './components/Slider/Slider'
import { HotProduct } from './components/HotProduct/HotProduct'

export const Home = () => {
    return (
        <div className="home">
            <Slider />
            <Container>
                <HotProduct />
            </Container>
        </div>
    )
}
