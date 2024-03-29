console.log("远哥制造 © 2017 - 2024 All Rights Reserved！");

function gEle(t) {
    return document.getElementById(t)
}

function getjson(t, e, n) {
    var i = new XMLHttpRequest;
    return i.onreadystatechange = function () {
        4 == i.readyState && (200 == i.status ? e(JSON.parse(i.response), n) : e({
            code: -502,
            message: "网络错误"
        }, n))
    },
        i.open("GET", t, !0),
        i.withCredentials = 0,
        i.send(),
        i
}

function refs(json) {
    gEle('refs').textContent = json.object.sha.substr(0, 7);
}

getjson('https://lab.yuangezhizao.cn/blog/version', refs);

// https://web.archive.org/web/20211228081206/https://blog.csdn.net/qq791007/article/details/52483844
function show_date_time() {
    let cost = new Date().getTime() - new Date("5/8/2016 20:00:00").getTime();
    let days = parseInt(cost / parseInt(1000 * 60 * 60 * 24));
    cost = cost % parseInt(1000 * 60 * 60 * 24);
    let hours = parseInt(cost / parseInt(1000 * 60 * 60));
    cost = cost % parseInt(1000 * 60 * 60);
    let minutes = parseInt(cost / parseInt(1000 * 60));
    cost = cost % parseInt(1000 * 60);
    let seconds = parseInt(cost / parseInt(1000));
    span_dt_dt.innerHTML = days + " 天 " + hours + " 小时 " + minutes + " 分 " + seconds + " 秒";
}

window.setInterval(show_date_time, 1000);


function show_health_message() {
    hour = new Date().getHours();
    switch (hour) {
        case 23:
            span_tree.innerHTML = "23点~24点：机体功能处于休息状态，一天的疲劳开始缓解"
            break;
        case 22:
            span_tree.innerHTML = "22点~23点：呼吸开始减慢，体温逐渐下降"
            break;
        case 21:
            span_tree.innerHTML = "21点~22点：脑神经反应活跃，适宜学习和记忆"
            break;
        case 20:
            span_tree.innerHTML = "20点~21点：记忆力最强，大脑反应异常迅速"
            break;
        case 19:
            span_tree.innerHTML = "19点~20点：血压略有升高。此时，人们情绪最不稳定"
            break;
        case 18:
            span_tree.innerHTML = "18点~19点：人体痛觉再度降低"
            break;
        case 17:
            span_tree.innerHTML = "17点~18点：工作效率最高，肺部呼吸运动最活跃，适宜进行体育锻炼"
            break;
        case 16:
            span_tree.innerHTML = "16点~17点：血糖升高，脸部最红"
            break;
        case 15:
            span_tree.innerHTML = "15点~16点：体温最高，工作能力开始恢复"
            break;
        case 14:
            span_tree.innerHTML = "14点~15点：人体应激能力下降，全身反应迟钝"
            break;
        case 13:
            span_tree.innerHTML = "13点~14点：胃液分泌最多，胃肠加紧工作，适宜进餐，稍感疲乏，需要短时间的休息"
            break;
        case 12:
            span_tree.innerHTML = "12点~13点：经历了一个上午的工作，人体需要休息"
            break;
        case 11:
            span_tree.innerHTML = "11点~12点：精力最旺盛，人体不易感觉疲劳"
            break;
        case 10:
            span_tree.innerHTML = "10点~11点：精力充沛，最适宜工作"
            break;
        case 9:
            span_tree.innerHTML = "9点~10点：皮肤痛觉降低。此时是就医注射的好时机"
            break;
        case 8:
            span_tree.innerHTML = "8点~9点：皮肤有毒物质排除殆尽，性激素含量最高"
            break;
        case 7:
            span_tree.innerHTML = "7点~8点：体温开始上升，人体免疫力最强"
            break;
        case 6:
            span_tree.innerHTML = "6点~7点：血压开始升高，心跳也逐渐加快"
            break;
        case 5:
            span_tree.innerHTML = "5点~6点：经历了一定时间的睡眠，人体得到了充分休息。此时起床，显得精神饱满"
            break;
        case 4:
            span_tree.innerHTML = "4点~5点：血压最低，人体脑部供血最少。所以，此时老年人容易发生心脑血管意外"
            break;
        case 3:
            span_tree.innerHTML = "3点~4点：全身处于休息状态，肌肉完全放松"
            break;
        case 2:
            span_tree.innerHTML = "2点~3点：体内大部分器官处于一天中工作最慢的时刻。肝脏紧张地工作，为人体排毒"
            break;
        case 1:
            span_tree.innerHTML = "1点~2点：人体进入浅睡眠阶段，易醒，对痛觉特别敏感"
            break;
        case 0:
            span_tree.innerHTML = "0点~1点：进入睡眠状态，充分恢复体能"
            break;
        default:
            span_tree.innerHTML = "纳尼？斯国一！"
            break;
    }
}

show_health_message()
// window.setInterval(show_health_message, 1000);
