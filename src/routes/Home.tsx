import Header from "../components/header/Header";
import HomeComponent from "../components/Home/HomeComponent";
import HomeContainer from "../containers/home/HomeContainer";


function Home() {
  return (
    <div>
      <Header />
      <HomeComponent />
      <HomeContainer />
    </div>
  );
}

export default Home;
