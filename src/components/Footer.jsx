import { logo_2 } from "../assets/home";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="bg-[#212121] py-14 text-white">
      <Container>
        <div className="grid place-items-center sm:text-left text-center lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          <img src={logo_2} alt="Grant canyon" className="w-100 h-100" />
          <div className="sm:mt-0 mt-14">
            <h1 className="font-bold capitalize sm:pt-0 pt-8 pb-4">company</h1>
            <ul>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/contact">Contact Us</a>
              </li>
             
              <li>
                <a href="/about">Privacy Policy</a>
              </li>
            
            </ul>
          </div>
          <div>
            <h1 className="font-bold capitalize sm:pt-0 pt-8 pb-4">connect</h1>
            <ul>
              <li>
                <a href="https://github.com/kelvin901/WanderLust-WayFinderFront-End">Github</a>
              </li>

              <li>
                <a href="https://www.linkedin.com/">Linkedin</a>
              </li>
              <li>
                <a href="https://www.youtube.com/watch?v=OUNCrtxLMLM">Youtube</a>
              </li>
 
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
