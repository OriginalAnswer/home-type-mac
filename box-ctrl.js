//box to the top
function TopZ(ID){
    const bx = document.getElementById(`bx${ID}`);
    console.log(bx.style.zIndex);
    // bxArr
}

//펑션 .bx-bar => .bx-bar for each
function bxCtrl(){
    let all =document.querySelectorAll('.bx-bar');
    
    all.forEach(bar => {
        bar.addEventListener('mousedown', aa);
        bar.addEventListener('touchstart', aa);
    })

}











//박스 사이징
function bxF(){
    const ID = event.target.parentElement.parentElement.dataset.group;
    const bx = document.getElementById(ID);
    bx.style.top = '0';
    bx.style.left = '0';
    bx.style.width = '100%';
    bx.style.height = '100%';
    bx.style.transition = 'all .5s ease-in-out';
};

const bxs = document.querySelectorAll('.bx');

const observer = new ResizeObserver((bx) => {
bx.forEach((bx) => {
    const bxSet = document.getElementById(bx.target.id).querySelector('.bx-set');
    console.log(Math.floor(bx.contentRect.width) + '*' + Math.floor(bx.contentRect.height));
    let w = parseInt(bx.contentRect.width);
    if(350 > w){

    }
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

