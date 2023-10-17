
    //  *****************************loading ****************** 
    tl.set(".loading-words", {
        opacity: 0,
        y: -50
    });

    tl.set(".loading-words .active", {
        display: "none",
    });

    tl.set(".loading-words .home-active, .loading-words .home-active-last", {
        display: "block",
        opacity: 0
    });

    tl.set(".loading-words .home-active-first", {
        opacity: 1,
    });

    if ($(window).width() > 540) {
        tl.set(".loading-screen .rounded-div-wrap.bottom", {
            height: "10vh",
        });
    } else {
        tl.set(".loading-screen .rounded-div-wrap.bottom", {
            height: "5vh",
        });
    }

    tl.set("html", {
        cursor: "wait"
    });

    tl.call(function() {
        scroll.stop();
    });

    tl.to(".loading-words", {
        duration: .8,
        opacity: 1,
        y: -50,
        ease: "Power4.easeOut",
        delay: .5
    });

    tl.to(".loading-words .home-active", {
        duration: .01,
        opacity: 1,
        stagger: .15,
        ease: "none",
        onStart: homeActive
    }, "=-.4");

    function homeActive() {
        gsap.to(".loading-words .home-active", {
            duration: .01,
            opacity: 0,
            stagger: .15,
            ease: "none",
            delay: .15
        });
    }

    tl.to(".loading-words .home-active-last", {
        duration: .01,
        opacity: 1,
        delay: .15
    });

    tl.to(".loading-screen", {
        duration: .8,
        top: "-100%",
        ease: "Power4.easeInOut",
        delay: .2
    });

    tl.to(".loading-screen .rounded-div-wrap.bottom", {
        duration: 1,
        height: "0vh",
        ease: "Power4.easeInOut"
    }, "=-.8");

    tl.to(".loading-words", {
        duration: .3,
        opacity: 0,
        ease: "linear"
    }, "=-.8");

    tl.set(".loading-screen", {
        top: "calc(-100%)"
    });

    tl.set(".loading-screen .rounded-div-wrap.bottom", {
        height: "0vh"
    });

    // ******************************************* more  loading *********************

    tl.to("main .once-in", {
        duration: 1.5,
        y: "0vh",
        stagger: .07,
        ease: "Expo.easeOut",
        clearProps: true
    }, "=-.8");

    tl.set("html", {
        cursor: "auto"
    }, "=-1.2");

    tl.call(function() {
        scroll.start();
    });

}

// Animation - First Page Load
function initLoader() {

    var tl = gsap.timeline();

    tl.set(".loading-screen", {
        top: "0",
    });

    if ($(window).width() > 540) {
        tl.set("main .once-in", {
            y: "50vh"
        });
    } else {
        tl.set("main .once-in", {
            y: "10vh"
        });
    }

    tl.set(".loading-words", {
        opacity: 1,
        y: -50
    });

    if ($(window).width() > 540) {
        tl.set(".loading-screen .rounded-div-wrap.bottom", {
            height: "10vh",
        });
    } else {
        tl.set(".loading-screen .rounded-div-wrap.bottom", {
            height: "5vh",
        });
    }

    tl.set("html", {
        cursor: "wait"
    });

    tl.to(".loading-screen", {
        duration: .8,
        top: "-100%",
        ease: "Power4.easeInOut",
        delay: .5
    });

    tl.to(".loading-screen .rounded-div-wrap.bottom", {
        duration: 1,
        height: "0vh",
        ease: "Power4.easeInOut"
    }, "=-.8");

    tl.to(".loading-words", {
        duration: .3,
        opacity: 0,
        ease: "linear",
    }, "=-.8");

    tl.set(".loading-screen", {
        top: "calc(-100%)"
    });

    tl.set(".loading-screen .rounded-div-wrap.bottom", {
        height: "0vh"
    });

    tl.to("main .once-in", {
        duration: 1,
        y: "0vh",
        stagger: .05,
        ease: "Expo.easeOut",
        clearProps: "true"
    }, "=-.8");

    tl.set("html", {
        cursor: "auto",
    }, "=-.8");

}
