var SlideShow_1 = function($element) {
    if (!$element) return false;
    var target = this;
    target.element = $element.eq(0);
    target.autoStatus = false;
    target.now = 0;
    target.max = target.element.find(".pt_bannerList li").length - 1;
    target.drag = {
        startX: 0,
        endX: 0,
        state: false,
        move: false,
        date: null
    };
    target.init = function($loop, $animateTime) {
        target.loop = $loop == false ? false : true;
        target.animateTime = $animateTime ? $animateTime : 500;
        target.move();
        if(target.max > 0){
            target.element.find(".pt_btnList li").click(function() {
                if (target.now != $(this).index()) {
                    target.now = $(this).index();
                    target.move();
                }
                return false;
            });
            target.element.find(".pt_prev").click(function() {
                target.prev();
                return false;
            });
            target.element.find(".pt_next").click(function() {
                target.next();
                return false;
            });
            target.element.find(".pt_bannerList").on("mousedown touchstart", function(e) {
                if (target.run) return;
                if (!target.drag.state) {
                    target.drag.startX = e.type == "mousedown" ? e.pageX : e.originalEvent.changedTouches[0].pageX;
                    target.drag.state = true;
                    target.drag.date = new Date();
                }
                if (e.type == "mousedown") {
                    return false;
                }
                if (target.autoStatus) {
                    clearInterval(target.timer);
                    clearTimeout(target.nextTimer);
                }
            }).on("mouseleave touchleave", target.dragEnd);
            $(document).on("mousemove touchmove", function(e) {
                if (target.run) return;
                if (target.drag.state) {
                    if (e.type == "touchmove") {
                        //e.preventDefault();
                    }
                    target.drag.move = true;
                    target.drag.endX = e.type == "mousemove" ? e.pageX : e.originalEvent.changedTouches[0].pageX;
                }
            }).on("mouseup touchend", target.dragEnd);
        }else{
            target.element.find(".pt_btnList li").hide();
            target.element.find(".pt_prev").hide();
            target.element.find(".pt_next").hide();
        }
        return target;
    }
    target.next = function() {
        if (target.now < target.max) {
            target.now++;
        } else {
            target.now = 0
        }
        target.move();
        return target;
    }
    target.prev = function() {
        if (target.now > 0) {
            target.now--;
        } else {
            target.now = target.max;
        }
        target.move();
        return target;
    }
    target.goto = function(n) {
        if(!n) return;
        if (target.now != n) {
            target.now = n;
            target.move();
        }
        return false;
    }

    target.dragEnd = function(e) {
        if (target.run) return;
        if (target.drag.state && target.drag.move) {
            target.drag.endX = (e.type == "mouseup" || e.type == "mouseleave") ? e.pageX : e.originalEvent.changedTouches[0].pageX;
            if (e.type == "mouseleave" || e.type == "touchleave" || new Date() - target.drag.date > 100) {
                if (target.drag.endX > target.drag.startX) {
                    target.now = target.now > 0 ? target.now - 1 : target.max;
                } else {
                    target.now = target.now < target.max ? target.now + 1 : 0;
                }
                target.element.find(".pt_bannerList a").click(function() {
                    return false;
                });
            } else {
                target.element.find(".pt_bannerList a").off();
            }
            target.move();
        }else{
            target.element.find(".pt_bannerList a").off();
        }
        
        target.drag.state = false;
        target.drag.move = false;
    }
    
    target.move = function() {
        if (!target.loop) {
            if (target.now == 0) {
                target.element.find(".pt_prev").addClass("hide");
                target.element.find(".pt_next").removeClass("hide");
            } else if (target.now == target.max) {
                target.element.find(".pt_prev").removeClass("hide");
                target.element.find(".pt_next").addClass("hide");
            } else {
                target.element.find(".pt_prev").removeClass("hide");
                target.element.find(".pt_next").removeClass("hide");
            }
        }
        if (target.autoStatus) {
            clearInterval(target.timer);
            clearTimeout(target.nextTimer);
            target.nextTimer = setTimeout(function() {
                clearInterval(target.timer);
                clearTimeout(target.nextTimer);
                target.timer = setInterval(target.next, target.autoTime);
            }, target.animateTime)
        }
        target.element.find(".pt_btnList li").eq(target.now).addClass("on").siblings().removeClass("on");
        target.element.find(".pt_bannerList li").eq(target.now).stop().animate({
            width:'100%',left:"0%",opacity:1
        }, target.animateTime).siblings().stop().animate({
            width: '150%', left:'-25%', opacity:0
        }, target.animateTime);
        return target;
    }
    target.auto = function($time) {
        if(target.max <= 0) return target;
        target.autoStatus = true;
        target.autoTime = $time ? $time : 1500;
        clearInterval(target.timer);
        target.timer = setInterval(target.next, target.autoTime);
        target.element.mouseover(function() {
            clearInterval(target.timer);
            clearTimeout(target.nextTimer);
        }).mouseout(function() {
            clearInterval(target.timer);
            clearTimeout(target.nextTimer);
            target.timer = setInterval(target.next, target.autoTime);
        })
        return target;
    }
    return target;
}

