const bs = document.querySelector('.bs');
let currentBoxResizeObserver;
// -- 박스 만들기
let bxArr = [];//전체 박스 정보저장

function newBox() {
    const Length = bxArr.length;
    const z = Length+1;
    const nbxObj = {
        id: Date.now(),
        num: Length,
        name: 'title',
        statu: 'response',
        zindex: z,
        width: 300,
        height: 200,
        top: Length*30+30+'px',
        left: Length*15+30+'px',
    }; 
    bxArr.push(nbxObj);
    addNewBox(nbxObj); // 새로운 앱 요소 생성 및 추가
    saveBxArr(); // appsArr 저장
    const bxs = document.querySelectorAll(".bx");
    bxs.forEach(function(bx){
      bx.querySelector('.bx-set-door').checked = false;})
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
    const statu = obj.statu;

    bx.id = `bx${obj.id}`;
    bx.classList.add('bx');
    bx.dataset.group = obj.id;
    bx.setAttribute('style',`position:absolute;z-index:${z};top:${top};left:${left}; width:${w}px; height:${h}px`)

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
            <div class="bx-set-font">
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
        <button class="tool bx-x" id="bxX${ID}" onclick="bxX(${ID})"></button>
        <button class="tool bx-m" id="bxM${ID}"></button>
        <button class="tool bx-f" id="bxF${ID}" onclick="bxF(${ID},this.value)" value="${statu}"></button>
    </section>
    <div class="bx-bar" id="bar${ID}" data-group="${ID}" onmousedown="boxDragging('bx${ID}',${ID})"></div>
    <label for="door${ID}" class="bx-door">
        <i class="fa-solid fa-ellipsis-vertical"></i>
    </label>
    <section class="bx-view" id="view${ID}">
        <div class="bx-hdr" data-group="${ID}" id="hdr${ID}">
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
    //박스 최상위, 셋 보기 컨트롤
    let boxes = document.querySelectorAll('.bx');
    boxes.forEach(function(box) {
      box.addEventListener('click', function() {
        const currentZIndex = parseInt(getComputedStyle(this).zIndex);
        const ID = parseInt(this.dataset.group);
        const targetBoxObj = bxArr.find(i => i.id === ID);
        boxes.forEach(function(b) { console.log(boxes.length);
          if (b !== box) {//클릭되지 않은 박스들
            bsClick();
            b.querySelector('.bx-set-door').checked = false;
            const zIndex = parseInt(getComputedStyle(b).zIndex);
              if (zIndex > currentZIndex){b.style.zIndex = (zIndex - 1).toString();}
              const ID = parseInt(b.dataset.group);
              saveBxZindex(ID,b.style.zIndex);//재정렬된 zIndex 로컬에 저장
            }
          });
        this.style.zIndex = (boxes.length).toString();
    //박스 리사이징 감지 동작-------------------
        const currentBxF = document.getElementById("bxF"+ID);
        const t = (this.style.top).toString();
        const l = (this.style.left).toString();
        const w = parseInt(this.style.width);
        const h = parseInt(this.style.height);
        if(targetBoxObj.statu === "response"){
          saveBxWidthHeight(ID,w,h,t,l);
          console.log(ID,w,h,t,l);
          currentBxF.value = 'response'; //버튼 value
        } else if(targetBoxObj.statu === "fullsize"){
          const fullW = parseInt(this.clientWidth);
          const fullH = parseInt(this.clientHeight);
          if (currentBoxResizeObserver) {currentBoxResizeObserver.disconnect();}
          resize = new ResizeObserver((entries) => {
            entries.forEach((b) => {
              let newW = parseInt(b.target.clientWidth);
              let newH = parseInt(b.target.clientHeight);
              if(newW === fullW && newH === fullH){
                targetBoxObj.statu = 'fullsize';
              }else{
                targetBoxObj.statu = 'response';
              }
            });
          });
          resize.observe(box);
        }
  //---------------------------------------
        saveBxZindex(ID,this.style.zIndex);//바뀐 zIndex 로컬에 저장
        });
    });
}
// 박스 로드, 프린트
function printBx(obj){
    const ID = obj.id;
    const bx = document.createElement('div');
    const z = obj.zindex;
    const n = obj.num;
    let w = obj.width;
    let h = obj.height;
    let top = obj.top;
    let left = obj.left;
    const statu = obj.statu;
    if(statu === "fullsize"){
        top = 30;
        left = 30;
        w = '';
        h = 'calc(100% - 30px)'; 
        bx.setAttribute('style',`
        position:absolute;
        z-index:${z};
        top:30px;left:30px; 
        width:calc(100% - 60px); height:calc(100% - 30px)`)
    } else {
        bx.setAttribute('style',`position:absolute;z-index:${z};top:${top};left:${left}; width:${w}px; height:${h}px`)
    }
    
    bx.id = `bx${ID}`;
    bx.classList.add('bx');
    bx.dataset.group = ID;

    const localBX = localStorage.getItem(ID);
    const BX = JSON.parse(localBX);
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
            <div class="bx-set-font">
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
        <button class="tool bx-x" id="bxX${ID}" onclick="bxX(${ID})"></button>
        <button class="tool bx-m" id="bxM${ID}"></button>
        <button class="tool bx-f" id="bxF${ID}" onclick="bxF(${ID},this.value)" value="${statu}"></button>
    </section>
    <div class="bx-bar" id="bar${ID}" data-group="${ID}" onmousedown="boxDragging('bx${ID}',${ID})"></div>
    <label for="door${ID}" class="bx-door">
        <i class="fa-solid fa-ellipsis-vertical"></i>
    </label>
    <section class="bx-view" id="view${ID}">
        <div class="bx-hdr" data-group="${ID}" id="hdr${ID}">
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
    // bxF(ID,statu);
    
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
        // console.log(bxArr);
    }
}
loadBox()