let boxesNow = document.querySelectorAll('.bx');

//박스 바깥 클릭시 해제 => 셋 보기, 풀사이즈 
function bsClick(){
  const boxes = event.target.querySelectorAll(".bx");
  boxes.forEach(function(x){
    x.querySelector('.bx-set-door').checked = false;

    const ID = parseInt(x.dataset.group);
    bxF(ID,"fullsize");

    document.getElementById("bxF"+ID).value = 'response';
  })
}
//박스 삭제**********
function bxX(ID){// 클릭된 박스의 z보다 작은 애들은 내비두고 보다 큰 애들은 -1해서 다시 저장하기
  const targetObj = bxArr.find(i => i.id === ID);//**클릭된 박스 오브젝트
  let z = targetObj.zindex;
  let t = targetObj.top;
  let l = targetObj.left;
  let w = targetObj.width;
  let h = targetObj.height;

  const thisBox = document.getElementById(`bx${ID}`);
  const thisZ = thisBox.style.zIndex;

  let boxes = document.querySelectorAll('.bx');
  boxes.forEach(function(x) {
    if(x !== thisBox){
      const OBJ = bxArr.find(i => i.id === parseInt(x.dataset.group));//**클릭된 박스 오브젝트
      let z = OBJ.zindex;
      let t = OBJ.top;
      let l = OBJ.left;
      let w = OBJ.width;
      let h = OBJ.height;
                  

      const xZ = parseInt(getComputedStyle(x).zIndex);
      if(xZ > thisZ){
        x.style.zIndex = parseInt(xZ - 1);
        z = parseInt(x.style.zIndex);
      }

      x.querySelector('.bx-set-door').checked = false;
      saveBoxZTLWH(OBJ,z,t,l,w,h);
      bsClick(); //셋 해제
    }
  })
  //클릭 박스 최상위 만들기
  thisBox.style.zIndex = parseInt(boxes.length);
  saveBoxZTLWH(targetObj,z,t,l,w,h);


  localStorage.removeItem(ID);
  
  bs.removeChild(thisBox); 
  
  bxArr = bxArr.filter(i => i.id != ID);
  saveBxArr();
  // console.log(bxArr);
}

//**************중요**************
//박스 활성화(클릭 시) 동작------------------------------------------
//박스 zIndex 재정렬, 셋 보기 해제
//클릭된 박스 zIndex 최상위...
//나머지 박스 재정렬
//나머지 박스(==전체 박스) 셋 보기 해제
//나머지 박스 풀사이즈 해제

document.addEventListener('DOMContentLoaded', function() {
  boxesNow = document.querySelectorAll('.bx');
  // let boxes = document.querySelectorAll('.bx');
  boxesNow.forEach(function(box) {
    //**모든 박스 오브젝트
    const boxID = parseInt(box.dataset.group);
    const boxObj = bxArr.find(i => i.id === boxID);
    // 박스 클릭(하나의 박스)
            box.addEventListener('click', function() {
              const ID = parseInt(this.dataset.group);
              const targetObj = bxArr.find(i => i.id === ID);//**클릭된 박스 오브젝트
              let z = targetObj.zindex;
              let t = targetObj.top;
              let l = targetObj.left;
              let w = targetObj.width;
              let h = targetObj.height;
              
              const thisZ = parseInt(this.style.zIndex);
              //노클릭 박스들 컨트롤
              boxesNow.forEach(function(x) {
                if (x !== box) {//클릭되지 않은 박스들
                  const OBJ = bxArr.find(i => i.id === parseInt(x.dataset.group));//**클릭된 박스 오브젝트
                  let z = OBJ.zindex;
                  let t = OBJ.top;
                  let l = OBJ.left;
                  let w = OBJ.width;
                  let h = OBJ.height;
                  
                  const xZ = parseInt(getComputedStyle(x).zIndex);
                  
                  if (xZ > thisZ){
                    x.style.zIndex = parseInt(xZ - 1);
                    z = parseInt(x.style.zIndex);
                  }
                  
                  x.querySelector('.bx-set-door').checked = false;
                  saveBoxZTLWH(OBJ,z,t,l,w,h);
                  bsClick(); //셋 해제
                }
              });
              //클릭 박스 최상위 만들기
              this.style.zIndex = parseInt(boxesNow.length);
          //박스 리사이징 감지 동작-------------------
              const targetBtnF = document.getElementById("bxF"+ID);
              z = parseInt(this.style.zIndex);
              t = (this.style.top).toString();
              l = (this.style.left).toString();
              w = parseInt(this.style.width);
              h = parseInt(this.style.height);
              if(targetObj.statu === "response"){
                saveBoxZTLWH(targetObj,z,t,l,w,h);
                targetBtnF.value = 'response';
              } else
          //최대화 상태에서 리사이즈 감지 후, statu 반환
              if(targetObj.statu === "fullsize"){
                
                const fullW = parseInt(this.clientWidth);
                const fullH = parseInt(this.clientHeight);

                if (currentBoxResizeObserver) {currentBoxResizeObserver.disconnect();}
                resize = new ResizeObserver((entries) => {
                  entries.forEach((b) => {
                    let w = parseInt(b.target.clientWidth);
                    let h = parseInt(b.target.clientHeight);
                    if(w === fullW && h === fullH){
                      targetObj.statu = 'fullsize';
                    }else{
                      targetObj.statu = 'response';
                    }
                  });
                });

                resize.observe(box);

              }
        //---------------------------------------
              saveBoxZTLWH(targetObj,z,t,l,w,h);
            });
  });
});
//**************중요**************

