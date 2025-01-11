/**
 * ...
 * @author biagio
 */
function CEasing() {
    //----------------------
    // Bounce

    /**
     * BOUNCE EASING OUT: exponentially decaying parabolic bounce, Interpolates a value between b and c parameters
     * <p></br><b>Note:</b></br>
     * &nbsp&nbsp&nbspt and d parameters can be in frames or seconds/milliseconds
     *
     * @param t Elapsed time
     * @param b Initial position
     * @param c Final position
     * @param d Duration
     * @return A value between b and c parameters
     */
    this.easeOutBounce = function (t, b, c, d) {
        if ((t/= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    };
    /**
     * BOUNCE EASING IN: exponentially decaying parabolic bounce, Interpolates a value between b and c parameters
     * <p></br><b>Note:</b></br>
     * &nbsp&nbsp&nbspt and d parameters can be in frames or seconds/milliseconds
     *
     * @param t Elapsed time
     * @param b Initial position
     * @param c Final position
     * @param d Duration
     * @return A value between b and c parameters
     */
    this.easeInBounce = function (t, b, c, d) {
        return c - this.easeOutBounce(d - t, 0, c, d) + b;
    };
    /**
     * BOUNCE EASING IN/OUT: exponentially decaying parabolic bounce, Interpolates a value between b and c parameters
     * <p></br><b>Note:</b></br>
     * &nbsp&nbsp&nbspt and d parameters can be in frames or seconds/milliseconds
     *
     * @param t Elapsed time
     * @param b Initial position
     * @param c Final position
     * @param d Duration
     * @return A value between b and c parameters
     */
    this.easeInOutBounce = function (t, b, c, d) {
        if (t < d / 2)
            return this.easeInBounce(t * 2, 0, c, d) * .5 + b;
        else
            return this.easeOutBounce(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    };

    //----------------------
    // Circ

    /**
     * Interpolates a value between b and c parameters
     * <p></br><b>Note:</b></br>
     * &nbsp&nbsp&nbspt and d parameters can be in frames or seconds/milliseconds
     *
     * @param t Elapsed time
     * @param b Initial position
     * @param c Final position
     * @param d Duration
     * @return A value between b and c parameters
     */
    this.easeInCirc = function (t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    };
    /**
     * Interpolates a value between b and c parameters
     * <p></br><b>Note:</b></br>
     * &nbsp&nbsp&nbspt and d parameters can be in frames or seconds/milliseconds
     *
     * @param t Elapsed time
     * @param b Initial position
     * @param c Final position
     * @param d Duration
     * @return A value between b and c parameters
     */
    this.easeOutCirc = function (t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    };
    /**
     * Interpolates a value between b and c parameters
     * <p></br><b>Note:</b></br>
     * &nbsp&nbsp&nbspt and d parameters can be in frames or seconds/milliseconds
     *
     * @param t Elapsed time
     * @param b Initial position
     * @param c Final position
     * @param d Duration
     * @return A value between b and c parameters
     */
    this.easeInOutCirc = function (t, b, c, d) {
        if ((t /= d / 2) < 1)
            return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    };

    //----------------------
    // Cubic
    this.easeInCubic = function (t, b, c, d) {
        return c * (t /= d) * t * t + b;
    };
    this.easeOutCubic = function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    };
    this.easeInOutCubic = function (t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    };

    //----------------------
    // Elastic
    this.easeInElastic = function (t, b, c, d, a, p) {
        var s = 0;
        if (t === 0) {
            return b;
        }
        if ((t /= d) === 1) {
            return b + c;
        }
        if (!p) {
            p = d * .3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            s = p / 4;
        } else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    };
    this.easeOutElastic = function (t, b, c, d, a, p) {
        var s = 0;
        if (t === 0) {
            return b;
        }
        if ((t /= d) === 1) {
            return b + c;
        }
        if (!p) {
            p = d * .3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            s = p / 4;
        } else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
    };
    this.easeInOutElastic = function (t, b, c, d, a, p) {
        var s = 0;
        if (t === 0) {
            return b;
        }
        if ((t /= d) === 1) {
            return b + c;
        }
        if (!p) {
            p = d * .3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            s = p / 4;
        } else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        if (t < 1) {
            return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        }
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    };

    //----------------------
    // Expo
    /**
     * Interpolates a value between b and c parameters
     * <p></br><b>Note:</b></br>
     * &nbsp&nbsp&nbspt and d parameters can be in frames or seconds/milliseconds
     *
     * @param t Elapsed time
     * @param b Initial position
     * @param c Final position
     * @param d Duration
     * @return A value between b and c parameters
     */
    this.easeInExpo = function (t, b, c, d) {
        return (t === 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    };
    /**
     * Interpolates a value between b and c parameters
     * <p></br><b>Note:</b></br>
     * &nbsp&nbsp&nbspt and d parameters can be in frames or seconds/milliseconds
     *
     * @param t Elapsed time
     * @param b Initial position
     * @param c Final position
     * @param d Duration
     * @return A value between b and c parameters
     */
    this.easeOutExpo = function (t, b, c, d) {
        return (t === d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    };
    /**
     * Interpolates a value between b and c parameters
     * <p></br><b>Note:</b></br>
     * &nbsp&nbsp&nbspt and d parameters can be in frames or seconds/milliseconds
     *
     * @param t Elapsed time
     * @param b Initial position
     * @param c Final position
     * @param d Duration
     * @return A value between b and c parameters
     */
    this.easeInOutExpo = function (t, b, c, d) {
        if (t === 0)
            return b;
        if (t === d)
            return b + c;
        if ((t /= d / 2) < 1)
            return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    };

    //----------------------
    // Linear	
    /**
     * Interpolates a value between b and c parameters
     * <p></br><b>Note:</b></br>
     * &nbsp&nbsp&nbspt and d parameters can be in frames or seconds/milliseconds
     *
     * @param t Elapsed time
     * @param b Initial position
     * @param c Final position
     * @param d Duration
     * @return A value between b and c parameters
     */
    this.easeLinear = function (t, b, c, d) {
        return c * t / d + b;
    };

    //----------------------
    // Quad		
    /**
     * Interpolates a value between b and c parameters
     * <p></br><b>Note:</b></br>
     * &nbsp&nbsp&nbspt and d parameters can be in frames or seconds/milliseconds
     *
     * @param t Elapsed time
     * @param b Initial position
     * @param c Final position
     * @param d Duration
     * @return A value between b and c parameters
     */
    this.easeInQuad = function (t, b, c, d) {
        return c * (t /= d) * t + b;
    };
    /**
     * Interpolates a value between b and c parameters
     * <p></br><b>Note:</b></br>
     * &nbsp&nbsp&nbspt and d parameters can be in frames or seconds/milliseconds
     *
     * @param t Elapsed time
     * @param b Initial position
     * @param c Final position
     * @param d Duration
     * @return A value between b and c parameters
     */
    this.easeOutQuad = function (t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    };
    /**
     * Interpolates a value between b and c parameters
     * <p></br><b>Note:</b></br>
     * &nbsp&nbsp&nbspt and d parameters can be in frames or seconds/milliseconds
     *
     * @param t Elapsed time
     * @param b Initial position
     * @param c Final position
     * @param d Duration
     * @return A value between b and c parameters
     */
    this.easeInOutQuad = function (t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    };

    //----------------------
    // Quart
    /**
     * Interpolates a value between b and c parameters
     * <p></br><b>Note:</b></br>
     * &nbsp&nbsp&nbspt and d parameters can be in frames or seconds/milliseconds
     *
     * @param t Elapsed time
     * @param b Initial position
     * @param c Final position
     * @param d Duration
     * @return A value between b and c parameters
     */
    this.easeInQuart = function (t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    };
    /**
     * Interpolates a value between b and c parameters
     * <p></br><b>Note:</b></br>
     * &nbsp&nbsp&nbspt and d parameters can be in frames or seconds/milliseconds
     *
     * @param t Elapsed time
     * @param b Initial position
     * @param c Final position
     * @param d Duration
     * @return A value between b and c parameters
     */
    this.easeOutQuart = function (t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    };
    /**
     * Interpolates a value between b and c parameters
     * <p></br><b>Note:</b></br>
     * &nbsp&nbsp&nbspt and d parameters can be in frames or seconds/milliseconds
     *
     * @param t Elapsed time
     * @param b Initial position
     * @param c Final position
     * @param d Duration
     * @return A value between b and c parameters
     */
    this.easeInOutQuart = function (t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    };

    //----------------------
    // Quint		
    /**
     * Interpolates a value between b and c parameters
     * <p></br><b>Note:</b></br>
     * &nbsp&nbsp&nbspt and d parameters can be in frames or seconds/milliseconds
     *
     * @param t Elapsed time
     * @param b Initial position
     * @param c Final position
     * @param d Duration
     * @return A value between b and c parameters
     */
    this.easeInQuint = function (t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    };
    /**
     * Interpolates a value between b and c parameters
     * <p></br><b>Note:</b></br>
     * &nbsp&nbsp&nbspt and d parameters can be in frames or seconds/milliseconds
     *
     * @param t Elapsed time
     * @param b Initial position
     * @param c Final position
     * @param d Duration
     * @return A value between b and c parameters
     */
    this.easeOutQuint = function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    };
    /**
     * Interpolates a value between b and c parameters
     * <p></br><b>Note:</b></br>
     * &nbsp&nbsp&nbspt and d parameters can be in frames or seconds/milliseconds
     *
     * @param t Elapsed time
     * @param b Initial position
     * @param c Final position
     * @param d Duration
     * @return A value between b and c parameters
     */
    this.easeInOutQuint = function (t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    };

    //----------------------
    // Sine	
    /**
     * Interpolates a value between b and c parameters
     * <p></br><b>Note:</b></br>
     * &nbsp&nbsp&nbspt and d parameters can be in frames or seconds/milliseconds
     *
     * @param t Elapsed time
     * @param b Initial position
     * @param c Final position
     * @param d Duration
     * @return A value between b and c parameters
     */
    this.easeInSine = function (t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    };
    /**
     * Interpolates a value between b and c parameters
     * <p></br><b>Note:</b></br>
     * &nbsp&nbsp&nbspt and d parameters can be in frames or seconds/milliseconds
     *
     * @param t Elapsed time
     * @param b Initial position
     * @param c Final position
     * @param d Duration
     * @return A value between b and c parameters
     */
    this.easeOutSine = function (t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    };
    /**
     * Interpolates a value between b and c parameters
     * <p></br><b>Note:</b></br>
     * &nbsp&nbsp&nbspt and d parameters can be in frames or seconds/milliseconds
     *
     * @param t Elapsed time
     * @param b Initial position
     * @param c Final position
     * @param d Duration
     * @return A value between b and c parameters
     */
    this.easeInOutSine = function (t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    };

    //----------------------
    // Back
    this.easeInBack = function (t, b, c, d) {
        var s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    };
    this.easeOutBack = function (t, b, c, d) {
        var s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    };
    this.easeInOutBack = function (t, b, c, d) {
        var s = 1.70158;
        if ((t /= d / 2) < 1)
            return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    };

    s_oEasing = this;
}
var s_oEasing;