var SlideShow_2 = function(element) {
    if (!element) return false;
    var target = this;
    target.element = element.eq(0);
    target.autoStatus = false;
    target.now = 0;
    target.nextId = 0;
    target.run = false;
    target.max = target.element.find(".pt_bannerList li").length - 1;
    target.drag = {
        startX: 0,
        endX: 0,
        prev: null,
        now: null,
        next: null,
        state: false,
        move: false,
        date: null
    };
    target.element.find(".pt_bannerList li").each(function(index, element) {
        $(element).css({
            left: index * 100 + "%"
        })
    });
    target.init = function(loop, animateTime) {
        target.loop = loop == false ? false : true;
        target.animateTime = animateTime ? animateTime : 500;
        target.move();
        if(target.max > 0){
            target.element.find(".pt_btnList li").click(function() {
                if (target.run) return;
                if (target.now != $(this).index()) {
                    target.nextId = $(this).index()
                    target.move();
                }
                return false;
            });
            target.element.find(".pt_prev").click(function() {
                target.prev();
                return false;
            });
            target.element.find(".pt_next").click(function() {
                target.next();
                return false;
            });
            target.element.find(".pt_bannerList").on("mousedown touchstart", function(e) {
                if (target.run) return;
                if (!target.drag.state) {
                    target.drag.startX = e.type == "mousedown" ? e.pageX : e.originalEvent.changedTouches[0].pageX;
                    target.drag.state = true;
                    target.drag.date = new Date();
                }
                if (e.type == "mousedown") {
                    return false;
                }
                if (target.autoStatus) {
                    clearInterval(target.timer);
                    clearTimeout(target.nextTimer);
                }
            }).on("mouseleave touchleave", target.dragEnd);

            $(document).on("mousemove touchmove", function(e) {
                if (target.run) return;
                if (target.drag.state) {
                    if (e.type == "touchmove") {
                        //e.preventDefault();
                    }
                    target.drag.move = true;
                    target.drag.endX = e.type == "mousemove" ? e.pageX : e.originalEvent.changedTouches[0].pageX;
                    var tbanner = target.element.find(".pt_bannerList li");
                    target.drag.prev = tbanner.eq(target.now > 0 ? target.now - 1 : target.max);
                    target.drag.now = tbanner.eq(target.now);
                    target.drag.next = tbanner.eq(target.now < target.max ? target.now + 1 : 0);
                    target.drag.prev.css({
                        left: -100 + (target.drag.endX - target.drag.startX) / target.element.width() * 100 + "%"
                    });
                    target.drag.now.css({
                        left: 0 + (target.drag.endX - target.drag.startX) / target.element.width() * 100 + "%"
                    });
                    target.drag.next.css({
                        left: 100 + (target.drag.endX - target.drag.startX) / target.element.width() * 100 + "%"
                    });
                }
            }).on("mouseup touchend", target.dragEnd);
        }else{
            target.element.find(".pt_btnList li").hide();
            target.element.find(".pt_prev").hide();
            target.element.find(".pt_next").hide();
        }
        return target;
    }
    target.next = function() {
        if (target.run) return;
        target.nextId = target.now < target.max ? target.now + 1 : 0;
        target.move();
        return target;
    }
    target.prev = function() {
        if (target.run) return;
        target.nextId = target.now > 0 ? target.now - 1 : target.max;
        target.move();
        return target;
    }
    target.goto = function(n) {
        if (target.run || !n) return;
        if (target.now != n) {
            target.nextId = n;
            target.move();
        }
        return false;
    }

    target.dragEnd = function(e) {
        if (target.run) return;
        if (target.drag.state && target.drag.move) {
            target.drag.endX = (e.type == "mouseup" || e.type == "mouseleave") ? e.pageX : e.originalEvent.changedTouches[0].pageX;
            if (e.type == "mouseleave" || e.type == "touchleave" || new Date() - target.drag.date > 100) {
                if (target.drag.endX > target.drag.startX) {
                    target.nextId = target.now > 0 ? target.now - 1 : target.max;
                } else {
                    target.nextId = target.now < target.max ? target.now + 1 : 0;
                }
                target.element.find(".pt_bannerList a").click(function() {
                    return false;
                });
            } else {
                target.element.find(".pt_bannerList a").off();
            }
            target.move(true);
        }else{
            target.element.find(".pt_bannerList a").off();
        }
        
        target.drag.state = false;
        target.drag.move = false;
    }

    target.move = function(drag) {
        if (target.run) return;
        if (target.autoStatus) {
            clearInterval(target.timer);
            clearTimeout(target.nextTimer);
            target.nextTimer = setTimeout(function() {
                clearInterval(target.timer);
                clearTimeout(target.nextTimer);
                target.timer = setInterval(target.next, target.autoTime);
            }, target.animateTime)
        }
        target.element.find(".pt_btnList li").eq(target.nextId).addClass("on").siblings().removeClass("on");
        if (target.now == target.nextId && !drag) return target;
        target.run = true;
        if (drag && target.now == target.nextId) {
            target.drag.prev.animate({
                left: "-100%"
            }, target.animateTime);
            target.drag.now.animate({
                left: "0%"
            }, target.animateTime, function() {
                target.run = false;
            });
            target.drag.next.animate({
                left: "100%"
            }, target.animateTime);
        } else {
            var nowElement = target.element.find(".pt_bannerList li").eq(target.now)
            var nextElement = target.element.find(".pt_bannerList li").eq(target.nextId);
            var nextNow;
            if (target.nextId > target.now) {
                if (!drag) nextElement.css({
                    left: "100%"
                });
                nextNow = "-100%"
            } else if (target.nextId < target.now) {
                if (!drag) nextElement.css({
                    left: "-100%"
                });
                nextNow = "100%"
            }
            if (target.now == target.max && target.nextId == 0) {
                if (!drag) nextElement.css({
                    left: "100%"
                });
                nextNow = "-100%"
            } else if (target.now == 0 && target.nextId == target.max) {
                if (!drag) nextElement.css({
                    left: "-100%"
                });
                nextNow = "100%"
            }
            nowElement.stop().animate({
                left: nextNow
            }, target.animateTime)
            nextElement.stop().animate({
                left: "0%"
            }, target.animateTime, function() {
                target.run = false;
                target.now = target.nextId;
                if (!target.loop) {
                    if (target.now == 0) {
                        target.element.find(".pt_prev").addClass("hide");
                        target.element.find(".pt_next").removeClass("hide");
                    } else if (target.now == target.max) {
                        target.element.find(".pt_prev").removeClass("hide");
                        target.element.find(".pt_next").addClass("hide");
                    } else {
                        target.element.find(".pt_prev").removeClass("hide");
                        target.element.find(".pt_next").removeClass("hide");
                    }
                }
            })
        }

        return target;
    }
    target.auto = function(time) {
        if(target.max <= 0) return target;
        target.autoStatus = true;
        target.autoTime = time ? time : 1500;
        clearInterval(target.timer);
        target.timer = setInterval(target.next, target.autoTime);
        target.element.mouseover(function() {
            clearInterval(target.timer);
            clearTimeout(target.nextTimer);
        }).mouseout(function() {
            clearInterval(target.timer);
            clearTimeout(target.nextTimer);
            target.timer = setInterval(target.next, target.autoTime);
        })
        return target;
    }
    return target;
}


