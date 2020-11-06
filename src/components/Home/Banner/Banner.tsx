import React from 'react';
import './Banner.scss';

type BannerProps = {
    nameOfClass: string,
    src: string,
}
const LargeImage = ({nameOfClass, src}: BannerProps) => {
    return (
        <>
            <img alt='Books' className={'bannerImage ' + nameOfClass} src={src}/>
        </>
    )
}
const MediumImage = ({nameOfClass, src}: BannerProps) => {
    return (
        <>
            <img alt='Books' className={'bannerImage ' + nameOfClass} src={src}/>
        </>
    )
}
const SmallImage = ({nameOfClass, src}: BannerProps) => {
    return (
        <>
            <img alt='Books' className={'bannerImage ' + nameOfClass} src={src}/>
        </>
    )
}
const Banner = () => {
    return (
        <section className="pageBanner">
                <SmallImage nameOfClass='smallOne' src='/bannerS1.jpg'/>
                <SmallImage nameOfClass='smallTwo' src='/bannerS2.jpg'/>
                <LargeImage nameOfClass='bannerLarge' src={'/bannerL.jpg'}/>
                <MediumImage nameOfClass='mediumOne' src='/bannerM1.jpg'/>
                <MediumImage nameOfClass='mediumTwo' src='/bannerM2.jpg'/>
                <SmallImage nameOfClass='smallFour' src='/bannerS4.jpg'/>
                <SmallImage nameOfClass='smallThree' src='/bannerS3.jpg'/>
        </section>
    )
}

export default Banner;