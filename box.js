// -- 박스 만들기
let bxArr = [];//전체 박스 정보저장

function newBox() {
    const Length = bxArr.length;
    const z = 10 + Length + 1;

    const nbxObj = {
        id: Date.now(),
        name: 'title',
        statu: 'respone',
        zindex: z,
        width: 250,
        height: 250,
    }; 
    bxArr.push(nbxObj);
    
    addNewBox(nbxObj); // 새로운 앱 요소 생성 및 추가
    saveBxArr(); // appsArr 저장
}

function saveBxArr() {
    localStorage.setItem('bxArr', JSON.stringify(bxArr));
}


function addNewBox(obj) {
    const main = document.getElementById('main');
    const bx = document.createElement('div');
    const ID = obj.id;
    const bxw = obj.width;
    const bxh = obj.height;

    bx.id = `bx-${obj.id}`;
    bx.classList.add('bx');
    bx.dataset.group = obj.id;
    bx.style.zindex = obj.z;

    bx.innerHTML = `
        <input type="checkbox" id="door-${ID}" class="bx-set-door dpnone">
        <section class="bx-set" id="set-${ID}">
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
    main.appendChild(bx);
}