var SlideShow_3 = function($element) {
    if (!$element) return false;
    var target = this;
    target.element = $element.eq(0);
    target.autoStatus = false;
    target.now = 0;
    target.max = target.element.find(".pt_bannerList li").length - 1;
    target.drag = {
        startX: 0,
        endX: 0,
        state: false,
        move: false,
        date: null
    };
    target.init = function($loop, $animateTime) {
        target.loop = $loop == false ? false : true;
        target.animateTime = $animateTime ? $animateTime : 500;
        target.move();
        if(target.max > 0){
            target.element.find(".pt_btnList li").click(function() {
                if (target.now != $(this).index()) {
                    target.now = $(this).index();
                    target.move();
                }
                return false;
            });
            target.element.find(".pt_prev").click(function() {
                target.prev();
                return false;
            });
            target.element.find(".pt_next").click(function() {
                target.next();
                return false;
            });
            target.element.find(".pt_bannerList").on("mousedown touchstart", function(e) {
                if (target.run) return;
                if (!target.drag.state) {
                    target.drag.startX = e.type == "mousedown" ? e.pageX : e.originalEvent.changedTouches[0].pageX;
                    target.drag.state = true;
                    target.drag.date = new Date();
                }
                if (e.type == "mousedown") {
                    return false;
                }
                if (target.autoStatus) {
                    clearInterval(target.timer);
                    clearTimeout(target.nextTimer);
                }
            }).on("mouseleave touchleave", target.dragEnd);
            $(document).on("mousemove touchmove", function(e) {
                if (target.run) return;
                if (target.drag.state) {
                    if (e.type == "touchmove") {
                        //e.preventDefault();
                    }
                    target.drag.move = true;
                    target.drag.endX = e.type == "mousemove" ? e.pageX : e.originalEvent.changedTouches[0].pageX;
                }
            }).on("mouseup touchend", target.dragEnd);
        }else{
            target.element.find(".pt_btnList li").hide();
            target.element.find(".pt_prev").hide();
            target.element.find(".pt_next").hide();
        }
        return target;
    }
    target.next = function() {
        if (target.now < target.max) {
            target.now++;
        } else {
            target.now = 0
        }
        target.move();
        return target;
    }
    target.prev = function() {
        if (target.now > 0) {
            target.now--;
        } else {
            target.now = target.max;
        }
        target.move();
        return target;
    }
    target.goto = function(n) {
        if(!n) return;
        if (target.now != n) {
            target.now = n;
            target.move();
        }
        return false;
    }

    target.dragEnd = function(e) {
        if (target.run) return;
        if (target.drag.state && target.drag.move) {
            target.drag.endX = (e.type == "mouseup" || e.type == "mouseleave") ? e.pageX : e.originalEvent.changedTouches[0].pageX;
            if (e.type == "mouseleave" || e.type == "touchleave" || new Date() - target.drag.date > 100) {
                if (target.drag.endX > target.drag.startX) {
                    target.now = target.now > 0 ? target.now - 1 : target.max;
                } else {
                    target.now = target.now < target.max ? target.now + 1 : 0;
                }
                target.element.find(".pt_bannerList a").click(function() {
                    return false;
                });
            } else {
                target.element.find(".pt_bannerList a").off();
            }
            target.move();
        }else{
            target.element.find(".pt_bannerList a").off();
        }
        
        target.drag.state = false;
        target.drag.move = false;
    }
    
    target.move = function() {
        if (!target.loop) {
            if (target.now == 0) {
                target.element.find(".pt_prev").addClass("hide");
                target.element.find(".pt_next").removeClass("hide");
            } else if (target.now == target.max) {
                target.element.find(".pt_prev").removeClass("hide");
                target.element.find(".pt_next").addClass("hide");
            } else {
                target.element.find(".pt_prev").removeClass("hide");
                target.element.find(".pt_next").removeClass("hide");
            }
        }
        if (target.autoStatus) {
            clearInterval(target.timer);
            clearTimeout(target.nextTimer);
            target.nextTimer = setTimeout(function() {
                clearInterval(target.timer);
                clearTimeout(target.nextTimer);
                target.timer = setInterval(target.next, target.autoTime);
            }, target.animateTime)
        }
        target.element.find(".pt_btnList li").eq(target.now).addClass("on").siblings().removeClass("on");
        target.element.find(".pt_bannerList li").eq(target.now).stop().animate({
            opacity: 1
        }, target.animateTime).siblings().stop().animate({
            opacity: 0
        }, target.animateTime);
        return target;
    }
    target.auto = function($time) {
        if(target.max <= 0) return target;
        target.autoStatus = true;
        target.autoTime = $time ? $time : 1500;
        clearInterval(target.timer);
        target.timer = setInterval(target.next, target.autoTime);
        target.element.mouseover(function() {
            clearInterval(target.timer);
            clearTimeout(target.nextTimer);
        }).mouseout(function() {
            clearInterval(target.timer);
            clearTimeout(target.nextTimer);
            target.timer = setInterval(target.next, target.autoTime);
        })
        return target;
    }
    return target;
}



