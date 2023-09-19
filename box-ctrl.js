//박스 바깥 클릭시 해제 => 셋 보기, 풀사이즈 
function bsClick(){
  const bxs = event.target.querySelectorAll(".bx");
  bxs.forEach(function(bx){
    bx.querySelector('.bx-set-door').checked = false;

    const ID = parseInt(bx.dataset.group);
    bxF(ID,"fullsize");

    const currentBxF = document.getElementById("bxF"+ID);
    currentBxF.value = 'response';
  })
}
//박스 삭제**********
function bxX(ID){
  // 클릭된 박스의 z보다 작은 애들은 내비두고 보다 큰 애들은 -1해서 다시 저장하기
  const currentZ = document.getElementById(`bx${ID}`).style.zIndex;
  
  let boxes = document.querySelectorAll('.bx');
  boxes.forEach(function(b) {
    const bID = b.dataset.group;
    boxes.forEach(function(bx) {
      if(b != bx){
        let bxz = bx.style.zIndex;
        if(bxz > currentZ){
          bxz = bxz - 1;
          saveBxZindex(bID,bxz);
        }
      }
    });
  })

  localStorage.removeItem(ID);
  const bx = document.getElementById(`bx${ID}`);
  bs.removeChild(bx);
  
  bxArr = bxArr.filter(i => i.id != ID);
  saveBxArr();
}


//박스 활성화(클릭 시) 동작------------------------------------------
//박스 zIndex 재정렬, 셋 보기 해제
//클릭된 박스 zIndex 최상위...
//나머지 박스 재정렬
//나머지 박스(==전체 박스) 셋 보기 해제
//나머지 박스 풀사이즈 해제
document.addEventListener('DOMContentLoaded', function() {
  let boxes = document.querySelectorAll('.bx');
  boxes.forEach(function(box) {
    box.addEventListener('click', function() {
      const currentZIndex = parseInt(getComputedStyle(this).zIndex);
      const ID = parseInt(this.dataset.group);
      const targetBoxObj = bxArr.find(i => i.id === ID);
      boxes.forEach(function(b) {console.log(boxes.length);
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
});
//bxArr 불러와서 해당 id의 w,h,z 수정
function saveBxZindex(ID,z){
  const targetBoxObj = bxArr.find(i => i.id === ID);
  targetBoxObj.zindex = z;
  saveBxArr();
}

function saveBxWidthHeight(ID,w,h,t,l){
  const targetBoxObj = bxArr.find(i => i.id === ID);
  console.log(ID,w,h,t,l)
  targetBoxObj.top = t;
  targetBoxObj.left = l;
  targetBoxObj.width = w;
  targetBoxObj.height = h;
  saveBxArr();
}

//박스 사이징// b
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




let isDragging = false;
let offsetX, offsetY;
let maxXPercent, maxYPercent;

function boxDragging(bxID,ID){
  const bxs = document.querySelectorAll(".bx");
  const box = document.getElementById(bxID);
  let currentZIndex = parseInt(box.style.zIndex);
  bxs.forEach(function(b){
    if (b !== box) {
      const zIndex = parseInt(getComputedStyle(b).zIndex);
      if (zIndex > currentZIndex){b.style.zIndex = (zIndex - 1).toString();}
      const ID = parseInt(b.dataset.group);
      saveBxZindex(ID,b.style.zIndex);
      
      b.querySelector('.bx-set-door').checked = false;
    }
    const currentBxF = document.getElementById("bxF"+ID);
    currentBxF.value = 'response';
  })
  box.style.zIndex = bxs.length;

  
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
    console.log(offsetX,offsetY,startXPercent,startYPercent,maxXPercent,maxYPercent);
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
        console.log(box.style.top);
    }
  })
}