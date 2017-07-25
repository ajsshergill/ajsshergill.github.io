'use strict';
var Core = function(options) {
    var Body = $('body');
    var runHelpers = function() {
        $.fn.disableSelection = function() {
            return this.attr('unselectable', 'on').css('user-select', 'none').on('selectstart', false);
        };

        function msieversion() {
            var ua = window.navigator.userAgent;
            var msie = ua.indexOf("MSIE ");
            if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
                var ieVersion = parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)));
                if (ieVersion === 9) {
                    $('body').addClass('no-js ie' + ieVersion);
                }
                return ieVersion;
            } else {
                return false;
            }
        }
        msieversion();
        setTimeout(function() {
            $('#content').removeClass('animated fadeIn');
        }, 800);
    }
    var runAnimations = function() {
        setTimeout(function() {
            $('body').addClass('onload-check');
        }, 100);
        $('.animated-delay[data-animate]').each(function() {
            var This = $(this)
            var delayTime = This.data('animate');
            var delayAnimation = 'fadeIn';
            if (delayTime.length > 1 && delayTime.length < 3) {
                delayTime = This.data('animate')[0];
                delayAnimation = This.data('animate')[1];
            }
            var delayAnimate = setTimeout(function() {
                This.removeClass('animated-delay').addClass('animated ' + delayAnimation).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                    This.removeClass('animated ' + delayAnimation);
                });
            }, delayTime);
        });
        $('.animated-waypoint').each(function(i, e) {
            var This = $(this);
            var Animation = This.data('animate');
            var offsetVal = '35%';
            if (Animation.length > 1 && Animation.length < 3) {
                Animation = This.data('animate')[0];
                offsetVal = This.data('animate')[1];
            }
            var waypoint = new Waypoint({
                element: This,
                handler: function(direction) {
                    console.log(offsetVal)
                    if (This.hasClass('animated-waypoint')) {
                        This.removeClass('animated-waypoint').addClass('animated ' + Animation).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                            This.removeClass('animated ' + Animation);
                        });
                    }
                },
                offset: offsetVal
            });
        });
    }
    var runHeader = function() {
        $('.navbar-search').on('click', function(e) {
            var This = $(this);
            var searchForm = This.find('input');
            var searchRemove = This.find('.search-remove');
            if (!$('body.mobile-view').length) {
                return;
            }
            This.addClass('search-open');
            if (!searchRemove.length) {
                This.append('<div class="search-remove"></div>');
            }
            setTimeout(function() {
                This.find('.search-remove').fadeIn();
                searchForm.focus();
                searchForm.one('keydown', function() {
                    $(this).val('');
                });
            }, 330)
            if ($(e.target).attr('class') == 'search-remove') {
                This.removeClass('search-open');
                This.find('.search-remove').remove();
            }
        });
        if ($('.dropdown-item-slide').length) {
            $('.dropdown-item-slide').on('shown.bs.dropdown', function() {
                var This = $(this);
                setTimeout(function() {
                    This.addClass('slide-open');
                }, 20);
            });
            $('.dropdown-item-slide').on('hidden.bs.dropdown', function() {
                $(this).removeClass('slide-open');
            });
        }
        if ($("#user-status").length) {
            $('#user-status').multiselect({
                buttonClass: 'btn btn-default btn-sm',
                buttonWidth: 100,
                dropRight: false
            });
        }
        if ($("#user-role").length) {
            $('#user-role').multiselect({
                buttonClass: 'btn btn-default btn-sm',
                buttonWidth: 100,
                dropRight: true
            });
        }
        if ($('.dropdown-menu.dropdown-persist').length) {
            $('.dropdown-menu.dropdown-persist').on('click', function(e) {
                e.stopPropagation();
                var Target = $(e.target);

                function closeMulti() {
                    Target.parents('.dropdown-persist').find('.btn-group').each(function() {
                        if ($(this).children('.multiselect').length) {
                            $(this).removeClass('open');
                        }
                    });
                };
                if (Target.hasClass('multiselect') || Target.parent().hasClass('multiselect')) {
                    closeMulti();
                    Target.parents('.btn-group').toggleClass('open');
                } else {
                    closeMulti()
                }
            });
        }
        var menu = $('#topbar-dropmenu');
        var items = menu.find('.metro-tile');
        var metroBG = $('.metro-modal');
        $('.topbar-menu-toggle').on('click', function() {
            menu.slideToggle(230).toggleClass('topbar-menu-open');
            $(items).addClass('animated animated-short fadeInDown').css('opacity', 1);
            if (!metroBG.length) {
                metroBG = $('<div class="metro-modal"></div>').appendTo('body');
            }
            setTimeout(function() {
                metroBG.fadeIn();
            }, 380);
        });
        $('body').on('click', '.metro-modal', function() {
            metroBG.fadeOut('fast');
            setTimeout(function() {
                menu.slideToggle(150).toggleClass('topbar-menu-open');
            }, 250);
        });
    }
    var runSideMenu = function(options) {
        if ($('.nano.affix').length) {
            $(".nano").nanoScroller({
                preventPageScrolling: true
            });
        }
        var sidebarLeftToggle = function() {
            if (Body.hasClass('sb-l-c') && options.collapse === "sb-l-m") {
                Body.removeClass('sb-l-c');
            }
            Body.toggleClass(options.collapse).removeClass('sb-r-o').addClass('sb-r-c');
            triggerResize();
        };
        var sidebarRightToggle = function() {
            if (options.siblingRope === true && !Body.hasClass('mobile-view') && Body.hasClass('sb-r-o')) {
                Body.toggleClass('sb-r-o sb-r-c').toggleClass(options.collapse);
            } else {
                Body.toggleClass('sb-r-o sb-r-c').addClass(options.collapse);
            }
            triggerResize();
        };
        $('.sidebar-toggle-mini').on('click', function(e) {
            e.preventDefault();
            Body.addClass('sb-l-c');
            triggerResize();
            if (!Body.hasClass('mobile-view')) {
                setTimeout(function() {
                    Body.toggleClass('sb-l-m sb-l-o');
                }, 250);
            }
        });
        var sbOnLoadCheck = function() {
            if (!$('body.sb-l-o').length && !$('body.sb-l-m').length && !$('body.sb-l-c').length) {
                $('body').addClass(options.sbl);
            }
            if (!$('body.sb-r-o').length && !$('body.sb-r-c').length) {
                $('body').addClass(options.sbr);
            }
            if ($(window).width() < 1080) {
                Body.removeClass('sb-r-o').addClass('mobile-view sb-l-m sb-r-c');
            }
        };
        var sbOnResize = function() {
            if ($(window).width() < 1080 && !Body.hasClass('mobile-view')) {
                Body.removeClass('sb-r-o').addClass('mobile-view sb-l-m sb-r-c');
            } else if ($(window).width() > 1080) {
                Body.removeClass('mobile-view');
            } else {
                return;
            }
        };
        var triggerResize = function() {
            setTimeout(function() {
                $(window).trigger('resize');
            }, 300)
        };
        sbOnLoadCheck();
        $("#toggle_sidemenu_l").click(sidebarLeftToggle);
        $("#toggle_sidemenu_r").click(sidebarRightToggle);
        var rescale = function() {
            sbOnResize();
        }
        var lazyLayout = _.debounce(rescale, 300);
        $(window).resize(lazyLayout);
        var usermenuItems = $('.user-menu').find('a');
        $('.sidebar-menu-toggle').click(function(e) {
            e.preventDefault();
            $('.user-menu').toggleClass('usermenu-open').slideToggle('fast');
            if ($('.user-menu').hasClass('usermenu-open')) {
                usermenuItems.addClass('animated fadeIn');
            }
        });
        $('.sidebar-menu li a.accordion-toggle').click(function(e) {
            e.preventDefault();
            if ($('body').hasClass('sb-l-m') && !$(this).parents('ul.sub-nav').length) {
                return;
            }
            if (!$(this).parents('ul.sub-nav').length) {
                $('a.accordion-toggle.menu-open').next('ul').slideUp('fast', 'swing', function() {
                    $(this).attr('style', '').prev().removeClass('menu-open');
                });
            } else {
                var activeMenu = $(this).next('ul.sub-nav');
                var siblingMenu = $(this).parent().siblings('li').children('a.accordion-toggle.menu-open').next('ul.sub-nav')
                activeMenu.slideUp('fast', 'swing', function() {
                    $(this).attr('style', '').prev().removeClass('menu-open');
                });
                siblingMenu.slideUp('fast', 'swing', function() {
                    $(this).attr('style', '').prev().removeClass('menu-open');
                });
            }
            if (!$(this).hasClass('menu-open')) {
                $(this).next('ul').slideToggle('fast', 'swing', function() {
                    $(this).attr('style', '').prev().toggleClass('menu-open');
                });
            }
        });
    }
    var runTrays = function() {
        var trayMatch = $('.tray[data-tray-height="match"]');
        if (trayMatch.length) {
            trayMatch.each(function() {
                var Height = $('body').height();
                $(this).height(Height);
            });
        };
        var rescale = function() {
            if ($(window).width() < 1000) {
                Body.addClass('tray-rescale');
            } else {
                Body.removeClass('tray-rescale tray-rescale-left tray-rescale-right');
            }
        }
        var lazyLayout = _.debounce(rescale, 300);
        if (!Body.hasClass('disable-tray-rescale')) {
            $(window).resize(lazyLayout);
            rescale();
        }
    }
    var runFormElements = function() {
        if ($(".sortable").length) {
            $(".sortable").sortable();
            $(".sortable").disableSelection();
        }
        var Tooltips = $("[data-toggle=tooltip]");
        if (Tooltips.length) {
            if (Tooltips.parents('#sidebar_left')) {
                Tooltips.tooltip({
                    container: $('body'),
                    template: '<div class="tooltip tooltip-white" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
                });
            } else {
                Tooltips.tooltip();
            }
        }
        if ($("[data-toggle=popover]").length) {
            $('[data-toggle=popover]').popover();
        }
        $('.dropdown-menu .dropdown-persist').click(function(event) {
            event.stopPropagation();
        });
        $('.dropdown-menu .nav-tabs li a').click(function(event) {
            event.preventDefault();
            event.stopPropagation();
            $(this).tab('show')
        });
        if ($('.btn-states').length) {
            $('.btn-states').click(function() {
                $(this).addClass('active').siblings().removeClass('active');
            });
        }
    }
    return {
        init: function(options) {
            var defaults = {
                sbl: "sb-l-o",
                sbr: "sb-r-c",
                collapse: "sb-l-m",
                siblingRope: true
            };
            var options = $.extend({}, defaults, options);
            runHelpers();
            runAnimations();
            runSideMenu(options);
            runTrays();
            runFormElements();
            runHeader();
        }
    }
}();