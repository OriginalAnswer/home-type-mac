//바깥 클릭시 박스 셋 보기 전체 해제
function bsClick(){
    const bxs = event.target.querySelectorAll(".bx");
    bxs.forEach(function(bx){
      bx.querySelector('.bx-set-door').checked = false;
    })
}
//박 스 최상위, 셋 보기 헤제
document.addEventListener('DOMContentLoaded', function() {
    let boxes = document.querySelectorAll('.bx');
    boxes.forEach(function(box) {
      box.addEventListener('click', function() {
            const currentZIndex = parseInt(getComputedStyle(this).zIndex);
            boxes.forEach(function(b) {
              if (b !== box) {//클릭되지 않은 박스들
                const ID = parseInt(b.dataset.group);
                const targetBoxObj = bxArr.find(i => i.id === ID);
                // targetBoxObj.zindex = 요까지 하고이써스예
                console.log(targetBoxObj);
                b.querySelector('.bx-set-door').checked = false;
                const zIndex = parseInt(getComputedStyle(b).zIndex);
                if (zIndex > currentZIndex){b.style.zIndex = (zIndex - 1).toString();}
              }
            });
            this.style.zIndex = (boxes.length).toString();
            
            if (currentBoxResizeObserver) {currentBoxResizeObserver.disconnect();}
            currentBoxResizeObserver = new ResizeObserver((entries) => {
              entries.forEach((entry) => {
                let w = parseInt(entry.contentRect.width);
                let h = parseInt(entry.contentRect.height);
              });
            });
            currentBoxResizeObserver.observe(box);
            const ID = parseInt(this.dataset.group);
            const targetBoxObj = bxArr.find(i => i.id === ID);
            console.log(bxArr);
            console.log(this);
            console.log(ID);
            console.log(targetBoxObj.zindex);
      });
    });
});
//bxArr 불러와서 해당 id의 w,h,z 수정



//박스 사이징
function bxF(ID,v){
  const bx = document.getElementById("bx"+ID);
  const targetBoxObj = bxArr.find(box => box.id === ID);
  const currentBtnF = document.getElementById("bx"+ID);
  bx.style.transition = 'all .5s ease-in-out';
  if(v === "response"){
    bx.style.top = '30px';
    bx.style.left = '30px';
    bx.style.width = 'calc(100% - 60px)';
    bx.style.height = 'calc(100% - 30px)';
    targetBoxObj.statu = 'fullsize';
    event.target.value = 'fullsize';
  } else {
    bx.style.top = `${targetBox.top}px`;
    bx.style.left = `${targetBox.left}px`;
    bx.style.width = `${targetBox.width}px`;
    bx.style.height = `${targetBox.height}px`;
    targetBoxObj.statu = 'response';
    event.target.value = 'response';
  }
  console.log(bxArr);
  saveBxArr();
};

// let bxs = document.querySelectorAll('.bx');

// const observer = new ResizeObserver((bx) => {
//     bx.forEach((bx) => {
//         // const bxSet = document.getElementById(bx.target.dataset.group).querySelector('.bx-set');
//         console.log(Math.floor(bx.contentRect.width) + '*' + Math.floor(bx.contentRect.height));
//         let w = parseInt(bx.contentRect.width);
//         let h = parseInt(bx.contentRect.height);
//         bxArr = bxArr.map(i => i.ID === ID ? {...i, width : w } : i);
//     });
// });

// const observer = new ResizeObserver((entries) => {
//     entries.forEach((entry) => {
//         console.log(
//             Math.floor(entry.contentRect.width) + '*' + Math.floor(entry.contentRect.height)
//             );
//             let w = parseInt(entry.contentRect.width);
//             let h = parseInt(entry.contentRect.height);
//         });
//     });

















// let isDragging = false;
// let draggingbx = null;
// let touchStartTime = 0;
// let offsetX, offsetY;
// let maxXPercent, maxYPercent;

// function dragBx(){
// }

// function handleStart(e) {
//     if (isDragging) return;
    
//     touchStartTime = new Date().getTime();
//     const touch = e.type === 'touchstart' ? e.touches[0] : e;

//     setTimeout(() => {
//         const currentTime = new Date().getTime();
//         if (isDragging || (currentTime - touchStartTime < 200)) {
//             return;
//         }

//         const ID = e.target.dataset.group;
//         draggingbx = document.getElementById(`bx${ID}`);
        
//         offsetX = touch.clientX - draggingbx.getBoundingClientRect().left;
//         offsetY = touch.clientY - draggingbx.getBoundingClientRect().top;
        
//         const zi = draggingbx.style.zIndex;
//         // console.log(zi);
//         document.body.style.cursor = 'grabbing';
//         draggingbx.style.webkitUserSelect = 'none';
//         draggingbx.style.transform = 'scale(1.02)';
    
//         const startXPercent = (touch.clientX - offsetX) / window.innerWidth * 100;
//         const startYPercent = (touch.clientY - offsetY) / window.innerHeight * 100;

//         draggingbx.style.left = `${startXPercent}%`;
//         draggingbx.style.top = `${startYPercent}%`;
    
//         maxXPercent = 100 - (draggingbx.offsetWidth / window.innerWidth * 100);
//         maxYPercent = 100 - (draggingbx.offsetHeight / window.innerHeight * 100);
    
//         document.addEventListener('mousemove', moveHandler);
//         document.addEventListener('touchmove', moveHandler);
    
//         document.addEventListener('mouseup', () => {
//             endDrag();
//         });
//         document.addEventListener('touchend', () => {
//             endDrag();
//         });

//         function moveHandler(e) {
//             const touch = e.type === 'touchmove' ? e.touches[0] : e;
//             let xPercent = (touch.clientX - offsetX) / window.innerWidth * 100;
//             let yPercent = (touch.clientY - offsetY) / window.innerHeight * 100;
    
//             xPercent = Math.min(maxXPercent, Math.max(0, xPercent));
//             yPercent = Math.min(maxYPercent, Math.max(0, yPercent));
    
//             draggingbx.style.left = `${xPercent}%`;
//             draggingbx.style.top = `${yPercent}%`;
//         }
    
//         function endDrag() {
//             if (draggingbx) {
//             document.body.style.cursor = 'auto';
//             draggingbx.style.webkitUserSelect = '';
//             draggingbx.style.transform = 'scale(1)';
    
//             document.removeEventListener('mousemove', moveHandler);
//             document.removeEventListener('touchmove', moveHandler);
//             draggingbx = null;
//             isDragging = false;
//             }
//         }
    
//         isDragging = true;
//     }, 200);
// }

//박스 좌측 상단 버튼
    //최대화

