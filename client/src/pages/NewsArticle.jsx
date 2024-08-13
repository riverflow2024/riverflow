import React, { Component } from 'react';
import '../assets/news.css';



class NewsArticle extends Component {
    state = {
        Users: {

        },


    }

    render() {

        return (
            <div>
                <section class="newsArticle content">
                    <div class="news-banner">
                        <img src={require("../assets/images/new_banner1.png")} alt="" />
                            <div class="news-title">
                                <h1>來自成都集團CDC的大陸饒舌歌手王以太</h1>
                            </div>
                    </div>
                    <article>
                        <div class="meta">
                            <h3>由<span> Andy </span>編寫</h3>
                            <span>發佈時間 : 2024.08.05 </span>
                        </div>
                    </article>
                    <article>
                        <div class="wrap">
                            <p>
                                大陸說唱歌手「王以太」2018年參加《中國新說唱》一路過關斬將闖到全國前六強，知名度和人氣水漲船高，節目結束之後除了持續在演藝圈活躍，也經常跑遍各大商演，然而他先前才在演出遭到台下觀眾惡意潑香檳，近日又再度爆出類似遭遇，引發不少網友熱議。
                            </p>

                        </div>
                    </article>
                    <article>
                        <div class="news-img-box">
                            <img src={require("../assets/images/new_banner.jpg")} alt=""/>
                        </div>
                        <div class="title">
                            <h1>王以太 《Love Me Later》 台北站</h1>
                        </div>
                        <div class="wrap">
                            <p>
                                來自成都集團CDC的大陸饒舌歌手王以太，在2018年《中國新說唱》中取得全國前六強的好成績，後陸續參加《我是唱作人》、《我們的樂隊》等音樂節目，並於2022年《中國說唱巔峰對決》中與成員以「一席之地」之團隊名稱，拿下巔峰聯盟冠軍。

                                這位能唱又能饒的歌手在2019年榮獲華人歌曲音樂盛典年度最受歡迎說唱歌手獎，他的代表作也在YouTube累積驚人的觀看數，其中《目不轉睛》已累積339萬次觀看、《時間是金》累積128萬次觀看。

                                2024年，王以太將帶著他的第三張全新個人專輯《Love Me Later》展開巡迴演出，並於9月14日首次在台北舉辦專場演出，期待與粉絲們共同打造最炸的嘻哈舞台。
                            </p>
                            <div class="news-img-box">
                                <img src={require("../assets/images/newsimg2.jpg")} alt=""/>
                            </div>

                        </div>

                    </article>


                </section>
                <section class="newsList">
                    <div class="newsList-title">
                        <h2>為你推薦</h2>
                    </div>
                    <div class="newsList-wrap">
                        <div class="box">
                            <a href="">
                                <div class="newsCard-green">
                                    <div class="img-box">
                                        <img src={require("../assets/images/RAP.jpg")} alt=""/>
                                    </div>
                                    <div class="item">
                                        <div class="wrap">
                                            <p>
                                                <span>/// </span><span>街舞</span>
                                            </p><br/><br/>
                                                <span>2024.</span>
                                                <span>07.28</span>

                                            </div>
                                                <div class="wrap">
                                                    <h4 class="multiline-ellipsis ">台灣嘻哈的強勢分支- 台灣TRAP 台灣嘻哈的強勢分支- 台灣TRAP</h4>
                                                    <p class="multiline-ellipsis ">當陷阱音樂從美國告示牌排行榜上一路延燒至台灣</p>
                                                </div>
                                                <div class="wrap">
                                                    <div class="morebtn"><i class="bi bi-arrow-right"></i></div>
                                                </div>
                                        </div>
                                    </div>
                            </a>
                            <a href="">
                                <div class="newsCard-green">
                                    <div class="img-box">
                                        <img src={require("../assets/images/RAP.jpg")} alt=""/>
                                    </div>
                                    <div class="item">
                                        <div class="wrap">
                                            <p>
                                                <span>/// </span><span>街舞</span>
                                            </p><br/><br/>
                                                <span>2024.</span>
                                                <span>07.28</span>

                                            </div>
                                                <div class="wrap">
                                                    <h4 class="multiline-ellipsis ">台灣嘻哈的強勢分支- 台灣TRAP 台灣嘻哈的強勢分支- 台灣TRAP</h4>
                                                    <p class="multiline-ellipsis ">當陷阱音樂從美國告示牌排行榜上一路延燒至台灣</p>
                                                </div>
                                                <div class="wrap">
                                                    <div class="morebtn"><i class="bi bi-arrow-right"></i></div>
                                                </div>
                                        </div>
                                    </div>
                            </a>
                            <a href="">
                                <div class="newsCard-green">
                                    <div class="img-box">
                                        <img src={require("../assets/images/RAP.jpg")} alt=""/>
                                    </div>
                                    <div class="item">
                                        <div class="wrap">
                                            <p>
                                                <span>/// </span><span>街舞</span>
                                            </p><br/><br/>
                                                <span>2024.</span>
                                                <span>07.28</span>

                                            </div>
                                                <div class="wrap">
                                                    <h4 class="multiline-ellipsis ">台灣嘻哈的強勢分支- 台灣TRAP 台灣嘻哈的強勢分支- 台灣TRAP</h4>
                                                    <p class="multiline-ellipsis ">當陷阱音樂從美國告示牌排行榜上一路延燒至台灣</p>
                                                </div>
                                                <div class="wrap">
                                                    <div class="morebtn"><i class="bi bi-arrow-right"></i></div>
                                                </div>
                                        </div>
                                    </div>
                            </a>
                        </div>
                    </div>

                </section>
            </div>




        );





    }


   


}
export default NewsArticle;