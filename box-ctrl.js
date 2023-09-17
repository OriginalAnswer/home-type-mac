//바깥 클릭시 박스 셋 보기 전체 해제
function bsClick(){
    const bxs = event.target.querySelectorAll(".bx");
    bxs.forEach(function(bx){bx.querySelector('.bx-set-door').checked = false;})
}
//박스 최상위, 셋 보기 헤제
document.addEventListener('DOMContentLoaded', function() {
    let boxes = document.querySelectorAll('.bx');

    boxes.forEach(function(box) {
      box.addEventListener('click', function() {
        const currentZIndex = parseInt(getComputedStyle(this).zIndex);// 클릭한 박스의 현재 z-index 값을 가져옵니다.
        boxes.forEach(function(b) {// 모든 박스의 z-index를 재정렬합니다.
          if (b !== box) {
            const zIndex = parseInt(getComputedStyle(b).zIndex);
            const c = b.querySelector('.bx-set-door');//set체크박스
            c.checked = false;//set체크박스 해제
            if (zIndex > currentZIndex) {
              b.style.zIndex = (zIndex - 1).toString();
            }
          }
        });
        this.style.zIndex = (boxes.length).toString();// 클릭한 박스의 z-index를 가장 큰 값으로 설정합니다.
      });
    });
});










//박스 사이징
function bxF(ID){
    
    const bx = document.getElementById("bx"+ID);
    bx.style.top = '30px';
    bx.style.left = '30px';
    bx.style.width = 'calc(100% - 60px)';
    bx.style.height = 'calc(100% - 30px)';
    bx.style.transition = 'all .5s ease-in-out';
    console.log(bxArr);
};

let bxs = document.querySelectorAll('.bx');

const observer = new ResizeObserver((bx) => {
    bx.forEach((bx) => {
        console.log(bxArr);
        // const bxSet = document.getElementById(bx.target.dataset.group).querySelector('.bx-set');
        console.log(Math.floor(bx.contentRect.width) + '*' + Math.floor(bx.contentRect.height));
        let w = parseInt(bx.contentRect.width);
        let h = parseInt(bx.contentRect.height);
    });
});

// 크기변화를 관찰할 요소지정
bxs.forEach(bx => observer.observe(bx));


















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

