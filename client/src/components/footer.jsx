import React from 'react'
import '../assets/basic.css'

export default function Footer() {
    return(
        <footer>
        <div class="flex container">
            <img class="logo" src="../assets/images/riverflow_logo_f.png" alt="logo"/>
            <div class="flex footer-right">
                <div class="flex linkList">
                    <a href="#" class="footerLink">關於我們</a>
                    <a href="#" class="footerLink">聯絡我們</a>
                    <a href="#" class="footerLink">條款與隱私</a>
                    <a href="#" class="footerLink">FAQ</a>
                </div>
                <span class="copyright">Copyright © 2006-2024 RiverFlow</span>
            </div>
        </div>
    </footer>
    )
}