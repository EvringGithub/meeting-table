﻿(function () {
    //编辑
    var edit = (function () {
        return {
            editInput: function (editBtn, targetClass) {
                $('body').on('click', '.' + editBtn, function () {
                    $(this).parents('.meeting').find('.edit').prop('readonly', false).addClass(targetClass);
                    $(this).parents('.meeting').find('.datetimepicker1').prop('disabled', false).addClass(targetClass);
                    $(this).parents('.meeting').find('.save,.dele').show();
                })
            },
            saveInput: function (saveBtn, targetClass) {
                $('body').on('click', '.' + saveBtn, function () {
                    var $this = $(this);
                    $.ajax({
                        type: "GET",
                        url: $('.lists-wrap').data('url'),
                        data: {
                            meetingdate: $this.parents('.meeting').siblings('.date').text(),
                            meetingtt: $this.parents('.bd').siblings('.title').find('.mt').val(),
                            meetingroom: $this.parent().siblings('.details').find('.mr').val(),
                            meetingst: $this.parent().siblings('.details').find('.mst').val(),
                            meetinget: $this.parent().siblings('.details').find('.met').val(),
                            meetinguser: $this.parent().siblings('.user').find('.mu').val()
                        },
                        success: function (result) {
                            $this.parents('.meeting').find('.datetimepicker1').prop('disabled', true).removeClass(targetClass);
                            $this.parents('.meeting').find('.edit').prop('readonly', true).removeClass(targetClass);
                            $this.hide();
                            $this.siblings('.dele').hide();
                        }
                    });
                });
            },
            deleteInput: function (deleteBtn) {
                $('body').on('click', '.' + deleteBtn, function () {
                    $(this).parents('.meeting').remove();
                })
            }
        }
    })()
    edit.editInput('icon-edit', 'focus-input');
    edit.saveInput('save', 'focus-input');
    edit.deleteInput('dele');
    //增加
    var add = (function () {
        return {
            cancalBtn: function (cancalBtn) {
                $('body').on('click', '.' + cancalBtn, function () {
                    $(this).parent().hide();
                    $(this).parent().prev().show();
                })
            },
            addContent: function () {
                $('body').on('click', '.metting-add', function () {
                    var $mContent = $(this).prev().val();
                    var mettingHtml = "<div class='meeting new-metting'><div class='title'><input type='text' class='edit focus-input'  placeholder='会议主题' value=" + $mContent + "></div>"
                        + "<div class='bd'><div class='details clear'><div class='meetingRoom'><input type='text' class='edit focus-input' placeholder='会议室' value=''/></div>"
                        + "<div class='timeStart'><input type='text' class='edit focus-input datetimepicker1' value=''  placeholder='开始时间' onclick='$(this).datetimepicker({ datepicker: false, step: 5,format: &quot;H:i&quot})'>"
                        + "</div><div>--</div>"
                        + "<div class='timeEnd'><input type='text' class='edit focus-input datetimepicker1' value=''  placeholder='结束时间' onclick='$(this).datetimepicker({ datepicker: false, step: 5,format: &quot;H:i&quot})'></div></div>"
                        + "<div class='user'><input type='text' class='edit focus-input' value='' placeholder='使用人'></div>"
                        + "<div class='handle'><input type='button' class='icon-edit' value= '编辑' /><input type='button' class='save' value= '保存' /><input type='button' class='dele' value= '删除'/></div>";
                    $(this).parents('.list-meeting').find('.meeting-wrap').append(mettingHtml);
                    //    $('.xdsoft_datetimepicker').last().after($('.xdsoft_datetimepicker').eq(0).clone());
                })
            }
        }
    })()
    add.cancalBtn('cancal-btn');
    add.addContent();
    //时间
    var time = (function () {
        return {
            timeShow: function (currentTime, addDayCount) {
                var time = new Date();
                //获取AddDayCount天后的日期 
                time.setDate(time.getDate() + addDayCount);
                var y = time.getFullYear();
                var m = time.getMonth() + 1;
                var d = time.getDate();
                var time = y + "-" + m + "-" + d;
                $('.' + currentTime).text(time);
                //考虑节假日

            },
            timePeriod: function () {
                $('.datetimepicker1').datetimepicker({
                    datepicker: false,
                    format: 'H:i',
                    step: 5
                });
            }
        }
    })()
    time.timeShow('today', 0);
    time.timeShow('tomorrow', 1);
    time.timeShow('a-tomorrow', 2);
    time.timeShow('g-tomorrow', 3);
    //start-end-time
    time.timePeriod();
})()