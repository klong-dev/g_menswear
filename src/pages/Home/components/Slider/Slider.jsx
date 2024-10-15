import './Slider.scss'
import { Carousel } from 'antd';
import slide_1 from '../../../../assets/images/slide-1.png'
import slide_2 from '../../../../assets/images/slide-2.png'


export const Slider = () => {
    return (
        <div className='slider'>
            <Carousel className='slider-content' arrows autoplay autoplaySpeed={5000} speed={1000}>
                <div className='slide-item'>
                    <img src={slide_1} alt='slide-1' />
                </div>
                <div className='slide-item'>
                    <img src={slide_2} alt='slide-2' />
                </div>
            </Carousel>
        </div>
    )
}
