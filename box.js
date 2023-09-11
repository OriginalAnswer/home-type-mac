const btnNewB = document.querySelector('#btn-new-bx');
btnNewB.addEventListener

let bxArr = [];

function newBox() {
    const Length = bxArr.length;
    const z = 10 + Length + 1;

    const nbxObj = {
        id: Date.now(),
        name: 'title',
        statu: 'respone',
        zindex: z,
        width: 250,
        height: 250
    }; 
    bxArr.push(nbxObj);
    
    createNewBx(nbxObj); // 새로운 앱 요소 생성 및 추가
    saveBxArr(); // appsArr 저장

    const newAppToggle = document.getElementById('newapptoggle');
    if (newAppToggle) {
        newAppToggle.checked = false;
    };
}

function saveBxArr() {
    localStorage.setItem('bxArr', JSON.stringify(bxArr));
}

const main = document.getElementsByTagName('main');

function addNewBox(obj) {
    const bx = document.createElement('div');
    const ID = obj.id;
    bx.id = `bx-${obj.id}`;
    bx.classList.add('bx');
    bx.dataset.group = obj.id;
    bx.style.zindex = obj.z;
    bx.innerHTML = `
        <input type="checkbox" id="door-${ID}" class="bx-set-door dpnone">
        <section class="bx-set" id="set-${ID}">
            <div class="bx-set-main">
                <div class="bx-set-title">
                    <div class="title">제목</div>
                </div>
                <div class="bx-set-c">
                    <div class="title">색상</div>
                </div>
                <div class="bx-set-ㄹ">
                    <div class="title">글자</div>
                </div>
                <div class="bx-set-apps">
                    <div class="title">앱 목록</div>
                </div>
            </div>
        </section>
        <section class="bx-ctrl" id="ctrl-${ID}">
            <button class="tool bx-x" onclick=""></button>
            <button class="tool bx-m"></button>
            <button class="tool bx-f" onclick="bxF()"></button>
        </section>
        <section class="bx-main" id="main-${ID}">
            <div class="bx-hdr" data-group="${ID}" id="hdr-${ID}">
                <div class="c">
                    <label for="title-${ID}" class="bx-title"></label>
                    <input type="text" class="bx-title-input dpnone" id="title-${ID}">
                </div>

                <label for="door-${ID}"  class="r">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                </label>
            </div>
            <div class="bx-apps" id="apps-${ID}"></div>
        </section>
    `;
}