function saveBoxZTLWH(OBJ,z,t,l,w,h){
  const obj = bxArr.find(i => i === OBJ);
  console.log(OBJ,z,t,l,w,h);
  obj.zindex = z;
  obj.top = t;
  obj.left = l;
  obj.width = w;
  obj.height = h;
  saveBxArr();
}

//박스 풀사이즈 버튼
function bxF(ID,v){
  const bx = document.getElementById("bx"+ID);
  const targetBoxObj = bxArr.find(box => box.id === ID);
  bx.style.transition = 'all .5s ease-in-out';
  if(v === "response"){
    bx.style.top = '30px';
    bx.style.left = '30px';
    bx.style.width = 'calc(100% - 60px)';
    bx.style.height = 'calc(100% - 30px)';
    targetBoxObj.statu = 'fullsize';
    event.target.value = 'fullsize';
    // bxFTransition('on')
    
  } else {
    bx.style.top = targetBoxObj.top;
    bx.style.left = targetBoxObj.left;
    bx.style.width = `${targetBoxObj.width}px`;
    bx.style.height = `${targetBoxObj.height}px`;
    targetBoxObj.statu = 'response';
    event.target.value = 'response';
    // bxFTransition('off')
  }
  saveBxArr();
  // bx.style.transition = 'transform 0.2s';
  setTimeout(() => {
    bx.style.transition = '';
  }, 500)
};



//박스 드래깅 컨트롤
let offsetX, offsetY;
let maxXPercent, maxYPercent;

function boxDragging(bxID,ID){
  let boxes = document.querySelectorAll('.bx');
  const box = document.getElementById(bxID);
  const boxObj = bxArr.find(i => i.id === ID);//**클릭된 박스 오브젝트
  let z = boxObj.zindex;
  let t = boxObj.top;
  let l = boxObj.left;
  let w = boxObj.width;
  let h = boxObj.height;


  let boxZ = parseInt(box.style.zIndex);
  boxes.forEach(function(x){
    if (x !== box) {
      const OBJ = bxArr.find(i => i.id === parseInt(x.dataset.group));//**클릭된 박스 오브젝트
      let z = OBJ.zindex;
      let t = OBJ.top;
      let l = OBJ.left;
      let w = OBJ.width;
      let h = OBJ.height;

      const xZ = parseInt(getComputedStyle(x).zIndex);

      if (xZ > boxZ){
        x.style.zIndex = parseInt(xZ - 1);
        z = parseInt(x.style.zIndex);
      }
      
      x.querySelector('.bx-set-door').checked = false;
      saveBoxZTLWH(OBJ,z,t,l,w,h);
      bsClick(); //셋 해제
    }
    const targetBtnF = document.getElementById("bxF"+ID);
    targetBtnF.value = 'response';
  })
  //클릭 박스 최상위 만들기
  box.style.zIndex = parseInt(boxes.length+1);
  box.style.transform = 'scale(1.01)';

  
  const touch = event.type === 'touchstart' ? event.touches[0] : event;
  setTimeout(() => {
    document.body.style.cursor = 'grabbing';
    offsetX = touch.clientX - box.getBoundingClientRect().left;
    offsetY = touch.clientY - box.getBoundingClientRect().top;
    const startXPercent = (touch.clientX - offsetX) / window.innerWidth * 100;
    const startYPercent = (touch.clientY - offsetY) / window.innerHeight * 100;
    maxXPercent = 100 - (box.offsetWidth / window.innerWidth * 100);
    maxYPercent = 100 - (box.offsetHeight / window.innerHeight * 100);
    // touch.clientX는 뷰포트 기준 터치 지점X
    // console.log(offsetX,offsetY,startXPercent,startYPercent,maxXPercent,maxYPercent);
    document.addEventListener('mouseup', () => {endDrag();});
    document.addEventListener('touchend', () => {endDrag();});
    function endDrag() {
        document.body.style.cursor = 'auto';
        box.style.webkitUserSelect = '';
        box.style.transform = 'scale(1)';

        document.removeEventListener('mousemove', moveHandler);
        document.removeEventListener('touchmove', moveHandler);
    }
    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('touchmove', moveHandler);
    function moveHandler(e) {
        const touch = e.type === 'touchmove' ? e.touches[0] : e;
        let xPercent = (touch.clientX - offsetX) / window.innerWidth * 100;
        let yPercent = (touch.clientY - offsetY) / window.innerHeight * 100;
        xPercent = Math.min(maxXPercent, Math.max(0, xPercent));
        yPercent = Math.min(maxYPercent, Math.max(0, yPercent));
        box.style.left = `${xPercent}%`; 
        box.style.top = `${yPercent}%`;
        const OBJ = bxArr.find(i => i.id === parseInt(box.dataset.group));
        let z = OBJ.zindex;
        let t = box.style.top;
        let l = box.style.to;
        let w = OBJ.width;
        let h = OBJ.height;
        saveBoxZTLWH(OBJ,z,t,l,w,h);
      }
  })
}