// -- 박스 만들기
let bxArr = [];//전체 박스 정보저장

function newBox() {
    const Length = bxArr.length;
    const z = Length + 1;

    const nbxObj = {
        id: Date.now(),
        name: 'title',
        statu: 'respone',
        zindex: z,
        width: 300,
        height: 200,
        num: Length,
    }; 
    bxArr.push(nbxObj);
    
    addNewBox(nbxObj); // 새로운 앱 요소 생성 및 추가
    saveBxArr(); // appsArr 저장
}

function saveBxArr() {
    localStorage.setItem('bxArr', JSON.stringify(bxArr));
}


function addNewBox(obj) {
    const bs = document.querySelector('.bs');
    const ID = obj.id;
    const bx = document.createElement('div');
    const bxw = obj.width;
    const bxh = obj.height;
    const z = obj.zindex;
    const n = obj.num;

    bx.id = `bx${obj.id}`;
    bx.classList.add('bx');
    bx.dataset.group = obj.id;
    bx.setAttribute('style',`position:absolute;z-index:${z};top:${n*20+30}px;left:${n*15+30}px; width:${bxw}px; height:${bxh}px`)

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
        <section class="bx-ctrl" id="ctrl-${ID}">
            <button class="tool bx-x" onclick=""></button>
            <button class="tool bx-m"></button>
            <button class="tool bx-f" onclick="bxFull()"></button>
        </section>
        <label for="door${ID}"  class="bx-door">
            <i class="fa-solid fa-ellipsis-vertical"></i>
        </label>
        <section class="bx-view" id="view${ID}">
            <div class="bx-hdr" data-group="${ID}" id="hdr${ID}" onclick="dragBx()">
                <div class="c">
                    <label for="title${ID}" class="bx-title"></label>
                    <input type="text" class="bx-title-input dpnone" id="title${ID}">
                </div>

            </div>
            <div class="bx-main" id="main${ID}">
                <div class="app-link dpnone" id="link${ID}"></div>
                <div class="app-task dpnone" id="task${ID}"></div>
                <div class="bx-txt">
                    <textarea class="app-txt" id="txt${ID}" oninput="apptext(this.value, ${ID})"></textarea>
                </div>
                <div class="tags dpnone" id="tags${ID}"></div>
            </div>
        </section>
    `;
    bs.appendChild(bx);
    const bxObj = {
        id:ID,
        link:0,
        tast:0,
        text:1,
        linkContent:[],
        taskContent:[],
        textContent: ""
    }
    localStorage.setItem(`${ID}`,JSON.stringify(bxObj));   
    // setZ(ID,obj.z);
}
// function setZ(ID,z){
//     const bx = document.getElementById(`bx${ID}`);
//     bx.style.zIndex = String(z);
// }