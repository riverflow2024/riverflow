import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'
import HeaderLogo from '../assets/images/riverflow_logo.png'

export default function Header () {
    const isHomePage = location.pathname === '/Index';
    window.onload = function () {

        let dropdown = document.querySelector('.dropdown')
        dropdown.addEventListener('click', dropDown)

        let dropdownMob = document.querySelector('.dropdown_mob')
        dropdownMob.addEventListener('click', dropDownMob)

        let menuIcon = document.querySelector('.menuIcon')
        menuIcon.addEventListener('click', menuExpand)

        function dropDown() {
            let arrow = document.querySelector('.bi-caret-down-fill')
            // console.log(arrow)
            let dropMenu = document.querySelector('.cultureList')
            dropMenu.classList.toggle('expand')
            arrow.classList.toggle('rotate')
        }

        function dropDownMob() {
            let arrow = document.querySelector('.bi-caret-down-fill_mob')
            let dropMenu = document.querySelector('.cultureList_mob')
            dropMenu.classList.toggle('expand')
            arrow.classList.toggle('rotate')
        }

        function menuExpand() {
            let menu = document.querySelector('.headerLink.mob')
            menu.classList.toggle('expand')
        }

    }
    
    return(
        <header class={`${isHomePage ? 'sticky-navbar' : ''}`} >
            <div class="flex container ">
                <a href="#">
                    <img class="logo" src={HeaderLogo} alt="logo" />
                </a>
                <div class="flex header-right">
                    <ul class="headerLink flex">
                        <li><a href="#">首頁</a></li>
                        <li class="cultureListName dropdown">
                            <a class="dropdownToggle">嘻哈文化<i class="bi bi-caret-down-fill"></i></a>                        
                            <div id="dropdownMenu" class="">
                                <ul class="cultureList flex">
                                    <li><a href="#" class="cultureOpt">DJ</a></li>
                                    <li><a href="#" class="cultureOpt">街舞</a></li>
                                    <li><a href="#" class="cultureOpt">饒舌</a></li>
                                    <li><a href="#" class="cultureOpt">塗鴉</a></li>
                                    <li><a href="#" class="cultureOpt">滑板</a></li>
                                </ul>
                            </div>
                        </li>
                        <li><a href="#">嘻哈專欄</a></li>
                        <li><NavLink to="/Event/Index">into flow</NavLink></li>
                        <li><NavLink to="/Product/All">商店</NavLink></li>
                    </ul>
                    <div class="functionIcons flex">
                        <a href="#" class="headerIcon">
                            <i class="bi bi-ticket-perforated"></i>
                        </a>
                        <a href="#" class="headerIcon">
                            <i class="bi bi-cart"></i>
                        </a>
                        <Link to="/Member/Index" class="headerIcon">
                            <i class="bi bi-person"></i>
                        </Link>
                        <div class="headerIcon mobOnly">
                            <input id="menuBtn" class="menuBtn" type="checkbox" />
                            <label for="menuBtn" class="menuIcon">
                                <span class="navigation"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mobMenu">
                <ul class="headerLink mob flex">
                    <li><a href="#">首頁</a></li>
                    <li class="cultureListName dropdown dropdown_mob">
                        <a class="dropdownToggle">嘻哈文化<i class="bi bi-caret-down-fill bi-caret-down-fill_mob"></i></a>
                        <div id="dropdownMenu">
                            <ul class="cultureList cultureList_mob flex">
                                <li><a href="#" class="cultureOpt">DJ</a></li>
                                <li><a href="#" class="cultureOpt">街舞</a></li>
                                <li><a href="#" class="cultureOpt">饒舌</a></li>
                                <li><a href="#" class="cultureOpt">塗鴉</a></li>
                                <li><a href="#" class="cultureOpt">滑板</a></li>
                            </ul>
                        </div>
                    </li>
                    <li><a href="#">嘻哈專欄</a></li>
                    <li><NavLink to="/Event/Index">into flow</NavLink></li>
                    <li><NavLink to="/Product/All">商店</NavLink></li>
                </ul>
            </div>
        </header>
    )
}