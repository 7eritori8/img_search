'use strict';

// 現在表示されている画像リストのDOMを削除
const removeAllImageList = ()=>{
    document.getElementById('img__list').querySelectorAll('li').forEach((nodeList)=>{
        nodeList.remove();
    })
}

// 画像リストの最後尾にsrcURLのimageタグを追加
const addImageElements = (srcURL)=>{
    // ul要素を取得
    const ulElement = document.getElementById('img__list');
    
    // 挿入したいDOM要素を生成
    // list要素を作成、設置
    const newList = document.createElement('li');
    ulElement.appendChild(newList);

    // li要素内にaタグ生成
    const listAnchor = document.createElement('a');
    listAnchor.setAttribute('href',srcURL);
    listAnchor.setAttribute('data-lightbox',"group");

    // ul内の一番最後のlist要素を取得、生成したaタグを設置
    const lastList = ulElement.lastElementChild;
    lastList.appendChild(listAnchor);

    // img要素を作成、src属性を指定
    const newListImg = document.createElement('img');
    newListImg.setAttribute('src',srcURL);

    // 一番最後のlist要素内に設置したaタグ内にimg要素を設置
    listAnchor.appendChild(newListImg);
}   

// 5000以下のランダムな整数を生成
const generateRandomNum = ()=>{
    return Math.floor( Math.random() * (5000));
}
// 50枚画像をランダムに表示
const randomImage = ()=>{
    for(let i =0; i< 50 ; i++){
        //ランダムな画像のURLを渡して画像リストDOMを作成 
        addImageElements(`https://source.unsplash.com/random/${generateRandomNum()}`);
    }
}

// 検索機能でinputの中身を取得
const getSearchBoxText = ()=>{
    const inputForm = document.getElementById('textForm');
    let inputValue = inputForm.value;
    return inputValue;
}


// リロードするまでに何回目の検索か
let searchNum = 0
// リロードされるまでの画像のURL保存用オブジェクトを宣言
const imgURLs ={};

// n番目の検索結果を保存する配列をオブジェクトに追加
const addArrayToObjectForSearchResultURL = (searchNum)=>{
    imgURLs[searchNum] = [];
}
// n番目の検索結果を保存する配列に追加
const addSearchResultURLToArray = (searchNum,srcURL)=>{
    imgURLs[searchNum].push(srcURL);
}
const searchImage =(value)=>{
    if(value === ""){
        // 空だった場合はランダムな画像を表示
        randomImage();
        return;
    }    
    // 履歴リストに検索ワードを追加
    addHistory(value,searchNum);
    addArrayToObjectForSearchResultURL(searchNum);

    for(let i =0; i< 50 ; i++){
        let srcURL = `https://source.unsplash.com/featured/?${value}/${generateRandomNum()}`
        // URLにvalueを追加して検索、imgDOMを追加
        addImageElements(srcURL);
        // 作成したURLを配列に保存
        addSearchResultURLToArray(searchNum,srcURL)
    }
    searchNum = searchNum + 1;
    
}

if (window.matchMedia('(max-width: 767px)').matches) {
    //スマホ処理
    document.getElementById('search__history').style.display = "flex";
}
if(window.matchMedia('(min-width:768px)').matches) {
    //PC処理        
    // フォームにフォーカスすると履歴表示
    const textForm = document.getElementById('textForm');
    textForm.addEventListener('focus',()=>{
        document.getElementById('search__history').style.display = "block";
    })
    // フォームからフォーカスが外れると履歴を非表示
    // 履歴をクリックする前に消えると困るので、300ミリ秒後に非表示
    textForm.addEventListener('blur',()=>{
        setTimeout(
            ()=>{
                document.getElementById('search__history').style.display = "none"
            },
            300);
    })
}

// 履歴に追加する
const addHistory = (value,searchNum)=>{
    // historyのDOMを取得
    const search__history = document.getElementById('search__history');

    // list要素を作成、設置
    const newHistoryList = document.createElement('li');
    newHistoryList.textContent = value;
    search__history.appendChild(newHistoryList);

    // 履歴のリストをクリックすると検索時の画像を再現する処理を追加
    newHistoryList.addEventListener("click",()=>{
        reproductionSearchFromHistory(searchNum);
    })
}

// 履歴のURLを再表示する
const reproductionSearchFromHistory = (searchNum)=>{
    removeAllImageList();

    for(let i =0; i< 50 ; i++){
        let srcURL = imgURLs[searchNum][i]
        addImageElements(srcURL);
    } 
}



const init = ()=>{
    // 初期表示
    randomImage();

    // ランダムボタンをクリックすると画像を入れ替えて表示する
    document.getElementById('randomBtn').addEventListener("click",()=>{
        removeAllImageList()
        randomImage();
    })
    // 検索機能
    document.getElementById('submitBtn').addEventListener("click",()=>{
        removeAllImageList()
        searchImage(getSearchBoxText());
    })

    // ハンバーガーメニュー
    // メニューを非表示
    document.getElementById('hamburger__close').addEventListener('click',()=>{
        document.getElementById('hamburger').style.display = "none";
    })
    // メニューを表示
    document.getElementById('hamburger__open').addEventListener('click',()=>{
        document.getElementById('hamburger').style.display = "block";
    })

}
init();

