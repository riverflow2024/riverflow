import React, { Component } from 'react';
import '../assets/news.css';



class NewsIndex extends Component {
    state = {
        Users: {
           
        },
        

    }

    render() {

        return (
            <section class="news">

            <div class="nav-box">
                <div class="tab">
                    <button class="tablinks" onClick={(e) => this.openCity(e.currentTarget, 'All')} id="defaultOpen">
                        <h3>全部類別</h3>
                    </button>
                    <button class="tablinks" onClick={(e) => this.openCity(e.currentTarget, 'DJ')}>
                        <h3><i class="bi bi-disc-fill"></i> DJ <span>| Disc Jockey</span></h3>
                    </button>
                    <button class="tablinks" onClick={(e) => this.openCity(e.currentTarget, 'Breaking')}>
                        <h3><i class="fa-solid fa-people-pulling"></i> 街舞 <span>| Breaking</span></h3>
                    </button>
                    <button class="tablinks" onClick={(e) => this.openCity(e.currentTarget, 'Rapping')}>
                        <h3><i class="fa-solid fa-microphone-lines"></i> 饒舌 <span>| Rapping</span></h3>
                    </button>
                    <button class="tablinks" onClick={(e) => this.openCity(e.currentTarget, 'Graffiti')}>
                        <h3><i class="fa-solid fa-spray-can-sparkles"></i> 塗鴉 <span>| Graffiti</span></h3>
                    </button>
                    <button class="tablinks" onClick={(e) => this.openCity(e.currentTarget, 'Skate')}>
                        <h3><i class="bi bi-bandaid-fill"></i> 滑板 <span>| Skate</span></h3>
                    </button>
    
                </div>
            </div>
            <div class="content-box">
                <div id="All" class="tabcontent">
                    <div class="content">
                        <div class="content-left">
    
                            <a href="news_article.html">
                                <img class="decorate-left" src={require('../assets/images/decor01.png')} alt=""/>
                                <div class="newsCard-green">
                                    
                                    
                                    <div class="img-box">
                                        <img src={require("../assets/images/new_banner1.png")} alt=""/>
                                    </div>
                                    <div class="item">
                                        <div class="wrap">
                                            <p>
                                                <span>/// </span><span>饒舌</span>
                                            </p><br/><br/>
                                            <span>2024.</span>
                                            <span>08.05</span>
    
                                        </div>
                                        <div class="wrap">
                                            <h4 class="multiline-ellipsis ">來自成都集團CDC的大陸饒舌歌手王以太</h4>
                                            <p class="multiline-ellipsis ">在2018年《中國新說唱》中取得全國前六強的好成績</p>
                                        </div>
                                        <div class="wrap">
                                            <div class="morebtn"><i class="bi bi-arrow-right"></i></div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <a href="">
                                <div class="newsCard-gray">
                                    <div class="img-box">
                                        <img src={require("../assets/images/塗鴉 用的圖.jpg")} alt=""/>
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
                                        <img src={require("../assets/images/塗鴉 用的圖.jpg")} alt=""/>
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
    
                        <div class="content-right">
    
                            <a href="">
                                <div class="newsCard-gray">
                                    <div class="img-box">
                                        <img src={require("../assets/images/塗鴉 用的圖.jpg")} alt=""/>
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
                                <img class="decorate-right" src={require("../assets/images/decor05.png")} alt=""/>
                                <div class="newsCard-green">
                                    <div class="img-box">
                                        <img src={require("../assets/images/塗鴉 用的圖.jpg")} alt=""/>
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
                                <img class="decorate-right" src={require("../assets/images/decor05.png")} alt=""/>
                                <div class="newsCard-gray">
                                    <div class="img-box">
                                        <img src={require("../assets/images/塗鴉 用的圖.jpg")} alt=""/>
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
                    <div class="btn-box">
                        <button class="btn"><i class="bi bi-arrow-left-circle"></i></button>
                        <button class="btn">1</button>
                        <button class="btn">2</button>
                        <button class="btn">3</button>
                        <button class="btn"><i class="bi bi-arrow-right-circle"></i></button>
                    </div>
                </div>
                <div id="DJ" class="tabcontent">
                    <div class="content">
                        <div class="content-left">
    
                            <a href="news_article.html">
                                <img class="decorate-left" src={require('../assets/images/decor01.png')} alt=""/>
                                <div class="newsCard-green">
                                    
                                    
                                    <div class="img-box">
                                        <img src={require("../assets/images/new_banner1.png")} alt=""/>
                                    </div>
                                    <div class="item">
                                        <div class="wrap">
                                            <p>
                                                <span>/// </span><span>饒舌</span>
                                            </p><br/><br/>
                                            <span>2024.</span>
                                            <span>08.05</span>
    
                                        </div>
                                        <div class="wrap">
                                            <h4 class="multiline-ellipsis ">來自成都集團CDC的大陸饒舌歌手王以太</h4>
                                            <p class="multiline-ellipsis ">在2018年《中國新說唱》中取得全國前六強的好成績</p>
                                        </div>
                                        <div class="wrap">
                                            <div class="morebtn"><i class="bi bi-arrow-right"></i></div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <a href="">
                                <div class="newsCard-gray">
                                    <div class="img-box">
                                        <img src={require("../assets/images/塗鴉 用的圖.jpg")} alt=""/>
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
                                        <img src={require("../assets/images/塗鴉 用的圖.jpg")} alt=""/>
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
    
                        <div class="content-right">
    
                            <a href="">
                                <div class="newsCard-gray">
                                    <div class="img-box">
                                        <img src={require("../assets/images/塗鴉 用的圖.jpg")} alt=""/>
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
                                <img class="decorate-right" src={require("../assets/images/decor05.png")} alt=""/>
                                <div class="newsCard-green">
                                    <div class="img-box">
                                        <img src={require("../assets/images/塗鴉 用的圖.jpg")} alt=""/>
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
                                <img class="decorate-right" src={require("../assets/images/decor05.png")} alt=""/>
                                <div class="newsCard-gray">
                                    <div class="img-box">
                                        <img src={require("../assets/images/塗鴉 用的圖.jpg")} alt=""/>
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
                    <div class="btn-box">
                        <button class="btn"><i class="bi bi-arrow-left-circle"></i></button>
                        <button class="btn">1</button>
                        <button class="btn">2</button>
                        <button class="btn">3</button>
                        <button class="btn"><i class="bi bi-arrow-right-circle"></i></button>
                    </div>
                </div>
                
                    
    
    
            </div>
    
            
    
        </section>




        );
        

      


    }

    openCity(evt, cityName) {
        console.log(evt); // 檢查 evt 是否是正確的事件對象
        console.log(cityName); // 檢查 cityName 是否是正確的值
    
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        const cityElement = document.getElementById(cityName);
        if (cityElement) {
            cityElement.style.display = "block";
        } 
        if (evt.currentTarget) {
            evt.currentTarget.className += " active";
        } 
    }
    
    componentDidMount() {
        document.getElementById("defaultOpen").click();
    }


}
export default NewsIndex;