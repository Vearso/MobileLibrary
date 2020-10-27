import './Home.scss';
import React from "react";
import Header from "../../components/Home/Header/Header";
import Banner from "../../components/Home/Banner/Banner";
import About from "../../components/Home/About/About";
import Articles from "../../components/Home/Articles/Articles";


function Home() {
    return (
        <div className="App">
            <Header/>
            <Banner/>
            <About/>
            <Articles/>
        </div>
    );
}

export default Home;
