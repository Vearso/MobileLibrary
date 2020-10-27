import './Home.scss';
import React from "react";
import Header from "../../components/Home/Header/Header";
import Banner from "../../components/Home/Banner/Banner";
import About from "../../components/Home/About/About";


function Home() {
    return (
        <div className="App">
            <Header/>
            <Banner/>
            <About/>
        </div>
    );
}

export default Home;
