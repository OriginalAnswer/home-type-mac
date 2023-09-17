const bs = document.querySelector('.bs');
// -- 박스 만들기
let bxArr = [];//전체 박스 정보저장

function newBox() {
    const Length = bxArr.length;
    const z = Length+1;
    const nbxObj = {
        id: Date.now(),
        num: Length,
        name: 'title',
        statu: 'respone',
        zindex: z,
        width: 300,
        height: 200,
        top: Length*30+30,
        left: Length*15+30,
    }; 
    bxArr.push(nbxObj);
    addNewBox(nbxObj); // 새로운 앱 요소 생성 및 추가
    saveBxArr(); // appsArr 저장
}

function saveBxArr() {localStorage.setItem('bxArr', JSON.stringify(bxArr));}
function addNewBox(obj) {
    const ID = obj.id;
    const bx = document.createElement('div');
    const w = obj.width;
    const h = obj.height;
    const z = obj.zindex;
    const n = obj.num;
    const top = obj.top;
    const left = obj.left;

    bx.id = `bx${obj.id}`;
    bx.classList.add('bx');
    bx.dataset.group = obj.id;
    bx.setAttribute('style',`position:absolute;z-index:${z};top:${top}px;left:${left}px; width:${w}px; height:${h}px`)

    bx.innerHTML = `
    <input type="checkbox" id="door${ID}" class="bx-set-door dpnone">
    <section class="bx-set" id="set${ID}">
        <div class="bx-set-main">
            <div class="bx-set-title">
                <div class="title">
                제목
                <input type="checkbox" id="input-onoff-title-id" class="">
                </div>
            </div>
            <div class="bx-set-c">
                <div class="title">색상</div>
            </div>
            <div class="bx-set-ㄹ">
                <div class="title">글자</div>
            </div>
            <div class="bx-set-apps">
                <div class="title">앱 목록</div>
                <label for="input-onoff-link-id">
                    <label class="tgl-btn" for="input-onoff-link-id">link<input type="checkbox" id="input-onoff-link-id" class=""></label>
                </label>
                <label for="input-onoff-task-id">
                    <label class="tgl-btn" for="input-onoff-task-id">task<input type="checkbox" id="input-onoff-task-id" class=""></label>
                </label>
                <label for="input-onoff-text-id">
                    <label class="tgl-btn" for="input-onoff-text-id">text<input type="checkbox" id="input-onoff-text-id" class=""></label>
                </label>
            </div>
        </div>
    </section>
    <section class="bx-ctrl" id="ctrl${ID}">
        <button class="tool bx-x" onclick=""></button>
        <button class="tool bx-m"></button>
        <button class="tool bx-f" onclick="bxF(${ID})"></button>
    </section>
    <div class="bx-bar" id="bar${ID}" data-group="${ID}" ></div>
    <label for="door${ID}" class="bx-door">
        <i class="fa-solid fa-ellipsis-vertical"></i>
    </label>
    <section class="bx-view" id="view${ID}">
        <div class="bx-hdr" data-group="${ID}" id="hdr${ID}" onclick="dragBx()">
            <div class="c">
                <label for="title${ID}" class="bx-title"></label>
                <input type="text" class="bx-title-input dpnone" id="title${ID}">
            </div>

        </div>
        <label for="txt${ID}" class="bx-main" id="main${ID}">
            <div class="app-link dpnone" id="link${ID}"></div>
            <div class="app-task dpnone" id="task${ID}"></div>
            <div class="bx-txt">
                <textarea class="app-txt" id="txt${ID}" oninput="apptext(this.value, ${ID})"></textarea>
            </div>
            <div class="tags dpnone" id="tags${ID}"></div>
        </label>
    </section>
    `;
    bs.appendChild(bx);
    const bxObj = {
        link:0,
        tast:0,
        text:1,
        linkContent:[],
        taskContent:[],
        textContent: ""
    }
    localStorage.setItem(`${ID}`,JSON.stringify(bxObj));   


    bx.addEventListener('click', function() {
        let boxes = document.querySelectorAll('.bx');
        const currentZIndex = parseInt(getComputedStyle(this).zIndex);
        boxes.forEach(function(b) {
            if (b !== bx) {
                const zIndex = parseInt(getComputedStyle(b).zIndex);
                const c = b.querySelector('.bx-set-door');
                c.checked = false;
                if (zIndex > currentZIndex) {
                    b.style.zIndex = (zIndex - 1).toString();
                }
            }
        });
        bx.style.zIndex = (boxes.length).toString();
    });
}
// 박스 로드, 프린트
function printBx(obj){
    const ID = obj.id;
    const bx = document.createElement('div');
    const w = obj.width;
    const h = obj.height;
    const z = obj.zindex;
    const n = obj.num;
    const top = obj.top;
    const left = obj.left;

    bx.id = `bx${ID}`;
    bx.classList.add('bx');
    bx.dataset.group = ID;
    bx.setAttribute('style',`position:absolute;z-index:${z};top:${top}px;left:${left}px; width:${w}px; height:${h}px`)

    const localBX = localStorage.getItem(ID);
    let BX = JSON.parse(localBX);
    const txt = BX.textContent;
    const linkArr = BX.linkContent;
    const taskArr = BX.taskContent;

    bx.innerHTML = `
    <input type="checkbox" id="door${ID}" class="bx-set-door dpnone">
    <section class="bx-set" id="set${ID}">
        <div class="bx-set-main">
            <div class="bx-set-title">
                <div class="title">
                제목
                <input type="checkbox" id="input-onoff-title-id" class="">
                </div>
            </div>
            <div class="bx-set-c">
                <div class="title">색상</div>
            </div>
            <div class="bx-set-ㄹ">
                <div class="title">글자</div>
            </div>
            <div class="bx-set-apps">
                <div class="title">앱 목록</div>
                <label for="input-onoff-link-id">
                    <label class="tgl-btn" for="input-onoff-link-id">link<input type="checkbox" id="input-onoff-link-id" class=""></label>
                </label>
                <label for="input-onoff-task-id">
                    <label class="tgl-btn" for="input-onoff-task-id">task<input type="checkbox" id="input-onoff-task-id" class=""></label>
                </label>
                <label for="input-onoff-text-id">
                    <label class="tgl-btn" for="input-onoff-text-id">text<input type="checkbox" id="input-onoff-text-id" class=""></label>
                </label>
            </div>
        </div>
    </section>
    <section class="bx-ctrl" id="ctrl${ID}">
        <button class="tool bx-x" onclick=""></button>
        <button class="tool bx-m"></button>
        <button class="tool bx-f" onclick="bxF(${ID})"></button>
    </section>
    <div class="bx-bar" id="bar${ID}" data-group="${ID}" ></div>
    <label for="door${ID}" class="bx-door">
        <i class="fa-solid fa-ellipsis-vertical"></i>
    </label>
    <section class="bx-view" id="view${ID}">
        <div class="bx-hdr" data-group="${ID}" id="hdr${ID}" onclick="dragBx()">
            <div class="c">
                <label for="title${ID}" class="bx-title"></label>
                <input type="text" class="bx-title-input dpnone" id="title${ID}">
            </div>

        </div>
        <label for="txt${ID}" class="bx-main" id="main${ID}">
            <div class="app-link dpnone" id="link${ID}"></div>
            <div class="app-task dpnone" id="task${ID}"></div>
            <div class="bx-txt">
                <textarea class="app-txt" id="txt${ID}" oninput="apptext(this.value, ${ID})">${txt}</textarea>
            </div>
            <div class="tags dpnone" id="tags${ID}"></div>
        </label>
    </section>
    `;


    bs.appendChild(bx);// bs안에 bx프린트
    TextResize(ID);
}
function TextResize(ID) {
    let textarea = document.getElementById(`txt${ID}`);
    let scHeight = textarea.scrollHeight;
    // let borderTop = parseInt(style.borderTop);
    textarea.style.height = scHeight + "px";
}
// 페이지 로드 시 복원
function loadBox() {
    const localBxArr = localStorage.getItem('bxArr');
    if (localBxArr) {
        bxArr = JSON.parse(localBxArr);
        bxArr.forEach(obj => printBx(obj));
        console.log(bxArr);
    }
}
loadBox()
console.log(bxArr);