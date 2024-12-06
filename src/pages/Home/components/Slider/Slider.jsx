import './Slider.scss'
import { Carousel } from 'antd';
import slide_1 from '../../../../assets/images/slider_1.jpg'

export const Slider = () => {
    return (
        <div className='slider'>
            <Carousel className='slider-content' arrows autoplay autoplaySpeed={5000} speed={1000}>
                <div className='slide-item'>
                    <img src={slide_1} alt='slide-1' />
                </div>
            </Carousel>
        </div>
    )
}
