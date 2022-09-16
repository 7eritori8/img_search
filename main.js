'use strict';
// Unsplash Source API 

// 現在表示されている画像リストのDOMを削除
const imgListRemove = ()=>{
    let nodeList = document.getElementById('img__list').querySelectorAll('li')
    for (let i = 0, len = nodeList.length; i < len ; i++){
        nodeList[i].remove();
    }
}
// 画像リストのDOMを作成
const imgListCreate = (srcURL)=>{
    // ul要素を取得
    let ulElement = document.getElementById('img__list');
    
    // 挿入したいDOM要素を生成
    // list要素を作成、設置
    let newList = document.createElement('li');
    ulElement.appendChild(newList);

    // li要素内にaタグ生成
    let listanchor = document.createElement('a');
    listanchor.setAttribute('href',srcURL);
    listanchor.setAttribute('data-lightbox',"group");

    // ul内の一番最後のlist要素を取得
    let lastList = ulElement.lastElementChild;
    lastList.appendChild(listanchor);

    // img要素を作成、最後のliタグ内に設置
    let newListImg = document.createElement('img');

    // 作成したimgタグにsrc属性を指定
    newListImg.setAttribute('src',srcURL);
    listanchor.appendChild(newListImg);
}   

// 50枚画像をランダムに表示
const randomImage = ()=>{
    let i = "";
    for(let i =0; i< 50 ; i++){
        // 5000以下のランダムな整数を生成
        let random_num = Math.floor( Math.random() * (5000));
        // 画像のsrcURLを生成
        let srcURL = "https://source.unsplash.com/random/" + random_num;
        
        //画像リストDOMを作成 
        imgListCreate(srcURL)
    }
}

randomImage();
// ランダムボタンをクリックすると画像を入れ替えて表示する
let randomButton = document.getElementById('randomBtn');
randomButton.addEventListener("click",()=>{
    imgListRemove()
     randomImage();
 })

// inputの中身を取得
const getinputValue = ()=>{
    let inputForm = document.getElementById('textform');
    let inputValue = inputForm.value
    return inputValue
}

// 虫眼鏡マークを押すと現在の画像リストを削除、inputの中身からsrcURLを生成
let submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener("click",()=>{

    imgListRemove()
    searchImage(getinputValue());
})

// リロードするまでに何回目の検索か
let searchNum = 0
// リロードされるまでの画像のURL保存用オブジェクトを宣言
let imgsrcs ={};

const searchImage =(value)=>{
    if(value != ""){
        // 履歴リストに追加
        addHistory(value,searchNum);

        imgsrcs[searchNum] = {
            "index":searchNum,
            "value":value,
            "src":[]
        }
        for(let i =0; i< 50 ; i++){
                // 5000以下のランダムな整数を生成
                let random_num = Math.floor( Math.random() * (5000));
                
                // URLにvalueを追加して検索する
                let srcURL = "https://source.unsplash.com/featured/?" + value + "/" + random_num;
                imgListCreate(srcURL);
                
                
            // srcuRLを配列に保存
            imgsrcs[searchNum].src.push(srcURL);
        }
        console.log(imgsrcs)
    }else{
        // 空だった場合はランダムな画像を表示
        randomImage()
    }
    searchNum = searchNum + 1;
}

if (window.matchMedia('(max-width: 767px)').matches) {
    //スマホ処理
        document.getElementById('search__history').style.display = "flex";

} else if (window.matchMedia('(min-width:768px)').matches) {
        //PC処理
         // 履歴を表示する
        const showHistory = ()=>{
            document.getElementById('search__history').style.display = "block";
        }
        // 履歴を非表示にする 
        const hideHistory = ()=>{
            document.getElementById('search__history').style.display = "none";
        }

        // フォームにフォーカスすると履歴表示
        const textform = document.getElementById('textform');
        textform.addEventListener('focus',()=>{
            showHistory();
        })
        // フォームからフォーカスが外れると履歴を非表示
        textform.addEventListener('blur',()=>{
            hideHistory();
        })
}

// 履歴に追加する
const addHistory = (value,searchNum)=>{
    // historyのDOMを取得
    let search__history = document.getElementById('search__history');

    // list要素を作成、設置
    let newHistorylist = document.createElement('li');
    newHistorylist.textContent = value;
    search__history.appendChild(newHistorylist);
    newHistorylist.addEventListener("click",()=>{
        historySearch(searchNum);
    })
}

// 履歴から検索する
const historySearch = (searchNum)=>{
    imgListRemove();
    for(let i =0; i< 50 ; i++){
        let srcURL = imgsrcs[searchNum].src[i]
        imgListCreate(srcURL);
    } 
}




// ハンバーガーメニュー

// 非表示
const menuClose = ()=>{
    document.getElementById('hamburger').style.display = "none";
}

// 表示
const menuOpen = ()=>{
    document.getElementById('hamburger').style.display = "block";
}

// 
document.getElementById('hamburger__close').addEventListener('click',()=>{
    menuClose();
})
document.getElementById('hamburger__open').addEventListener('click',()=>{
    menuOpen();
})
