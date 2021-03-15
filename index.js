var stepsChecker = []

var how_to_move = {
    top : 20,
    left : 25,
    rotate : 20
}

const move = (index, dir) => {
    let card = $(`#card${index}`);
    
    let toData = {
        top : (stepsChecker[index].top + (how_to_move.top)*dir),
        left : stepsChecker[index].left + (how_to_move.left)*dir,
        rotate : stepsChecker[index].rotate + (how_to_move.rotate)*dir
    }

    console.log(toData)

    anime({
        targets: stepsChecker[index],
        ...toData,
        easing: 'easeOutElastic(1, .3)',
        update: function(){
            let tempTop = stepsChecker[index].top;
            card.css("top" , `${tempTop < 50 ? 100 - tempTop : tempTop}%`);
            card.css("left" , `${stepsChecker[index].left}%`);
            card.css("transform", `rotate(${stepsChecker[index].rotate}deg) translate(-50%, -50%)`);
        }
    })
}

const start = (total_cards, images) => {
    let scroll_container = $('.scroll-container');
    let html = ``;
    for(let i = 0;i<total_cards;i++)
    {
        html += `
            <div class = "card" id = "card${i}">
                <img src = "${images[i]}" />
            </div>
        `
    }
    scroll_container.html(html);

    let top = 50;left = 50; rotate = 0;
    for(let i = 0;i<total_cards;i++)
    {
        $(`#card${i}`).css("position", "absolute")
        $(`#card${i}`).css("top", `${top}%`);
        $(`#card${i}`).css("left", `${left}%`);
        $(`#card${i}`).css("transform", `rotate(${rotate}deg) translate(-50%, -50%)`);
        stepsChecker.push({
            top,left,rotate
        })
        top += how_to_move.top;
        left += how_to_move.left;
        rotate += how_to_move.rotate;
    }

    $('#leftbutton').click(() => {
        console.clear();
        for(let i = 0;i<total_cards;i++)
            move(i, -1);
    })

    $('#rightbutton').click(() => {
        console.clear();
        for(let i = 0;i<total_cards;i++)
            move(i, 1);
    })
        $("#aa").on("scroll", function (e) {
            horizontal = e.currentTarget.scrollLeft;
            vertical = e.currentTarget.scrollTop;
            console.log("sdsd");
            });
}

$(document).ready(() => {
    start(4 , [
        "img3.jpg",
        "img4.jpg",
        "img7.jpg",
        "img1.jpg"
    ]);
})